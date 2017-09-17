const fs = require("fs");

fs.readFile("rawadjectives.es", "utf8", (err, data) => {
  if (err) throw err;
  const rawAdjList = data.split(/\r?\n/);
  const final = rawAdjList.reduce(
    (adjList, adj) => {
      const adjKey = adj.split(" ");
      if (adjKey[1] === "AQ0MS0" || adjKey[1] === "AQ0MSP") {
        // Masculino
        return Object.assign({}, adjList, {
          masculino: [...adjList.masculino, adjKey[0]]
        });
      } else if (adjKey[1] === "AQ0FS0" || adjKey[1] === "AQ0FSP") {
        // Femenino
        return Object.assign({}, adjList, {
          femenino: [...adjList.femenino, adjKey[0]]
        });
      } else if (adjKey[1] === "AQ0CS0") {
        // Neutro
        return Object.assign({}, adjList, {
          neutro: [...adjList.neutro, adjKey[0]]
        });
      }
      return adjList;
    },
    { masculino: [], femenino: [], neutro: [] }
  );
  fs.writeFile(
    "adjectives.m.json",
    JSON.stringify({ adjectives: final.masculino }, null, " "),
    err => {
      if (err) throw err;
      console.log("guargados adjetivos masculinos");
    }
  );
  fs.writeFile(
    "adjectives.f.json",
    JSON.stringify({ adjectives: final.femenino }, null, " "),
    err => {
      if (err) throw err;
      console.log("guargados adjetivos femeninos");
    }
  );
  fs.writeFile(
    "adjectives.n.json",
    JSON.stringify({ adjectives: final.neutro }, null, " "),
    err => {
      if (err) throw err;
      console.log("guargados adjetivos neutros");
    }
  );
  // fs.writeFile(
  //   "adjectives.json",
  //   JSON.stringify(
  //     { adjectives: [...final.femenino, ...final.masculino, ...final.neutro] },
  //     null,
  //     " "
  //   ),
  //   err => {
  //     if (err) throw err;
  //     console.log("guargados adjetivos neutros");
  //   }
  // );
});
