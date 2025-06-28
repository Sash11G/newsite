document.addEventListener("DOMContentLoaded", () => {
  console.log("Theme script loaded and DOM is ready.");

  const themeMap = {
    dark: "solar",
    solar: "dark"
  };

  const darkSky = document.querySelector(".sky-dark");
  const lightSky = document.querySelector(".sky-light");
  
  
  const themeLink = document.getElementById("theme-style");

  const stylesheetMap = {
    dark: themeLink.getAttribute("data-dark"),
    solar: themeLink.getAttribute("data-solar")
  };

  // Get theme from localStorage or set default to 'dark'
  let theme = localStorage.getItem("theme");
  if (!theme || !themeMap.hasOwnProperty(theme)) {
    theme = "dark";
    localStorage.setItem("theme", theme);
  }

  
  
  // Apply the current theme to the document
  document.documentElement.classList.add(theme);
  
  updateSky(); // 👈 Call this here!

  // Apply the corresponding CSS
  if (themeLink) {
    themeLink.href = stylesheetMap[theme];
  }

  function updateSky() {
    const skydark = document.querySelector(".sky-dark");
    const skylight = document.querySelector(".sky-light");

    if (!darkSky || !lightSky) {
      console.warn("Skies not found");
      return;
    }
  
    if (theme === "dark") {
      darkSky.classList.add("visible");
      darkSky.classList.remove("hidden");
  
      lightSky.classList.add("hidden");
      lightSky.classList.remove("visible");
  
      if (typeof initDarkSky === "function") {
        initDarkSky(darkSky);
      }
  
    } else {
      lightSky.classList.add("visible");
      lightSky.classList.remove("hidden");
  
      darkSky.classList.add("hidden");
      darkSky.classList.remove("visible");
  
      if (typeof initLightSky === "function") {
        initLightSky(lightSky);
      }
    }
  }


  document.querySelector('.custom-scroll-arrow')?.addEventListener('click', () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });
  // Define the toggle function
  function toggleTheme() {
    const nextTheme = themeMap[theme];
    document.documentElement.classList.replace(theme, nextTheme);
    theme = nextTheme;
    localStorage.setItem("theme", theme);

    // Swap stylesheet
    if (themeLink) {
      themeLink.href = stylesheetMap[nextTheme];
    }
    
    updateSky();

  }

  // Attach the toggle function to the button
  const themeButton = document.getElementById("themeButton");
  if (themeButton) {
    themeButton.onclick = toggleTheme;

  }
});
