import { getAllProducts, setFilteredProducts, getFilteredProducts, getCurrentPage, setCurrentPage, renderProducts } from './catalog.js';

const catalogList = document.querySelector('.catalog__list');
const filterForm = document.querySelector('.catalog-form');
const resetBtn = document.querySelector('.catalog-form__reset');

export const updateCategoryCounts = () => {
  const products = getAllProducts();
  const checkboxes = document.querySelectorAll('.custom-checkbox__field[name="type"]');
  
  checkboxes.forEach(checkbox => {
    const value = checkbox.value;
    const countElement = checkbox.closest('.custom-checkbox').querySelector('.custom-checkbox__count');
    
    if (!countElement) return;
    
    const count = products.filter(product => 
      product.type && product.type.includes(value)
    ).length;
    
    countElement.textContent = count;
  });
};

const hasAvailability = (product) => {
  const availability = product.availability;
  return availability.moscow > 0 || availability.orenburg > 0 || availability.saintPetersburg > 0;
};

export const filterProducts = () => {
  const products = getAllProducts();
  const selectedTypes = Array.from(document.querySelectorAll('.custom-checkbox__field[name="type"]:checked'))
    .map(checkbox => checkbox.value);
  const statusRadio = document.querySelector('.custom-radio__field[name="status"]:checked');
  const status = statusRadio ? statusRadio.value : 'all-item';
  
  let filtered = [...products];
  
  if (selectedTypes.length > 0) {
    filtered = filtered.filter(product => 
      product.type && product.type.some(type => selectedTypes.includes(type))
    );
  }
  
  if (status === 'instock') {
    filtered = filtered.filter(product => hasAvailability(product));
  }
  
  setFilteredProducts(filtered);
  setCurrentPage(1);
  
  if (window.updateCatalogDisplay) {
    window.updateCatalogDisplay();
  }
};

export const initFilters = () => {
  if (!filterForm || !catalogList) return;
  
  updateCategoryCounts();
  
  filterForm.addEventListener('change', (e) => {
    if (e.target.matches('.custom-checkbox__field[name="type"], .custom-radio__field[name="status"]')) {
      filterProducts();
    }
  });
  
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      setTimeout(() => {
        filterProducts();
      }, 0);
    });
  }
};


