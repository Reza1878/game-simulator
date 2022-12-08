import clsx from "clsx";
import React from "react";
import HeroesBanner from "../heroes/HeroesBanner";

function SimulatorPickSlot({ slot = 0, heroes = null, active = false }) {
  console.log({ heroes });
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
  return (
    <div className="relative">
      <HeroesBanner url={heroes.banner_url} />
      <div className="absolute right-4 bottom-8">
        <p className="font-bold text-white mb-0">{heroes.name}</p>
        <p className="font-bold text-white">{heroes.heroes_role.name}</p>
      </div>
    </div>
  );
}

export default SimulatorPickSlot;
