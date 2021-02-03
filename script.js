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

function cartItemClickListener(event) {
  event.target.remove();
}

function removeItens() {
  const btnRemove = document.querySelector('.empty-cart');
  const ol = document.querySelector('.cart__items');
  btnRemove.addEventListener('click', function () {
    ol.innerHTML = '';
  });
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// function removeSection() {
//   const load = document.querySelector('.loading');
//   load.remove();
// }

function esperandoRequisicao() {
  const cartItem = document.querySelector('.items');
  const section = document.createElement('section');
  section.className = 'loading';
  section.innerText = 'Loading...';
  cartItem.appendChild(section);
}

async function addItemCartApi(itemId) {
  const endpoint = `https://api.mercadolibre.com/items/${itemId}`;
  const cartItem = document.querySelector('.cart__items');
  try {
    const response = await fetch(endpoint);
    const objResponse = await response.json();
    const { id: sku, title: name, price: salePrice } = objResponse;
    cartItem.appendChild(createCartItemElement({ sku, name, salePrice }));
  } catch (error) {
    window.alert(error);
  }
}

function addItemCart() {
  const buttonCards = document.querySelectorAll('.item__add');
  buttonCards.forEach((card) => {
    card.addEventListener('click', function (event) {
      const id = getSkuFromProductItem(event.target.parentNode);
      return addItemCartApi(id);
    });
  });
}

async function dataSearch(current) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${current}`;

  try {
    const response = await fetch(endpoint);
    const objResponse = await response.json();
    const results = objResponse.results;
    const item = document.querySelector('.items');
    results.forEach((result) => {
      const { id: sku, title: name, thumbnail: image } = result;
      item.appendChild(createProductItemElement({ sku, name, image }));
    });
  } catch (error) {
    window.alert(error);
  }
  addItemCart();
}

window.onload = function onload() {
  dataSearch('computador');
  removeItens();
};
