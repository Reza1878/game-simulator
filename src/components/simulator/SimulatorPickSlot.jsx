import clsx from "clsx";
import React from "react";
import { useDrop } from "react-dnd";
import HeroesBanner from "../heroes/HeroesBanner";

function SimulatorPickSlot({
  slot = 0,
  heroes = null,
  active = false,
  timer = 0,
  onDropHero = (hero) => {},
  fullWidth = false,
}) {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "hero",
    drop: (item) => onDropHero(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <div ref={dropRef}>
      {!heroes ? (
        <div
          className={clsx(
            "w-full bg-gray-300 relative z-0",
            { "opacity-70": !active },
            { "opacity-50": active },
            { "md:h-28 xs:landscape:h-12": !fullWidth },
            { "md:h-36 xs:landscape:h-28": fullWidth }
          )}
        >
          {active && timer > 0 && (
            <div className="absolute right-0 bottom-0 bg-white w-12 p-1 bg-opacity-60 rounded-md">
              <p className="font-bold text-center text-red-500">{timer}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative z-0" ref={dropRef}>
          <HeroesBanner
            url={heroes.banner_url}
            className={clsx(
              { "md:h-28 landscape:xs:h-12": !fullWidth },
              { "md:h-36 xs:landscape:h-28 w-full": fullWidth }
            )}
            fullWidth={fullWidth}
          />
          <div className="absolute right-4 md:bottom-8 landscape:xs:bottom-4">
            <p className="font-bold text-white mb-0 font-poppins">
              {heroes.name}
            </p>
            {/* <p className="font-bold text-white">{heroes.heroes_role.name}</p> */}
          </div>
          {active && timer > 0 && (
            <div className="absolute right-0 bottom-0 bg-white w-12 p-1 bg-opacity-60 rounded-md">
              <p className="font-bold text-center text-red-500">{timer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SimulatorPickSlot;
