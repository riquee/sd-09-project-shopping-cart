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
  // coloque seu código aqui

}

function fetchProducts(query) {
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
    .then(response => response.json())
    .then((object) => {
      object.results.forEach((result) => {
        const { id, title, thumbnail } = result;
        const item = createProductItemElement({ sku: id, name: title, image: thumbnail });
        document.querySelector('.items').appendChild(item);
      });
    });
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addToCart() {
  document.querySelectorAll('.item__add').forEach((button) => {
    button.addEventListener('click', getProductId)
  });
}

const fetchAddRequest = (itemId) => {
  fetch(`https://api.mercadolibre.com/items/${itemId}`)
    .then(response => response.json())
    .then((object) => {
      const { id, title, price } = object;
      const item = createCartItemElement({ sku: id, name: title, salePrice: price });
      document.querySelector('.cart__items').appendChild(item);
    });
};

function getProductId(event) {
  const id = event.target.parentNode.firstChild.innerText;
  fetchAddRequest(id);
}

window.onload = function onload() {
  fetchProducts('computador');
  setTimeout(() => addToCart(), 500);
};
