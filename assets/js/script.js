// Keep track of current page of game results and total pages
// utilized when we want to 'load more games', need additional api calls
var currentPage = 1;
var totalPages = 1;


// Fetch game data from RAWG API
function fetchGames(query) {
    var apiKey = '8d8b426663c34837830e0ed619aad60e'
    var apiUrl = `https://rawg.io/api/games?token&key=${apiKey}&page_size=40&page=${currentPage}`;

    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Updates total pages
        totalPages = data.count / data.results.length;

        renderGames(data);

        // If there are more pages of game results, 'load more' button is visible
        if (currentPage < totalPages) {
          $('#load-more-button').show();
        } else {
          $('#load-more-button').hide();
        }
        console.log(data);
      });
  }

// Load more games button located beneath game container in HTML
$('#load-more-button').on('click', function() {
  currentPage++;
  fetchGames();
})

// Renders games fetched as HTML, each in their own div container
// Dynamically create a div for each game that is rendered, limit n=10 at first, then scale
function renderGames(data) {
    const gameContainer = $('#game-container');
    // counter variable for cards
    let cardCount = 1;

    // Bulma columns container class with grid layout to have multiple cards side-by-side
    const columnsContainer = $('<div class="columns is-multiline mt-4"></div>');


    // count the cards generated, add unique ID, count++
    // for loop for generating cards-- unique IDs to local storage to wishlist
    _.forEach(data.results, function(game) {
      // Add column class specification to fit up to 4 games in each 'row'
      
        const gameDiv = $('<div class= "card column is-4 is-half-tablet is-one-third-desktop is-one-quarter-widescreen m-4"></div>');

        // Generates unique id for game div using counter variable
        const uniqueId = `card-${cardCount}`;
        gameDiv.attr('id', uniqueId);

        styleGameCard(gameDiv, game);

        const wishlistButton = $('<button class="button is-primary is-centered"><p class="has-text-grey-dark">Add to Wishlist</p></button>');
       
        // When you click, send to local storage as a data object to render that game in the wishlist
        wishlistButton.on('click', function() {
          localStorage.setItem(`favoritedGame_${game.name}`, JSON.stringify(game));

          // Adds a heart icon when button is clicked
          const icon = $('<i class="material-icons">favorite</i>');
          icon.css('color', '#F14668');
          gameDiv.append(icon);

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
  const title = $('<p class="title is-4 is-size-3"></p>').text(game.name);
  
  const cardImage = $('<div class="card-image"></div>');
  const figure = $('<figure class="image is-4by3"></figure>');
  const img = $('<img>').attr('src', game.background_image);
  img.attr('alt', 'Game Image');


  const genre = $('<p class=""></p>');
  // handles the presence of multiple game genres
  if (game.genres && game.genres.length > 0) {
    // lodash _.map provides array of genre names, join turns into comma separated string
    genre.text(_.map( game.genres, 'name').join(', '));
  }
  const metacritic = $('<p class=""></p>').text('Metacritic: ' + game.metacritic);
  
  figure.append(img);
  cardImage.append(figure);
  cardContent.append(title, genre, metacritic);
  
  gameDiv.append(cardImage, cardContent);
}

$(document).ready(function() {
  fetchGames();
});



