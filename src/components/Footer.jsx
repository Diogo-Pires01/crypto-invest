import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="imagens">
          <label htmlFor="">
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" />
            React
          </label>
          <label htmlFor="">
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" />
            CSS
          </label>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
