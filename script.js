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

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function fecthIDs(id) {
  const endPoint = `https://api.mercadolibre.com/items/${id}`;
  try {
    const response = await fetch(endPoint);
    const responseJson = await response.json();
    const obj = {
      ...responseJson,
      sku: responseJson.id,
      name: responseJson.title,
      salePrice: responseJson.price,
    };
    const cartItem = createCartItemElement(obj);
    document.querySelector('.cart__items').appendChild(cartItem);
  } catch (error) {
    alert(error);
  }
}

function buttonCartListener() {
  const buttonAddCart = document.querySelectorAll('.item__add');
  // console.log(buttonAddCart);
  buttonAddCart.forEach((element) => {
    element.addEventListener('click', (event) => {
      const idSku = event.path[1].firstElementChild.innerText;
      fecthIDs(idSku);
    });
  });
}

function fetchProducts(search) {
  const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  fetch(endPoint)
    .then(response => response.json())
    .then(obj => obj.results.forEach(({ id, title, thumbnail }) => {
      const product = createProductItemElement({ sku: id, name: title, image: thumbnail });
      document.querySelector('.items').appendChild(product);
    }))
    .then(buttonCartListener);
}

window.onload = function onload() {
  fetchProducts('computador');
};
