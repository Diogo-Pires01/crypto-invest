import "./Deposit.css";
import { useState } from "react";

const Deposit = () => {
  const [paymentOption, setPaymentOption] = useState("");

  return (
    <div className="deposit-container">
      <div className="payment-container">
        <img src="/logo.png" />
        <div className="deposit-value">
          <h2>Valor a ser depositado: </h2>
          <input type="text" placeholder="Mínimo de 30R$" />
        </div>

        <div className="payment-forms">
          <h2>Formas de pagamento: </h2>

          <label>
            <input
              type="radio"
              name="payment-option"
              value="pix"
              checked={paymentOption === "pix"}
              onChange={(e) => setPaymentOption(e.target.value)}
            />
            Pix
          </label>

          <label>
            <input
              type="radio"
              name="payment-option"
              value="visa"
              checked={paymentOption === "visa"}
              onChange={(e) => setPaymentOption(e.target.value)}
            />
            Cartão Visa
            <p>Final 6628</p>
          </label>
        </div>
        {paymentOption === "pix" && (
          <div className="links-options">
            <button>Gerar QR Code</button>
            <a>Novo cartao</a>
          </div>
        )}
        {paymentOption === "visa" && (
          <div className="links-options">
            <button>Depositar</button>
            <a>Novo cartao</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deposit;
