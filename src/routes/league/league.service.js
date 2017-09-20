const db = require("../../db");
const _ = require("lodash");
const uriGenerator = require("../../utils/uri-generator");
const userService = require("./user.service");

const TABLE_NAME = "Leagues";

async function create(data) {
  const result = await db(TABLE_NAME).insert(_.omit(data, ["users"]));
  const userPromises = data.users.map(user =>
    userService.create({
      name: user.name,
      dci: user.dci,
      league: result[0]
    })
  );
  await Promise.all(userPromises);
  return result;
}

function getByName(name = "") {
  return db(TABLE_NAME)
    .where({ name })
    .select();
}

async function generateUniqueName() {
  const name = uriGenerator();
  const result = await db(TABLE_NAME)
    .where({ name })
    .select("name");
  return result.length === 0 ? name : generateUniqueName();
}

module.exports = { create, generateUniqueName, getByName };
