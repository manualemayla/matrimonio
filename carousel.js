const images = [
  'oasi_sketch_bw.jpg',
  'oasi_green.jpg',
  'oasi_green_nav.jpg',
  'oasi_winter_nav.jpg'
];

let currentImage = 0;
let interval;

let mainImage;
let thumbnails;

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

window.addEventListener('load', () => {
  mainImage = document.getElementById('mainImage');
  thumbnails = document.querySelectorAll('.thumbnail');

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      stopSlideshow();
      showImage(index);
      startSlideshow();
    });
  });

  showImage(currentImage);
  startSlideshow();

  checkThumbnailScroll();
});

window.addEventListener('resize', checkThumbnailScroll);
