("");
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function render(
  canvas: HTMLCanvasElement,
  over: HTMLDivElement,
) {
  const scene = new THREE.Scene();

  // カメラ
  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  );
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.autoRotate = true;

  camera.position.set(
    controls.target.x,
    controls.target.y + 40,
    controls.target.z - 40,
  );

  // レンダラー
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });

  // ライト
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 0.2);
  pointLight.position.set(1, 2, 3);
  scene.add(pointLight);

  const geometry = new THREE.BoxGeometry();

  for (let i = 0; i < 100; i++) {
    const object = new THREE.Mesh(
      geometry,
      new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }),
    );

    object.position.x = Math.random() * 40 - 20;
    object.position.y = Math.random() * 40 - 20;
    object.position.z = Math.random() * 40 - 20;

    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;

    object.scale.x = Math.random() + 0.5;
    object.scale.y = Math.random() + 0.5;
    object.scale.z = Math.random() + 0.5;

    scene.add(object);
  }

  // アニメーション
  //const clock = new THREE.Clock();
  const animate = () => {
    window.requestAnimationFrame(animate);
    render();
  };
  const render = () => {
    controls.update();
    renderer.render(scene, camera);
  };
  const resize = () => {
    const width = over.offsetWidth;
    const height = over.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
  };

  // ブラウザのリサイズ処理
  window.addEventListener("resize", () => resize());
  resize();
  animate();
}
