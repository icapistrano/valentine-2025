import { FunctionComponent } from "react";
import bloodSplatter from "./../assets/blood_splatter.png";

export const BloodSplatter: FunctionComponent = () => {
  return (
    <div className="absolute z-10 h-full w-full">
      <div className="blood-bg h-full w-full"></div>
      <img
        className="blood-splat absolute left-1/2 top-1/2 z-10 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 transform object-contain"
        src={bloodSplatter}
      />
    </div>
  );
};
