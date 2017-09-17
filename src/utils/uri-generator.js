const { generateCombination } = require("gfycat-style-urls");

function generate(locale) {
  // different order and rules for different languages.
  if (locale === "ES") return generateES();
  //default to english
  return generateCombination(2, "");
}

function generateES() {
  const mAdjectives = require("../assets/es/adjectives.m.json").adjectives;
  const fAdjectives = require("../assets/es/adjectives.f.json").adjectives;
  const mAnimals = require("../assets/es/animals.m.json").animals;
  const fAnimals = require("../assets/es/animals.f.json").animals;
  const nAdjectives = require("../assets/es/adjectives.n.json").adjectives;

  const possibilities = {
    m: {
      adjectives: [...mAdjectives, nAdjectives],
      animals: [...mAnimals]
    },
    f: {
      adjectives: [...fAdjectives, nAdjectives],
      animals: [...fAnimals]
    }
  };
  const genders = ["m", "f"];
  const choice = genders[Math.floor(Math.random() * genders.length)];

  const adjective1 = capitalize(
    possibilities[choice].adjectives[
      Math.floor(Math.random() * possibilities[choice].adjectives.length)
    ]
  );

  const adjective2 = capitalize(
    possibilities[choice].adjectives[
      Math.floor(Math.random() * possibilities[choice].adjectives.length)
    ]
  );
  const animal =
    possibilities[choice].animals[
      Math.floor(Math.random() * possibilities[choice].animals.length)
    ];
  const uri = `${adjective1}y${adjective2}${animal}`;
  return uri;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = generate;
