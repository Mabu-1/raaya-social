document.addEventListener("DOMContentLoaded", () => {
  const servicesNav = document.querySelector(".services-nav");
  const dropdownTrigger = servicesNav.querySelector(".drop-down");
  const dropdown = servicesNav.querySelector(".services-dropdown");
  const dropdownIcon = dropdownTrigger.querySelector(".dropdown-icon");
  const priceLists = document.querySelectorAll(".price-list");
  const faqContents = document.querySelectorAll(".faq-content");

  faqContents.forEach((faqContent) => {
    const plusIcon = faqContent.querySelector(".plus-icon");
    const minusIcon = faqContent.querySelector(".minus-icon");
    const answer = faqContent.querySelector(".answer");

    // Initially hide minus icon and answer
    minusIcon.style.display = "none";
    answer.style.display = "none";

    plusIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      answer.style.display = "block";
      plusIcon.style.display = "none";
      minusIcon.style.display = "inline-block";
    });

    minusIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      answer.style.display = "none";
      plusIcon.style.display = "inline-block";
      minusIcon.style.display = "none";
    });
  });
  // Business Videos Carousel
  const carousel = document.querySelector(".business-videos-content");
  const rightArrow = document.querySelector(".right-arrow");
  const images = document.querySelectorAll(".business-video");
  const totalImages = images.length;
  let currentIndex = 0;

  // Brands Videos Carousel
  const carousel1 = document.querySelector(".brands-videos-content");
  const rightArrow1 = document.querySelector(".right-arrow-1");
  const images1 = document.querySelectorAll(".brands-video");
  const totalImages1 = images1.length;
  let currentIndex1 = 0;

  // Reviews Videos Carousel
  const reviewCarousel = document.querySelector(".reviews-videos-content");
  const reviewVideos = document.querySelectorAll(".reviews-video");
  let isReviewCarouselPaused = false;

  // Reviews Carousel Clone Function
  const cloneReviewVideos = () => {
    reviewVideos.forEach((video) => {
      const clone = video.cloneNode(true);
      reviewCarousel.appendChild(clone);
    });
  };

  // Reviews Carousel Slide Function
  const slideReviewCarousel = () => {
    if (isReviewCarouselPaused) return;

    reviewCarousel.style.transition = "transform 0.3s ease-in-out";
    reviewCarousel.style.transform = `translateX(-${
      reviewVideos[0].offsetWidth + 24
    }px)`;

    setTimeout(() => {
      reviewCarousel.style.transition = "none";
      reviewCarousel.appendChild(reviewCarousel.firstElementChild);
      reviewCarousel.style.transform = "translateX(0)";
    }, 1000);
  };

  // Dropdown Functionality
  dropdownTrigger.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("show");
    dropdownIcon.classList.toggle("active");
  });

  // Price List Functionality
  priceLists.forEach((priceList) => {
    priceList.addEventListener("click", (e) => {
      e.preventDefault();
      if (priceList.classList.contains("active")) {
        priceList.classList.remove("active");
      } else {
        priceLists.forEach((pl) => pl.classList.remove("active"));
        priceList.classList.add("active");
      }
    });
  });

  // Close Dropdown when Clicking Outside
  document.addEventListener("click", (e) => {
    if (!servicesNav.contains(e.target)) {
      dropdown.classList.remove("show");
      dropdownIcon.classList.remove("active");
    }
  });

  // Original Carousel Move Function
  const moveCarousel = (carousel, images, currentIndex) => {
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    setTimeout(() => {
      carousel.style.transition = "none";
      carousel.appendChild(carousel.firstElementChild);
      carousel.style.transform = "translateX(0)";
    }, 100);
  };

  // Business Videos Carousel Navigation
  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalImages;
    moveCarousel(carousel, images, currentIndex);
  });

  // Brands Videos Carousel Navigation
  rightArrow1.addEventListener("click", () => {
    currentIndex1 = (currentIndex1 + 1) % totalImages1;
    moveCarousel(carousel1, images1, currentIndex1);
  });

  // Reviews Carousel Pause on Hover
  reviewCarousel.addEventListener("mouseenter", () => {
    isReviewCarouselPaused = true;
  });

  reviewCarousel.addEventListener("mouseleave", () => {
    isReviewCarouselPaused = false;
  });

  // Start Reviews Carousel
  cloneReviewVideos();
  setInterval(slideReviewCarousel, 1000);
});
