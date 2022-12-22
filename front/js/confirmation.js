let url = new URL(window.location.href);
let urlSearch = new URLSearchParams(url.search);
const urlId = "http://localhost:3000/api/order";
let array = [];

// Function qui recupere les params dans l'url 
const getUrlParam = async () => {
    for (const params of urlSearch) {
        // console.log(params);
      }     
}
getUrlParam();

// recupere l'id de la commande dans les params 
const id = urlSearch.get("id");
    console.log(id);


       
// affiche id de la commande
const displayIdOrder = async () => { 
    let orderId = document.querySelector('#orderId');
    orderId.innerText = ""; //id de la commande
}