import React, { useMemo, useState } from "react";
import clsx from "clsx";
import HeroesButton from "./HeroesButton";
import { useDrop } from "react-dnd";

function HeroesPanel({
  heroes = [],
  heroesBanList = [],
  heroesPickList = [],
  roles = [],
  isDragAndDrop = false,
  onHeroesButtonClick = () => {},
  onDropHero = () => {},
}) {
  const [roleFilter, setRoleFilter] = useState(0);
  const [search, setSearch] = useState("");

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "droppedHero",
    drop: (item) => onDropHero(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const heroesList = useMemo(() => {
    if (!roleFilter && !search) return heroes;

    return heroes
      .filter((hero) =>
        roleFilter
          ? !!hero.heroes_roles.filter((role) => role.id === roleFilter)[0]
          : true
      )
      .filter((hero) =>
        search ? hero.name.toLowerCase().includes(search.toLowerCase()) : true
      );
  }, [roleFilter, heroes, search]);

  return (
    <div
      ref={dropRef}
      className="flex-1 border p-4 overflow-x-scroll no-scrollbar sm:max-h-[615px] landscape:xs:max-h-[290px]"
    >
      <div className="flex gap-2 justify-between items-center flex-wrap">
        <p className="text-white font-bold w-full md:w-auto">Select Champion</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setRoleFilter(0)}
            className={clsx("text-white px-2 py-1 rounded-md w-auto", {
              "bg-gray-400": roleFilter === 0,
            })}
          >
            All
          </button>
          {roles.map((item, index) => (
            <button
              className={clsx("text-white px-2 py-1 rounded-md w-auto", {
                "bg-gray-400": roleFilter === item.id,
              })}
              key={index}
              onClick={() => setRoleFilter(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="border lg:w-36 rounded-full py-1 px-2 outline-none bg-primary text-white w-full"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 mt-3">
        {heroesList.map((hero) => (
          <HeroesButton
            key={hero.id}
            hero={hero}
            disabled={
              heroesBanList.filter((item) => item.id === hero.id)[0] ||
              heroesPickList.filter((item) => item.id === hero.id)[0]
            }
            onClick={() => onHeroesButtonClick(hero)}
            isDragAndDrop={isDragAndDrop}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroesPanel;
