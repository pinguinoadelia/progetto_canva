document.addEventListener("DOMContentLoaded", function () {
  const galleries = document.querySelectorAll("[data-gallery]");

  galleries.forEach(function (gallery) {
    const folder = gallery.dataset.folder;
    const count = parseInt(gallery.dataset.count, 10);
    const title = gallery.dataset.title || "Progetto";
    const pdfPath = gallery.dataset.pdf;

    let currentSlide = 1;

    function formatSlideNumber(number) {
      return String(number).padStart(3, "0");
    }

    function getSlidePath(number) {
      return `../assets/img/${folder}/slide_${formatSlideNumber(number)}.jpg`;
    }

    gallery.innerHTML = `
      <div class="gallery-viewer">
        <button class="gallery-arrow gallery-arrow-left" type="button" aria-label="Slide precedente">
          ‹
        </button>

        <div class="gallery-image-wrapper">
          <img 
            src="${getSlidePath(currentSlide)}" 
            alt="${title} - slide ${currentSlide}" 
            class="gallery-image"
          >
        </div>

        <button class="gallery-arrow gallery-arrow-right" type="button" aria-label="Slide successiva">
          ›
        </button>
      </div>

      <div class="gallery-controls">
        <span class="gallery-counter">
          Slide <strong class="current-slide">${currentSlide}</strong> di <strong>${count}</strong>
        </span>

        ${
          pdfPath
            ? `<a href="${pdfPath}" class="btn btn-pink gallery-download-btn" download>
                Scarica PDF originale
              </a>`
            : ""
        }
      </div>
    `;

    const image = gallery.querySelector(".gallery-image");
    const prevButton = gallery.querySelector(".gallery-arrow-left");
    const nextButton = gallery.querySelector(".gallery-arrow-right");
    const currentSlideText = gallery.querySelector(".current-slide");

    function updateSlide() {
      image.src = getSlidePath(currentSlide);
      image.alt = `${title} - slide ${currentSlide}`;
      currentSlideText.textContent = currentSlide;
    }

    prevButton.addEventListener("click", function () {
      currentSlide--;

      if (currentSlide < 1) {
        currentSlide = count;
      }

      updateSlide();
    });

    nextButton.addEventListener("click", function () {
      currentSlide++;

      if (currentSlide > count) {
        currentSlide = 1;
      }

      updateSlide();
    });
  });
});