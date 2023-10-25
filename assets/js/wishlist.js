// Get game from local storage to render on the wishlist
function getFavorites() {
    const wishlistContainer = $('#wishlist-container');
    const columnsContainer = $('<div class="columns is-multiline mt-4"></div>');
    // Keep track of games in wishlist so duplicates don't exist; stores unique IDs
    const renderedGames = [];
    // Same card counter as seen in script.js, will assign unique IDs as cards are generated
    let cardCount = 1;

    for (var i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('favoritedGame_')) {
            const game = JSON.parse(localStorage.getItem(key));
            const uniqueId = `card-${cardCount}`;

            cardCount++;
            // if rendered game index not found, will return '-1', will execute code if the index does exist
            if (renderedGames.indexOf(uniqueId) === -1) {
                const gameDiv = $('<div class= "card column is-4 is-half-tablet is-one-third-desktop is-one-quarter-widescreen m-4"></div>');
                gameDiv.attr('id', uniqueId);

                styleGameCard(gameDiv, game);

                columnsContainer.append(gameDiv);
                renderedGames.push(uniqueId);
            
            }
        }
    }

    wishlistContainer.html(columnsContainer);

}

// Same styling function seen in script.js for card style consistency with main page
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

    const icon = $('<i class="material-icons">favorite</i>');
    icon.css('color', '#F14668');
    gameDiv.append(icon);

    const removeButton = $('<button class="button is-danger"></button>').text('Remove');

    removeButton.on('click', function(event) {
        localStorage.removeItem(`favoritedGame_${game.name}`, JSON.stringify(game));

        // event target on the button's parent to remove card HTML
        event.target.parentNode.remove();
        });

    figure.append(img);
    cardImage.append(figure);
    cardContent.append(title, genre, metacritic);
    
    gameDiv.append(cardImage, cardContent, removeButton, icon);
  }

// When a storage event happens, runs getFavorites function
window.addEventListener('storage', getFavorites);

// When the page reloads, runs getFavorites function -- prevents games from disappearing when you refresh the page
window.onload = function () {
    getFavorites();
};


