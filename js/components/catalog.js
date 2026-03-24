let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 6;

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const createProductCard = (product) => {
  const hasOldPrice = product.price.old && product.price.old > product.price.new;
  
  return `
    <li class="catalog__item">
      <div class="product-card">
        <div class="product-card__visual">
          <img class="product-card__img" src="${product.image}" height="436" width="290" alt="${product.name}">
          <div class="product-card__more">
            <button class="product-card__link btn btn--icon" data-id="${product.id}" type="button">
              <span class="btn__text">В корзину</span>
              <svg width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-basket"></use>
              </svg>
            </button>
            <a href="#" class="product-card__link btn btn--secondary">
              <span class="btn__text">Подробнее</span>
            </a>
          </div>
        </div>
        <div class="product-card__info">
          <h2 class="product-card__title">${product.name}</h2>
          ${hasOldPrice ? `
            <span class="product-card__old">
              <span class="product-card__old-number">${formatPrice(product.price.old)}</span>
              <span class="product-card__old-add">₽</span>
            </span>
          ` : ''}
          <span class="product-card__price">
            <span class="product-card__price-number">${formatPrice(product.price.new)}</span>
            <span class="product-card__price-add">₽</span>
          </span>
          <div class="product-card__tooltip tooltip">
            <button class="tooltip__btn" aria-label="Показать подсказку" data-id="${product.id}">
              <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-i"></use>
              </svg>
            </button>
            <div class="tooltip__content" style="display: none;">
              <span class="tooltip__text">Наличие товара по городам:</span>
              <ul class="tooltip__list">
                <li class="tooltip__item">
                  <span class="tooltip__text">Москва: <span class="tooltip__count">${product.availability.moscow}</span></span>
                </li>
                <li class="tooltip__item">
                  <span class="tooltip__text">Оренбург: <span class="tooltip__count">${product.availability.orenburg}</span></span>
                </li>
                <li class="tooltip__item">
                  <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${product.availability.saintPetersburg}</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  `;
};

export const loadProducts = async () => {
  try {
    const response = await fetch('./data/data.json');
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    allProducts = await response.json();
    filteredProducts = [...allProducts];
    return allProducts;
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    return [];
  }
};

export const renderProducts = (products, container) => {
  if (!container) return;
  
  container.innerHTML = '';
  
  if (products.length === 0) {
    container.innerHTML = '<li class="catalog__item"><p>Товары не найдены</p></li>';
    return;
  }

  products.forEach(product => {
    const cardHTML = createProductCard(product);
    container.insertAdjacentHTML('beforeend', cardHTML);
  });
};

export const getAllProducts = () => allProducts;

export const getFilteredProducts = () => filteredProducts;

export const setFilteredProducts = (products) => {
  filteredProducts = products;
};

export const getCurrentPage = () => currentPage;

export const setCurrentPage = (page) => {
  currentPage = page;
};

export const getItemsPerPage = () => itemsPerPage;

