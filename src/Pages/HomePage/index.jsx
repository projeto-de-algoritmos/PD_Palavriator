import React from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import allConstruct from "../../algorithm";

import { words, pieces } from "../../mocks";

function randomizeWords(words, pieces) {
  let drawnWord = words[Math.floor(Math.random() * words.length)];

  let selectedPieces = pieces.slice(0, 8);

  return { word: drawnWord, pieces: selectedPieces };
}

function HomePage() {
  const [guess, setGuess] = React.useState();
  const [drawns, setDrawns] = React.useState(
    randomizeWords(
      words,
      pieces.sort(() => 0.5 - Math.random())
    )
  );

  const [modal, setModal] = React.useState({
    show: false,
  });

  console.log("DRAWNS", drawns);

  const [counter, setCounter] = React.useState(20);
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter <= 0 && !modal.show) {
      setModal({ show: true, message: "TEMPO ESGOTADO" });
    }
    return () => clearInterval(timer);
  }, [counter]);

  function handleClose() {
    setModal({ show: false });
  }

  function restart() {
    setCounter(20);
    setDrawns(
      randomizeWords(
        words,
        pieces.sort(() => 0.5 - Math.random())
      )
    );
    setModal({
      show: false,
    });
  }

  console.log("CONSTRUCTIONS", modal.constructions);

  function handleSubmit() {
    if (
      //casos de erro aqui
      false
    ) {
      setModal({
        show: true,
        message: "",
      });
    } else {
      let constructions = allConstruct(drawns.word, drawns.pieces);

      if (guess == constructions.length) {
        setModal({
          show: true,
          message: "PARABAINS",
        });
      } else {
        setModal({
          show: true,
          message: "Tá errado",
          constructions: constructions,
        });
      }
    }
  }

  const handleChangeGuess = (event) => {
    setGuess(event.target.value);
  };

  return (
    <div className="HomePage">
      <h3 className="question">
        De quantas formas a palavra pode ser formada <br />
        utilizando os trechos mostrados? <br />
        <br />
      </h3>
      <div className="word"> Palavra: {drawns.word} </div>
      <div className="piecesArea">
        {drawns.pieces.map((piece) => {
          return (
            <div className="piece">
              {piece} <br></br>
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <div>
        <label className="label">
          É possível formar a palavra de <nbsp />
          <input
            className="textField"
            type="number"
            value={guess}
            step="1"
            onChange={handleChangeGuess}
          />
          <nbsp /> formas diferentes
          <br />
        </label>
        <button className="calculateButton" onClick={handleSubmit}>
          {" "}
          Responder
        </button>
        <br />
        {counter} Segundos restantes
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
          <h1 className="modalMessage">{modal.message}</h1>
          {modal.constructions ? <>Possibilidades:</> : <></>}
          {modal.constructions?.map((construction) => {
            return (
              <div className="construction">
                {construction.map((piece) => {
                  return <div className="constructionPiece">{piece} </div>;
                })}{" "}
              </div>
            );
          })}
          <button className="calculateButton" onClick={restart}>
            {" "}
            Reiniciar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default HomePage;
