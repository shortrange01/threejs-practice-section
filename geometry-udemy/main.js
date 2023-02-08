import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.17/+esm';

/**
 * UIデバッグ
 */
const gui = new GUI();

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(1, 1, 2);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

/**
 * ジオメトリを作ってみよう。
 **/

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 64);
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 15, 100, Math.PI * 2);

// バッファジオメトリ
const bufferGeometry = new THREE.BufferGeometry();

const count = 200;

const positionArray = new Float32Array(9 * count);

// positionArray[0] = 0;
// positionArray[1] = 0;
// positionArray[2] = 0;

// positionArray[3] = 0;
// positionArray[4] = 1;
// positionArray[5] = 0;

// positionArray[6] = 1;
// positionArray[7] = 0;
// positionArray[8] = 0;

for(let i = 0; i < count * 9; i++) {
  positionArray[i] = (Math.random() - 0.5) * 2;
}

const positionAttribute = new THREE.BufferAttribute(positionArray, 3);

bufferGeometry.setAttribute("position", positionAttribute);

//マテリアル
const material1 = new THREE.MeshNormalMaterial({
  // wireframe: true
});

const material2 = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: "#cc2222"
});

// メッシュ化
const box = new THREE.Mesh(boxGeometry, material1);
const sphere = new THREE.Mesh(sphereGeometry, material1);
const plane = new THREE.Mesh(planeGeometry, material1);
const torus = new THREE.Mesh(torusGeometry, material1);

const buffer = new THREE.Mesh(bufferGeometry, material2);

box.position.z = -4;
sphere.position.x = 1.5;
sphere.position.z = -2;
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
torus.position.x = -1.5;
torus.position.z = -2;

scene.add(box, sphere, plane, torus, buffer);
// scene.add();

//ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);

  //オブジェクトの回転
  // sphere.rotation.x = elapsedTime;
  // plane.rotation.x = elapsedTime;
  // octahedron.rotation.x = elapsedTime;
  // torus.rotation.x = elapsedTime;

  // sphere.rotation.y = elapsedTime;
  // plane.rotation.y = elapsedTime;
  // octahedron.rotation.y = elapsedTime;

  // torus.rotation.y = elapsedTime;

  controls.update();

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

/*
  デバッグ
*/
// フォルダ作成
const boxFolder = gui.addFolder("box");
const sphereFolder = gui.addFolder("sphere");
const torusFolder = gui.addFolder("torus");
const planeFolder = gui.addFolder("plane");
const bufferFolder = gui.addFolder("buffer");
const materialFolder = gui.addFolder("marerial");

boxFolder.add(box.position, "x").min(-5).max(5).step(0.001);
boxFolder.add(box.position, "y").min(-5).max(5).step(0.001);
boxFolder.add(box.position, "z").min(-5).max(5).step(0.001);
boxFolder.add(box.rotation, "x").min(-5).max(5).step(0.001).name("ratationX");
boxFolder.add(box, "visible");

sphereFolder.add(sphere.position, "x").min(-5).max(5).step(0.001);
sphereFolder.add(sphere.position, "y").min(-5).max(5).step(0.001);
sphereFolder.add(sphere.position, "z").min(-5).max(5).step(0.001);
sphereFolder.add(sphere, "visible");

torusFolder.add(torus.position, "x").min(-5).max(5).step(0.001);
torusFolder.add(torus.position, "y").min(-5).max(5).step(0.001);
torusFolder.add(torus.position, "z").min(-5).max(5).step(0.001);
torusFolder.add(torus.rotation, "x").min(-5).max(5).step(0.001).name("ratationX");
torusFolder.add(torus, "visible");

planeFolder.add(plane, "visible");

bufferFolder.add(buffer.position, "x").min(-3).max(3).step(0.001);
bufferFolder.add(buffer.position, "y").min(-3).max(3).step(0.001);
bufferFolder.add(buffer.position, "z").min(-3).max(3).step(0.001);
bufferFolder.add(buffer.rotation, "x").min(-3).max(3).step(0.001).name("ratationX");
bufferFolder.add(buffer, "visible");

materialFolder.add(material1, "wireframe");
materialFolder.add(material2, "wireframe");
materialFolder.addColor(material2, "color");


animate();
