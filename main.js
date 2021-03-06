import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(50)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0x1167b1 })

const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight)
scene.add(ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
const controls = new OrbitControls(camera, renderer.domElement)



function animate() {
  torus.rotation.x += 0.01
  torus.rotation.z += 0.01
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

function addStar() {
  const stargeo = new THREE.SphereGeometry(0.25, 24, 24)
  const starmat = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const start = new THREE.Mesh(stargeo, starmat)
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  start.position.set(x, y, z)
  scene.add(start)
}
Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('star.jpg')
scene.background = spaceTexture



animate()