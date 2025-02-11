import { useThree } from "@react-three/fiber";
import { FunctionComponent, ReactNode } from "react";

export const DeviceHandler: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const { size } = useThree(); // Access viewport size from R3F
  const isMobile = size.width < 768;

  const scaleFactor = Math.max(0.5, Math.min(1, size.width / 1300));

  return (
    <group
      position={[0, 0, -1 * scaleFactor]}
      scale={isMobile ? 0.75 * scaleFactor : scaleFactor}
    >
      {children}
    </group>
  );
};
