import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoHeader from "../../Utilities/LogoHeader";
import ObjectiveDetail from "./ObjectiveDetail/ObjectiveDetail";
import { baseUrl, Headers } from "../../services/constants";
import AddObjective from "../AddObjective/AddObjective";
import Navigation from "../../Utilities/Navigation";
import { Triangle } from "react-loader-spinner";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [currentObjective, setCurrentObjective] = useState({});

  useEffect(() => {
    getObjective();
  }, []);

  function getObjective() {
    axios.get(`${baseUrl}/objectives`, { headers: Headers }).then((res) => {
      setCurrentObjective(res.data[0] || []);
      setLoading(false);
    });
  }

  return (
    <div>
      <LogoHeader />
      <Navigation />
      {loading ? (
        <div className="page-loader">
          <Triangle
            height="100"
            width="100"
            color="#ED8012"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : currentObjective.length === 0 ? (
        <AddObjective getObjective={getObjective} />
      ) : (
        <ObjectiveDetail currentObjective={currentObjective} />
      )}
    </div>
  );
}
