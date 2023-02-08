import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";
import { RectAreaLightHelper } from "./helpers/RectAreaLightHelper.js";

//UIデバッグ
const gui = new dat.GUI();

//サイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = -2;
camera.position.y = 1;
camera.position.z = 4;
scene.add(camera);

//ライト
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 0.2;
ambientLight.visible = false;
scene.add(ambientLight);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
gui.add(ambientLight, "visible").name("AmbientLightVisible");

const directionalLight = new THREE.DirectionalLight(0xeeeeff, 0.6);
// directionalLight.position.set(1, 0.55, 0.5);
directionalLight.visible = false;
scene.add(directionalLight);
gui.add(directionalLight, "visible").name("DirectionalLightVisible");

const hemiSphereLight = new THREE.HemisphereLight(0x0ffff0, 0xffff00, 0.7);
hemiSphereLight.position.set(1, 0.55, 0);
hemiSphereLight.visible = false;
scene.add(hemiSphereLight);
gui.add(hemiSphereLight, "visible").name("HemiSphereLightVisible");

const pointLight = new THREE.PointLight(0xff4000, 0.4, 10, 2);
pointLight.position.set(-1, 0, 1.5);
pointLight.visible = false;
scene.add(pointLight);
gui.add(pointLight, "visible").name("pointLightVisible");

const rectAreaLight = new THREE.RectAreaLight(0x4eff00, 1, 3, 4);
rectAreaLight.position.set(1.5, 0, 1.5);
rectAreaLight.lookAt(0, 0, 0);
rectAreaLight.visible = false;
scene.add(rectAreaLight);
gui.add(rectAreaLight, "visible").name("rectAreaLightVisible");

const spotLight = new THREE.SpotLight(0xffffff, 0.5, 6, Math.PI * 0.1, 0.1, 1);
spotLight.position.set(0, 2, 3);
spotLight.visible = false;
scene.add(spotLight);
gui.add(spotLight, "visible").name("spotLightVisible");

spotLight.target.position.x = 2;
scene.add(spotLight.target);

// helper
const helperFolder = gui.addFolder("Helper");

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.3);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);
helperFolder.add(directionalLightHelper, "visible").name("directionalLightHelperVisible");

const hemiSphereLightHelper = new THREE.HemisphereLightHelper(hemiSphereLight, 0.3);
hemiSphereLightHelper.visible = false;
scene.add(hemiSphereLightHelper);
helperFolder.add(hemiSphereLightHelper, "visible").name("hemiSphereLightHelperVisible");

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.3);
pointLightHelper.visible = false;
scene.add(pointLightHelper);
helperFolder.add(pointLightHelper, "visible").name("pointLightHelperVisible");

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
rectAreaLightHelper.visible = false;
scene.add(rectAreaLightHelper);
helperFolder.add(rectAreaLightHelper, "visible").name("rectAreaLightHelperVisible");

const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0.3);
spotLightHelper.visible = false;
scene.add(spotLightHelper);
window.requestAnimationFrame(() => {
  spotLightHelper.update();
})
helperFolder.add(spotLightHelper, "visible").name("spotLightHelperVisible");

//マテリアル
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.3;

//オブジェクト
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

//コントロール
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
