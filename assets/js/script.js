document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const projectItems = document.querySelectorAll("[data-category]");
  
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const selectedFilter = button.getAttribute("data-filter");
  
        filterButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });
  
        button.classList.add("active");
  
        projectItems.forEach(function (item) {
          const projectCategory = item.getAttribute("data-category");
  
          if (selectedFilter === "tutti") {
            item.classList.remove("hide-project");
          } else if (projectCategory === selectedFilter) {
            item.classList.remove("hide-project");
          } else {
            item.classList.add("hide-project");
          }
        });
      });
    });
  });