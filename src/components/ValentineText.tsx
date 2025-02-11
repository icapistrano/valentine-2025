import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { FunctionComponent, useMemo } from "react";
import { Vector3 } from "three";
import font from "./../assets/Great_Vibes/GreatVibes-Regular.ttf";

export const ValentineText: FunctionComponent<{
  show: boolean;
  message?: string;
}> = ({ show, message = "Be my Valentine?" }) => {
  const { size } = useThree(); // Access viewport size from R3F
  const isMobile = size.width < 768;

  const position = useMemo(
    () => (isMobile ? new Vector3(0, 5, 0) : new Vector3(0, 1.45, 0)),
    [isMobile],
  );

  return (
    <Text
      fontSize={0.7}
      position={position}
      color="#50C878"
      font={font}
      visible={show}
    >
      {message}
    </Text>
  );
};
