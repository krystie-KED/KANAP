let url = new URL(window.location.href);
let urlSearch = new URLSearchParams(url.search);
const urlId = "http://localhost:3000/api/products";
let array = [];


// Function qui recupere les params dans l'url 
const getUrlParam = async () => {
    for (const params of urlSearch) {
        // console.log(params);
      }     
}
getUrlParam();

// recupere l'id dans les params 
const id = urlSearch.get("id");
    console.log(id);


// Recuperer l'objet qui a le même id que celui du params§
// afficher le retour de l'API dans le DOM
const getSelectedObject = async () => {
    await fetch(urlId)
    .then(res => res.json())
    .then(data => {
        array = data;
        // console.log(data);

// recherche entre id element cliqué et id params
        const idSelectedProduct = data.find((element) => element._id === id);
            //console.log(idSelectedProduct);
        
    

// affiche les infos produits dans le DOM 
        const displayProduct = async () => {   
            const imageProduct = document.querySelector(".item__img");
            const nameProduct = document.querySelector("#title");
            const priceProduct = document.querySelector("#price");
            const descriptionProduct = document.querySelector("#description");
            const displayColorProduct = document.querySelector("#colors");
        
            const colorProduct = idSelectedProduct.colors;
                        // console.log(colorProduct);
                        
            let displayColor = [];    

            const displayImage = `        
                <img src="${idSelectedProduct.imageUrl}" alt="${idSelectedProduct.altTxt}">
            `;
            const displayName = `        
            ${idSelectedProduct.name}
            `;
            const displayPrice = `        
                ${idSelectedProduct.price}
            `;
            const displayDescription = `        
                ${idSelectedProduct.description}
            `;
                    
            // boucle qui va permettre d'afficher toutes les couleurs disponibles
            for (let i = 0; i < colorProduct.length; i++){
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
  
// recupere les id des options (qtt + color) selectionées
        let quantityProduct = document.querySelector('#quantity'); 
        let colorChoice = document.querySelector('#colors');
            // console.log(quantityProduct);

            

//creation de l'evenement au click
        const addToCart = async () => {
            let btnAddToCart = document.querySelector('#addToCart');

// ecoute du click et creation de l'event       
            btnAddToCart.addEventListener('click', (e) => {
                e.preventDefault();                         
            
//  mettre le choix dans une variable
                const choiceProduct = {
                    quantity: Number(quantityProduct.value),
                    color : colorChoice.value
                }              
                // console.log(typeof choiceProduct.quantity);
                console.log(choiceProduct);
    
// clé valeur des elements compris dans le panier
                let optionProducts = {
                    colors: colorChoice.value,
                    _id : idSelectedProduct._id,
                    name : idSelectedProduct.name,
                    price : idSelectedProduct.price,
                    imageUrl : idSelectedProduct.imageUrl,
                    altTxt : idSelectedProduct.altTxt,
                    quantity: choiceProduct.quantity
                }
                    // console.log(optionProducts);        
               
// affichage de l'article selectionné dans le localStorage
                const setItems = async (product) => {
                    let cartItems = localStorage.getItem('product');
                    cartItems = JSON.parse(cartItems);                  
                        console.log(cartItems);   

// le local storage contient deja un element
                    if(cartItems != null){
// etape 1 : verifier que l'id et la couleur choisi n'ont pas deja été ajouté
                        for(let i = 0; i < cartItems.length; i++){                    
                            if(cartItems[i]._id == optionProducts._id && cartItems[i].colors == optionProducts.colors){
                                console.log('bip bip');
                                cartItems[i].quantity = optionProducts.quantity + cartItems[i].quantity;
                                cartItems.quantity = cartItems[i].quantity;

                                localStorage.setItem('product', JSON.stringify(cartItems));
                                console.log(cartItems);
                                
                            }else{
                                // console.log(cartItems.quantity);
                                cartItems.push(optionProducts);
                                localStorage.setItem('product', JSON.stringify(cartItems));
                                console.log(cartItems);      
                            }
                        }            
                    }else{
                        cartItems = [];
                        cartItems.push(optionProducts);
                        localStorage.setItem('product', JSON.stringify(cartItems));
                        console.log(cartItems);
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
   





