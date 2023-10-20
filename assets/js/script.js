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
        renderGames(data);
        console.log(data);
      });
  }

// Renders games fetched as HTML, each in their own div container
// Dynamically create a div for each game that is rendered, limit n=10 at first, then scale
// Add thumnail img as background-img for card, game title as <h2>, 
function renderGames(data) {
    const gameContainer = $('#game-container');

    // counter variable for cards
    let cardCount = 1;

    // count the cards generated, add unique ID, count++
    // for loop for generating cards-- unique IDs to local storage to wishlist

    data.results.forEach(function(game) {
        const gameDiv = $('<div></div>');
        gameDiv.addClass('card');

        // Generates unique id for game div using counter variable
        const uniqueId = `card-${cardCount}`;
        gameDiv.attr('id', uniqueId);

        // Array to hold game genres--this needs some work
        // const gameGenres = [];
        // gameGenres.push(game.genres);
        // console.log(gameGenres);

        // Add wishlist button
        const wishlistButton = $('<button></button>').text('Add to Wishlist');

        gameDiv.append(
            $('<h2></h2>').text(game.name),
            $('<img>').attr('src', game.background_image),
            wishlistButton
        );

        // When you click, send to local storage, need as a data object as mitchell suggested so we can render that game in the wishlist
        wishlistButton.on('click', function() {
          localStorage.setItem(`favoritedGame_${game.name}`, JSON.stringify(game));
        })

        cardCount++;

        gameContainer.append(gameDiv);
    });
}


$(document).ready(function() {
    fetchGames();
});


// Separate function to style the cards, will update with Bulma classes, run this function..
// when gameDivs are dynamically generated
function styleCards() {
  var gameCard = $('<div></div>');
  var gameImage = $('<img>');
  var gameTitle = $('<h3></h3>');

  gameCard.addClass('card');
  gameCard.append(
    gameTitle.text(game.name),
    gameImage.attr('src', game.background_image)
  );
}

// See if we can put a simple card in local storage and render it in the wishlist
function localStorageTest() {
  var testObject = {
    name: 'John Doe',
    age: 30
  };
  var stringTestObj = JSON.stringify(testObject);
  localStorage.setItem('TestObject', stringTestObj);
}

localStorageTest();
// window.addEventListener("load", setup) 
