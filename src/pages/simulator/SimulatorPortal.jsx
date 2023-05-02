import { Button } from "@/components/common";
import { SwitchToggle } from "@/components/form";
import { useWrap } from "@/hooks/useWrap";
import BanAmountService from "@/service/ban-amount-service";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SimulatorPortal() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Blue Team", side: "LEFT" },
    { id: 2, name: "Red Team", side: "RIGHT" },
  ]);
  const [firstPick, setFirstPick] = useState("LEFT");
  const [banOptions, setBanOptions] = useState([]);
  const [banCount, setBanCount] = useState(null);
  const [timer, setTimer] = useState(0);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const wrappedFetchBanAmount = useWrap(BanAmountService.gets);
  const [method, setMethod] = useState("sequential");

  const handleTeamNameChange = (event, side) => {
    const teamsCopy = [...teams];
    const index = teamsCopy.findIndex((item) => item.side === side);
    teamsCopy[index].name = event.target.value;
    setTeams(teamsCopy);
  };

  useEffect(() => {
    setBanCount(banOptions[0]?.id ?? 0);
  }, [banOptions]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await wrappedFetchBanAmount();
      if (!active) return;
      setBanOptions(response?.data || []);
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  const onClick = () => {
    const leftName = teams.filter((team) => team.side === "LEFT")[0].name;
    const rightName = teams.filter((team) => team.side === "RIGHT")[0].name;
    navigate(
      `/simulator/start?ban_count=${banCount}&first_pick=${firstPick}&left_name=${leftName}&right_name=${rightName}&timer=${timer}&method=${method}`
    );
  };

  return (
    <div className="min-h-[50vh] px-6 lg:px-24 w-full">
      <div className="max-w-lg mx-auto w-full border p-6">
        <div className="flex flex-col">
          <p className="text-white text-4xl font-bold mb-4">SIMULATOR</p>
          <ol className="list-decimal pl-4">
            <li className="text-white font-medium mb-3 text-lg">
              Select the <span className="text-maroon">Game Mode</span> for
              drafting
            </li>
            <li className="text-white font-medium mb-3 text-lg">
              Select <span className="text-maroon">First Pick</span> team
            </li>
            <li className="text-white font-medium mb-3 text-lg">
              Select if you want to{" "}
              <span className="text-maroon">Skip Bans</span>
            </li>
          </ol>
        </div>
        <div className="flex md:flex-row flex-col items-start md:gap-4 gap-2 mb-3">
          <p className="text-lg text-white font-medium min-w-[128px]">
            First Pick
          </p>
          <div>
            {(teams || []).map((team) => (
              <React.Fragment key={team.id}>
                <div className="flex gap-2 items-center mb-3">
                  <input
                    type="radio"
                    name="team-first-pick"
                    id={`team-mode-${team.id}`}
                    className="w-5 h-5 bg-primary text-primary form-radio checked:border checked:border-white outline-none"
                    value={team.side}
                    checked={team.side === firstPick}
                    onChange={() => setFirstPick(team.side)}
                  />
                  <label
                    htmlFor={`team-mode-${team.id}`}
                    className="text-white"
                  >
                    {team.side} SIDE
                  </label>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-start gap-2 md:gap-4 mb-3">
          <p className="text-lg text-white font-medium min-w-[128px]">
            Team Name
          </p>
          <div className="flex flex-col">
            {(teams || []).map((team) => (
              <React.Fragment key={team.id}>
                <div className="mb-3 flex flex-col">
                  <label htmlFor={`team-${team.id}`} className="text-white">
                    {team.side} SIDE
                  </label>
                  <input
                    type="text"
                    className="rounded-md px-2 py-1 outline-none"
                    value={team.name}
                    onChange={(e) => handleTeamNameChange(e, team.side)}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex items-start md:gap-4 gap-2 md:flex-row flex-col mb-3">
          <p className="text-lg font-medium text-white min-w-[128px]">
            Timer (sec)
          </p>
          <input
            type="number"
            className="rounded-md px-2 py-1 outline-none"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
          />
        </div>
        <div className="flex items-start md:gap-4 gap-2 md:flex-row flex-col mb-3">
          <p className="text-lg font-medium text-white min-w-[128px]">
            Ban Amount
          </p>
          <select
            className="py-1 px-2 outline-none md:w-auto w-full"
            onChange={(e) => setBanCount(+e.target.value)}
          >
            {banOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.ban_count} Bans
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-start md:gap-4 gap-2 md:flex-row flex-col">
          <p className="text-lg font-medium text-white min-w-[128px]">
            Ban Amount
          </p>
          <select
            className="py-1 px-2 outline-none md:w-auto w-full"
            onChange={(e) => setMethod(e.target.value)}
          >
            {[
              { label: "Sequential", value: "sequential" },
              { label: "Drag and Drop", value: "dnd" },
            ].map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <Button
          onClick={onClick}
          color="maroon"
          variant="outlined"
          className="mt-4"
        >
          Start Simulator
        </Button>
      </div>
    </div>
  );
}

export default SimulatorPortal;
