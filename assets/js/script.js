// Fetch game data from RAWG API
function fetchGames(query) {
    var apiKey = '8d8b426663c34837830e0ed619aad60e'
    var apiUrl = `https://rawg.io/api/games?token&key=${apiKey}`;
    // Parameters for api, number of results--Need to integrate into the fetch function
    const params = {
        key: apiKey,
        page_size: 10,
    };
  
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }

// Renders games fetched as HTML, each in their own div container
// Dynamically create a div for each game that is rendered, limit n=10 at first, then scale
// Add thumnail img as background-img for card, game title as <h2>, 
function renderGames(data) {
    const gameContainer = $('#game-container');

    // count the cards generated, add unique ID, count++
    // for loop for generating cards-- unique IDs to local storage to wishlist

    // data.results.forEach((game) {}
    const gameDiv = $('<div></div>');
    gameDiv.addClass('game-card');

    gameDiv.append(
        $('<h2></h2>').text(game.name)
    )

    gameContainer.append(gameDiv);
}

fetchGames();