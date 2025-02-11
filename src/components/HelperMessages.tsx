import { FunctionComponent, useEffect, useState } from "react";
import { ThoughtMessage } from "./ThoughtMessage";

export const HelperMessages: FunctionComponent<{}> = () => {
  const helperMessages: string[] = [
    "What flowers should I get? 🤔",
    "Can you help me pick some flowers? 🙏",
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setIndex(1);
    }, 3000);
  }, []);

  return (
    <group>
      {helperMessages.map((message, idx) => {
        if (idx > index) return null;

        return (
          <ThoughtMessage
            key={message}
            message={message}
            position={[1.25, 0.5, 0]}
            isVisible={idx === index}
          />
        );
      })}
    </group>
  );
};
