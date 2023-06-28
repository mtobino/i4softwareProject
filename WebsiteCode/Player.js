class Player {
  constructor(jsonData) {
    this.id = jsonData.id;
    this.name = jsonData.player_name;
    this.age = jsonData.age;
    this.games = jsonData.games;
    this.gamesStarted = jsonData.games_started;
    this.minutesPlayed = jsonData.minutes_played;
    this.fieldGoals = jsonData.field_goals;
    this.fieldAttempts = jsonData.field_attempts;
    this.threeFG = jsonData.three_fg;
    this.threeAttempts = jsonData.three_attempts;
    this.threePercent = jsonData.three_percent;
    this.twoFG = jsonData.two_fg;
    this.twoAttempts = jsonData.two_attempts;
    this.twoPercent = jsonData.two_percent;
    this.effectFGPercent = jsonData.effect_fg_percent;
    this.freeThrow = jsonData.ft;
    this.freeThrowAttempts = jsonData.fta;
    this.freeThrowPercent = jsonData.ft_percent;
    this.offensiveRebound = jsonData.ORB;
    this.defensiveRebound = jsonData.DRB;
    this.totalRebound = jsonData.TRB;
    this.assists = jsonData.AST;
    this.steals = jsonData.AST;
    this.blocks = jsonData.BLK;
    this.turnovers = jsonData.TOV;
    this.personalFouls = jsonData.PF;
    this.points = jsonData.PTS;
    this.team = jsonData.team;
    this.season - jsonData.season;
  }
}

export default Player;
