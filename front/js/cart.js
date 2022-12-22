const urlOrder = "http://localhost:3000/api/order";
let cartItems = localStorage.getItem('product');
cartItems = JSON.parse(cartItems);
console.log(cartItems);

const displayCart = async () => {

  // classe ou le HTML sera injecté
  const productContainer = document.querySelector('#cart__items');
  let cartCost = localStorage.getItem('total');

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
                      <input type="number" data-id=${cartItems[i]._id} data-colors=${cartItems[i].colors} class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartItems[i].quantity}">
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

    // Modifier la quantité d'un produit
    let itemQuantity = document.querySelectorAll('.itemQuantity');

    const changeQuantity = async (e) => {
      console.log(cartItems);
      if (cartItems._id === e.target.dataset.id && cartItems.colors === e.target.dataset.colors) {
        localStorage.setItem('product', cartItems);
        // itemQuantity.closest('parent'); 
        cartItems.quantity = e.target.value;

        localStorage.setItem('product', JSON.stringify(cartItems));
        console.log(cartItems);
      }

    }
    Array.from(itemQuantity).forEach(item => item.addEventListener('change', changeQuantity));

  }
}
displayCart();




// Supprimer un produit du panier
let removeItem = document.querySelector('.deleteItem');

const deleteItem = async (e) => {
  if (cartItems._id == e._id && cartItems.colors == e.colors) {
    localStorage.removeItem('product');

    localStorage.setItem('product', JSON.stringify(cartItems));
    console.log(cartItems);
  }
}
removeItem.addEventListener('click', deleteItem);



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
    let errorLastname = document.querySelector('#lastNameErrorMsg')
    errorLastname.innerText = "Le nom ne doit contenir que des lettres";
    disableSubmit(true);
  }
});

adress.addEventListener('change', function (e) {
  if (masque2.test(e.target.value)) {
    disableSubmit(false);
  } else {
    let errorAdress = document.querySelector('#addressErrorMsg')
    errorAdress.innerText = "Veuillez entrer une adresse valide";
    disableSubmit(true);
  }
});


city.addEventListener('change', function (e) {
  if (masque1.test(e.target.value)) {
    disableSubmit(false);
  } else {
    let errorCity = document.querySelector('#cityErrorMsg')
    errorCity.innerText = "Veuillez entrer le nom d'une ville";
    disableSubmit(true);
  }
});

email.addEventListener('change', function (e) {
  if (masque3.test(e.target.value)) {
    disableSubmit(false);
  } else {
    let errorEmail = document.querySelector('#emailErrorMsg')
    errorEmail.innerText = "Veuillez entrer un email valid";
    disableSubmit(true);
  }
});


// 5 - je recupere les données du formulaire avec la methode POST
const send = async (e) => {
  // e.preventDefault();
  fetch(urlOrder, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact = {
        prenom: document.querySelector('#firstName').value,
        nom: document.querySelector('#lastName').value,
        adresse: document.querySelector('#address').value,
        ville: document.querySelector('#city').value,
        email: document.querySelector('#email').value
      })
    })

    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (contact) {
      let order = document.getElementById('order');
      order.addEventListener('click', function (e) {
        e.preventDefault();
        console.log(contact);
        // localStorage.setItem('contact', JSON.stringify(contact))
        // const resume = {
        //   contact, cartItems
        // }
        // console.log(resume);
      })
    })
}
send();