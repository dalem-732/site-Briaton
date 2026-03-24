export const initAccordion = () => {
  const accordionButtons = document.querySelectorAll('.accordion__btn');
  
  if (accordionButtons.length === 0) return;
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isActive = button.classList.contains('accordion__btn--active');
      
      accordionButtons.forEach(btn => {
        btn.classList.remove('accordion__btn--active');
      });
      
      if (!isActive) {
        button.classList.add('accordion__btn--active');
      }
    });
  });
};

