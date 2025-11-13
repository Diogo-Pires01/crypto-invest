import "./Wallet.css";

const Wallet = () => {
  return (
    <div className="wallet-container">
      <div className="budget">
        <h1>Saldo Atual</h1>
        <h2>
          R$ 102,48
          <span className="budget-variation">+2,48%</span>
        </h2>
      </div>
      <div className="history-container">
        <h2>Histórico de investimentos</h2>
        <div className="investments-list">
          <ul className="headers">
            <li>Valor</li>
            <li>Criptomoeda</li>
            <li>Qtd. Comprada</li>
            <li>Data</li>
            <li>Variação</li>
          </ul>
          <ul>
            <li>50R$</li>
            <li>Bitcoin</li>
            <li>0,000093</li>
            <li>10/11/2025</li>
            <li>+0.15%</li>
          </ul>
          <ul>
            <li>20R$</li>
            <li>Ethereum</li>
            <li>0,0011</li>
            <li>11/11/2025</li>
            <li>+0.10%</li>
          </ul>
          <ul>
            <li>30R$</li>
            <li>Solana</li>
            <li>0,037</li>
            <li>12/11/2025</li>
            <li>-0.05%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
