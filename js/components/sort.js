import { getFilteredProducts, setFilteredProducts, getCurrentPage, setCurrentPage } from './catalog.js';

const sortSelect = document.querySelector('.catalog__sort-select');

export const sortProducts = (sortType) => {
  const products = getFilteredProducts();
  let sorted = [...products];
  
  switch (sortType) {
    case 'price-min':
      sorted.sort((a, b) => a.price.new - b.price.new);
      break;
    case 'price-max':
      sorted.sort((a, b) => b.price.new - a.price.new);
      break;
    case 'rating-max':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }
  
  setFilteredProducts(sorted);
  setCurrentPage(1);
  
  if (window.updateCatalogDisplay) {
    window.updateCatalogDisplay();
  }
};

export const initSort = () => {
  if (!sortSelect) return;
  
  sortSelect.addEventListener('change', (e) => {
    sortProducts(e.target.value);
  });
};

