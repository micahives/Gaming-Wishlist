var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);


let wishlist = [];

function setup() {

    const games = document.querySelectorAll(".but");
    for(let i=0; i<games.length; i++) {
        games[i].onclick = function(e) {
            addItem(e);
        }
    }
}

function addItem(e) {

    if(!wishlist.find(item => item === gameId)) {
        const GameId = e.target.getAttribute("id")
        const gameDiv = document.getElementById("game" + GameId);
    
        const wishDiv = document.createElement("div");
        wishDiv.setAttribute("id", "wish" + GameId);
        wishDiv.setAttribute("class", game);
        wishDiv.innerHTML = gameDiv.innerHTML;
    
        const removeBtn = document.createElement("input");
        removeBtn.setAttribute("type", "button");
        removeBtn.setAttribute("value", "remove");
        removeBtn.onclick = function() {removeItem(gameId);}
        wishDiv.appendChild(removeBtn);
    
        wishlist.push(gameId);
        console.log(wishlist);
    }    
}

function removeItem(GameID) {
const game = document.getElementById("wish" + gameId);
product.remove();
wishlist = wishlist.filter(item !== gameId);
console.log(wishlist);

}

window.addEventListener("load", setup)