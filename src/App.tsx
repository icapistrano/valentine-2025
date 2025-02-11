import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Hearts } from "./components/Hearts";
import { Bouquet } from "./components/Bouquet";
import { Flowers } from "./components/Flowers";
import { BloodSplatter } from "./components/BloodSplatter";
import { HelperMessages } from "./components/HelperMessages";
import { ThoughtMessage } from "./components/ThoughtMessage";
import { DeviceHandler } from "./components/DeviceHandler";
import { ValentineText } from "./components/ValentineText";

function App() {
  const [showBloodAnimation, setshowBloodAnimation] = useState(false);

  const [flowersClicked, setFlowersClicked] = useState(0);
  const showValentineQuestion = flowersClicked === 3;
  const updateFlowers = () =>
    setFlowersClicked(Math.min(flowersClicked + 1, 3));

  useEffect(() => {
    if (!showBloodAnimation) return;

    // reset
    setTimeout(() => {
      setFlowersClicked(0);
    }, 4000);

    // reset everything
    setTimeout(() => {
      setshowBloodAnimation(false);
    }, 8000);
  }, [showBloodAnimation]);

  return (
    <div className="canvas-bg h-screen w-full">
      {showBloodAnimation && <BloodSplatter />}

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.4} />
        <directionalLight intensity={1} position={[-1, 1, 1]} />

        <DeviceHandler>
          <Bouquet
            position={[-1.25, 0.5, 0]}
            rotation={[(Math.PI / 180) * 45, Math.PI / 4, 0]}
            showAnimation={showValentineQuestion}
            showNumFlowers={flowersClicked}
          />
          <Flowers
            onClick={updateFlowers}
            isClickable={!showValentineQuestion}
          />
          <ValentineText show={showValentineQuestion} />
          {showValentineQuestion && (
            <Hearts onClick={() => setshowBloodAnimation(true)} />
          )}

          {showValentineQuestion && (
            <ThoughtMessage
              message={"Click on one of the heart ❤️.."}
              position={[2, 0.6, 0]}
              isVisible
              offsetY={0.4}
              delay={1000}
            />
          )}

          {!showValentineQuestion && <HelperMessages />}
        </DeviceHandler>
      </Canvas>
    </div>
  );
}

export default App;
