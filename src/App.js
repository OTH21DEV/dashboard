import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import PlaybookStats from "./components/PlaybooksStats/PlaybookStats";
import './app.css'
import axios from "axios";
axios.defaults.headers = {
  statuskey: "sebuxor",
};

let executionLegend={
  first:'total executions',
  second:"today's executions"
}
let workerLegend={
  first:'worker count',
  second:"consumer count"
}
function App() {
  const [playbooksExecutions, setPlaybooksExecutions] = useState([]);
  const [worker, setWorker] = useState([]);
  const url = "https://purplecore.xyz/api/v1/management/playbooks/activity/stats";

  const getStats = async () => {
    const result = await axios.get(url);
    console.log(result);


    let counterExecution ={
      first:result.data.data.executionsTotal,
      second:result.data.data.executionsToday,
    };


    let counterWorker={
      first: result.data.data.workerCount,
      second:result.data.data.publicServers[0].consumerCount
      // second: result.data.data.workerCount,
    }
    localStorage.setItem("counterExecution", JSON.stringify(counterExecution));
    localStorage.setItem("counterWorker", JSON.stringify(counterWorker));


    localStorage.setItem("maxExecutionLimit", result.data.data.maxExecutionLimit);

    setPlaybooksExecutions([
      {
        id: "Todays executions",
        data: [
          {
            x: "Today executions",

            y: result.data.data.executionsToday,
          },
        ],
      },

      {
        id: "Total executions",
        data: [
          {
            x: "Total executions",
            y: result.data.data.executionsTotal,
          },
        ],
      },
    ]);

    setWorker([
      {
        id: "Worker Count",
        data: [
          {
            x: "Worker Count",

            y: result.data.data.workerCount,
          },
        ],
      },

      {
        id: "Consumer Count",
        data: [
          {
            x: "Consumer Count",
            y: result.data.data.publicServers[0].consumerCount,
          },
        ],
      },
    ]);
  };

  useEffect(() => {
    getStats();
  }, []);





  return (
    <div className="App">
      <Header></Header>
      <section className="radial-charts">
      <PlaybookStats legend={executionLegend}counter={JSON.parse(localStorage.getItem('counterExecution'))}maxValue={localStorage.getItem("maxExecutionLimit")} data={playbooksExecutions} title="Playbooks Activity Stats"></PlaybookStats>
      <PlaybookStats  legend={workerLegend}counter={JSON.parse(localStorage.getItem('counterWorker'))}maxValue={150} data={worker} title="Threatconnect Engine Metrics"></PlaybookStats>
      </section>
    </div>
  );
}

export default App;
