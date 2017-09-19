const leagueService = require("./league.service");
const numbers = require("../../utils/numbers");
const config = require("../../config");

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

async function parseRawLeague(payload) {
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
  const leagueInfo = {
    name: await leagueService.generateUniqueName(),
    email: `${payload.email ? payload.email : null}`,
    password: `${payload.password}`,
    user_password: numbers.generateRandomDigits(config.user.passwordStrength),
    created_at: Math.round(new Date().getTime() / 1000), // Unix Timestamp
    users
  };
  return leagueInfo;
}

module.exports = async ctx => {
  // ctx.request.body
  try {
    // Check if data is good
    isGoodLeagueInfo(ctx.request.body);
    const leagueData = await parseRawLeague(ctx.request.body);

    // Insert into database
    await leagueService.create(leagueData);
    delete leagueData.password;

    // Return data
    ctx.body = leagueData;
  } catch (err) {
    console.error(JSON.stringify(err, null, " "));
    console.error(err.message);
    ctx.status = 400;
    ctx.body = err.message;
  }
};
