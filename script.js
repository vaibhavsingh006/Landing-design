function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const icon = document.getElementById("menuIcon");

  if (menu.classList.contains("max-h-0")) {
    menu.classList.remove("max-h-0", "opacity-0");
    menu.classList.add("max-h-screen", "opacity-100");

    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    menu.classList.remove("max-h-screen", "opacity-100");
    menu.classList.add("max-h-0", "opacity-0");

    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
}

// dropdown
const buttons = document.querySelectorAll(".accordion-btn");
const contents = document.querySelectorAll(".accordion-content");
const image = document.getElementById("specialistImage");

const images = {
  "aged-care": "./assets/img.jpg",
  complex: "./assets/img2.jpg",
  hospital: "./assets/img3.jpg",
  "home-care": "./assets/img4.jpg",
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("text-blue-800", "border-b-2"));
    buttons.forEach((b) => b.classList.add("border-b", "font-semibold"));
    contents.forEach((c) => c.classList.add("hidden"));

    btn.classList.add("text-blue-800");
    const content = btn.nextElementSibling;
    content.classList.remove("hidden");
    btn.classList.remove("border-b");
    content.classList.add("border-b-2", "border-[#75A5D6]", "pb-2");

    const target = btn.getAttribute("data-target");
    image.src = images[target];
  });
});

const slides = [
  {
    image: "./assets/img4.jpg",
    title: "Etac Prio: Design with care, customise to user's ability.",
    description:
      "The Etac Prio wheelchair provides a high level of customisation, adaptability and care for users. This tilt in space and reclining wheelchair allows for frequent repositioning and long term seating.",
  },
  {
    image: "./assets/img5.jpg",
    title: "Comfortable Patient Beds",
    description:
      "Designed for maximum patient comfort and hospital efficiency.",
  },
  {
    image: "./assets/img6.jpeg",
    title: "Advanced Care Solutions",
    description: "Innovative healthcare solutions tailored to every need.",
  },
];

let currentIndex = 0;

function showProductSlide(index) {
  const slide = slides[index];

  const img = document.getElementById("slide-image");
  const title = document.getElementById("slide-title");
  const desc = document.getElementById("slide-desc");

  [img, title, desc].forEach((el) => el.classList.add("opacity-0"));

  setTimeout(() => {
    img.src = slide.image;
    title.textContent = slide.title;
    desc.textContent = slide.description;

    [img, title, desc].forEach((el) => el.classList.remove("opacity-0"));
  }, 300);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showProductSlide(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showProductSlide(currentIndex);
}

showProductSlide(currentIndex);

setInterval(() => {
  nextSlide();

  autoSlide = setInterval(() => {
    nextSlide();
  }, 5000);
  clearInterval(autoSlide);
}, 5000);

// Testimonial Slider
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("testimonial-track");
  const slides = Array.from(track.children);
  const dotsContainer = document.getElementById("testimonial-dots");

  let slidesPerView = getSlidesPerView();
  let currentPage = 0;
  let totalPages = Math.ceil(slides.length / slidesPerView);
  let autoplayId = null;
  const AUTOPLAY_INTERVAL = 5000;

  function getSlidesPerView() {
    if (window.matchMedia("(min-width:1024px)").matches) return 3; // lg
    if (window.matchMedia("(min-width:768px)").matches) return 2; // md
    return 1;
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.className = "w-3 h-3 rounded-full bg-gray-300";
      dot.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    Array.from(dotsContainer.children).forEach((dot, i) => {
      dot.classList.toggle("bg-[#006FDE]", i === currentPage);
      dot.classList.toggle("bg-gray-300", i !== currentPage);
    });
  }

  function showPage(page) {
    slidesPerView = getSlidesPerView();
    totalPages = Math.ceil(slides.length / slidesPerView);

    const slideWidth = slides[0].getBoundingClientRect().width;
    const moveX = page * slideWidth * slidesPerView;
    track.style.transform = `translateX(-${moveX}px)`;
    updateDots();
  }

  function nextPage() {
    currentPage = (currentPage + 1) % totalPages;
    showPage(currentPage);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(nextPage, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  window.addEventListener("resize", () => {
    slidesPerView = getSlidesPerView();
    totalPages = Math.ceil(slides.length / slidesPerView);
    createDots();
    if (currentPage >= totalPages) currentPage = totalPages - 1;
    showPage(currentPage);
  });

  createDots();
  showPage(0);
  startAutoplay();
});
