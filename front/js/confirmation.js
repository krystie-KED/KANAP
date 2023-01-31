let url = new URL(window.location.href);
let urlSearch = new URLSearchParams(url.search);
const urlId = "http://localhost:3000/api/products/order";



// Fonction qui récupère les params dans l'url 
const getUrlParam = async () => {
    for (const params of urlSearch) {
        console.log(params);
      }     
}
getUrlParam();

// je récupère l'id de la commande dans les params 
const orderId = urlSearch.get("orderId");
    console.log(orderId);


// affiche id de la commande
const displayOrderId = async () => { 
    let showOrderId = document.querySelector('#orderId');
    showOrderId.innerHTML = `${orderId}`; 
}
displayOrderId();