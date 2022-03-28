import "./styles.css";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

function ThreeContainer() {
  const divRef = useRef();
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(500, 500);
    divRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 3;

    let requestID;
    let lastRenderMsStamp;
    function animate(msStamp) {
      requestID = requestAnimationFrame(animate);
      const dT = msStamp - lastRenderMsStamp;
      lastRenderMsStamp = msStamp;
      // console.log(dT);
      const x = msStamp * 1e-3;
      camera.position.x = Math.sin(x);
      camera.position.y = -Math.cos(x);
      cube.rotation.x += 1e-3 * dT;
      cube.rotation.y += 1e-3 * dT;
      renderer.render(scene, camera);
    }
    animate((lastRenderMsStamp = performance.now()));

    return () => {
      cancelAnimationFrame(requestID);
    };
  }, []);
  return (
    <div
      ref={divRef}
      style={{
        background: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    ></div>
  );
}

export default function App() {
  const [showTC, setShowTC] = useState(false);
  return (
    <div className="App">
      <h1 className="color-block">Hello CodeSandbox</h1>
      <p className="color-block">Test Sandbox A</p>
      <p className="color-block">Test Sandbox B</p>
      <p className="color-block">Test Sandbox C</p>
      <p className="color-block">Test Sandbox D</p>
      <p
        className="color-block"
        onClick={() => {
          setShowTC((old) => !old);
        }}
      >
        Test Sandbox E
      </p>
      {showTC && <ThreeContainer />}
    </div>
  );
}
