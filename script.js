// Updated JavaScript with dark mode support for new Works section

document.addEventListener('DOMContentLoaded', function() {
  // Always enable dark mode
  document.body.classList.add('dark-mode');
  
  // Add dark-mode class to elements
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  const about = document.querySelector('#about');
  const technologies = document.querySelector('#technologies');
  const works = document.querySelector('#works');
  const techItems = document.querySelectorAll('.tech-item');
  const workItems = document.querySelectorAll('.work-item');
  const footer = document.querySelector('footer');

  if (header) header.classList.add('dark-mode');
  if (hero) hero.classList.add('dark-mode');
  if (about) about.classList.add('dark-mode');
  if (technologies) technologies.classList.add('dark-mode');
  if (works) works.classList.add('dark-mode');
  if (footer) footer.classList.add('dark-mode');

  if (techItems) {
    techItems.forEach(item => {
      item.classList.add('dark-mode');
    });
  }
  if (workItems) {
    workItems.forEach(item => {
      item.classList.add('dark-mode');
    });
  }

  // Ensure text in hero section is visible
  const heroHeading = document.querySelector('.hero h2');
  const heroParagraph = document.querySelector('.hero p');
  const outlinedButton = document.querySelector('.outlined-button');

  if (heroHeading) heroHeading.style.color = '#FFFFFF';
  if (heroParagraph) heroParagraph.style.color = '#FFFFFF';
  if (outlinedButton) {
    outlinedButton.style.color = '#9381FF';
    outlinedButton.style.borderColor = '#9381FF';
  }

  // Works carousel drag-to-scroll functionality
  const worksCarousel = document.querySelector('.works-carousel');
  let isDown = false;
  let startX;
  let scrollLeft;

  if (worksCarousel) {
    worksCarousel.addEventListener('mousedown', (e) => {
      isDown = true;
      worksCarousel.classList.add('dragging');
      startX = e.pageX - worksCarousel.offsetLeft;
      scrollLeft = worksCarousel.scrollLeft;
    });
    worksCarousel.addEventListener('mouseleave', () => {
      isDown = false;
      worksCarousel.classList.remove('dragging');
    });
    worksCarousel.addEventListener('mouseup', () => {
      isDown = false;
      worksCarousel.classList.remove('dragging');
    });
    worksCarousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - worksCarousel.offsetLeft;
      const walk = (x - startX) * 1.5; // scroll-fast
      worksCarousel.scrollLeft = scrollLeft - walk;
    });
    // Touch events for mobile
    worksCarousel.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - worksCarousel.offsetLeft;
      scrollLeft = worksCarousel.scrollLeft;
    });
    worksCarousel.addEventListener('touchend', () => {
      isDown = false;
    });
    worksCarousel.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - worksCarousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      worksCarousel.scrollLeft = scrollLeft - walk;
    });
  }

  // Snap-to-center for works carousel
  function centerClosestWorkItem() {
    if (!worksCarousel) return;
    const items = worksCarousel.querySelectorAll('.work-item');
    const carouselRect = worksCarousel.getBoundingClientRect();
    let closestItem = null;
    let closestDistance = Infinity;
    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const carouselCenter = carouselRect.left + carouselRect.width / 2;
      const distance = Math.abs(itemCenter - carouselCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = item;
      }
    });
    if (closestItem) {
      const itemRect = closestItem.getBoundingClientRect();
      const scrollLeft = closestItem.offsetLeft - (worksCarousel.offsetWidth / 2 - itemRect.width / 2);
      worksCarousel.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }
  if (worksCarousel) {
    worksCarousel.addEventListener('mouseup', centerClosestWorkItem);
    worksCarousel.addEventListener('touchend', centerClosestWorkItem);
  }
});