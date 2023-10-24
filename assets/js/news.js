// const apiNewsurl = 'https://video-games-trailers.p.rapidapi.com/?limit=10&skip=0';
// const apiNewsKey = '5b0a5c218cmsh7f1ad021bd8363ap1f2a11jsneab674e2f080';

// const settings = {
//   async: true,
//   crossDomain: true,
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Host': 'video-games-trailers.p.rapidapi.com',
//     'X-RapidAPI-Key': apiNewsKey, // Use the correct key here
//   },
// };

// $.ajax(settings)
//   .done(function (response) {
//     console.log(response);
//     // Call your displayTrailer function here with the response data
//     displayTrailer(response);
//   })
//   .fail(function (error) {
//     console.error(error);
//   });

// function displayTrailer(data) {
//   const gameTrailer = $('#game-trailer');
//   // counter variable for cards
//   let cardCount = 1;

//   // Bulma columns container class with grid layout to have multiple cards side-by-side
//   const columnsContainer = $('<div class="columns is-mobile"></div>');

//   // You can iterate through the data and create cards to display the trailers
//   data.forEach((item) => {
//     const card = $('<div class="column is-one-fifth"></div>');
//     // Add the trailer content to the card (you'll need to define what data you want to display)
//     // Example: card.append($('<h2>' + item.title + '</h2>'));
//     columnsContainer.append(card);
//     cardCount++;
//   });

//   gameTrailer.append(columnsContainer);
// }
