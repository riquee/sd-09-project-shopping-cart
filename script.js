window.onload = function onload() { };

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
//trazer as coisas da api para cá ok
//eu preciso id = sku, name= title, image = thumbnail
// como eu acesso essas informações? através de buscas de objetos

//console.log(createProductItemElement({ sku, name, image }));

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

function apiAdd () {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=$computador`

  fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  .then((response) => response.json())
  .then((object) => {
    for(let index =0; index < object.results.length; index += 1) {
      const sku = object.results[index].id;
    }
    for(let index =0; index < object.results.length; index += 1) {
      const name = object.results[index].title;
    }
    for(let index =0; index < object.results.length; index += 1) {
    const image = object.results[index].thumbnail;
    }
  })
  .catch((error) => {
    console.log(error);
  });
}
apiAdd()