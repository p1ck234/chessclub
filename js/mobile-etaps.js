const mobileSlides = document.querySelector(".mobile-slides");
const mobilePrevBtn = document.querySelector(".mobile-prev");
const mobileNextBtn = document.querySelector(".mobile-next");
const mobileDots = document.querySelectorAll(".mobile-dot");

let mobileIndex = 0;
const mobileTotalSlides = mobileSlides.children.length;

function mobileGoToSlide(idx) {
  const slideWidth = mobileSlides.children[0].offsetWidth;
  mobileSlides.style.transform = `translateX(-${idx * slideWidth}px)`;
  mobileDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === idx);
  });
  mobileUpdateButtonStates();
}

function mobileUpdateButtonStates() {
  mobilePrevBtn.disabled = mobileIndex === 0;
  mobileNextBtn.disabled = mobileIndex === mobileTotalSlides - 1;

  if (mobilePrevBtn.disabled) {
    mobilePrevBtn.classList.add("mobile-button-disabled");
  } else {
    mobilePrevBtn.classList.remove("mobile-button-disabled");
  }

  if (mobileNextBtn.disabled) {
    mobileNextBtn.classList.add("mobile-button-disabled");
  } else {
    mobileNextBtn.classList.remove("mobile-button-disabled");
  }
}

mobilePrevBtn.addEventListener("click", () => {
  if (mobileIndex > 0) {
    mobileIndex--;
    mobileGoToSlide(mobileIndex);
  }
});

mobileNextBtn.addEventListener("click", () => {
  if (mobileIndex < mobileTotalSlides - 1) {
    mobileIndex++;
    mobileGoToSlide(mobileIndex);
  }
});

mobileDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    mobileIndex = i;
    mobileGoToSlide(mobileIndex);
  });
});

mobileGoToSlide(mobileIndex);
mobileUpdateButtonStates();
