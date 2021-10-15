export default function trocador(valorTotal, valorPago, picks) {
  let troco = ((valorPago - valorTotal) * 100).toFixed(2);

  let pickValues = [];

  for (let pick in picks) {
    if (picks[pick]) {
      pickValues.push(values[pick]);
    }
  }

  let qtd = {};

  for (let i = pickValues.length - 1; i >= 0; i--) {
    while (troco >= pickValues[i]) {
      troco -= pickValues[i];

      qtd[pickValues[i]] === undefined
        ? (qtd[pickValues[i]] = 1)
        : (qtd[pickValues[i]] += 1);
    }
  }

  qtd["restante"] = troco;

  return qtd;
}

const values = {
  moeda1: 1,
  moeda5: 5,
  moeda10: 10,
  moeda25: 25,
  moeda50: 50,
  moeda100: 100,
  nota2: 200,
  nota5: 500,
  nota10: 1000,
  nota20: 2000,
  nota50: 5000,
  nota100: 10000,
};
