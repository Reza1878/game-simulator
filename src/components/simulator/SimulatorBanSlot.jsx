import React from "react";
import { useDrop } from "react-dnd";
import { Slash } from "react-feather";

function SimulatorBanSlot({
  slot = 0,
  heroes = null,
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

  return <div ref={dropRef}>
    {!heroes ? (
      <div className="relative">
        <div className="border-2 border-blue-900 w-10 h-10" />
        <div className="absolute -bottom-2 w-full flex justify-center">
          <Slash className="text-red-500" width={18} height={18} />
        </div>
      </div>
    ) : (
      <div className="relative">
        <img
          className="border-2 border-blue-900 w-10 h-10"
          src={`${import.meta.env.VITE_BASE_URL}/${heroes.icon_url}`}
        />

        <div className="absolute -bottom-2 w-full flex justify-center">
          <Slash className="text-red-500" width={18} height={18} />
        </div>
      </div>
    )}
  </div>;
}

export default SimulatorBanSlot;
