import { setCurrentPage } from './catalog.js';

const paginationContainer = document.querySelector('.catalog__pagination');
const itemsPerPage = 6;

const createPaginationItems = (totalItems, currentPage) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) {
    return '';
  }
  
  let paginationHTML = '';
  
  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage ? 'catalog__pagination-link--active' : '';
    paginationHTML += `
      <li class="catalog__pagination-item">
        <button class="catalog__pagination-link ${isActive}" data-page="${i}">${i}</button>
      </li>
    `;
  }
  
  return paginationHTML;
};

export const renderPagination = (totalItems, currentPage = 1) => {
  if (!paginationContainer) return;
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }
  
  paginationContainer.innerHTML = createPaginationItems(totalItems, currentPage);
  
  const paginationButtons = paginationContainer.querySelectorAll('.catalog__pagination-link');
  paginationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.getAttribute('data-page'));
      handlePageChange(page);
    });
  });
};

const handlePageChange = (page) => {
  setCurrentPage(page);
  
  if (window.updateCatalogDisplay) {
    window.updateCatalogDisplay();
  }
};

