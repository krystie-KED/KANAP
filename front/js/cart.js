const urlOrder = "http://localhost:3000/api/products/order";
let cartItems = localStorage.getItem('product');
cartItems = JSON.parse(cartItems);
console.log(cartItems);

const displayCart = async () => {

  // injection du HTML dans le DOC 
  const productContainer = document.querySelector('#cart__items');
  // let cartCost = localStorage.getItem('total');

  if (cartItems === null) {
    console.log("Veuillez ajouter un article à votre panier");
  } else {
    let cartDisplayProduct = "";
    for (let i = 0; i < cartItems.length; i++) {
      cartDisplayProduct += `
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
let itemQuantity = document.querySelectorAll('.itemQuantity');

const changeQuantity = async (e) => {
  const articleParent = e.target.closest('section > article');
  const cartItems = JSON.parse(localStorage.getItem('product'));
  console.log(articleParent.dataset);
  const newCartItems = cartItems.map(item => {
    if (item._id === articleParent.dataset.id && item.colors === articleParent.dataset.color) {
      item.quantity = e.target.value;
    }
    return item;
  })

  localStorage.setItem('product', JSON.stringify(newCartItems));
  console.log(newCartItems);

}
Array.from(itemQuantity).forEach(item => item.addEventListener('change', changeQuantity));



// Supprimer un produit du panier
let deleteItem = document.querySelectorAll('.deleteItem');

const deleteItemFromCart = async (e) => {
  const articleParent = e.target.closest('section > article');
  const cartItems = JSON.parse(localStorage.getItem('product'));
  console.log(articleParent.dataset);

  const newCartItems = cartItems.map(item => {
    if (item._id === articleParent.dataset.id && item.colors === articleParent.dataset.color) {
      console.log(cartItems.indexOf(item));
      cartItems.splice(cartItems.indexOf(item), 1);
      console.log(cartItems);
    }

  })

  localStorage.setItem('product', JSON.stringify(newCartItems));
  console.log(newCartItems);

}
Array.from(deleteItem).forEach(item => item.addEventListener('click', deleteItemFromCart));




//calcul du total du nombre d'article
let totalQuantity = document.getElementById('totalQuantity');
let totalQuantityProducts = 0;

const totalProducts = async () => {
  cartItems.forEach(element => {
    totalQuantityProducts = totalQuantityProducts + element.quantity;
    console.log(totalQuantityProducts);
  })
  totalQuantity.innerHTML = `${totalQuantityProducts}`;
}
totalProducts();


//calcul du montant totale 
let totalPrice = document.getElementById('totalPrice');
let totalPriceProducts = 0;
const totalCost = async () => {
  cartItems.forEach(element => {
    totalPriceProducts = element.quantity * element.price;
    console.log(totalPriceProducts);
  })
  totalPrice.innerHTML = `${totalPriceProducts}`;
}
totalCost();



// .................Gestion du formulaire.................. 
// Validation des données saisies dans les champs 

// 1 - je mets les champs dans des variables
let firstname = document.querySelector('#firstName');
let lastname = document.querySelector('#lastName');
let adress = document.querySelector('#address');
let city = document.querySelector('#city');
let email = document.querySelector('#email');

// 2- je crée deux fonction qui seront appelées si la valeur est bonne ou non
const disableSubmit = async (disabled) => {
  if (disabled) {
    document
      .getElementById('order')
      .setAttribute('disabled', true);
  } else {
    document
      .getElementById('order')
      .removeAttribute('disabled');
  }
}
// 3 - je crée les masques qui vont me permettre de faire mes verifications
let masque1 = /a-zA-Z/;
let masque2 = /^[0-9]{3,},a-zA-Z/g;
let masque3 = /[a-zA-Z@\.]/g;


// 4 - je verifie avec l'evenement onChange si la valeur saisie match avec le libéllé
firstname.addEventListener('change', function (e) {
  if (masque1.test(e.target.value)) {
    disableSubmit(false);
  } else {
    let errorFirstname = document.querySelector('#firstNameErrorMsg');
    errorFirstname.innerText = "Le prénom ne doit contenir que des lettres";
    disableSubmit(true);
  }
});

lastname.addEventListener('change', function (e) {
  if (masque1.test(e.target.value)) {
    disableSubmit(false);
  } else {
    let errorLastname = document.querySelector('#lastNameErrorMsg');
    errorLastname.innerText = "Le nom ne doit contenir que des lettres";
    disableSubmit(true);
  }
});

adress.addEventListener('change', function (e) {
  if (masque2.test(e.target.value)) {
    disableSubmit(false);
  } else {
    let errorAdress = document.querySelector('#addressErrorMsg');
    errorAdress.innerText = "Veuillez entrer une adresse valide";
    disableSubmit(true);
  }
});


city.addEventListener('change', function (e) {
  if (masque1.test(e.target.value)) {
    disableSubmit(false);
  } else {
    let errorCity = document.querySelector('#cityErrorMsg');
    errorCity.innerText = "Veuillez entrer le nom d'une ville";
    disableSubmit(true);
  }
});

email.addEventListener('change', function (e) {
  if (masque3.test(e.target.value)) {
    disableSubmit(false);
  } else {
    let errorEmail = document.querySelector('#emailErrorMsg');
    errorEmail.innerText = "Veuillez entrer un email valid";
    disableSubmit(true);
  }
});


// 5 - je recupere les données du formulaire avec la methode POST
const send = async (e) => {
  e.preventDefault();
  const cartItems = JSON.parse(localStorage.getItem('product'));

  fetch(urlOrder, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contact: {
          firstName: document.querySelector('#firstName').value,
          lastName: document.querySelector('#lastName').value,
          address: document.querySelector('#address').value,
          city: document.querySelector('#city').value,
          email: document.querySelector('#email').value
        },
        products: cartItems.map(item => item._id)
      })
    })

    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (contact) {

    })
}
let order = document.getElementById('order');
order.addEventListener('click', function (e) {
  e.preventDefault();
  send(e);

})