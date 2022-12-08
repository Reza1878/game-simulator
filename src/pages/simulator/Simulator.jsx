import SimulatorBanSlot from "@/components/simulator/SimulatorBanSlot";
import SimulatorPickSlot from "@/components/simulator/SimulatorPickSlot";
import HeroesRoleService from "@/service/heroes-roles-service";
import HeroService from "@/service/heroes-service";
import TeamService from "@/service/team-service";
import HeroesIcon from "@/components/heroes/HeroesIcon";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";

function Simulator() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Blue Team", side: "LEFT" },
    { id: 2, name: "Read Team", side: "RIGHT" },
  ]);
  const [roles, setRoles] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [searchParams] = useSearchParams();
  const banCount = +searchParams.get("ban_count") || 0;
  const [currentOrder, setCurrentOrder] = useState(0);
  const [currentSide, setCurrentSide] = useState("LEFT");
  const [roleFilter, setRoleFilter] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await HeroService.gets();
      if (!active) return;
      setHeroes(response.data);
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await HeroesRoleService.gets();
      if (!active) return;
      setRoles(response.data);
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await TeamService.gets();
      if (!active) return;
      if (response.data.length) {
        setTeams(response.data);
        return;
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  const heroesList = useMemo(() => {
    if (!roleFilter && !search) return heroes;

    return heroes
      .filter((hero) =>
        roleFilter ? hero.heroes_role_id === roleFilter : true
      )
      .filter((hero) =>
        search ? hero.name.toLowerCase().includes(search.toLowerCase()) : true
      );
  }, [roleFilter, heroes, search]);

  const leftTeam = useMemo(() => {
    const curr = teams.filter((item) => item.side === "LEFT")[0];
    if (!curr) return "Blue Team";
    return curr.name;
  }, [teams]);
  const rightTeam = useMemo(() => {
    const curr = teams.filter((item) => item.side === "RIGHT")[0];
    if (!curr) return "Red Team";
    return curr.name;
  }, [teams]);
  return (
    <div className="min-h-[50vh]">
      <div className="flex p-4 gap-2">
        <p className="text-white text-opacity-70 font-bold">Game Mode</p>
        <p className="text-white font-bold text-opacity-70">|</p>
        <p className="text-white font-bold">Simulator</p>
      </div>
      <div className="flex w-full gap-4">
        <div className="w-96">
          <div className="flex justify-between px-4 items-center mb-3">
            <p className="font-bold text-white">{leftTeam}</p>
            <span className="block w-10 h-6 bg-blue-500" />
          </div>
          <div className="flex flex-col gap-1">
            {[0, 1, 2, 3, 4].map((slot) => (
              <SimulatorPickSlot
                key={slot}
                active={slot === currentOrder && currentSide === "LEFT"}
                slot={slot}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 border p-4 max-h-[530px] overflow-x-scroll no-scrollbar">
          <div className="flex justify-between items-center">
            <p className="text-white font-bold">Select Champion</p>
            <div className="flex gap-2">
              <button
                onClick={() => setRoleFilter(0)}
                className={clsx("text-white px-2 py-1 rounded-md", {
                  "bg-gray-400": roleFilter === 0,
                })}
              >
                All
              </button>
              {roles.map((item, index) => (
                <button
                  className={clsx("text-white px-2 py-1 rounded-md", {
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
              className="border w-36 rounded-full py-1 px-2 outline-none bg-primary text-white"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-8 gap-2 mt-3">
            {heroesList.map((hero) => (
              <div
                className="flex flex-col items-center cursor-pointer"
                key={hero.id}
              >
                <HeroesIcon
                  url={hero.icon_url}
                  className="border mb-1 w-14 h-14"
                />
                <p className="text-white font-bold text-xs">{hero.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-96">
          <div className="flex justify-between px-4 items-center mb-3">
            <span className="block w-10 h-6 bg-red-500" />
            <p className="font-bold text-white">{rightTeam}</p>
          </div>
          <div className="flex flex-col gap-1">
            {[0, 1, 2, 3, 4].map((slot) => (
              <SimulatorPickSlot
                active={slot === currentOrder && currentSide === "RIGHT"}
                slot={slot}
                key={slot}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full px-4 justify-between mt-3">
        <div className="flex gap-2 mt-3 px-4">
          {[...Array(banCount).keys()].map((item) => (
            <SimulatorBanSlot key={item} />
          ))}
        </div>
        <button className="bg-red-500 text-white py-2 px-6 rounded-md w-48">
          Ban
        </button>
        <div className="flex gap-2 mt-3 px-4">
          {[...Array(banCount).keys()].map((item) => (
            <SimulatorBanSlot key={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Simulator;
