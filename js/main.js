import { initBurgerMenu } from './components/burger-menu.js';
import { initLocation } from './components/location.js';
import { loadProducts, renderProducts, getFilteredProducts, getCurrentPage, getItemsPerPage } from './components/catalog.js';
import { initFilters, updateCategoryCounts } from './components/filter.js';
import { initSort } from './components/sort.js';
import { initBasket, initBasketButtons } from './components/basket.js';
import { initAccordion } from './components/accordion.js';
import { initDayProductsSlider } from './components/slider.js';
import { initFormValidation } from './components/form.js';
import { renderPagination } from './components/pagination.js';
import { initTooltips } from './components/tooltip.js';

const catalogList = document.querySelector('.catalog__list');

window.updateCatalogDisplay = () => {
  const filtered = getFilteredProducts();
  const currentPage = getCurrentPage();
  const itemsPerPage = getItemsPerPage();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const productsToShow = filtered.slice(startIndex, endIndex);
  
  renderProducts(productsToShow, catalogList);
  
  renderPagination(filtered.length, currentPage);
  
  setTimeout(() => {
    initTooltips();
    initBasketButtons();

    if (productsToShow.length > 0 && productsToShow.length < 4) {
      const catalogTop = catalogList.getBoundingClientRect().top + window.pageYOffset;
      const target = Math.max(0, catalogTop - 20);
      if (window.pageYOffset > target + 10) {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }
  }, 0);
};

window.addEventListener('DOMContentLoaded', async () => {
  initBurgerMenu();
  initLocation();
  initAccordion();
  initBasket();
  initFormValidation();
  
  await loadProducts();
  
  initFilters();
  updateCategoryCounts();
  
  initSort();
  
  window.updateCatalogDisplay();
  
  initDayProductsSlider();
});
