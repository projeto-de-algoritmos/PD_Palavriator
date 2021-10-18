function allConstruct(word, pieces, memo = {}) {
  // uamos o memo pra não chamar a função recursivamente pra uma palavra já buscada
  if (word in memo) return memo[word];
  if (word === "") return [[]];

  const result = [];

  for (let piece of pieces) {
    // se o pedaço for um prefixo da palavra
    if (word.indexOf(piece) === 0) {
      const suffix = word.slice(piece.length);
      const suffixWays = allConstruct(suffix, pieces, memo);
      const targetWays = suffixWays.map((way) => [piece, ...way]);
      result.push(...targetWays);
      // chama recursivamente usando só o restante da palavra
    }
  }
  memo[word] = result;
  return result;
}

console.log(
  allConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])
);

export default allConstruct;
