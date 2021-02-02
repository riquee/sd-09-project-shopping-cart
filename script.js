function saveCartStorage() {
  const getcart = document.querySelector('.cart__items');
  localStorage.setItem('cart', getcart.innerHTML);
}

function loadCartStorage() {
  const getcart = document.querySelector('.cart__items');
  getcart.innerHTML = localStorage.getItem('cart');
}

function createLoadingElement() {
  const loadingElement = documento.createElement('h1');
  loadingElement.className = 'loading';
  loadingElement.innerText = 'Loading...';
  document.body.appendChild(loadingElement);
}

function stopLoadingElement() {
  const loadingElement = documento.querySelector('.loading');
  loadingElement.remove();
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const getElement = document.createElement(element);
  getElement.className = className;
  getElement.innerText = innerText;
  return getElement;
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

function cartItemClickListener(event) {
  event.target.remove();
  saveCartStorage();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSku(item) {
  return item.querySelector('span.item__sku').innerText;
}

function addItemCart() {
  const itemsElement = document.querySelector('.items');
  itemsElement.addEventListener('click', async (event) => {
    const productSku = getSku(event.target.parentNode);
    const endpoint = `https://api.mercadolibre.com/items/${productSku}`;

    const results = await fetch(endpoint)
    .then(response => response.json());

    const item = {
      sku: productSku,
      name: results.title,
      salePrice: results.price,
    };
    const getCarElement = document.querySelector('.cart__items');
    const createItem = createCartItemElement(item);
    getCarElement.appendChild(createItem);
    saveCartStorage();
  });
}

async function fetchMercadoLivre(term) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${term}`;
  createLoadingElement();
  const response = await fetch(endpoint);
  const object = await response.json();
  const results = object.results;
  const itemsElement = document.querySelector('.items');

  results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    const element = createProductItemElement({ sku, name, image });
    itemsElement.appendChild(element);
  });
  stopLoadingElement();
}

window.onload = function onload() {
  fetchMercadoLivre('computador');
  addItemCart();
  loadCartStorage();
};
