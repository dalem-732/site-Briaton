import { getAllProducts } from './catalog.js';

let basketItems = [];
const basketBtn = document.querySelector('.header__user-list .header__user-item:first-child .header__user-btn');
const basket = document.querySelector('.basket');
const basketList = document.querySelector('.basket__list');
const basketEmpty = document.querySelector('.basket__empty-block');
const basketCount = document.querySelector('.header__user-count');
let basketLink = null;

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const updateBasketCount = () => {
  if (basketCount) {
    const count = basketItems.length;
    basketCount.textContent = count;
    if (count === 0) {
      basketCount.style.display = 'none';
    } else {
      basketCount.style.display = 'block';
    }
  }
};

const updateBasketLink = () => {
  if (!basket) return;
  
  if (basketLink) {
    basketLink.remove();
    basketLink = null;
  }
  
  if (basketItems.length > 0) {
    basketLink = document.createElement('a');
    basketLink.className = 'basket__link btn';
    basketLink.href = '#';
    basketLink.textContent = 'Перейти к оформлению';
    
    if (basketList && basketList.parentNode) {
      if (basketEmpty && basketEmpty.parentNode === basketList.parentNode) {
        basketList.parentNode.insertBefore(basketLink, basketEmpty);
      } else {
        const nextSibling = basketList.nextSibling;
        if (nextSibling) {
          basketList.parentNode.insertBefore(basketLink, nextSibling);
        } else {
          basketList.parentNode.appendChild(basketLink);
        }
      }
    }
  }
};

const updateBasketDisplay = () => {
  if (!basketList || !basketEmpty) return;
  
  if (basketItems.length === 0) {
    basketList.innerHTML = '';
    basketEmpty.style.display = 'block';
    if (basketLink) {
      basketLink.remove();
      basketLink = null;
    }
  } else {
    basketEmpty.style.display = 'none';
    basketList.innerHTML = basketItems.map(item => `
      <li class="basket__item" data-id="${item.id}">
        <div class="basket__img">
          <img src="${item.image}" alt="${item.name}" height="60" width="60">
        </div>
        <span class="basket__name">${item.name}</span>
        <span class="basket__price">${formatPrice(item.price.new)} руб</span>
        <button class="basket__close" type="button" data-id="${item.id}">
          <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
          </svg>
        </button>
      </li>
    `).join('');
    
    const closeButtons = basketList.querySelectorAll('.basket__close');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.getAttribute('data-id'));
        removeFromBasket(id);
      });
    });
    
    updateBasketLink();
  }
  
  updateBasketCount();
};

export const addToBasket = (productId) => {
  const products = getAllProducts();
  const product = products.find(p => p.id === productId);
  
  if (!product) return;
  
  if (!basketItems.find(item => item.id === productId)) {
    basketItems.push(product);
    updateBasketDisplay();
  }
};

export const removeFromBasket = (productId) => {
  basketItems = basketItems.filter(item => item.id !== productId);
  updateBasketDisplay();
};

export const initBasketButtons = () => {
  const addToBasketButtons = document.querySelectorAll('.product-card__link.btn--icon[data-id]');
  
  addToBasketButtons.forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = parseInt(newBtn.getAttribute('data-id'));
      addToBasket(productId);
    });
  });
};

export const initBasket = () => {
  if (!basketBtn || !basket) return;
  
  basketBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    basket.classList.toggle('basket--active');
  });
  
  document.addEventListener('click', (e) => {
    if (!basket.contains(e.target) && !basketBtn.contains(e.target)) {
      basket.classList.remove('basket--active');
    }
  });
  
  initBasketButtons();
  
  updateBasketDisplay();
};

