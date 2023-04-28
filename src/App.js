import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
// import { Draggable } from "react-draggable";
import { useDrag } from "@use-gesture/react";
import { useThree } from "react-three-fiber";
import "./App.css";

function Chair(props) {
  const chairRef = useRef();
  const { camera } = useThree();

  const scene = useGLTF("/assets/chair.glb");
  const chairScene = scene.scene;

  chairScene.scale.set(0.5, 0.5, 0.5);
  const bind = useDrag(({ offset: [x, y] }) => {
    chairRef.current.position.x = x;
    chairRef.current.position.y = y;
  });
  console.log(chairScene);
  // Set up event listeners for the chair object

  return <primitive object={chairScene} ref={chairRef} />;
}

function Model(props) {
  const scene1 = useGLTF("/assets/poly.glb");
  const houseScene = scene1?.scene;

  return (
    <>
      <primitive object={houseScene} />
      <Chair housePosition={houseScene.position} />
    </>
  );
}
function App() {
  return (
    <div className="App">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45 }}
        // camera={{ rotation: [-Math.PI / 2, 0, 0] }}
        // rotation={[-Math.PI / 2, 0, 0]}
        style={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
        }}
      >
        <color attach="background" args={["#000000"]} />
        <PresentationControls
          speed={1.5}
          global
          zoom={0.5}
          makeDefault={false}
          // polar={[-0.1, Math.PI / 4]}
        >
          <Stage environment={null}>
            <Model scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
}

export default App;
