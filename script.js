function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function setLocalStorage() {
  const cartList = document.querySelector('.cart__items').innerHTML;
  localStorage.setItem('cart', cartList);
}

function getLocalStorageToCart() {
  const savedItens = localStorage.getItem('cart');
  const savedCart = document.querySelector('.cart__items');
  savedCart.innerHTML = savedItens;
}

function cartItemClickListener(event) {
  const cart = document.querySelector('.cart__items');
  cart.addEventListener(event, (cartItem) => {
    cartItem.target.remove();
    setLocalStorage();
  });
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function fetchApi() {
  const createItemsList = document.querySelector('.items');
  fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
    .then((response) => {
      response.json()
      .then((data) => {
        data.results.map((item) => {
          const items = {
            sku: item.id,
            name: item.title,
            image: item.thumbnail,
          };
          const CreateItemElement = createProductItemElement(items);
          return createItemsList.appendChild(CreateItemElement);
        });
      });
    });
}

function fetchItemById(itemId) {
  const cartItens = document.querySelector('.cart__items');
  fetch(`https://api.mercadolibre.com/items/${itemId}`)
    .then((response) => {
      response.json()
        .then((data) => {
          const itemDetails = {
            sku: data.id,
            name: data.title,
            salePrice: data.price,
          };
          return cartItens.appendChild(createCartItemElement(itemDetails));
        });
    });
}

function addItemToCart() {
  const listItem = document.querySelector('.items');
  listItem.addEventListener('click', async (element) => {
    const idOnFocus = element.target.parentNode;
    const itemId = getSkuFromProductItem(idOnFocus);
    fetchItemById(itemId);
    setLocalStorage();
  });
}

window.onload = function onload() {
  fetchApi();
  addItemToCart();
  cartItemClickListener('click');
  getLocalStorageToCart();
};
