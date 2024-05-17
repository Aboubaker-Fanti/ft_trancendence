const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box .icon"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

      toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
      });
      
      searchBtn.addEventListener("click", () => {
        sidebar.classList.toggle("close");
      });
      
      modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");
      });