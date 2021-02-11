window.onload = function onload() { };

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function totalPriceCart() {
  let totalPrice = 0;
  const list = document.getElementsByTagName('li');
  [...list].forEach((item) => {
    totalPrice += parseFloat(item.innerHTML.split('$')[1]);
  });
  document.querySelector('.total-price').innerHTML = totalPrice;
}

function clearCart() {
  const clearCartButton = document.querySelector('.empty-cart');
  const ol = document.querySelector('ol');
  clearCartButton.addEventListener('click', function () {
    ol.innerHTML = '';
    document.querySelector('.total-price').innerHTML = 0;
  });
  localStorage.clear();
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
  const lineItens = document.getElementsByTagName('li');
  for (let index = 0; index < lineItens.length; index += 1) {
    const object = {
      text: lineItens[index].innerText,
      class: lineItens[index].className,
    };
    localStorage.setItem(index, JSON.stringify(object));
  }
}

function cartItemClickListener(event) {
  event.target.remove();
  localStorage.clear();
  totalPriceCart();
  setLocalStorage();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
