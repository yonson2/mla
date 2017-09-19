const db = require("sqlite");
const uriGenerator = require("../../utils/uri-generator");

async function create(data) {
  console.log(data);
  const stmt = await db.prepare(
    "INSERT INTO Leagues(name, created_at, password, user_password, email) VALUES (?, ?, ?, ?, ?)"
  );
  const result = await stmt.run(
    data.name,
    data.created_at,
    data.password,
    data.user_password,
    data.email
  );
  await result.finalize();
  console.log(result);
  const bogusName = await db.get(
    `SELECT * FROM Leagues WHERE id = ${result.lastID}`
  );
  console.log(bogusName);
  return result;
}

async function generateUniqueName() {
  const name = uriGenerator();
  const result = await db.get("SELECT * FROM Leagues WHERE name = ?", name);
  return !result ? name : generateUniqueName();
}

module.exports = { create, generateUniqueName };
