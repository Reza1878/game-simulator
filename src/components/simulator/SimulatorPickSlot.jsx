import clsx from "clsx";
import React from "react";

function SimulatorPickSlot({ slot = 0, heroes = null, active = false }) {
  if (!heroes) {
    return (
      <div
        className={clsx(
          "w-full h-24 bg-gray-300",
          { "opacity-70": !active },
          { "opacity-50": active }
        )}
      />
    );
  }
  return <div>SimulatorPickSlot</div>;
}

export default SimulatorPickSlot;
