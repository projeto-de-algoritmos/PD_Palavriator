import React from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Checkbox from "@material-ui/core/Checkbox";

const names = {
  moeda1: "Moeda de 1c",
  moeda5: "Moeda de 5c",
  moeda10: "Moeda de 10c",
  moeda25: "Moeda de 25c",
  moeda50: "Moeda de 50c",
  moeda100: "Moeda de 1r",
  nota2: "Nota de 2",
  nota5: "Nota de 5",
  nota10: "Nota de 10",
  nota20: "Nota de 20",
  nota50: "Nota de 50",
  nota100: "Nota de 100",
};

function HomePage() {
  const [total, setTotal] = React.useState();
  const [pago, setPago] = React.useState();
  const [picks, setPicks] = React.useState({
    moeda1: true,
    moeda5: true,
    moeda10: true,
    moeda25: true,
    moeda50: true,
    moeda100: true,
    nota2: true,
    nota5: true,
    nota10: true,
    nota20: true,
    nota50: true,
    nota100: true,
  });

  const [modal, setModal] = React.useState({
    show: false,
  });
  const history = useHistory();

    const [counter, setCounter] = React.useState(60);
      React.useEffect(() => {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }, [counter]);


  function handleClose() {
    setModal({ show: false });
  }

  function handleSubmit() {
    if (
      parseFloat(total) <= 0.0 ||
      parseFloat(pago) <= 0.0 ||
      parseFloat(pago) < parseFloat(total)
    ) {
      setModal({
        show: true,
      });
    } else {
      history.push({
        pathname: "/trocado",
        state: {
          total: total,
          pago: pago,
          picks: picks,
        },
      });
    }
  }

  const handleChangeTotal = (event) => {
    setTotal(event.target.value);
  };

  const handleChangePago = (event) => {
    setPago(event.target.value);
  };

  const handleCoinChange = (event) => {
    let newPicks = picks;
    newPicks[event.target.name] = event.target.checked;

    setPicks(newPicks);
  };



  return (
    <div className="HomePage">
      <h3 className="question">
        {" "}
        De quantas formas a palavra pode ser formada <br />
        utilizando os trechos mostrados? <br /><br /><br />
        Timer: {counter}
      </h3>
      <br />
      <br />
      <br />

      <div>
        <label className="label">
          É possível formar a palavra de <nbsp />
          <input
            className="textField"
            type="number"
            value={total}
            step="1"
            onChange={handleChangeTotal}
          />
          <nbsp /> formas diferentes
          <br />
          <br />
    
          <div className="pickArea">
            {Object.entries(picks).map((key, value) => {
              return (
                <div key={key[0]} className="checkDiv">
                  {names[key[0]]}{" "}
                  <Checkbox
                    className="checkbox"
                    type="checkbox"
                    value={picks[key[0]]}
                    name={key[0]}
                    onChange={handleCoinChange}
                    defaultChecked={true}
                  />
                </div>
              );
            })}
          </div>
          <br />
        </label>
        <button className="calculateButton" onClick={handleSubmit}>
          {" "}
          Responder
        </button>
      </div>

      <Modal
        open={modal.show}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modaldiv">
          <h1>O valor pago precisa ser maior que o valor total</h1>

          <button className="calculateButton" onClick={handleClose}>
            {" "}
            Voltar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default HomePage;
