import "./Graphs.css";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Graphs({ selectedCoin }) {
  const [dados, setDados] = useState([]);
  const [coinInfo, setCoinInfo] = useState(null);
  const [allData, setAllData] = useState({});

  const coins = ["bitcoin", "ethereum", "solana", "binancecoin"];

  useEffect(() => {
    const fetchAllCoins = async () => {

      try {
        // Busca informações básicas de todas as moedas
        const infoRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=${coins.join(",")}`
        );
        const infoData = await infoRes.json();

        // Busca histórico de preços de cada moeda
        const histories = await Promise.all(
          coins.map(async (coin) => {
            const historyRes = await fetch(
              `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=brl&days=4&interval=daily`
            );
            const historyData = await historyRes.json();

            const formattedData = historyData.prices.map((item) => {
              const data = new Date(item[0]);
              const dia = data.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
              });
              return { name: dia, price: item[1] };
            });

            return { coin, history: formattedData };
          })
        );

        // Monta o objeto final para todas as moedas
        const all = {};
        histories.forEach(({ coin, history }) => {
          all[coin] = {
            info: infoData.find((c) => c.id === coin),
            history,
          };
        });

        setAllData(all);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchAllCoins();
  }, []);

  // Atualiza gráfico quando o usuário escolhe outra moeda
  useEffect(() => {
    if (allData[selectedCoin]) {
      setCoinInfo(allData[selectedCoin].info);
      setDados(allData[selectedCoin].history);
    }
  }, [selectedCoin, allData]);

  if (!coinInfo || dados.length === 0) {
    return <p>Carregando gráfico...</p>;
  }

  return (
    <div className="graph">
      <h2 className="graph-coin-name">{coinInfo.name} Last Week</h2>

      <ResponsiveContainer className="container-graph" width="90%" height={220}>
        <LineChart data={dados} className="linechart-graph">
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis
            tickMargin={24}
            width={140}
            stroke="#f3f2f2"
            domain={["auto", "auto"]}
            tickFormatter={(v) =>
              v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
            }
          />
          <Tooltip
            labelStyle={{ color: "#000" }}
            itemStyle={{ color: "#000" }}
            formatter={(v) =>
              v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
            }
          />
          <Line
            dataKey="price"
            stroke="#f1cb30"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
