import { useThree } from "@react-three/fiber";
import { FunctionComponent, useMemo } from "react";
import { Vector3 } from "three";
import { Flower } from "./Flower";

interface Flower {
  position: Vector3;
  rotation: [number, number, number];
}

const flowPositions: Flower[] = [
  {
    position: new Vector3(-3, 3.5, -6),
    rotation: [0, (Math.PI / 180) * 15, 0],
  },
  {
    position: new Vector3(3, 4, -6),
    rotation: [0, (Math.PI / 180) * -10, 0],
  },
  {
    position: new Vector3(5, 0.5, -5),
    rotation: [0, (Math.PI / 180) * -35, 0],
  },
  {
    position: new Vector3(4, -2.5, -4.5),
    rotation: [(Math.PI / 180) * -20, (Math.PI / 180) * -30, 0],
  },
  {
    position: new Vector3(-0.5, -5.5, -12),
    rotation: [(Math.PI / 180) * -25, (Math.PI / 180) * -5, 0],
  },
  {
    position: new Vector3(-3.5, -2.5, -3.5),
    rotation: [(Math.PI / 180) * -25, (Math.PI / 180) * 20, 0],
  },
  {
    position: new Vector3(-4.5, -0, -3.5),
    rotation: [(Math.PI / 180) * -5, (Math.PI / 180) * 20, 0],
  },
];

export const Flowers: FunctionComponent<{
  onClick: () => void;
  isClickable: boolean;
}> = ({ onClick, isClickable }) => {
  const { size } = useThree();
  const isMobile = size.width < 768;

  return (
    <group>
      {flowPositions.map(({ position, rotation }, i) => {
        let offsetY = position;
        if (isMobile) {
          const xOffset = position.x <= 0 ? 1.25 : -1.25;
          offsetY = position.clone().add(new Vector3(xOffset, 0, 0));
        }

        return (
          <Flower
            key={`flower-${i}`}
            position={offsetY}
            rotation={rotation}
            onClick={onClick}
            isClickable={isClickable}
          />
        );
      })}
    </group>
  );
};
