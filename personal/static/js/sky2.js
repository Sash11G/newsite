document.addEventListener("DOMContentLoaded", () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  
  window.scrollTo(0, 0);
  
  const moon = document.getElementById("moon");
  const darkSky = document.querySelector(".sky-dark");
  const lightSky = document.querySelector(".sky-light");
  // track cloud interval state
  let cloudIntervalId = null;
  
    // === DARK SKY LOGIC ===
    window.initDarkSky = function (darkSky) {
      console.log("ololo");
      const phases = [
        "new-moon",
        "crescent-moon",
        "half-moon",
        "gibbous-moon",
        "full-moon",
      ];
      let currentPhase = 0;
  
      const starsContainer = darkSky.querySelector(".stars");
      const movingStarsContainer = darkSky.querySelector(".moving-stars");

      // clear previous stars
      starsContainer.innerHTML = "";
      movingStarsContainer.innerHTML = "";

      if (cloudIntervalId !== null) {
        clearInterval(cloudIntervalId);
        cloudIntervalId = null;
      }
      

      const numStars = 1000;
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.top = `${Math.random() * 150}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 5 + 2}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
      }
  
      const numMovingStars = 200;
      for (let i = 0; i < numMovingStars; i++) {
        const movingStar = document.createElement("div");
        movingStar.classList.add("moving-star");
        movingStar.style.top = `${Math.random() * 150}vh`;
        movingStar.style.left = `${Math.random() * 100}vw`;
        movingStar.style.animationDuration = `${Math.random() * 10 + 10}s`;
        movingStarsContainer.appendChild(movingStar);
      }
    };
  

    // === LIGHT SKY LOGIC ===
    window.initLightSky = function (lightSky) {
      console.log("obobo");
      const cloudsContainer = lightSky.querySelector(".clouds");
      
      // Clear existing clouds and intervals
      cloudsContainer.innerHTML = "";
      if (cloudIntervalId !== null) {
        clearInterval(cloudIntervalId);
        cloudIntervalId = null;
      }

      function createCloud(initial = false) {
        const cloud = document.createElement("div");
        cloud.classList.add("cloud");
  
        const top = Math.random() * 140 + 10;
        cloud.style.top = `${top}vh`;
  
        const baseWidth = 100;
        const scale = 0.8 + Math.random() * 1.2;
        cloud.style.width = `${baseWidth * scale}px`;
        cloud.style.height = `${60 * scale}px`;
  
        const duration = 35 + Math.random() * 35;
        const delay = initial
          ? `-${Math.random() * duration}s`
          : `${Math.random() * 5}s`;
  
        cloud.style.animationDuration = `${duration}s`;
        cloud.style.animationDelay = delay;
        cloud.style.left = "-400px";
  
        cloud.addEventListener("animationend", () => cloud.remove());
        cloudsContainer.appendChild(cloud);
      }
  
      for (let i = 0; i < 8; i++) {
        createCloud(true);
      }
  
      setInterval(() => {
        createCloud();
      }, 5000);
    };
  
    // === DETECT & INITIALIZE ===
    if (darkSky && darkSky.classList.contains("visible")) {
      initDarkSky(darkSky);
    }
  
    if (lightSky && lightSky.classList.contains("visible")) {
      initLightSky(lightSky);
    }
  });
  