import SimulatorBanSlot from "@/components/simulator/SimulatorBanSlot";
import HeroesRoleService from "@/service/heroes-roles-service";
import HeroService from "@/service/heroes-service";
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { Loader } from "@/components/common";
import BanAmountService from "@/service/ban-amount-service";
import { useWrap } from "@/hooks/useWrap";
import { exportAsImage } from "@/utils/canvas";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import SimulatorPickSlotDND from "@/components/simulator/SimulatorPickSlotDND";
import HeroesPanel from "@/components/simulator/HeroesPanel";

function Simulator() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Blue Team", side: "LEFT" },
    { id: 2, name: "Read Team", side: "RIGHT" },
  ]);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [searchParams] = useSearchParams();
  const [timer, setTimer] = useState(+searchParams.get("timer") || 0);
  const timerRef = useRef(null);

  const banCount = +searchParams.get("ban_count") || 0;
  const firstPick = !["LEFT", "RIGHT"].includes(searchParams.get("first_pick"))
    ? "LEFT"
    : searchParams.get("first_pick");
  const leftTeamFromQuery = searchParams.get("left_name");
  const rightTeamFromQuery = searchParams.get("right_name");
  const [currentOrder, setCurrentOrder] = useState(0);
  const [selectedBanCount, setSelectedBanCount] = useState(null);
  const wrappedFetchBanCount = useWrap((id) => BanAmountService.get(id));
  const wrappedFetchHeroes = useWrap(() => HeroService.gets());
  const wrappedFetchHeroRoles = useWrap(() => HeroesRoleService.gets());
  const [heroesBanList, setHeroesBanList] = useState([]);
  const [currentBanOrder, setCurrentBanOrder] = useState(0);
  const [currentHeroes, setCurrentHeroes] = useState(null);
  const [heroesPickList, setHeroesPickList] = useState([]);
  const pickSequences = useMemo(() => [0, 1, 3, 2, 4, 5, 7, 6, 8, 9], []);
  const banSequences = useMemo(() => [0, 1, 2, 3, 4, 5, 7, 6, 9, 8], []);
  const isDragAndDrop = useMemo(
    () => searchParams.get("method") === "dnd",
    [searchParams]
  );
  const withTimer = useMemo(
    () => Boolean(+searchParams.get("timer") || 0) && !isDragAndDrop,
    [searchParams]
  );

  const containerRef = useRef();
  const [isDownloadImage, setIsDownloadImage] = useState(false);

  const banPhase = useMemo(() => {
    if (!selectedBanCount) return false;
    if (selectedBanCount?.ban_count === 3) {
      if (heroesPickList.length < 6) {
        return heroesBanList.length < 4;
      }
      return heroesBanList.length < 6;
    }
    if (selectedBanCount?.ban_count === 5) {
      if (heroesPickList.length < 6) {
        return heroesBanList.length < 6;
      }
      return heroesBanList.length < 10;
    }
    return currentBanOrder < selectedBanCount?.ban_count * 2;
  }, [currentBanOrder, selectedBanCount, heroesBanList, heroesPickList]);

  const pickPhase = useMemo(() => {
    return !banPhase && heroesPickList.length !== 10;
  }, [banPhase, heroesPickList]);

  const clearInterval = () => {
    window.clearInterval(timerRef?.current);
  };
  const setTimerInterval = () => {
    timerRef.current = window.setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      const response = await Promise.all([
        wrappedFetchHeroes(),
        wrappedFetchHeroRoles(),
        await wrappedFetchBanCount(banCount),
      ]);
      if (!active) return;
      setHeroes(response[0].data);
      setRoles(response[1].data);
      setSelectedBanCount(response[2].data);
      setLoading(false);
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => clearInterval();
  }, []);

  useEffect(() => {
    if (timer <= 0) clearInterval();
  }, [timer]);

  const banHeroes = (hero, order = null) => {
    const arr = [...heroesBanList];
    arr.push({ ...hero, order: order || banSequences[currentBanOrder] });
    const activitisCopy = [...activities];
    activitisCopy.push({
      activity: "ban",
      hero,
      sequence: order || banSequences[currentBanOrder],
      order: currentBanOrder,
    });

    setActivities(activitisCopy);
    setHeroesBanList(arr);
    setCurrentBanOrder(currentBanOrder + 1);
    setCurrentHeroes(null);
    clearInterval();
    setTimerInterval();
  };

  const pickHeroes = (hero, order = null) => {
    const arr = [...heroesPickList];
    arr.push({ ...hero, order: order || pickSequences[currentOrder] });
    const activitisCopy = [...activities];
    activitisCopy.push({
      activity: "pick",
      hero,
      sequence: order || pickSequences[currentOrder],
      order: currentOrder,
    });

    setActivities(activitisCopy);
    setHeroesPickList(arr);
    setCurrentOrder(currentOrder + 1);
    setCurrentHeroes(null);
    clearInterval();
    setTimerInterval();
  };

  useEffect(() => {
    if (!banPhase && !pickPhase) return;
    if (timer === 0 && withTimer) {
      setTimer(+searchParams.get("timer") || 0);
      if (banPhase) {
        const bannedHero = heroes.filter(
          (item) =>
            !Boolean(heroesBanList.filter((hb) => hb.id === item.id)[0]) &&
            !Boolean(heroesPickList.filter((hp) => hp.id === item.id)[0])
        );
        banHeroes(bannedHero[Math.floor(Math.random() * bannedHero.length)]);
      }
      if (pickPhase) {
        const pickedHero = heroes.filter(
          (item) =>
            !Boolean(heroesBanList.filter((hb) => hb.id === item.id)[0]) &&
            !Boolean(heroesPickList.filter((hp) => hp.id === item.id)[0])
        );
        pickHeroes(pickedHero[Math.floor(Math.random() * pickedHero.length)]);
      }
    }
  }, [timer, withTimer, banPhase, pickPhase]);

  const handleBanClick = () => {
    setTimer(+searchParams.get("timer") || 0);
    banHeroes(currentHeroes);
  };

  const handlePickClick = () => {
    if (!currentHeroes) return;
    setTimer(+searchParams.get("timer") || 0);
    pickHeroes(currentHeroes);
  };

  const handleDropHeroes = (hero, order, type = "pick") => {
    if (!hero) return;
    if (type === "pick") {
      pickHeroes(hero, order);
      return;
    }
    banHeroes(hero, order);
  };

  const handleResetClick = () => {
    setCurrentHeroes(null);
    setCurrentOrder(0);
    setCurrentBanOrder(0);
    setHeroesBanList([]);
    setHeroesPickList([]);
    setTimer(+searchParams.get("timer") || 0);
    clearInterval();
    setTimerInterval();
  };

  const handleUndoClick = () => {
    const activitiesCopy = [...activities];
    const lastAct = activitiesCopy.pop();
    if (!lastAct) return;

    const { sequence, order } = lastAct;

    switch (lastAct.activity) {
      case "ban": {
        const banListCopy = [...heroesBanList];
        const index = banListCopy.findIndex((val) => val.order === sequence);
        if (index === -1) return;
        banListCopy.splice(index, 1);
        setCurrentBanOrder(order);
        setHeroesBanList(banListCopy);
        break;
      }

      case "pick": {
        const pickListCopy = [...heroesPickList];
        const index = pickListCopy.findIndex((val) => val.order === sequence);
        if (index === -1) return;
        pickListCopy.splice(index, 1);
        setCurrentOrder(order);
        setHeroesPickList(pickListCopy);
        break;
      }
    }
    setActivities(activitiesCopy);
    if (withTimer) {
      setTimer(+searchParams.get("timer"));
      clearInterval();
      setTimerInterval();
    }
  };

  const handleCaptureClick = async () => {
    setIsDownloadImage(true);
    setTimeout(async () => {
      await exportAsImage(
        containerRef.current,
        `Simulator - ${new Date().toLocaleString()}`
      );

      setTimeout(() => {
        setIsDownloadImage(false);
      }, 1000);
    }, 250);
  };

  const leftTeam = useMemo(() => {
    if (leftTeamFromQuery) return leftTeamFromQuery;
    const curr = teams.filter((item) => item.side === "LEFT")[0];
    if (!curr) return "Blue Team";
    return curr.name;
  }, [teams, leftTeamFromQuery]);
  const rightTeam = useMemo(() => {
    if (rightTeamFromQuery) return rightTeamFromQuery;
    const curr = teams.filter((item) => item.side === "RIGHT")[0];
    if (!curr) return "Red Team";
    return curr.name;
  }, [teams, rightTeamFromQuery]);

  const arrangeBanAndPickOrder = (side, order) => {
    if (side === firstPick) return +order % 2 === 0;
    return +order % 2 !== 0;
  };

  const isMobile = useMemo(() => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

  const getHeroBan = useCallback(
    (order) => {
      if (banSequences[currentBanOrder] === order && banPhase && !isDragAndDrop)
        return currentHeroes;
      return heroesBanList.filter((hero) => hero.order === order)[0] || null;
    },
    [
      isDragAndDrop,
      banSequences,
      currentBanOrder,
      banPhase,
      heroesBanList,
      currentHeroes,
    ]
  );

  const getBanSlotActive = useCallback(
    (pos) => {
      if (pickPhase) return false;
      const pickedOrder = heroesBanList.map((hero) => hero.order);
      if (!heroesBanList.length) return pos === firstPick;

      const notPickedOrder = banSequences.filter(
        (p) => !pickedOrder.includes(p)
      );
      const current = notPickedOrder[0];
      if (pos == "LEFT") return current % 2 === 0;
      return current % 2 !== 0;
    },
    [banSequences, heroesBanList, currentBanOrder, pickPhase, firstPick]
  );

  const getPickSlotActive = useCallback(
    (order) => {
      if (isDragAndDrop) {
        if (banPhase) {
          return false;
        }

        const pickedOrder = heroesPickList.map((hero) => hero.order);
        if (!pickedOrder.length) return order === 0;

        const notPickedOrder = pickSequences.filter(
          (p) => !pickedOrder.includes(p)
        );
        const current = notPickedOrder[0];
        return current === order;
      }
      if (banPhase) {
        return order === pickSequences[currentBanOrder];
      }
      return order === pickSequences[currentOrder];
    },
    [
      banPhase,
      isDragAndDrop,
      heroesPickList,
      pickSequences,
      currentOrder,
      banSequences,
      currentBanOrder,
    ]
  );

  const getHeroPick = useCallback(
    (order) => {
      if (pickSequences[currentOrder] === order && pickPhase && !isDragAndDrop)
        return currentHeroes;
      return heroesPickList.filter((hero) => hero.order === order)[0] || null;
    },
    [
      isDragAndDrop,
      pickSequences,
      currentOrder,
      pickPhase,
      currentHeroes,
      pickPhase,
      heroesPickList,
    ]
  );

  const dropBannedHero = (hero) => {
    const heroesBanListCopy = [...heroesBanList];
    const index = heroesBanListCopy.findIndex(
      (item) => item.order === hero.order
    );
    const activitisCopy = [...activities];
    const order = banSequences.findIndex((p) => p === hero.order);
    activitisCopy.push({
      activity: "dropBannedHero",
      hero,
      sequence: hero.order,
      order,
    });

    setActivities(activitisCopy);

    heroesBanListCopy.splice(index, 1);
    setHeroesBanList(heroesBanListCopy);
    clearInterval();
    setTimerInterval();
  };

  const onDropPickedHero = (hero) => {
    if (hero.type === "ban") {
      dropBannedHero(hero);
      return;
    }
    const heroesPickListCopy = [...heroesPickList];
    const index = heroesPickListCopy.findIndex(
      (item) => item.order === hero.order
    );
    const activitisCopy = [...activities];
    const order = pickSequences.findIndex((p) => p === hero.order);
    activitisCopy.push({
      activity: "dropPickedHero",
      hero,
      sequence: hero.order,
      order,
    });

    setActivities(activitisCopy);

    heroesPickListCopy.splice(index, 1);
    setHeroesPickList(heroesPickListCopy);
    clearInterval();
    setTimerInterval();
  };

  const getNotBannedOrder = () => {
    const pickedOrder = heroesBanList.map((hero) => hero.order);
    if (!heroesBanList.length) return banSequences[0];
    const notPickedOrder = banSequences.filter((p) => !pickedOrder.includes(p));

    return notPickedOrder[0];
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
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="min-h-[50vh]">
        <div className="flex justify-between items-center p-4 flex-wrap">
          <div className="flex gap-2">
            <p className="text-white text-opacity-70 font-bold">Game Mode</p>
            <p className="text-white font-bold text-opacity-70">|</p>
            <p className="text-white font-bold">Simulator</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleResetClick}
              className="bg-gray-500 text-white py-2 rounded-md w-24"
            >
              Reset
            </button>
            <button
              onClick={handleUndoClick}
              className="bg-gray-500 text-white py-2 rounded-md w-24"
            >
              Undo
            </button>
            <button
              onClick={handleCaptureClick}
              className="bg-gray-500 text-white py-2 rounded-md w-24"
            >
              Capture
            </button>
          </div>
        </div>
        <div className="w-full bg-primary py-4" ref={containerRef}>
          <div
            className={clsx("flex w-full gap-4 justify-between", {
              "flex-wrap": !isDownloadImage,
            })}
          >
            <div
              className={clsx(
                {
                  "w-full md:w-96 sm:w-64 xs:landscape:w-44": !isDownloadImage,
                },
                { "w-1/2": isDownloadImage }
              )}
            >
              <div className="flex justify-between px-4 items-center mb-3">
                <p className="font-bold text-white">{leftTeam}</p>
                <span className="block w-10 h-6 bg-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                {[...Array(5 * 2).keys()]
                  .filter((item) => arrangeBanAndPickOrder("LEFT", item))
                  .map((slot) => (
                    <SimulatorPickSlotDND
                      fullWidth={isDownloadImage}
                      key={slot}
                      slot={slot}
                      active={getPickSlotActive(+slot)}
                      heroes={getHeroPick(+slot)}
                      timer={timer}
                      onDropHero={(hero) =>
                        handleDropHeroes(hero, slot, "pick")
                      }
                      droppable={getPickSlotActive(+slot)}
                      isDragAndDrop={isDragAndDrop}
                      helperText="Pick"
                    />
                  ))}
              </div>
            </div>

            {!isDownloadImage ? (
              <HeroesPanel
                heroes={heroes}
                roles={roles}
                heroesBanList={heroesBanList}
                heroesPickList={heroesPickList}
                isDragAndDrop={isDragAndDrop}
                onHeroesButtonClick={(hero) => setCurrentHeroes(hero)}
                onDropHero={(hero) => onDropPickedHero(hero)}
              />
            ) : null}
            <div
              className={clsx(
                {
                  "w-full md:w-96 sm:w-64 xs:landscape:w-44": !isDownloadImage,
                },
                { "w-1/2": isDownloadImage }
              )}
            >
              <div className="flex justify-between px-4 items-center mb-3">
                <span className="block w-10 h-6 bg-red-500" />
                <p className="font-bold text-white">{rightTeam}</p>
              </div>
              <div className="flex flex-col gap-1">
                {[...Array(5 * 2).keys()]
                  .filter((item) => arrangeBanAndPickOrder("RIGHT", item))
                  .map((slot) => (
                    <SimulatorPickSlotDND
                      fullWidth={isDownloadImage}
                      key={slot}
                      slot={slot}
                      active={getPickSlotActive(+slot)}
                      heroes={getHeroPick(+slot)}
                      timer={timer}
                      onDropHero={(hero) =>
                        handleDropHeroes(hero, slot, "pick")
                      }
                      droppable={getPickSlotActive(+slot)}
                      isDragAndDrop={isDragAndDrop}
                      helperText="Pick"
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="flex w-full px-4 justify-between mt-3 flex-wrap gap-4">
            <div className="flex gap-2 mt-3 px-4">
              {[...Array(selectedBanCount.ban_count * 2).keys()]
                .filter((item) => arrangeBanAndPickOrder("LEFT", item))
                .map((item) => (
                  <SimulatorBanSlot
                    key={item}
                    slot={item}
                    heroes={getHeroBan(item)}
                    onDropHero={(hero) => handleDropHeroes(hero, item, "ban")}
                    isDragAndDrop={isDragAndDrop}
                  />
                ))}
            </div>
            {!isDragAndDrop ? (
              <>
                {banPhase && (
                  <button
                    onClick={handleBanClick}
                    className={clsx(
                      "bg-red-500 text-white py-2 px-6 rounded-md w-full xs:w-48 transition-opacity duration-100",
                      [isDownloadImage && "opacity-0"]
                    )}
                  >
                    Ban
                  </button>
                )}
                {pickPhase && (
                  <button
                    onClick={handlePickClick}
                    className={clsx(
                      "bg-blue-500 text-white py-2 px-6 rounded-md w-full xs:w-48 transition-opacity duration-100",
                      [isDownloadImage && "opacity-0"]
                    )}
                  >
                    Pick
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="flex gap-2 w-1/2">
                  <div className="w-1/2">
                    <SimulatorPickSlotDND
                      fullWidth={isDownloadImage}
                      timer={timer}
                      onDropHero={(hero) =>
                        handleDropHeroes(hero, getNotBannedOrder(), "ban")
                      }
                      active={getBanSlotActive("LEFT")}
                      droppable={getBanSlotActive("LEFT")}
                      isDragAndDrop={isDragAndDrop}
                      helperText="Ban"
                    />
                  </div>
                  <div className="w-1/2">
                    <SimulatorPickSlotDND
                      fullWidth={isDownloadImage}
                      onDropHero={(hero) =>
                        handleDropHeroes(hero, getNotBannedOrder(), "ban")
                      }
                      timer={timer}
                      active={getBanSlotActive("RIGHT")}
                      droppable={getBanSlotActive("RIGHT")}
                      isDragAndDrop={isDragAndDrop}
                      helperText="Ban"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2 mt-3 px-4">
              {[...Array(selectedBanCount.ban_count * 2).keys()]
                .filter((item) => arrangeBanAndPickOrder("RIGHT", item))
                .reverse()
                .map((item) => (
                  <SimulatorBanSlot
                    key={item}
                    slot={item}
                    isDragAndDrop={isDragAndDrop}
                    heroes={getHeroBan(item)}
                    onDropHero={(hero) => handleDropHeroes(hero, item, "ban")}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default Simulator;
