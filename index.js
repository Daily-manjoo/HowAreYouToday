var slides = document.querySelector(".new-item-list"),
  slide = document.querySelectorAll(".new-item-list li"),
  currentIdx = 0,
  slideCount = slide.length,
  prevBtn = document.querySelector("#prev"),
  slideWidth = 250,
  slideMargin = 100,
  nextBtn = document.querySelector("#next");

slides.style.width = (slideWidth + slideMargin) * slideCount - slideMargin + "px";
