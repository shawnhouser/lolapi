module.exports = {
  defaultRegion: 'euw',
  defaultLimitPer10s: 10,
  defaultLimitPer10min: 500,
  defaultTTL: 3600,
  endpoint: 'api.pvp.net/api/lol',
  platforms: {
    br: {
      id: 'BR1',
      host: 'br.api.pvp.net'
    },
    eune: {
      id: 'EUN1',
      host: 'eune.api.pvp.net'
    },
    euw: {
      id: 'EUW1',
      host: 'euw.api.pvp.net'
    },
    kr: {
      id: 'KR',
      host: 'kr.api.pvp.net'
    },
    lan: {
      id: 'LA1',
      host: 'lan.api.pvp.net'
    },
    las: {
      id: 'LA2',
      host: 'las.api.pvp.net'
    },
    na: {
      id: 'NA1',
      host: 'na.api.pvp.net'
    },
    oce: {
      id: 'OC1',
      host: 'oce.api.pvp.net'
    },
    tr: {
      id: 'TR1',
      host: 'tr.api.pvp.net'
    },
    ru: {
      id: 'RU',
      host: 'ru.api.pvp.net'
    },
    pbe: {
      id: 'PBE1',
      host: 'pbe.api.pvp.net'
    }
  },
  uri: {
    // API Challenge - apiChallenge.js
    API_CHALLENGE: '/{string:region}/v4.1/game/ids',
    // Champion - champion.js
    CHAMPION_LIST: '/{string:region}/v1.2/champion',
    CHAMPION_ID: '/{string:region}/v1.2/champion/{int:championId}',
    // Champion mastery - championMastery.js
    CHAMPIONMASTERY_SCORE: '/championmastery/location/{string:platformId}/player/{int:summonerId}/score',
    CHAMPIONMASTERY_CHAMPION: '/championmastery/location/{string:platformId}/player/{int:summonerId}/champion/{int:championId}',
    CHAMPIONMASTERY_ALL: '/championmastery/location/{string:platformId}/player/{int:summonerId}/champions',
    CHAMPIONMASTERY_TOP: '/championmastery/location/{string:platformId}/player/{int:summonerId}/topchampions',
    // Current Game - currentGame.js
    CURRENT_GAME: '/observer-mode/rest/consumer/getSpectatorGameInfo/{string:platformId}/{int:summonerId}',
    // Feature Games - featuredGames.js
    FEATURED_GAMES: '/observer-mode/rest/featured',
    // Game - game.js
    RECENT_GAMES: '/{string:region}/v1.3/game/by-summoner/{int:summonerId}/recent',
    // League - league.js
    LEAGUE_BY_SUMMONER_FULL: '/{string:region}/v2.5/league/by-summoner/{int:summonerId}',
    LEAGUE_BY_SUMMONER: '/{string:region}/v2.5/league/by-summoner/{int:summonerId}/entry',
    LEAGUE_BY_TEAM_FULL: '/{string:region}/v2.5/league/by-team/{int:teamId}',
    LEAGUE_BY_TEAM: '/{string:region}/v2.5/league/by-team/{int:teamId}/entry',
    CHALLENGER_LEAGUE: '/{string:region}/v2.5/league/challenger',
    // Match - match.js
    MATCH: '/{string:region}/v2.2/match/{int:matchId}',
    // Match history - matchList.js
    MATCH_HISTORY: '/{string:region}/v2.2/matchlist/by-summoner/{int:summonerId}',
    // Stats - stats.js
    RANKED_STATS: '/{string:region}/v1.3/stats/by-summoner/{int:summonerId}/ranked',
    STAT_SUMMARY: '/{string:region}/v1.3/stats/by-summoner/{int:summonerId}/summary',
    // Summoner - summoner.js
    SUMMONER_BY_NAME: '/{string:region}/v1.4/summoner/by-name/{string:summonerNames}',
    SUMMONER_ID: '/{string:region}/v1.4/summoner/{int:summonerId}',
    SUMMONER_NAME: '/{string:region}/v1.4/summoner/{int:summonerId}/name',
    SUMMONER_RUNES: '/{string:region}/v1.4/summoner/{int:summonerId}/runes',
    SUMMONER_MASTERIES: '/{string:region}/v1.4/summoner/{int:summonerId}/masteries',
    // Static - static.js
    STATIC_CHAMPION: '/static-data/{string:region}/v1.2/champion',
    STATIC_CHAMPION_ID: '/static-data/{string:region}/v1.2/champion/{int:championId}',
    STATIC_ITEM: '/static-data/{string:region}/v1.2/item',
    STATIC_ITEM_ID: '/static-data/{string:region}/v1.2/item/{int:itemId}',
    STATIC_MASTERY: '/static-data/{string:region}/v1.2/mastery',
    STATIC_MASTERY_ID: '/static-data/{string:region}/v1.2/mastery/{int:masteryId}',
    STATIC_REALM: '/static-data/{string:region}/v1.2/realm',
    STATIC_VERSIONS: '/static-data/{string:region}/v1.2/versions',
    STATIC_RUNE: '/static-data/{string:region}/v1.2/rune',
    STATIC_RUNE_ID: '/static-data/{string:region}/v1.2/rune/{int:runeId}',
    STATIC_SUMMONER_SPELL: '/static-data/{string:region}/v1.2/summoner-spell',
    STATIC_SUMMONER_SPELL_ID: '/static-data/{string:region}/v1.2/summoner-spell/{int:summonerSpellId}',
    // Status - status.js
    STATUS_SHARD_LIST: '/shards',
    STATUS_SHARD_ID: '/shards/{string:shardName}',
    // Team - team.js
    TEAM_BY_SUMMONER: '/{string:region}/v2.4/team/by-summoner/{int:summonerId}',
    TEAM_ID: '/{string:region}/v2.4/team/{string:teamId}'
  }
}