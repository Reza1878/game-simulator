import React, { useRef, useState } from "react";

function Icon({ icon, onDragIcon = () => {}, offsetTop = 0, offsetLeft = 0 }) {
  const [isDragging, setIsDragging] = useState(false);
  const iconRef = useRef(null);

  const startDragging = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const endDragging = () => {
    setIsDragging(false);
  };

  const drag = (e) => {
    if (!isDragging) return;
    const { pageX, pageY } = e;
    onDragIcon({ offsetX: pageX, offsetY: pageY, id: icon.id });
  };
  return (
    <img
      ref={iconRef}
      onMouseDown={startDragging}
      onMouseUp={endDragging}
      onMouseMove={drag}
      key={icon.id}
      className="w-6 h-6 absolute z-10 inset-0 cursor-pointer"
      style={{
        // transform: `translate(${icon.coordX}px, ${icon.coordY}px)`,
        top: icon.offsetY - 24,
        left: icon.offsetX - 24,
      }}
      src={`${import.meta.env.VITE_BASE_URL}/${icon.image_url}`}
    />
  );
}

export default Icon;
