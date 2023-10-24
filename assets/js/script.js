// Array to store favorited games
const favGames = [];

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
function renderGames(data) {
    const gameContainer = $('#game-container');
    // counter variable for cards
    let cardCount = 1;

    // Bulma columns container class with grid layout to have multiple cards side-by-side
    const columnsContainer = $('<div class="columns is-multiline m-2"></div>');


    // count the cards generated, add unique ID, count++
    // for loop for generating cards-- unique IDs to local storage to wishlist
    data.results.forEach(function(game) {
      // Add column class specification to fit up to 4 games in each 'row'
      
        const gameDiv = $('<div class="card column is-3 m-2"></div>');


        // Generates unique id for game div using counter variable
        const uniqueId = `card-${cardCount}`;
        gameDiv.attr('id', uniqueId);

        styleGameCard(gameDiv, game);

        const wishlistButton = $( '<button class="button is-primary is-small is-centered"> </button>').text('Add to Wishlist');
       
        // When you click, send to local storage as a data object to render that game in the wishlist
        wishlistButton.on('click', function() {

          localStorage.setItem(`favoritedGame_${game.name}`, JSON.stringify(game)); alert("This Game has been added to your Wishlist!");

          // When wishlist button is clicked, create game object and push to favGames array
          var gameObj = {
            title: game.name,
            image: game.background_image,
          };
          favGames.push(gameObj);
        });

        gameDiv.append(wishlistButton);
        columnsContainer.append(gameDiv)

        cardCount++;

        gameContainer.append(columnsContainer);
    });
}

// Separate function to style the cards with Bulma classes, run this function..
// when gameDivs are generated
function styleGameCard(gameDiv, game) {

  const cardContent = $('<div class="card-content"></div>');
  const title = $('<p class="title is-4 is centered"></p>').text(game.name);
  
  const cardImage = $('<div class="card-image"></div>');
  const figure = $('<figure class="image is-4by3"></figure>');
  const img = $('<img>').attr('src', game.background_image);
  img.attr('alt', 'Game Image');
  
  figure.append(img);
  cardImage.append(figure);
  cardContent.append(title);
  
  gameDiv.append(cardImage, cardContent);
}

// TEST: See if we can put a simple card in local storage and render it in the wishlist
function localStorageTest() {
  var testObject = {
    name: 'John Doe',
    age: 30
  };
  var stringTestObj = JSON.stringify(testObject);
  localStorage.setItem('TestObject', stringTestObj);
}

localStorageTest();

$(document).ready(function() {
  fetchGames();
});



