import Player from "./Player.js";
var main = document.querySelector(".maincontent");
var playerDoc = document.createElement("article");

function playerDisplayHTML(player) {
  playerDoc.classList.add("player");
  playerDoc.setAttribute("id", player.id);
  playerDoc.innerHTML = `
  <h1 class="playerName">${player.name}</h1>
  <ul class="player__stats">
    <li class="stat playerAge">Age: ${player.age} </li>
    <li class="stat playerTeam">Team: ${player.team}</li>
    <li class="playerGameStatsOverall"> 
      <h2>Overall Season Game Stats</h2>
      <ul>
        <li class="stat playerGames">Games: ${player.games} </li>
        <li class="stat playerGamesStarted">Games Started: ${
          player.gamesStarted
        } </li>
        <li class="stat playerMinutesPlayed">Minutes Played: ${
          player.minutesPlayed
        } </li>
        <li class="stat playerPoints">Points: ${player.points}</li>
        <li class="stat playerAssists">Assists: ${player.assists}</li>
        <li class="stat playerSteals">Steals: ${player.steals}</li>
        <li class="stat playerBlocks">Blocks: ${player.blocks}</li>
        <li class="stat playerTurnovers">Turnovers: ${player.turnovers}</li>
        <li class="stat playerPF">Personal Fouls: ${player.personalFouls}</li>
      </ul>
    </li>
    
    <li class="stat playerFieldGoalStats">
      <h2>Field Goal Stats</h2>
      <ul>
        <li class="stat playerFieldGoals">Field Goals: ${
          player.fieldGoals
        } </li>
        <li class="stat playerFieldAttempts">Field Goal Attempts: ${
          player.fieldAttempts
        } </li>
        <li class="stat playerThreeFG">Three Point Field Goals: ${
          player.threeFG
        } </li>
        <li class="stat playerThreeAttempts">Three Point Field Goal Attempts: ${
          player.threeAttempts
        } </li>
        <li class="stat playerThreePercent">Three Point Field Goal Percent: ${
          Math.round(player.threePercent * 1000) / 10
        }% </li>
        <li class="stat playerTwoFG">Two Point Field Goals: ${
          player.twoFG
        } </li>
        <li class="stat playerTwoAttempts">Two Point Field Goal Attempts: ${
          player.twoAttempts
        } </li>
        <li class="stat playerTwoPercent">Two Point Field Goal Percent: ${
          Math.round(player.twoPercent * 1000) / 10
        }% </li>
        <li class="stat playerEffectFGPercent">Effective Field Goal Percent: ${
          Math.round(player.effectFGPercent * 1000) / 10
        }% </li>    
      </ul>
    </li>
    <li class="stat playerFreeThrowStats"> 
      <h2>Free Throw Stats</h2>
      <ul>
      <li class="stat playerFreeThrowMade">Free Throws: ${
        player.freeThrow
      } </li>
      <li class="stat playerFreeThrowAttempts">Free Throw Attempts: ${
        player.freeThrowAttempts
      } </li>
      <li class="stat playerFreeThrowPercent">Free Throw Percent: ${
        Math.round(player.freeThrowPercent * 1000) / 10
      }% </li>
      </ul>
    </li>
    <li class="stat playerReboundStats">
      <h2>Rebound Stats</h2>
      <ul>
      <li class="stat playerOffensiveRebound">Offensive Rebounds: ${
        player.offensiveRebound
      } </li>
      <li class="stat playerDefensiveRebound">Defensive Rebounds: ${
        player.defensiveRebound
      } </li>
      <li class="stat playerTotalRebound">Total Rebounds: ${
        player.totalRebound
      } </li>     
      </ul>
    </li>
  </ul>
  `;
}
const searchBar = document.querySelector(".searchBar");
console.log(searchBar);

// Set the fetch to a GET
const requestOptions = {
  method: "GET",
  redirect: "follow",
};
// Create a new form element
const searchForm = document.createElement("form");
searchForm.classList.add(`search`);

// Populate form with an input and a button
searchForm.innerHTML = `
  <input type="text" class="PlayerName" placeholder="Enter Player Name"/>
  <input type ="number" class="PlayerSeason" placeholder="Enter Player's Season"/>
  <button>Search</button>
`;

// Add event listener to the form submit action
searchForm.addEventListener("submit", (e) => {
  // Stop form from reloading the page
  e.preventDefault();

  // get new name to search for
  let newName = searchForm.querySelector(".PlayerName").value.trim();

  //get the season of the player
  let newSeason = searchForm.querySelector(".PlayerSeason").value;

  // The new player
  let player;
  /**
   * API recommended method of getting
   */
  // GET the info
  fetch(
    "https://nba-stats-db.herokuapp.com/api/playerdata/name/" + newName,
    requestOptions
  )
    // if gotten, parse into text
    .then((response) => response.text())
    // spit out result
    .then((result) => {
      let playerInfo = JSON.parse(result);

      // are there any results
      if (playerInfo.count === 0) {
        playerDoc.innerText = "Could not find a player named: " + newName;
        return;
      }

      // is the season a valid season of the year
      let testDate = new Date();
      let testYear = testDate.getFullYear(testDate);
      if (newSeason > testYear || newSeason < 2010) {
        playerDoc.innerText =
          "Please search for a season between the current year and 2010\n" +
          "The season you tried searching for was: " +
          newSeason;
        return;
      }

      // search for that season
      let index = 0;
      let found = false;
      let seasonIndex = 0;
      let endOfResults = playerInfo.results.length;
      while (index < endOfResults && !found) {
        let currentSeason = playerInfo.results[index].season;
        if (currentSeason == newSeason) {
          found = true;
          seasonIndex = index;
        }
        index++;
      }
      // if season could not be found
      if (!found) {
        playerDoc.innerText =
          "Player: " + newName + " did not play in: " + newSeason;
        return;
      }

      // create a player who has the name and season year provided
      player = new Player(playerInfo.results[seasonIndex]);
      console.log(player);
      console.log(playerInfo.results[seasonIndex]);
      playerDisplayHTML(player);
    })
    //if not gotten, print error
    .catch((error) => {
      playerDoc.innerText = "Error: website connection failed";
      console.log("error", error);
    });
});

main.append(searchForm);
main.append(playerDoc);
