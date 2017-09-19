// from https://stackoverflow.com/a/39774334
function generateRandomDigits(n) {
  const add = 1;
  let max = 12 - add;

  if (n > max) {
    return generateRandomDigits(max) + generateRandomDigits(n - max);
  }

  max = Math.pow(10, n + add);
  const min = max / 10;
  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}

module.exports = { generateRandomDigits };
