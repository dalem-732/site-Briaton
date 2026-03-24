export const initLocation = () => {
  const locationBtn = document.querySelector('.location__city');
  const locationName = document.querySelector('.location__city-name');
  const locationLinks = document.querySelectorAll('.location__sublink');

  if (!locationBtn || !locationName) return;

  locationBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    locationBtn.classList.toggle('location__city--active');
  });

  locationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cityName = link.textContent.trim();
      locationName.textContent = cityName;
      locationBtn.classList.remove('location__city--active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!locationBtn.contains(e.target)) {
      locationBtn.classList.remove('location__city--active');
    }
  });
};

