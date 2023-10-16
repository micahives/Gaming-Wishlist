// Fetch game data from RAWG API
function fetchGames(query) {
    var apiKey = '8d8b426663c34837830e0ed619aad60e'
    var apiUrl = `https://rawg.io/api/games?token&key=${apiKey}`;
  
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
  
