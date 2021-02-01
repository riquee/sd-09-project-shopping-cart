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

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Adicionando produto ao carrinho
const addProductCart = async (event) => {
  const ItemID = (event.target.parentNode).firstChild.innerText;

  const response = await fetch(`https://api.mercadolibre.com/items/${ItemID}`);
  const json = await response.json();

  const { id, title, price } = json;

  const productCart = createCartItemElement({ sku: id, name: title, salePrice: price });
  document.querySelector('.cart__items').appendChild(productCart);
};

// Listando produtos
const productListing = async (QUERY) => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);
  const json = await response.json();

  json.results.forEach((objProduct) => {
    const { id, title, thumbnail } = objProduct;

    const productItem = createProductItemElement({ sku: id, name: title, image: thumbnail });
    document.querySelector('.items').appendChild(productItem);
  });

  const allButtonsAdd = document.querySelectorAll('.item');
  allButtonsAdd.forEach(button => button.addEventListener('click', addProductCart));
};

window.onload = function onload() {
  productListing('computador');
};
