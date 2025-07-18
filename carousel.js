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

// Funzione per aggiornare la classe has-scroll sul wrapper, non sulla thumbnail-row
function checkThumbnailScroll() {
  const wrapper = document.querySelector('.thumbnail-wrapper');
  if (!wrapper) return;

  const thumbnailRow = wrapper.querySelector('.thumbnail-row');
  if (!thumbnailRow) return;

  console.log('clientWidth:', thumbnailRow.clientWidth, 'scrollWidth:', thumbnailRow.scrollWidth);

  if (thumbnailRow.scrollWidth > thumbnailRow.clientWidth) {
    wrapper.classList.add('has-scroll');
    console.log('✅ has-scroll aggiunta su wrapper');
  } else {
    wrapper.classList.remove('has-scroll');
    console.log('❌ has-scroll rimossa su wrapper');
  }
}

// Qui aspettiamo che il DOM sia pronto prima di iniziare tutto
window.addEventListener('load', () => {
  // Inizializza il carosello: mostra immagine iniziale e avvia slideshow
  showImage(currentImage);
  startSlideshow();

  // Controlla se serve la sfumatura scroll (has-scroll)
  checkThumbnailScroll();
});

// Ricalcola la sfumatura al ridimensionamento finestra
window.addEventListener('resize', checkThumbnailScroll);




// Inizializzazione
showImage(currentImage);
startSlideshow();
