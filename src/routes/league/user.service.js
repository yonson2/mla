const db = require("../../db");

const TABLE_NAME = "Users";

async function create(data) {
  const result = await db(TABLE_NAME).insert(data);
  return result;
}

module.exports = { create };
