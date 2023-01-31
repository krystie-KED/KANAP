const url = "http://localhost:3000/api/products";
let array = [];

// Method GET : permet de récupérer les elements de l'API
const getItems = async() => {
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.table(data);
        array = data;
        console.log(data);
        displayItems();
        })
    .catch((err) => console.log(err));
}
getItems();


// Fonction qui permet d'afficher le retour de l'API dans le DOM
const displayItems = async () => {
    document.querySelector("#items").innerHTML = array.map((product) => `
            <a href="./product.html?id=${product._id}">
            <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            </article>
            </a>
        `).join("")
}







