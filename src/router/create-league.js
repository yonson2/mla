const uriGenerator = require("../utils/uri-generator");

function maybeThrowBadPassword(str = "") {
  if (str.length < 6) {
    // too short
    throw new Error("Password must contain at least 6 characters");
  } else if (str.length > 100) {
    // too long
    throw new Error("Password must not contain more than 100 characters");
  }
}

function maybeThrowBadUsers(serializedUsers) {
  const users = JSON.parse(serializedUsers).users;
  if (users.length && users.length <= 0)
    throw new Error("users can't be empty");
  for (const user of users) {
    if (!user.name || !user.dci) throw new Error("Name and DCI are required");
  }
}

function isGoodLeagueInfo(payload) {
  maybeThrowBadPassword(payload.password);
  maybeThrowBadUsers(payload.users);
  return true;
}

function parseRawLeague(payload) {
  const users = JSON.parse(payload.users).users.map(user => ({
    name: user.name,
    dci: user.dci,
    stats: {
      points: 0,
      ranking: 1,
      played_matches: {
        wins: [],
        losses: [],
        ties: []
      }
    }
  }));
  const result = {
    name: uriGenerator(),
    created_at: Math.round(new Date().getTime() / 1000), // Unix Timestamp
    users
  };
  // TODO: INSERT INTO DATABASE
  return result;
}

module.exports = ctx => {
  // ctx.request.body
  try {
    isGoodLeagueInfo(ctx.request.body);
    ctx.body = parseRawLeague(ctx.request.body);
  } catch (err) {
    ctx.status = 400;
    ctx.body = err.message;
  }
};
