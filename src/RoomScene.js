import React from "react";
import { Canvas } from "react-three-fiber";
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Draggable } from "react-draggable";
import { FaChair, FaCloudRain } from "react-icons/fa";
const RoomScene = () => {
  const roomRef = useRef();
  const controlsRef = useRef();

  useFrame(() => {
    controlsRef.current.update();
  });

  const onRoomLoad = (gltf) => {
    roomRef.current.add(gltf.scene);
  };

  const onChairLoad = (gltf) => {
    const chair = gltf.scene.children[0];
    chair.position.set(1, 0, 1);
    roomRef.current.add(chair);
  };

  const onCloudRainLoad = (gltf) => {
    const CloudRain = gltf.scene.children[0];
    CloudRain.position.set(-1, 0, -1);
    roomRef.current.add(CloudRain);
  };

  return (
    <group ref={roomRef}>
      <ambientLight intensity={0.2} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <mesh receiveShadow position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <shadowMaterial attach="material" transparent opacity={0.3} />
      </mesh>
      <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.1} />
      <GLTFLoader onLoad={onRoomLoad} args={["./poly.glb"]} />
      <GLTFLoader onLoad={onChairLoad} args={["build/assets/Cog.glb"]} />
      <GLTFLoader
        onLoad={onCloudRainLoad}
        args={["public/yellow_plaster_4k.gltf"]}
      />
      <Draggable>
        <mesh castShadow>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" />
          <FaChair size={20} />
        </mesh>
      </Draggable>
      <Draggable>
        <mesh castShadow>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" />
          <FaCloudRain size={20} />
        </mesh>
      </Draggable>
    </group>
  );
};

export default RoomScene;
