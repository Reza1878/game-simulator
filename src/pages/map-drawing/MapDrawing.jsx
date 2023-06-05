import { AdsComponent } from "@/components";
import AdsImage from "@/components/ads/AdsImage";
import { Button } from "@/components/common";
import { FormControl } from "@/components/form";
import { useWrap } from "@/hooks/useWrap";
import AdService from "@/service/ads-service";
import IconsService from "@/service/icons-service";
import MapService from "@/service/map-service";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";

function MapDrawing() {
  const [mapImage, setMapImage] = useState(null);
  const userTier = useSelector((state) => state.user.user_tier);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [brushColor, setBrushColor] = useState("#FF0000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [icons, setIcons] = useState([]);
  const [usedIcons, setUsedIcons] = useState([]);
  const [tempUsedIcons, setTempUsedIcons] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);
  const [ads, setAds] = useState([]);
  const canvasContainerRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [activities, setActivities] = useState([]);

  const isPaidUser = useMemo(() => {
    return userTier.name !== "User";
  }, [userTier]);

  const showedAds = useMemo(() => {
    return !isPaidUser;
  }, [isPaidUser]);

  const wrappedFetchIcons = useWrap(
    () => IconsService.gets(),
    () => []
  );

  const wrappedFetchAds = useWrap(
    () => AdService.gets(),
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
    const ctx = canvasRef.current?.getContext("2d");
    ctx.clearRect(
      0,
      0,
      canvasContainerRef.current.clientWidth,
      canvasContainerRef.current.clientHeight
    );
  };

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    const pointsCopy = [...points];
    pointsCopy.push({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    setPoints(pointsCopy);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    ctxRef.current.closePath();
    const activitiesCopy = [...activities];
    const pointsCopy = [...points];
    activitiesCopy.push({
      points: pointsCopy,
      mode: "draw",
      brushColor,
      activity: "drawing",
    });
    setActivities(activitiesCopy);
    setPoints([]);
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    const pointsCopy = [...points];
    pointsCopy.push({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    setPoints(pointsCopy);
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
      const response = await wrappedFetchAds();
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
    canvasRef.current.width = canvasContainerRef.current.clientWidth;
    canvasRef.current.height = canvasContainerRef.current.clientHeight;
    const ctx = canvasRef.current?.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 5;
    ctxRef.current = ctx;
  }, [imgSrc]);

  const addIconToMap = (icon) => {
    const randomX =
      Math.floor(Math.random() * canvasContainerRef.current.clientWidth) -
      Math.floor(Math.random() * 300);
    const randomY =
      Math.floor(Math.random() * canvasContainerRef.current.clientWidth) -
      Math.floor(Math.random() * 300);
    const iconCpy = [...usedIcons];
    const x = Math.abs(randomX);
    const y = Math.abs(randomY);
    const id = new Date().getTime();
    const addedIcon = { ...icon, coordX: x, coordY: y, id };
    iconCpy.push(addedIcon);
    setUsedIcons(iconCpy);

    const activitiesCopy = [...activities];
    activitiesCopy.push({
      points: [{ x, y }],
      mode: "drag",
      activity: "addIcon",
      icon: addedIcon,
    });
    setActivities(activitiesCopy);
  };

  const isMobile = useMemo(() => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

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
    const pointsCopy = [...points];
    pointsCopy.push({ x, y });

    const activitiesCopy = [...activities];
    activitiesCopy.push({
      points: pointsCopy,
      mode: "drag",
      activity: "dragIcon",
      icon: iconCpy[index],
    });
    setUsedIcons(iconCpy);
    setActivities(activitiesCopy);
    setPoints([]);
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
      const icon = iconCopy[index];

      const activitiesCopy = [...activities];
      activitiesCopy.push({
        points: [{ x, y }],
        mode: "drag",
        activity: "removeIcon",
        icon,
      });

      iconCopy.splice(index, 1);
      setUsedIcons(iconCopy);
      setActivities(activitiesCopy);
    }
    const pointsCopy = [...points];
    pointsCopy.push({ x, y });
    setPoints(pointsCopy);
  };

  const handleDownloadImage = async () => {
    if (!imgSrc) return;
    const newCanvas = document.createElement("canvas");
    const ctx = newCanvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous";

    image.src = imgSrc;
    image.onload = async function () {
      newCanvas.width = canvasContainerRef.current.clientWidth;
      newCanvas.height = canvasContainerRef.current.clientHeight;

      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvasContainerRef.current.clientWidth,
        canvasContainerRef.current.clientHeight
      );

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
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    startDrawing({
      nativeEvent: {
        offsetX: e.changedTouches[0].clientX,
        offsetY: e.changedTouches[0].clientY,
      },
    });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    draw({
      nativeEvent: {
        offsetX: e.changedTouches[0].clientX,
        offsetY: e.changedTouches[0].clientY,
      },
    });
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    endDrawing();
  };

  useEffect(() => {
    canvasRef.current.addEventListener("touchstart", handleTouchStart, false);
    canvasRef.current.addEventListener("touchmove", handleTouchMove, false);
    canvasRef.current.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      canvasRef.current?.removeEventListener("touchstart", handleTouchStart);
      canvasRef.current?.removeEventListener("touchmove", handleTouchMove);
      canvasRef.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleUndo = () => {
    resetCanvas();
    const activitiesCopy = [...activities];
    const latestAct = activitiesCopy.pop();
    const drawingActivities = activitiesCopy.filter(
      (act) => act.mode === "draw"
    );
    drawingActivities.forEach((act) => {
      const ctx = canvasRef.current?.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = act.brushColor;
      ctx.lineWidth = 5;
      ctxRef.current = ctx;

      ctxRef.current.beginPath();
      const firstPoint = act.points[0];
      ctxRef.current.moveTo(firstPoint.x, firstPoint.y);
      act.points
        .filter((p, i) => i > 0)
        .forEach((point) => {
          ctxRef.current.lineTo(point.x, point.y);
          ctxRef.current.stroke();
        });
    });
    if (!latestAct) return;
    if (latestAct.mode === "drag") {
      let iconCopy = [...usedIcons];
      const { activity, icon = {}, points: latestActPoints = [] } = latestAct;
      switch (activity) {
        case "addIcon": {
          const index = iconCopy.findIndex((cpy) => cpy.id === icon.id);
          if (index !== -1) iconCopy.splice(index, 1);
          break;
        }
        case "removeIcon": {
          iconCopy.push({ ...icon });
          break;
        }
        case "dragIcon": {
          if (!latestActPoints.length) return;
          const index = iconCopy.findIndex((cpy) => cpy.id === icon.id);
          const currIcon = iconCopy[index];
          iconCopy[index] = {
            ...currIcon,
            coordX: latestActPoints[0].x,
            coordY: latestActPoints[0].y,
          };
          break;
        }
        case "resetIcon": {
          iconCopy = tempUsedIcons;
          setTempUsedIcons([]);
          break;
        }
        default:
          break;
      }
      setUsedIcons(iconCopy);
    }

    setActivities(activitiesCopy);
  };

  const handleRemoveIcon = () => {
    const copy = [...usedIcons];
    setTempUsedIcons(copy);
    setUsedIcons([]);
    const activitiesCopy = [...activities];
    activitiesCopy.push({
      points: [],
      mode: "drag",
      activity: "resetIcon",
    });
    setActivities(activitiesCopy);
  };

  const handleResetMap = () => {
    const activitiesCopy = [...activities];
    activitiesCopy.push({
      points: [],
      mode: "draw",
      activity: "resetMap",
    });
    resetCanvas();
  };

  return (
    <>
      {showedAds && <AdsComponent dataAdSlot={9212602771} />}
      <div className="min-h-[50vh] flex flex-row gap-4 p-6">
        <div
          ref={canvasContainerRef}
          className="relative md:w-[600px] md:h-[600px] w-[300px] h-[300px]"
        >
          {imgSrc ? <img className="absolute z-0" src={imgSrc} /> : null}
          {usedIcons.map((icon) => (
            <Draggable
              position={{
                x: icon.coordX,
                y: icon.coordY,
              }}
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
                className="md:w-6 md:h-6 w-5 h-5 absolute z-20"
                src={`${import.meta.env.VITE_BASE_URL}/${icon.image_url}`}
              />
            </Draggable>
          ))}
          <canvas
            onMouseDown={(e) => {
              if (isMobile) return;
              startDrawing(e);
            }}
            onMouseUp={(e) => {
              if (isMobile) return;
              endDrawing();
            }}
            onMouseMove={(e) => {
              if (isMobile) return;
              draw(e);
            }}
            onTouchStart={(e) => {
              startDrawing({
                nativeEvent: {
                  offsetX: e.changedTouches[0].clientX,
                  offsetY: e.changedTouches[0].clientY,
                },
              });
            }}
            onTouchMove={(e) => {
              draw({
                nativeEvent: {
                  offsetX: e.changedTouches[0].clientX,
                  offsetY: e.changedTouches[0].clientY,
                },
              });
            }}
            onTouchEnd={(e) => {
              endDrawing();
            }}
            className="absolute z-10"
            ref={canvasRef}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-8">
            {(icons || []).map((icon) => (
              <img
                key={icon.id}
                className="md:w-10 md:h-10 w-5 h-5 cursor-pointer"
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
            <Button variant="outlined" onClick={handleRemoveIcon}>
              Remove Icon
            </Button>
            <Button variant="outlined" onClick={handleResetMap}>
              Reset Map
            </Button>
            {isPaidUser ? (
              <Button variant="outlined" onClick={handleUndo}>
                Undo
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default MapDrawing;
