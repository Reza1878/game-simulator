import AdsImage from "@/components/ads/AdsImage";
import { Button } from "@/components/common";
import { FormControl } from "@/components/form";
import { useWrap } from "@/hooks/useWrap";
import AdService from "@/service/ads-service";
import IconsService from "@/service/icons-service";
import MapService from "@/service/map-service";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";

function MapDrawing() {
  const [mapImage, setMapImage] = useState(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [brushColor, setBrushColor] = useState("#FF0000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [icons, setIcons] = useState([]);
  const [usedIcons, setUsedIcons] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);
  const [resetFlag, setResetFlag] = useState(false);
  const [ads, setAds] = useState([]);

  const showedAds = useMemo(() => {
    if (!ads.length) return null;

    return ads[Math.floor(Math.random() * ads.length)];
  }, [ads]);

  const wrappedFetchIcons = useWrap(
    () => IconsService.gets(),
    () => []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 5;
    ctxRef.current = ctx;
  }, [brushColor]);

  const resetCanvas = () => {
    setResetFlag(!resetFlag);
  };

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    ctxRef.current.closePath();
    // ctxRef.current.getContext("2d").save();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  useEffect(() => {
    let active = true;

    (async () => {
      const response = await MapService.gets();
      if (!active) return;
      setMapImage(response.data);
    })();

    (async () => {
      const response = await wrappedFetchIcons();
      if (!active) return;
      setIcons(response.data);
    })();

    (async () => {
      const response = await AdService.gets();
      if (!active) return;
      setAds(response.data);
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!mapImage) return;
    setImgSrc(`${import.meta.env.VITE_BASE_URL}/${mapImage.image_url}`);
  }, [mapImage]);

  useEffect(() => {
    if (!imgSrc) return;
    const image = new Image();
    image.crossOrigin = "anonymous";
    const context = canvasRef.current?.getContext("2d");
    image.src = imgSrc;
    image.onload = function () {
      canvasRef.current.width = 600;
      canvasRef.current.height = 600;
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
      const ctx = canvasRef.current?.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = 5;
      ctxRef.current = ctx;
    };
  }, [imgSrc, resetFlag]);

  const addIconToMap = (icon) => {
    const randomX =
      Math.floor(Math.random() * 600) - Math.floor(Math.random() * 300);
    const randomY =
      Math.floor(Math.random() * 600) - Math.floor(Math.random() * 300);
    const iconCpy = [...usedIcons];
    const id = new Date().getTime();
    iconCpy.push({
      ...icon,
      coordX: Math.abs(randomX),
      coordY: Math.abs(randomY),
      id,
    });
    setUsedIcons(iconCpy);
  };

  const onStopDragIcon = (e, id) => {
    const iconCpy = [...usedIcons];
    const index = iconCpy.findIndex((item) => item.id === id);
    const { x, y } = e;
    if (index === -1) return;
    iconCpy[index] = {
      ...iconCpy[index],
      coordX: x,
      coordY: y,
    };
    setUsedIcons(iconCpy);
  };

  const onDragIcon = (e, id) => {
    const { x, y } = e;

    if (
      x === 0 ||
      x + 24 === canvasRef.current?.width ||
      y === 0 ||
      y + 24 === canvasRef.current?.height
    ) {
      const iconCopy = [...usedIcons];
      const index = iconCopy.findIndex((item) => item.id === id);

      iconCopy.splice(index, 1);
      setUsedIcons(iconCopy);
    }
  };

  const handleDownloadImage = async () => {
    const newCanvas = document.createElement("canvas");
    const ctx = newCanvas.getContext("2d");

    newCanvas.width = canvasRef.current.width;
    newCanvas.height = canvasRef.current.height;

    ctx.drawImage(canvasRef.current, 0, 0);

    await Promise.all(
      usedIcons.map((icon) => {
        return new Promise((resolve) => {
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.src = `${import.meta.env.VITE_BASE_URL}/${icon.image_url}`;
          image.onload = function () {
            ctx.drawImage(image, icon.coordX, icon.coordY, 24, 24);
            resolve(true);
          };
        });
      })
    );
    const link = document.createElement("a");
    link.download = "map.png";
    link.href = newCanvas.toDataURL();
    document.body.appendChild(link);

    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-[50vh] flex md:flex-row flex-col gap-4 p-6">
      <div className="relative w-[600px] h-[600px]">
        {usedIcons.map((icon) => (
          <Draggable
            defaultPosition={{
              x: icon.coordX,
              y: icon.coordY,
            }}
            // offsetParent={canvasRef}
            bounds="parent"
            onStop={(e, data) => {
              onStopDragIcon({ x: data.x, y: Math.abs(data.y) }, icon.id);
            }}
            onDrag={(e, data) => {
              onDragIcon({ x: data.x, y: Math.abs(data.y) }, icon.id);
            }}
            key={icon.id}
          >
            <img
              className="w-6 h-6 absolute"
              src={`${import.meta.env.VITE_BASE_URL}/${icon.image_url}`}
            />
          </Draggable>
        ))}
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          onTouchStart={(e) => {
            e.stopPropagation();
            startDrawing(e);
          }}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
          ref={canvasRef}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-8">
          {icons.map((icon) => (
            <img
              key={icon.id}
              className="w-10 h-10 cursor-pointer"
              src={`${import.meta.env.VITE_BASE_URL}/${icon.image_url}`}
              onClick={() => addIconToMap(icon)}
            />
          ))}
        </div>
        <FormControl
          LabelProps={{ className: "text-white" }}
          label="Brush Color"
          type="color"
          InputProps={{
            value: brushColor,
            onChange: (e) => setBrushColor(e.target.value),
          }}
        />
        <div className="flex sm:flex-row flex-col gap-2">
          <Button onClick={handleDownloadImage} variant="outlined">
            Download Image
          </Button>
          <Button variant="outlined" onClick={() => setUsedIcons([])}>
            Remove Icon
          </Button>
          <Button variant="outlined" onClick={resetCanvas}>
            Reset Map
          </Button>
        </div>
        {showedAds && (
          <AdsImage ratio={showedAds.ratio} url={showedAds.image_url} />
        )}
      </div>
    </div>
  );
}

export default MapDrawing;
