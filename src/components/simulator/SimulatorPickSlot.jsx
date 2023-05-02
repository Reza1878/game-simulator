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
            "w-full md:h-28 xs:landscape:h-12 bg-gray-300 relative z-0",
            { "opacity-70": !active },
            { "opacity-50": active }
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
            key={heroes.banner_url}
            url={heroes.banner_url}
            className="md:h-28 landscape:xs:h-12"
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
