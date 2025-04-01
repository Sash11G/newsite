document.addEventListener("DOMContentLoaded", () => {

    window.scrollTo(0, 0);

    const cloudsContainer = document.querySelector(".clouds");
  
    // Create a cloud
    function createCloud(initial = false) {
      const cloud = document.createElement("div");
      cloud.classList.add("cloud");
  
      // Random vertical position
      const top = Math.random() * 140 + 10; // 10vh to 70vh
      cloud.style.top = `${top}vh`;
  
    // Base size + random variation
      const baseWidth = 100;
      const scale = 0.8 + Math.random() * 1.2;
      const width = baseWidth * scale;
      const height = 60 * scale;

      cloud.style.width = `${width}px`;
      cloud.style.height = `${height}px`;
  
      // Random animation duration and delay
      const duration = 35 + Math.random() * 35; // 30s to 60s
      const delay = initial
        ? `-${Math.random() * duration}s` // some clouds already in view
        : `${Math.random() * 5}s`;       // slight delay for new ones
  
      cloud.style.animationDuration = `${duration}s`;
      cloud.style.animationDelay = delay;
  
      // Start just off-screen left
      cloud.style.left = "-400px";
  
      // Remove cloud when animation ends
      cloud.addEventListener("animationend", () => cloud.remove());
  
      cloudsContainer.appendChild(cloud);
    }
  
    // Create initial clouds
    for (let i = 0; i < 8; i++) {
      createCloud(true);
    }
  
    // Create a new cloud every few seconds
    setInterval(() => {
      createCloud();
    }, 2000);
  });
  