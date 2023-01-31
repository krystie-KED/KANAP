const urlOrder = "http://localhost:3000/api/products/order";
const urlApi = "http://localhost:3000/api/products";
let cartItems = localStorage.getItem('product');
cartItems = JSON.parse(cartItems);
console.log(cartItems);

// je fais une requete sur l'API pour afficher le prix en le recupérant depuis l'API et non le localStorage 
const fetchForPrice = async () => {
  await fetch(urlApi)
    .then(res => res.json())
    .then(data => {
      console.log(data); //retour API
      console.log(cartItems); //contenu panier

      cartItems.map(item => {
        // console.log(item);
        for (j = 0; j < data.length; j++) {
          // dans la condition je ne compare que l'id car le prix ne change pas en fonction de la couleur
          if (item._id === data[j]._id) {
            console.log(data[j].price);



            const displayCart = async () => {

              // Injection du HTML dans le DOC 
              const productContainer = document.querySelector('#cart__items');

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
                    <p>${data[j].price}</p>
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
                  item.quantity = Number(e.target.value);
                  console.log(typeof item.quantity);
                }
                return item;
              })

              localStorage.setItem('product', JSON.stringify(newCartItems));
              console.log(newCartItems);

              totalProducts();
              totalCost();
            }
            Array.from(itemQuantity).forEach(item => item.addEventListener('change', changeQuantity));





            // Supprimer un produit du panier
            let deleteItem = document.querySelectorAll('.deleteItem');
            console.log(deleteItem);

            const deleteItemFromCart = async (e) => {
              const articleParent = e.target.closest('section > article');
              const cartItems = JSON.parse(localStorage.getItem('product'));
              const parent = document.getElementById('cart__items');
              console.log(articleParent);

              cartItems.map(item => {
                if (item._id === articleParent.dataset.id && item.colors === articleParent.dataset.color) {
                  console.log(cartItems.indexOf(item));
                  cartItems.splice(cartItems.indexOf(item), 1);
                  localStorage.setItem('product', JSON.stringify(cartItems));
                  console.log(cartItems);
                }

              })
              // suppression de l'élèment dans le DOM
              const deleteChild = parent.removeChild(articleParent);
              console.log(deleteChild);

              totalProducts();
              totalCost();
            }
            Array.from(deleteItem).forEach(item => item.addEventListener('click', deleteItemFromCart));




            //Calcul du total du nombre d'article contenus dans le panier
            let totalQuantity = document.getElementById('totalQuantity');

            const totalProducts = async () => {
              const cartItems = JSON.parse(localStorage.getItem('product'));
              let totalQuantityProducts = 0;

              cartItems.forEach(element => {  
                  totalQuantityProducts = totalQuantityProducts + Number(element.quantity);
              })
              totalQuantity.innerHTML = `${totalQuantityProducts}`;
            }
            totalProducts();


            //Calcul du montant total de la commande
            let totalPrice = document.getElementById('totalPrice');
            const price = data[j].price;
            const totalCost = async () => {
              let totalPriceProducts = 0;
              const cartItems = JSON.parse(localStorage.getItem('product'));
              cartItems.forEach(element => {
                totalPriceProducts = totalPriceProducts + (element.quantity * price);
                console.log(totalPriceProducts);

              })
              totalPrice.innerHTML = `${totalPriceProducts}`;
            }
            totalCost();

          }
        }
      })

    })
    .catch((err) => console.log(err));
}
fetchForPrice();

// .................Gestion du formulaire.................. 
// Validation des données saisies dans les champs 

// 1 - je mets les champs dans des variables
let firstname = document.querySelector('#firstName');
let lastname = document.querySelector('#lastName');
let adress = document.querySelector('#address');
let city = document.querySelector('#city');
let email = document.querySelector('#email');

// 2- je crée deux fonctions qui seront appelées si la valeur saisie est bonne ou non
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
// 3 - je crée les masques qui vont me permettres de faire mes verifications
// masque vérification nom, prenom, ville
let masque1 = /^[A-Za-z\-]{3,30}$/;
// masque vérification adresse
let masque2 = /^([0-9\s]{1,3})+[a-zA-Z]/;
// masque vérification email
let masque3 = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;


// 4 - je verifie avec l'évènement onChange si la valeur saisie match avec le libéllé
firstname.addEventListener('change', function (e) {
  let errorFirstname = document.querySelector('#firstNameErrorMsg');

  // if(e.target.value === null){
  //   errorFirstname.innerText = "Veuillez saisir une valeur";
  // }
  if (masque1.test(e.target.value)) {
    errorFirstname.innerText = "";
    console.log('OK');
    return disableSubmit(false);
  } else {
    errorFirstname.innerText = "Le prénom ne doit contenir que des lettres";
    console.log('KO');
    return disableSubmit(true);

  }
});

lastname.addEventListener('change', function (e) {
  let errorLastname = document.querySelector('#lastNameErrorMsg');

  if (masque1.test(e.target.value)) {
    errorLastname.innerText = "";
    console.log('OK');
    disableSubmit(false);
  } else {
    errorLastname.innerText = "Le nom ne doit contenir que des lettres";
    console.log('KO');
    disableSubmit(true);
  }
});

adress.addEventListener('change', function (e) {
  let errorAdress = document.querySelector('#addressErrorMsg');

  if (masque2.test(e.target.value)) {
    errorAdress.innerText = "";
    console.log('OK');
    disableSubmit(false);
  } else {
    errorAdress.innerText = "Veuillez entrer une adresse valide";
    console.log('KO');
    disableSubmit(true);
  }
});


city.addEventListener('change', function (e) {
  let errorCity = document.querySelector('#cityErrorMsg');

  if (masque1.test(e.target.value)) {
    errorCity.innerText = "";
    console.log('OK');
    disableSubmit(false);
  } else {
    errorCity.innerText = "Veuillez entrer le nom d'une ville";
    console.log('KO');
    disableSubmit(true);
  }
});

email.addEventListener('change', function (e) {
  let errorEmail = document.querySelector('#emailErrorMsg');

  if (masque3.test(e.target.value)) {
    errorEmail.innerText = "";
    console.log('OK');
    disableSubmit(false);
  } else {
    errorEmail.innerText = "Veuillez entrer un email valid";
    console.log('KO');
    disableSubmit(true);
  }
});


// 5 - je récupère les données du formulaire avec la methode POST
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
      console.log(contact.orderId);
      window.location.assign(`confirmation.html?orderId=${contact.orderId}`);
    });
};


// on a vérifier que le formulaire est correcte 
// à l'envoie on souhaite que tout les champs soient remplis correctement 
// et que le panier contienne au moins un article 
//Fonction qui va permettre une fois que le formulaire est envoyé de recupérer orderId
let order = document.getElementById('order');

if (cartItems.length == 0) {
  console.log('je suis la');
  alert('Veuillez ajouter un article au panier');

} else {
  order.addEventListener('click', function (e) {
    e.preventDefault();
    // console.log(e);
    send(e);
    return true
  });
};