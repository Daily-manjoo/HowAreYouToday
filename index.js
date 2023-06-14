var slides = document.querySelector(".new-item-list"),
  slide = document.querySelectorAll(".new-item-list li"),
  currentIdx = 0,
  slideCount = slide.length,
  prevBtn = document.querySelector("#prev"),
  slideWidth = 250,
  slideMargin = 100,
  nextBtn = document.querySelector("#next");

slides.style.width = (slideWidth + slideMargin) * slideCount - slideMargin + "px";

function moveSlide(num) {
  slides.style.left = -num * 330 + "px";
  currentIdx = num;
}

nextBtn.addEventListener("click", function () {
  if (currentIdx < slideCount - 3) {
    moveSlide(currentIdx + 1);
  } else {
    moveSlide(0);
  }
});

prevBtn.addEventListener("click", function () {
  if (currentIdx > 0) {
    moveSlide(currentIdx - 1);
  } else {
    moveSlide(currentIdx < slideCount - 3);
  }
});
