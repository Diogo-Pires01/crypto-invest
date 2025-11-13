import { useState, useEffect } from "react";
import "./Home.css";
import Graphs from "../components/Graphs";

const Home = () => {
  const [dados, setDados] = useState([]);
  const [moedaSelecionada, setMoedaSelecionada] = useState("bitcoin");

  if (!moedaSelecionada || !dados) {
    return <p>Carregando...</p>
  }

  async function buscarPrecos() {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=bitcoin,ethereum,solana,binancecoin";
    const response = await fetch(url);
    const data = await response.json();
    setDados(data);
  }

  useEffect(() => {
    buscarPrecos();
    const interval = setInterval(buscarPrecos, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatar = (valor) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div className="container">
      <h1>Buy CRYPTO with BRL</h1>
      <div className="content">
        <div className="dashboard">
          <h2>Cryptos Last 24 hours</h2>

          {dados.map((coin) => {
            const variacao = coin.price_change_percentage_24h;
            const variacaoFormatada = variacao?.toFixed(2) + "%";
            const cor = variacao >= 0 ? "green" : "red";

            return (
              <ul
                key={coin.id}
                onClick={() => setMoedaSelecionada(coin.id)}
              >
                <li className="crypto-name">{coin.symbol.toUpperCase()}</li>
                <li className="crypto-value">{formatar(coin.current_price)}</li>
                <li style={{ color: cor }}>
                  {variacao > 0 ? `+${variacaoFormatada}` : variacaoFormatada}
                </li>
              </ul>
            );
          })}
        </div>
        <div className="graph-area">
          <Graphs selectedCoin={moedaSelecionada} />
        </div>
      </div>
    </div>
  );
};

export default Home;
