"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

type Extrato = {
  valor: number;
  tipo: string;
};

type Mes = {
  mes: string;
  extratos: Extrato[];
};

const COLORS = ["#2563eb", "#ef4444", "#22c55e", "#eab308", "#8b5cf6"];

export default function FinancialCharts({ extratos }: { extratos: Mes[] }) {
  const todos = extratos.flatMap((m) => m.extratos);

  const receita = todos
    .filter((e) => e.tipo === "deposito")
    .reduce((acc, e) => acc + e.valor, 0);

  const despesa = todos
    .filter((e) => e.tipo !== "deposito")
    .reduce((acc, e) => acc + e.valor, 0);

  const receitaDespesaData = [
    { name: "Receitas", valor: receita },
    { name: "Despesas", valor: despesa },
  ];

  const gastosPorCategoria = Object.values(
    todos
      .filter((e) => e.tipo !== "deposito")
      .reduce((acc: any, cur) => {
        acc[cur.tipo] = acc[cur.tipo] || { name: cur.tipo, valor: 0 };
        acc[cur.tipo].valor += cur.valor;
        return acc;
      }, {})
  );

  return (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      
      {/* Receita x Despesa */}
      <div style={{ width: 350, height: 300 }}>
        <h4 style={{ color: "#2563eb" }}>Receitas x Despesas</h4>
        <ResponsiveContainer>
          <BarChart data={receitaDespesaData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valor" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gastos por categoria */}
      <div style={{ width: 350, height: 300 }}>
        <h4 style={{ color: "#2563eb" }}>Gastos por Categoria</h4>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={gastosPorCategoria}
              dataKey="valor"
              nameKey="name"
              outerRadius={100}
              label
            >
              {gastosPorCategoria.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
