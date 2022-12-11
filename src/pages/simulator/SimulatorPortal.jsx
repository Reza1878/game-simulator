import { Button } from "@/components/common";
import { SwitchToggle } from "@/components/form";
import { useWrap } from "@/hooks/useWrap";
import BanAmountService from "@/service/ban-amount-service";
import TeamService from "@/service/team-service";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SimulatorPortal() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Blue Team", side: "LEFT" },
    { id: 2, name: "Read Team", side: "RIGHT" },
  ]);
  const [firstPick, setFirstPick] = useState("LEFT");
  const [banOptions, setBanOptions] = useState([]);
  const [banCount, setBanCount] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const wrappedFetchBanAmount = useWrap(BanAmountService.gets);
  const wrappedFetechTeam = useWrap(TeamService.gets);

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
      setBanOptions(response.data);
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await wrappedFetechTeam();
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

  const onClick = () => {
    navigate(`/simulator/start?ban_count=${banCount}&first_pick=${firstPick}`);
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
        <div className="flex items-start gap-4 mb-3">
          <p className="text-lg text-white font-medium min-w-[128px]">
            First Pick
          </p>
          <div>
            {teams.map((team) => (
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
                    {team.name}
                  </label>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex items-start gap-4">
          <p className="text-lg font-medium text-white min-w-[128px]">
            Ban Amount
          </p>
          <select
            className="py-1 px-2 outline-none"
            onChange={(e) => setBanCount(+e.target.value)}
          >
            {banOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.ban_count} Bans
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
