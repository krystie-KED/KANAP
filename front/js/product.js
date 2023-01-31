let url = new URL(window.location.href);
let urlSearch = new URLSearchParams(url.search);
let array = [];


// Fonction qui récupère les params dans l'url 
const getUrlParam = async () => {
    for (const params of urlSearch) {
        console.log(params);
    }
}
getUrlParam();

// recupere l'id dans les params 
const id = urlSearch.get("id");
console.log(id);

const urlId = `http://localhost:3000/api/products/${id}`;

// Récupère l'objet qui a le même id que celui du params
// affiche le retour de l'API dans le DOM
const getSelectedObject = async () => {
    await fetch(urlId)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // recherche entre id element cliqué et id params
            // const idSelectedProduct = data;
            //console.log(idSelectedProduct);



            // affiche les infos produits dans le DOM 
            const displayProduct = async () => {
                const imageProduct = document.querySelector(".item__img");
                const nameProduct = document.querySelector("#title");
                const priceProduct = document.querySelector("#price");
                const descriptionProduct = document.querySelector("#description");
                const displayColorProduct = document.querySelector("#colors");

                const colorProduct = data.colors;
                // console.log(colorProduct);

                let displayColor = [];

                const displayImage = `        
                <img src="${data.imageUrl}" alt="${data.altTxt}">
            `;
                const displayName = `        
            ${data.name}
            `;
                const displayPrice = `        
                ${data.price}
            `;
                const displayDescription = `        
                ${data.description}
            `;

                // boucle qui va permettre d'afficher toutes les couleurs disponibles
                for (let i = 0; i < colorProduct.length; i++) {
                    displayColor += ` 
                <option value="${colorProduct[i]}">${colorProduct[i]}</option>       
                `;
                }

                imageProduct.innerHTML = displayImage;
                nameProduct.innerHTML = displayName;
                priceProduct.innerHTML = displayPrice;
                descriptionProduct.innerHTML = displayDescription;
                displayColorProduct.innerHTML = displayColor;
            }
            displayProduct();



            //.................MISE EN PLACE DU LOCAL STORAGE....................

            // récupère les id des options (qtt + color) selectionées
            let quantityProduct = document.querySelector('#quantity');
            let colorChoice = document.querySelector('#colors');
            // console.log(quantityProduct);



            //création de l'évènement au clique
            const addToCart = async () => {
                let btnAddToCart = document.querySelector('#addToCart');

                // écoute du clique et création de l'évènement       
                btnAddToCart.addEventListener('click', (e) => {
                    // console.log("on est al ");
                    e.preventDefault();

                    //  placer le choix dans une variable
                    const choiceProduct = {
                        quantity: Number(quantityProduct.value),
                        color: colorChoice.value
                    }
                    // console.log(typeof choiceProduct.quantity);
                    console.log(choiceProduct);

                    // clé : valeur,  des éléments compris dans le panier
                    let optionProducts = {
                        colors: colorChoice.value,
                        _id: data._id,
                        name: data.name,
                        // price: data.price,
                        imageUrl: data.imageUrl,
                        altTxt: data.altTxt,
                        quantity: Number(choiceProduct.quantity)
                    }
                    // console.log(optionProducts);        

                    // affichage de l'article selectionné dans le localStorage
                    const setItems = async () => {
                        let cartItems = localStorage.getItem('product');
                        cartItems = JSON.parse(cartItems);
                        console.log(cartItems);

                        // option 1: le localStorage contient deja un element
                        if(optionProducts.quantity > 0){
                        if (cartItems != null) {
                            // etape 1 : verifier que l'id et la couleur choisis n'ont pas déjà été ajoutés
                            // si c'est le cas mofifier la quantité
                            // si il n'existe pas ajouter le nouveau produit
                            const exists = cartItems.find(item => item._id == optionProducts._id && item.colors == optionProducts.colors)
                            if (exists) {
                                for (let i = 0; i < cartItems.length; i++) {
                                    if (cartItems[i]._id === optionProducts._id && cartItems[i].colors === optionProducts.colors) {
                                        console.log('bip bip');
                                        cartItems[i].quantity = optionProducts.quantity + cartItems[i].quantity;

                                        localStorage.removeItem(price, JSON.stringify(cartItems));
                                        localStorage.setItem('product', JSON.stringify(cartItems));
                                        console.log(cartItems);


                                    }
                                }
                            } else {
                                cartItems.push(optionProducts);
                                localStorage.setItem('product', JSON.stringify(cartItems));
                                console.log(cartItems);
                            }
                        } // option 2: le local storage est vide 
                        else {
                            cartItems = [];
                            cartItems.push(optionProducts);
                            localStorage.setItem('product', JSON.stringify(cartItems));
                            console.log(cartItems);
                        }
                    }else{
                        alert('ajouter une quantité');s
                        return false;
                    }

                    }
                    setItems();
                })
            }
            addToCart();
        })
        .catch((err) => console.log(err));
}
getSelectedObject();