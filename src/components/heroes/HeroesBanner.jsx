import clsx from "clsx";
import React, { useEffect, useRef } from "react";

function HeroesBanner({ url, className = "" }) {
  const canvasRef = useRef();
  const canvasContainerRef = useRef();

  useEffect(() => {
    if (!url) return;
    const image = new Image();
    image.crossOrigin = "anonymous";
    const context = canvasRef.current?.getContext("2d");
    image.src = `${import.meta.env.VITE_BASE_URL}/${url}`;
    context.clearRect(
      0,
      0,
      canvasContainerRef.current.clientWidth,
      canvasContainerRef.current.clientHeight
    );
    image.onload = function () {
      canvasRef.current.width = canvasContainerRef.current.clientWidth;
      canvasRef.current.height = canvasContainerRef.current.clientHeight;

      context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    };
  }, [url]);
  return (
    <div className={clsx("w-96 h-20", className)} ref={canvasContainerRef}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

export default HeroesBanner;
