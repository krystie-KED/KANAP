let cartItems = localStorage.getItem('product');
cartItems = JSON.parse(cartItems);
    console.log(cartItems);

const displayCart = async () => {
    
    // classe ou le HTML sera injecté
    const productContainer = document.querySelector('#cart__items'); 
    let cartCost = localStorage.getItem('total');

        if(cartItems === null){
            console.log("Veuillez ajouter un article à votre panier");
        }else{
            let cartDisplayProduct = "";
            for (let i = 0; i < cartItems.length; i++){
                cartDisplayProduct +=`
                 <article class="cart__item" data-id="${cartItems[i]._id}" data-color="${cartItems[i].colors}">
                <div class="cart__item__img">
                  <img src="${cartItems[i].imageUrl}" alt="${cartItems[i].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${cartItems[i].name}</h2>
                    <p>${cartItems[i].colors}</p>
                    <p>${cartItems[i].price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItems[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> 
                `;
                
            }
            productContainer.innerHTML = cartDisplayProduct;
        }     
}
displayCart();


// Modifier la quantité d'un produit
const parent = document.querySelector('.cart__item__content__settings__quantity')
let itemQuantity = document.querySelector('.itemQuantity');

const changeQuantity = async (e) => {
  if(cartItems._id == e._id && cartItems.colors == e.colors){
    localStorage.setItem('product', cartItems);
    itemQuantity.closest('parent'); 
    // itemQuantity = cartItems.quantity
    cartItems.quantity = e.target.value;
    
    localStorage.setItem('product', JSON.stringify(cartItems));
    console.log(cartItems);  
  }      
 
}
itemQuantity.addEventListener('change', changeQuantity);


// Supprimer un produit du panier
let removeItem = document.querySelector('.deleteItem');

const deleteItem = async (e) => {
  if(cartItems._id == e._id && cartItems.colors == e.colors){
    localStorage.removeItem('product');
    
    localStorage.setItem('product', JSON.stringify(cartItems));
    console.log(cartItems);  
  }        
}
removeItem.addEventListener('click', deleteItem);
