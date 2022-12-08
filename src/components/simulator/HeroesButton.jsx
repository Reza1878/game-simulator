import React from "react";
import { Slash } from "react-feather";
import HeroesIcon from "../heroes/HeroesIcon";

function HeroesButton({ onClick = () => {}, hero = null, disabled = false }) {
  return (
    <button
      disabled={disabled}
      className="flex flex-col items-center relative"
      onClick={onClick}
    >
      <HeroesIcon url={hero.icon_url} className="border mb-1 w-14 h-14" />
      {disabled && (
        <div className="absolute bg-gray-500 w-14 h-14 rounded-full bg-opacity-70">
          <Slash className="text-red-500" width={56} height={56} />
        </div>
      )}
      <p className="text-white font-bold text-xs">{hero.name}</p>
    </button>
  );
}

export default HeroesButton;
