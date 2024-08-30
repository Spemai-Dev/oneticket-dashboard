import React from "react";
import group1 from "../../../pages/assets/Group1.png";
import "./OffCanvas.css";

interface OffCanvasProps {
  heading: string;
  children: React.ReactNode;
}

const OffCanvas: React.FC<OffCanvasProps> = ({
  children,
}) => {

  return (
    <>
     <div className="off-canvas-overlay-view"></div>
      <div className={`off-canvas open`}>
        <div className="off-canvas-content">
          {children}
        </div>
      </div>
    </>
    

  );
};

export default OffCanvas;

