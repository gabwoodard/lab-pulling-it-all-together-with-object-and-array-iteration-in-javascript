/* eslint-env node */

// ---------- Data ----------
function gameObject() {
  return {
    home: {
      teamName: 'Brooklyn Nets',
      colors: ['Black', 'White'],
      players: {
        'Alan Anderson': { number: 0, shoe: 16, points: 22, rebounds: 12, assists: 12, steals: 3, blocks: 1, slamDunks: 1 },
        'Reggie Evans':  { number: 30, shoe: 14, points: 12, rebounds: 12, assists: 12, steals: 12, blocks: 12, slamDunks: 7 },
        'Brook Lopez':   { number: 11, shoe: 17, points: 17, rebounds: 19, assists: 10, steals: 3, blocks: 1, slamDunks: 15 },
        'Mason Plumlee': { number: 1,  shoe: 19, points: 26, rebounds: 12, assists: 6,  steals: 3, blocks: 8,  slamDunks: 5 },
        'Jason Terry':   { number: 31, shoe: 15, points: 19, rebounds: 2,  assists: 2,  steals: 4, blocks: 11, slamDunks: 1 }
      }
    },
    away: {
      teamName: 'Charlotte Hornets',
      colors: ['Turquoise', 'Purple'],
      players: {
        'Jeff Adrien':      { number: 4,  shoe: 18, points: 10, rebounds: 1,  assists: 1,  steals: 2,  blocks: 7,  slamDunks: 2 },
        'Bismak Biyombo':   { number: 0,  shoe: 16, points: 12, rebounds: 4,  assists: 7,  steals: 7,  blocks: 15, slamDunks: 10 },
        'DeSagna Diop':     { number: 2,  shoe: 14, points: 24, rebounds: 12, assists: 12, steals: 4,  blocks: 5,  slamDunks: 5 },
        'Ben Gordon':       { number: 8,  shoe: 15, points: 33, rebounds: 3,  assists: 2,  steals: 1,  blocks: 1,  slamDunks: 0 },
        'Brendan Haywood':  { number: 33, shoe: 15, points: 6,  rebounds: 12, assists: 12, steals: 22, blocks: 5,  slamDunks: 12 }
      }
    }
  };
}

// ---------- helpers ----------
function values(obj) {
  return Object.keys(obj).map(function (k) { return obj[k]; });
}

function allTeams() {
  var g = gameObject();
  return [g.home, g.away];
}

function allPlayersObj() {
  var g = gameObject();

  // Merge without object spread (works on older parsers)
  var merged = {};
  var h = g.home.players;
  var a = g.away.players;
  var k;

  for (k in h) if (Object.prototype.hasOwnProperty.call(h, k)) merged[k] = h[k];
  for (k in a) if (Object.prototype.hasOwnProperty.call(a, k)) merged[k] = a[k];

  return merged;
}

// ---------- 3.1 Retrieve Player Information ----------
function numPointsScored(playerName) {
  var p = allPlayersObj()[playerName];
  return p ? p.points : undefined;
}

function shoeSize(playerName) {
  var p = allPlayersObj()[playerName];
  return p ? p.shoe : undefined;
}

// ---------- 3.2 Retrieve Team Information ----------
function teamColors(teamName) {
  var teams = allTeams();
  for (var i = 0; i < teams.length; i++) {
    if (teams[i].teamName === teamName) return teams[i].colors;
  }
  return undefined;
}

function teamNames() {
  return allTeams().map(function (t) { return t.teamName; });
}

// ---------- 3.3 Player Numbers and Stats ----------
function playerNumbers(teamName) {
  var team = null;
  var teams = allTeams();
  for (var i = 0; i < teams.length; i++) {
    if (teams[i].teamName === teamName) { team = teams[i]; break; }
  }
  if (!team) return [];
  return values(team.players).map(function (p) { return p.number; });
}

function playerStats(playerName) {
  var stats = allPlayersObj()[playerName];
  return stats ? Object.assign({}, stats) : undefined; // clone
}

// ---------- 3.4 Advanced Challenge ----------
function bigShoeRebounds() {
  var players = values(allPlayersObj());
  var maxShoe = -Infinity;
  var rebounds = 0;
  for (var i = 0; i < players.length; i++) {
    if (players[i].shoe > maxShoe) {
      maxShoe = players[i].shoe;
      rebounds = players[i].rebounds;
    }
  }
  return rebounds;
}

// ---------- Bonus ----------
function mostPointsScored() {
  var players = allPlayersObj();
  var names = Object.keys(players);
  var topName = null;
  var maxPts = -Infinity;
  for (var i = 0; i < names.length; i++) {
    var n = names[i];
    if (players[n].points > maxPts) {
      maxPts = players[n].points;
      topName = n;
    }
  }
  return topName;
}

function winningTeam() {
  var t = allTeams();
  var home = t[0], away = t[1];

  function sumPoints(team) {
    return values(team.players).reduce(function (sum, p) { return sum + p.points; }, 0);
  }

  var homePts = sumPoints(home);
  var awayPts = sumPoints(away);
  if (homePts === awayPts) return 'Tie';
  return homePts > awayPts ? home.teamName : away.teamName;
}

function playerWithLongestName() {
  var names = Object.keys(allPlayersObj());
  var longest = '';
  for (var i = 0; i < names.length; i++) {
    if (names[i].length > longest.length) longest = names[i];
  }
  return longest;
}

// ---------- Super Bonus ----------
function doesLongNameStealATon() {
  var players = allPlayersObj();
  var longest = playerWithLongestName();
  var longestSteals = players[longest].steals;

  var names = Object.keys(players);
  var maxSteals = -Infinity;
  for (var i = 0; i < names.length; i++) {
    if (players[names[i]].steals > maxSteals) {
      maxSteals = players[names[i]].steals;
    }
  }
  return longestSteals === maxSteals; // true if tied or outright most
}

// ---------- exports ----------
module.exports = {
  gameObject,
  numPointsScored,
  shoeSize,
  teamColors,
  teamNames,
  playerNumbers,
  playerStats,
  bigShoeRebounds,
  mostPointsScored,
  winningTeam,
  playerWithLongestName,
  doesLongNameStealATon,
};
