// static/js/title3d.js
console.log("▶ title3d.js loaded, THREE is", typeof THREE);

document.addEventListener("DOMContentLoaded", () => {
  // Grab the canvas
  const canvas = document.getElementById("title-3d");

  // Scene and camera
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.set(0, 0, 50);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });

  // Handle resizing
  function resizeRenderer() {
    const width  = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(0, 50, 50);
  scene.add(dirLight);

  // Load font and create extruded text
  const loader = new THREE.FontLoader();
  loader.load('/static/fonts/helvetiker_regular.typeface.json', font => {
    const textGeo = new THREE.TextGeometry('Your Title Here', {
      font:          font,
      size:          5,
      height:        1.5,
      curveSegments: 12,
      bevelEnabled:  true,
      bevelThickness:0.2,
      bevelSize:     0.1,
      bevelOffset:   0,
      bevelSegments: 5
    });

    // Center geometry around origin
    textGeo.center();

    const mat  = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(textGeo, mat);
    scene.add(mesh);

    // Animation loop
    (function animate() {
      requestAnimationFrame(animate);
      resizeRenderer();
      mesh.rotation.y += 0.005;    // slow spin
      renderer.render(scene, camera);
    })();
  });
});
