// carousel.js

const images = [
  'oasi_sketch_bw.jpg',
  'oasi_green.jpg',
  'oasi_green_nav.jpg',
  'oasi_winter_nav.jpg'
];

let currentImage = 0;
let interval;

const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');

function showImage(index) {
  currentImage = index;
  mainImage.src = images[index];
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

function startSlideshow() {
  interval = setInterval(() => {
    currentImage = (currentImage + 1) % images.length;
    showImage(currentImage);
  }, 6000);
}

function stopSlideshow() {
  clearInterval(interval);
}

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    stopSlideshow();
    showImage(index);
    startSlideshow();
  });
});

function checkThumbnailScroll() {
  const thumbnailRow = document.querySelector('.thumbnail-row');
  if (!thumbnailRow) return;

  console.log('clientWidth:', thumbnailRow.clientWidth, 'scrollWidth:', thumbnailRow.scrollWidth);

  if (thumbnailRow.scrollWidth > thumbnailRow.clientWidth) {
    thumbnailRow.classList.add('has-scroll');
    console.log('✅ has-scroll aggiunta');
  } else {
    thumbnailRow.classList.remove('has-scroll');
    console.log('❌ has-scroll rimossa');
  }
}

// Controlla all'avvio, e anche al resize
window.addEventListener('load', checkThumbnailScroll);
window.addEventListener('resize', checkThumbnailScroll);



// Inizializzazione
showImage(currentImage);
startSlideshow();
