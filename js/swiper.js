const swiperContainer = document.querySelector(".swiper-container");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const swiperSlides = document.querySelectorAll(".swiper-slide");
const nextButton = document.querySelector(".swiper-button-next");
const prevButton = document.querySelector(".swiper-button-prev");
const paginationCurrent = document.querySelector(".swiper-pagination .current");
const paginationTotal = document.querySelector(".swiper-pagination .total");

let currentSlide = 0;
let slidesToShow = 3;
let autoplayInterval;

function updateSlidesToShow() {
  if (window.innerWidth <= 900) {
    slidesToShow = 1;
  } else if (window.innerWidth <= 1366) {
    slidesToShow = 2;
  } else {
    slidesToShow = 3;
  }
  goToSlide(0);
}

function goToSlide(slideIndex) {
  if (slideIndex >= 0 && slideIndex <= swiperSlides.length - slidesToShow) {
    currentSlide = slideIndex;
    swiperSlides.forEach((slide, index) => {
      slide.style.display = index >= currentSlide && index < currentSlide + slidesToShow ? 'flex' : 'none';
    });
    updatePagination();
    updateButtons();
  }
}

function updatePagination() {
  const totalSlides = swiperSlides.length;
  const currentPageSlides = Math.min(slidesToShow, totalSlides - currentSlide);
  paginationCurrent.textContent = currentSlide + currentPageSlides;
  paginationTotal.textContent = totalSlides;
}

function updateButtons() {
  if (currentSlide === 0) {
    prevButton.disabled = true;
    prevButton.classList.add("swiper-button-disabled");
  } else {
    prevButton.disabled = false;
    prevButton.classList.remove("swiper-button-disabled");
  }

  if (currentSlide >= swiperSlides.length - slidesToShow) {
    nextButton.disabled = true;
    nextButton.classList.add("swiper-button-disabled");
  } else {
    nextButton.disabled = false;
    nextButton.classList.remove("swiper-button-disabled");
  }
}

nextButton.addEventListener("click", () => {
  goToSlide(currentSlide + slidesToShow);
  restartAutoplay();
});

prevButton.addEventListener("click", () => {
  goToSlide(currentSlide - slidesToShow);
  restartAutoplay();
});

window.addEventListener("resize", updateSlidesToShow);

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    if (currentSlide < swiperSlides.length - slidesToShow) {
      goToSlide(currentSlide + slidesToShow);
    } else {
      goToSlide(0);
    }
  }, 4000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

function restartAutoplay() {
  stopAutoplay();
  startAutoplay();
}

updateSlidesToShow();

updatePagination();
updateButtons();

startAutoplay();

swiperContainer.addEventListener("mouseenter", stopAutoplay);
swiperContainer.addEventListener("mouseleave", startAutoplay);
