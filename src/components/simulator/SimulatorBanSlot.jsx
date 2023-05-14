import React from "react";
import { useDrag } from "react-dnd";
import { Slash } from "react-feather";

function SimulatorBanSlot({
  slot = 0,
  heroes = null,
  onDropHero = (hero) => {},
}) {
  const [{ opacity, isDragging }, dragRef] = useDrag(
    {
      type: "droppedHero",
      item: { ...heroes, type: "ban" },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        isDragging: monitor.isDragging(),
      }),
    },
    [heroes]
  );
  if (!heroes) {
    return (
      <div>
        <div className="relative">
          <div className="border-2 border-blue-900 w-10 h-10" />
          <div className="absolute -bottom-2 w-full flex justify-center">
            <Slash className="text-red-500" width={18} height={18} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <img
          className="border-2 border-blue-900 w-10 h-10"
          src={`${import.meta.env.VITE_BASE_URL}/${heroes.icon_url}`}
          ref={dragRef}
        />

        <div className="absolute -bottom-2 w-full flex justify-center">
          <Slash className="text-red-500" width={18} height={18} />
        </div>
      </div>
    </div>
  );
}

export default SimulatorBanSlot;
