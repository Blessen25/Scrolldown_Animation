import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Float } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";
import "./App.css";

function BoxModel() {
  const boxRef = useRef<Mesh>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!boxRef.current) return;

    const offset = scroll.offset;

    boxRef.current.rotation.x = offset * Math.PI * 2;
    boxRef.current.rotation.y = offset * Math.PI * 4;
    boxRef.current.position.y = -offset * 2;
    boxRef.current.scale.setScalar(1 + offset * 0.8);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={boxRef} position={[1.5, 0, 0]}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>
    </Float>
  );
}

export default function App() {
  return (
    <main className="page">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 3, 3]} intensity={2} />

        <ScrollControls pages={3} damping={0.2}>
          <BoxModel />

          <Scroll html>
            <section className="section">
              <div className="content">
                <p className="tag">Scroll Experience</p>
                <h1>3D Portfolio</h1>
                <p>
                  A modern interactive website where 3D objects move as the
                  user scrolls.
                </p>
              </div>
            </section>

            <section className="section">
              <div className="content">
                <p className="tag">Interactive Design</p>
                <h1>Scroll Animation</h1>
                <p>
                  The 3D cube rotates, moves, and scales based on scroll
                  position.
                </p>
              </div>
            </section>

            <section className="section">
              <div className="content">
                <p className="tag">Final Section</p>
                <h1>Build Stunning UI</h1>
                <p>
                  You can later replace this cube with a laptop, phone, or 3D
                  model.
                </p>
                <button>Contact Me</button>
              </div>
            </section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </main>
  );
}