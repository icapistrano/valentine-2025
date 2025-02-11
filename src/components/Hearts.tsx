import { FunctionComponent } from "react";
import { Heart } from "./Heart";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";

interface Heart {
  position: Vector3;
  rotation: [number, number, number];
}

const heartData: Heart[] = [
  {
    position: new Vector3(3, -1, -1),
    rotation: [0, (Math.PI / 180) * -25, (Math.PI / 180) * -15],
  },
  {
    position: new Vector3(-3, -1.25, -3),
    rotation: [0, (Math.PI / 180) * 15, (Math.PI / 180) * 15],
  },
  {
    position: new Vector3(-3, 1, 0),
    rotation: [0, (Math.PI / 180) * 25, (Math.PI / 180) * 15],
  },
  {
    position: new Vector3(3, 1, 0),
    rotation: [
      (Math.PI / 180) * 15,
      (Math.PI / 180) * -20,
      (Math.PI / 180) * -15,
    ],
  },
];

export const Hearts: FunctionComponent<{
  onClick: () => void;
}> = ({ onClick }) => {
  const { size } = useThree();
  const isMobile = size.width < 768;

  return (
    <group>
      {heartData.map(({ position, rotation }, i) => {
        let offsetPosition = position;
        if (isMobile) {
          const xOffset = position.x <= 0 ? 1.25 : -1.25;
          const yOffset = position.y <= 0 ? -0.5 : 0.5;
          offsetPosition = position
            .clone()
            .add(new Vector3(xOffset, yOffset, -1));
        }

        return (
          <Heart
            key={`hearts-${i}`}
            onClick={onClick}
            position={offsetPosition}
            rotation={rotation}
          />
        );
      })}
    </group>
  );
};
