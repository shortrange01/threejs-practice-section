import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";


// let cursorX = 0;
// let cursorY = 0;

// window.addEventListener("mousemove", (event) => {
//   cursorX = event.clientX / sizes.width - 0.5;
//   cursorY = event.clientY / sizes.height - 0.5;
// });

//サイズ
const sizes = {
  width: 800,
  height: 600,
};

//シーン
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const materila = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  wireframe: false,
});

//オブジェクト
const mesh = new THREE.Mesh(geometry, materila);
scene.add(mesh);

//カメラ
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 3000);

camera.position.z = 3;
scene.add(camera);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

// カメラ制御
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//アニメーション
const animate = () => {
  // カメラ制御
  // camera.position.x = cursorX * 3;
  // camera.position.y = cursorY * 3;
  // camera.position.x = Math.sin(Math.PI * 2 * cursorX) * 3;
  // camera.position.z = Math.cos(Math.PI * 2 * cursorX) * 3;
  // camera.position.y = cursorY * 5;
  // camera.lookAt(mesh.position);

  controls.update();
  //レンダリング
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
