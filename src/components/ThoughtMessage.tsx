import { Html } from "@react-three/drei";
import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, Vector3 } from "three";

export const ThoughtMessage: FunctionComponent<{
  message: string;
  position: [number, number, number];
  offsetY?: number;
  isVisible?: boolean;
  delay?: number;
}> = ({ message, position, offsetY = 0.2, isVisible = false, delay = 0 }) => {
  let opacityRef = useRef(0);
  const htmlRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<Group>(null);

  const { size } = useThree();
  const isMobile = size.width < 768;

  const target = useMemo(() => {
    return isMobile
      ? new Vector3().fromArray([0, -5, 0])
      : new Vector3().fromArray(position);
  }, [isMobile]);

  useFrame((_, delta) => {
    if (htmlRef.current) {
      // on unmount
      if (!isVisible) {
        opacityRef.current = Math.max(0, opacityRef.current - delta * 5);
        htmlRef.current.style.opacity = `${opacityRef.current}`;

        // on mount
      } else if (isVisible && opacityRef.current <= 1) {
        opacityRef.current = opacityRef.current + delta * 1;
        htmlRef.current.style.opacity = `${opacityRef.current}`;
      }
    }

    if (groupRef.current) {
      // on unmount
      if (!isVisible) {
        groupRef.current.position.y += delta;

        // on mount
      } else if (
        isVisible &&
        groupRef.current.position.y <= target.y + offsetY
      ) {
        groupRef.current.position.y += delta * 0.5;
      }
    }
  });

  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, delay);
  }, []);

  if (!show) return null;

  return (
    <group ref={groupRef} position={target}>
      <Html
        zIndexRange={[0, 1]}
        center
        ref={htmlRef}
        className="pointer-events-none absolute top-10 mb-2 flex items-center justify-center"
      >
        <div className=" relative inline-block w-[280px] rounded-full bg-white p-4 text-center text-lg text-black text-slate-600 shadow-xl">
          {message}
          {!isMobile && (
            <>
              <div className="absolute bottom-[-20px] left-5 h-6 w-6 rounded-full bg-white shadow-md"></div>
              <div className="absolute bottom-[-35px] left-3 h-4 w-4 rounded-full bg-white shadow-md"></div>
            </>
          )}
        </div>
      </Html>
    </group>
  );
};
