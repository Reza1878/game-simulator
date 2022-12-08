import React from "react";
import { Slash } from "react-feather";

function SimulatorBanSlot({ slot = 0, heroes = null }) {
  if (!heroes) {
    return (
      <div className="relative">
        <div className="border-2 border-blue-900 w-10 h-10" />
        <div className="absolute -bottom-2 w-full flex justify-center">
          <Slash className="text-red-500" width={18} height={18} />
        </div>
      </div>
    );
  }
  return <div>SimulatorBanSlot</div>;
}

export default SimulatorBanSlot;
