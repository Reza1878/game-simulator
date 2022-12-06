import { Button } from "@/components/common";
import { SwitchToggle } from "@/components/form";
import BanAmountService from "@/service/ban-amount-service";
import TeamService from "@/service/team-service";
import React, { useEffect, useState } from "react";

function SimulatorPortal() {
  const [teams, setTeams] = useState([]);
  const [banOptions, setBanOptions] = useState([]);
  const [skipBan, setSkipBan] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await BanAmountService.gets();
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
      const response = await TeamService.gets();
      if (!active) return;
      setTeams(response.data);
    };

    fetchData();

    return () => {
      active = false;
    };
  }, []);
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
          <div className="flex items-start gap-4 mb-3">
            <p className="text-lg font-medium text-white min-w-[128px]">
              Game Mode
            </p>
            <div>
              <div className="flex gap-2 items-center mb-3">
                <input
                  type="radio"
                  name="game-mode"
                  id="game-mode-1"
                  className="w-5 h-5 bg-primary text-primary form-radio checked:border checked:border-white outline-none"
                  defaultChecked={true}
                />
                <label htmlFor="game-mode-1" className="text-white">
                  Solo / Duo / Flex
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="game-mode"
                  id="game-mode-2"
                  className="w-5 h-5 bg-primary text-primary form-radio checked:border checked:border-white outline-none"
                />
                <label htmlFor="game-mode-2" className="text-white">
                  Clash / Tournamen / Scrim
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 mb-3">
          <p className="text-lg font-medium min-w-[128px]">First Pick</p>
          <div>
            {teams.map((team) => (
              <React.Fragment key={team.id}>
                <div className="flex gap-2 items-center mb-3">
                  <input
                    type="radio"
                    name="team-first-pick"
                    id={`team-mode-${team.id}`}
                    className="w-5 h-5 bg-primary text-primary form-radio checked:border checked:border-white outline-none"
                    value={team.id}
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
        <div className="flex items-start gap-4 mb-3">
          <p className="text-lg font-medium text-white min-w-[128px]">
            Skip Bans
          </p>
          <SwitchToggle checked={skipBan} onChange={(val) => setSkipBan(val)} />
        </div>
        {!skipBan && (
          <div className="flex items-start gap-4">
            <p className="text-lg font-medium text-white min-w-[128px]">
              Ban Amount
            </p>
            <select className="py-1 px-2 outline-none">
              {banOptions.map((item) => (
                <option key={item.id}>{item.ban_count} Bans</option>
              ))}
            </select>
          </div>
        )}
        <Button color="maroon" variant="outlined" className="mt-4">
          Start Simulator
        </Button>
      </div>
    </div>
  );
}

export default SimulatorPortal;
