"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import InputComponente from "@/components/Input/Input";
import SelectComponente from "@/components/Select/Select";
import Sidebar from "@/components/Sidebar/Sidebar";
import SaldoContainer from "@/components/SaldoContainer/SaldoContainer";
import ExtratoContainer from "@/components/ExtratoContainer/ExtratoContainer";
import Botao from "@/components/Botao/Botao";
import { listaExtratos, opcoesTransacao } from "../../public/assets/mock";
import { FormularioType } from "@/types/iFormulario";
import { adicionarTransacao } from "@/utils/transacao";
import { radii } from "@/styles/theme/radii";
import { palette } from "@/styles/theme/colors";
import { fontSizes } from "@/styles/theme/typography";
import Alerta from "@/components/Alerta/Alerta";
import FinancialCharts from "@/components/FinancialCharts/FinancialCharts";

export default function Home() {
  const [erroValor, setErroValor] = useState<string | null>(null);
  const [erroDescricao, setErroDescricao] = useState<string | null>(null);
  const { token, loading, userName } = useAuth();
  const [valorInput, setValorInput] = useState<number>(0);
  const [descricao, setDescricao] = useState<string>("");
  const [valorSelect, setValorSelect] = useState<string>("");
  const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);
  const [anexo, setAnexo] = useState<File | null>(null);
  const [erroAnexo, setErroAnexo] = useState<string | null>(null);
  const firstName = userName ? userName.split("@")[0] : "Usuário";
  const [saldo, setSaldo] = useState<number>(() => calcularSaldo(listaExtratos));
  const [extratos, setExtratos] = useState(listaExtratos);
  const categoriasSugestao = [
    {
      label: "saque",
      keywords: ["mercado", "comida", "restaurante", "padaria", "feira", "compras", "dinheiro", "retirada"],
    },
    {
      label: "deposito",
      keywords: ["transferência recebida", "pix recebido", "depósito", "entrada", "crédito", "salário", "renda"],
    },
    {
      label: "pagamento_boleto",
      keywords: ["boleto", "conta", "água", "luz", "internet", "fatura", "pagamento", "energia", "telefone"],
    },
    {
      label: "estorno",
      keywords: ["estorno", "reembolso", "devolução", "cancelamento", "valor devolvido", "recuperação"],
    },
    {
      label: "recarga_celular",
      keywords: ["recarga", "celular", "claro", "tim", "vivo", "oi", "crédito de celular", "telefone pré-pago"],
    },
  ];

  useEffect(() => {
    if (!loading && !token) {
      window.location.href = "http://localhost:3001/";
    }
  }, [token, loading]);

  function validarValor(valor: number) {
  if (valor <= 0) return "O valor deve ser maior que zero";
  if (valor > 100000) return "Valor muito alto";
  return null;
}

  useEffect(() => {
    setSaldo(calcularSaldo(extratos));
  }, [extratos]);

  function calcularSaldo(extratos: typeof listaExtratos) {
    let saldo = 0;

    extratos.forEach((mes) => {
      mes.extratos.forEach((item) => {
        if (item.tipo === "deposito" || item.tipo === "estorno") {
          saldo += item.valor;
        } else {
          saldo -= item.valor;
        }
      });
    });

    return saldo;
  }

function validarAnexo(file: File) {
  const tiposPermitidos = [
    "application/pdf",
    "image/png",
    "image/jpeg",
  ];

  if (!tiposPermitidos.includes(file.type)) {
    return "Formato inválido. Envie PDF, PNG ou JPG.";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "O arquivo deve ter no máximo 5MB.";
  }

  return null;
}

function validarDescricao(texto: string) {
  if (texto.trim().length < 3)
    return "A descrição deve ter pelo menos 3 caracteres";
  return null;
}


  useEffect(() => {
  if (!descricao) return;

  const texto = descricao.toLowerCase();

  const categoriaEncontrada = categoriasSugestao.find(cat =>
    cat.keywords.some(keyword => texto.includes(keyword))
  );

  if (categoriaEncontrada) {
    setValorSelect(categoriaEncontrada.label);
  }
}, [descricao]);

  const handleTransactionSubmit = (novaTransacao: FormularioType) => {
    const novosExtratos = adicionarTransacao(extratos, novaTransacao);
    setExtratos(novosExtratos);
  };

  const submeterTransacao = () => {
    const novaTransacao: FormularioType = {
      valor: valorInput,
      tipo: valorSelect,
      descricao: descricao,
    };
    
    handleTransactionSubmit(novaTransacao);

    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);

    setValorInput(0);
    setDescricao("");
    setValorSelect("");
    setAnexo(null);
    setErroAnexo(null);
  if (loading) {
    return <p>Carregando autenticação...</p>;
  }

};

  return (
    <>
      <div className={styles.containerTudo}>

        <Sidebar width={"100%"} height="" />

        <div className={styles.conteudoContainer}>
          
          {mostrarAlerta && (
            <Alerta
              tipo="sucesso"
              mensagem="🎉 Sucesso! Transação adicionada com êxito."
            />
          )}
          
          <SaldoContainer
            height="40%"
            key={firstName}
            firstName={firstName}
            valor={saldo}
          />

          {/* Caso precise, delete essa parte */}
          <div className={styles.financialSection}>
            <FinancialCharts extratos={extratos} />

            <p className={styles.analiseTexto}>
              📌 <strong>Análise financeira:</strong><br />
              O usuário apresenta maior volume de receitas em comparação às despesas,
              indicando saldo positivo ao longo dos meses. Os principais gastos estão
              concentrados em pagamentos de boletos e saques, enquanto depósitos
              representam a principal fonte de receita.
            </p>
          </div>
          {/* Só essas */}
          <div
              style={{
                flex: 1,
                minHeight: "fit-content",
                borderRadius: radii.sm,
                backgroundColor: palette.cinza300,
              }}
              className={styles.page}
            >
              <h4
                style={{
                  fontSize: fontSizes.heading,
                  color: palette.azul700,
                  fontWeight: 700,
                }}
              >
                Nova transação
              </h4>

              <SelectComponente
                value={valorSelect}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setValorSelect(e.target.value)
                }
                options={opcoesTransacao}
              />

              <InputComponente
                type="number"
                value={valorInput}
                onChange={(e) => {
                  const valorString = e.target.value;
                  const valorNumber =
                    valorString === "" ? 0 : parseFloat(valorString);

                  setValorInput(valorNumber);
                  setErroValor(validarValor(valorNumber));
                }}
                label="Valor"
                placeholder="R$ 00,00"
              />

              {erroValor && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {erroValor}
                </span>
              )}

              <InputComponente
                type="text"
                value={descricao}
                onChange={(e) => {
                  setDescricao(e.target.value);
                  setErroDescricao(validarDescricao(e.target.value));
                }}
                label="Descrição da transação"
              />

              {erroDescricao && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {erroDescricao}
                </span>
              )}

              <div style={{ marginTop: 12 }}>
                <label style={{ fontSize: 14, fontWeight: 600 }}>
                  Anexo (recibo ou comprovante)
                </label>

                <input
                  type="file"
                  accept=".pdf,image/png,image/jpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const erro = validarAnexo(file);
                    setErroAnexo(erro);

                    if (!erro) {
                      setAnexo(file);
                    } else {
                      setAnexo(null);
                    }
                  }}
                />

                {anexo && !erroAnexo && (
                  <p style={{ fontSize: 12, color: "green" }}>
                    📎 Anexo selecionado: {anexo.name}
                  </p>
                )}

                {erroAnexo && (
                  <p style={{ fontSize: 12, color: "red" }}>
                    {erroAnexo}
                  </p>
                )}
              </div>

              <Botao
                label="Adicionar nova transação"
                onClick={submeterTransacao}
                backgroundColor={palette.azul700}
                disabled={
                  !!erroValor ||
                  !!erroDescricao ||
                  !valorSelect
                }
              />
            </div>

        </div>

        <ExtratoContainer extratos={extratos} setExtratos={setExtratos} />

      </div>
    </>
  );
}
