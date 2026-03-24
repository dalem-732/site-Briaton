import { getAllProducts, createProductCard } from './catalog.js';
import { initTooltips } from './tooltip.js';
import { initBasketButtons } from './basket.js';

let swiperInstance = null;

const createDayProductSlides = () => {
  const products = getAllProducts();
  const dayProducts = products.filter(product => product.goodsOfDay === true);
  const sliderList = document.querySelector('.day-products__list');
  
  if (!sliderList) return;
  
  sliderList.innerHTML = '';
  
  dayProducts.forEach(product => {
    const slide = document.createElement('li');
    slide.className = 'day-products__item swiper-slide';
    
    const cardHTML = createProductCard(product);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cardHTML;
    const catalogItem = tempDiv.querySelector('.catalog__item');
    
    if (catalogItem) {
      const cardElement = catalogItem.querySelector('.product-card');
      if (cardElement) {
        cardElement.classList.add('product-card--small');
        slide.appendChild(cardElement);
      }
    }
    
    sliderList.appendChild(slide);
  });
  
  setTimeout(() => {
    initTooltips();
    initBasketButtons();
  }, 0);
};

const initSwiper = () => {
  const sliderContainer = document.querySelector('.day-products__slider');
  
  if (!sliderContainer || swiperInstance) return;
  
  swiperInstance = new Swiper('.day-products__slider', {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
      nextEl: '.day-products__navigation-btn--next',
      prevEl: '.day-products__navigation-btn--prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 25
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    }
  });
};

export const initDayProductsSlider = () => {
  createDayProductSlides();
  initSwiper();
};

