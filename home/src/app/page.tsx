"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
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

export default function Home() {
  const [erroValor, setErroValor] = useState<string | null>(null);
  const [erroDescricao, setErroDescricao] = useState<string | null>(null);
  const { token, loading, userName } = useAuth();
  const router = useRouter();
  const [valorInput, setValorInput] = useState<number>(0);
  const [descricao, setDescricao] = useState<string>("");
  const [valorSelect, setValorSelect] = useState<string>("");
  const [mostrarAlerta, setMostrarAlerta] = useState<boolean>(false);

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

  const firstName = userName ? userName.split("@")[0] : "Usuário";

  const valor = 1250.50;

  const [extratos, setExtratos] = useState(listaExtratos);
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
            valor={valor}
          />

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
