import { getAllProducts } from './catalog.js';

const createTooltipContent = (product) => {
  const tooltipContent = document.createElement('div');
  tooltipContent.className = 'tooltip__content';
  
  const text = document.createElement('span');
  text.className = 'tooltip__text';
  text.textContent = 'Наличие товара по городам:';
  
  const list = document.createElement('ul');
  list.className = 'tooltip__list';
  
  const cities = [
    { key: 'moscow', name: 'Москва' },
    { key: 'orenburg', name: 'Оренбург' },
    { key: 'saintPetersburg', name: 'Санкт-Петербург' }
  ];
  
  cities.forEach(city => {
    const item = document.createElement('li');
    item.className = 'tooltip__item';
    
    const itemText = document.createElement('span');
    itemText.className = 'tooltip__text';
    itemText.innerHTML = `${city.name}: <span class="tooltip__count">${product.availability[city.key]}</span>`;
    
    item.appendChild(itemText);
    list.appendChild(item);
  });
  
  tooltipContent.appendChild(text);
  tooltipContent.appendChild(list);
  
  return tooltipContent;
};

export const initTooltips = () => {
  const tooltipButtons = document.querySelectorAll('.tooltip__btn[data-id]');
  const products = getAllProducts();
  
  tooltipButtons.forEach(button => {
    const productId = parseInt(button.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    if (button._tippy) {
      button._tippy.destroy();
    }
    
    const tooltipContent = createTooltipContent(product);
    
    tippy(button, {
      content: tooltipContent.innerHTML,
      allowHTML: true,
      placement: 'top',
      theme: 'light',
      interactive: false,
    });
  });
};

