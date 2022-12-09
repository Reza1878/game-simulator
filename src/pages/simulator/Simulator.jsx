import SimulatorBanSlot from "@/components/simulator/SimulatorBanSlot";
import SimulatorPickSlot from "@/components/simulator/SimulatorPickSlot";
import HeroesRoleService from "@/service/heroes-roles-service";
import HeroService from "@/service/heroes-service";
import TeamService from "@/service/team-service";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { Loader } from "@/components/common";
import BanAmountService from "@/service/ban-amount-service";
import { useWrap } from "@/hooks/useWrap";
import HeroesButton from "@/components/simulator/HeroesButton";

function Simulator() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Blue Team", side: "LEFT" },
    { id: 2, name: "Read Team", side: "RIGHT" },
  ]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [searchParams] = useSearchParams();
  const banCount = +searchParams.get("ban_count") || 0;
  const firstPick = !["LEFT", "RIGHT"].includes(searchParams.get("first_pick"))
    ? "LEFT"
    : searchParams.get("first_pick");
  const [currentOrder, setCurrentOrder] = useState(0);
  const [roleFilter, setRoleFilter] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedBanCount, setSelectedBanCount] = useState(null);
  const wrappedFetchBanCount = useWrap((id) => BanAmountService.get(id));
  const [heroesBanList, setHeroesBanList] = useState([]);
  const [currentBanOrder, setCurrentBanOrder] = useState(0);
  const [currentHeroes, setCurrentHeroes] = useState(null);
  const [heroesPickList, setHeroesPickList] = useState([]);

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

  useEffect(() => {
    let active = true;

    (async () => {
      const response = await wrappedFetchBanCount(banCount);
      if (!active) return;
      setSelectedBanCount(response.data);
      setLoading(false);
    })();

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

  const banPhase = useMemo(() => {
    if (!selectedBanCount) return false;
    return currentBanOrder < selectedBanCount?.ban_count * 2;
  }, [currentBanOrder, selectedBanCount]);

  const pickPhase = useMemo(() => {
    return !banPhase && heroesPickList.length !== 10;
  }, [banPhase, heroesPickList]);

  const handleBanClick = () => {
    const arr = [...heroesBanList];
    arr.push({ ...currentHeroes, order: currentBanOrder });
    setHeroesBanList(arr);
    setCurrentBanOrder(currentBanOrder + 1);
    setCurrentHeroes(null);
  };

  const handlePickClick = () => {
    const arr = [...heroesPickList];
    arr.push({ ...currentHeroes, order: currentOrder });
    setHeroesPickList(arr);
    setCurrentOrder(currentOrder + 1);
    setCurrentHeroes(null);
  };

  const handleResetClick = () => {
    setCurrentHeroes(null);
    setCurrentOrder(0);
    setCurrentBanOrder(0);
    setHeroesBanList([]);
    setHeroesPickList([]);
  };

  const arrangeBanAndPickOrder = (side, order) => {
    if (side === firstPick) return +order % 2 === 0;
    return +order % 2 !== 0;
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] justify-center items-center">
        <Loader color="white" />
      </div>
    );
  }

  if (!loading && !selectedBanCount) {
    return (
      <div className="flex min-h-[50vh] px-4 flex-col items-center">
        <div className="w-full">
          <div className="bg-red-500 rounded-md py-2 w-full text-white text-center">
            Data not found
          </div>
        </div>
        <button className="text-white mt-3 w-48" onClick={() => navigate("/")}>
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh]">
      <div className="flex justify-between items-center  p-4">
        <div className="flex gap-2">
          <p className="text-white text-opacity-70 font-bold">Game Mode</p>
          <p className="text-white font-bold text-opacity-70">|</p>
          <p className="text-white font-bold">Simulator</p>
        </div>
        <button
          onClick={handleResetClick}
          className="bg-gray-500 text-white py-2 rounded-md w-24"
        >
          Reset
        </button>
      </div>
      <div className="flex w-full gap-4">
        <div className="w-96">
          <div className="flex justify-between px-4 items-center mb-3">
            <p className="font-bold text-white">{leftTeam}</p>
            <span className="block w-10 h-6 bg-blue-500" />
          </div>
          <div className="flex flex-col gap-1">
            {[...Array(5 * 2).keys()]
              .filter((item) => arrangeBanAndPickOrder("LEFT", item))
              .map((slot) => (
                <SimulatorPickSlot
                  key={slot}
                  slot={slot}
                  active={banPhase ? false : +slot === currentOrder}
                  heroes={
                    banPhase
                      ? null
                      : currentOrder == slot
                      ? currentHeroes
                      : heroesPickList.filter(
                          (hero) => hero.order == slot
                        )[0] || null
                  }
                />
              ))}
          </div>
        </div>
        <div className="flex-1 border p-4 overflow-x-scroll no-scrollbar">
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
              <HeroesButton
                key={hero.id}
                hero={hero}
                disabled={
                  heroesBanList.filter((item) => item.id === hero.id)[0] ||
                  heroesPickList.filter((item) => item.id === hero.id)[0]
                }
                onClick={() => setCurrentHeroes(hero)}
              />
            ))}
          </div>
        </div>
        <div className="w-96">
          <div className="flex justify-between px-4 items-center mb-3">
            <span className="block w-10 h-6 bg-red-500" />
            <p className="font-bold text-white">{rightTeam}</p>
          </div>
          <div className="flex flex-col gap-1">
            {[...Array(5 * 2).keys()]
              .filter((item) => arrangeBanAndPickOrder("RIGHT", item))
              .map((slot) => (
                <SimulatorPickSlot
                  slot={slot}
                  key={slot}
                  active={banPhase ? false : +slot === currentOrder}
                  heroes={
                    banPhase
                      ? null
                      : currentOrder == slot
                      ? currentHeroes
                      : heroesPickList.filter(
                          (hero) => hero.order == slot
                        )[0] || null
                  }
                />
              ))}
          </div>
        </div>
      </div>

      <div className="flex w-full px-4 justify-between mt-3">
        <div className="flex gap-2 mt-3 px-4">
          {[...Array(selectedBanCount.ban_count * 2).keys()]
            .filter((item) => arrangeBanAndPickOrder("LEFT", item))
            .map((item) => (
              <SimulatorBanSlot
                key={item}
                slot={item}
                heroes={
                  currentBanOrder == item
                    ? currentHeroes
                    : heroesBanList.filter((hero) => hero.order == item)[0] ||
                      null
                }
              />
            ))}
        </div>
        {banPhase && (
          <button
            onClick={handleBanClick}
            className="bg-red-500 text-white py-2 px-6 rounded-md w-48"
          >
            Ban
          </button>
        )}
        {pickPhase && (
          <button
            onClick={handlePickClick}
            className="bg-blue-500 text-white py-2 px-6 rounded-md w-48"
          >
            Pick
          </button>
        )}
        <div className="flex gap-2 mt-3 px-4">
          {[...Array(selectedBanCount.ban_count * 2).keys()]
            .filter((item) => arrangeBanAndPickOrder("RIGHT", item))
            .reverse()
            .map((item) => (
              <SimulatorBanSlot
                key={item}
                slot={item}
                heroes={
                  currentBanOrder == item
                    ? currentHeroes
                    : heroesBanList.filter((hero) => hero.order == item)[0] ||
                      null
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Simulator;
