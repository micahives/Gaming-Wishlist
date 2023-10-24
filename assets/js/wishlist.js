// Example of how to get a test object out of local storage and display the object's name property
// Run this function to see the testObj from script.js pull from local storage and display in wishlist.html
function getTestObj() {
    var retrievedObject = JSON.parse(localStorage.getItem('TestObject'));
    var wishlistContainer = document.getElementById('wishlist-container');
    
    if (retrievedObject) {
        var objName = document.createElement('h4');
        objName.textContent = retrievedObject.name;
        wishlistContainer.appendChild(objName);
    }
}

// Get game from local storage to render on the wishlist
function getFavorites() {
    const wishlistContainer = $('#wishlist-container');
    const columnsContainer = $('<div class="columns is-multiline m-2"></div>');
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
                const gameDiv = $('<div class="card column is-3 m-2"></div>');
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
    const title = $('<p class="title is-4"></p>').text(game.name);
    
    const cardImage = $('<div class="card-image"></div>');
    const figure = $('<figure class="image is-4by3"></figure>');
    const img = $('<img>').attr('src', game.background_image);
    img.attr('alt', 'Game Image');

    const removeButton = $('<button class="button is-danger"></button>').text('Remove');

    removeButton.on('click', function(event) {
        localStorage.removeItem(`favoritedGame_${game.name}`, JSON.stringify(game));

        // event target on the button's parent to remove card HTML
        event.target.parentNode.remove();
        });

    figure.append(img);
    cardImage.append(figure);
    cardContent.append(title);
    
    gameDiv.append(cardImage, cardContent, removeButton);
  }


// When a storage event happens, runs getFavorites function
window.addEventListener('storage', getFavorites);

// When the page reloads, runs getFavorites function -- prevents games from disappearing when you refresh the page
window.onload = function () {
    getFavorites();
};


