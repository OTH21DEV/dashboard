import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import PlaybookStats from "./components/PlaybooksStats/PlaybookStats";
import "./app.css";

import GetData from "./services/services";

import { convertToGib } from "./utils/convertToGib";



let executionLegend = {
  first: "total executions",
  second: "today's executions",
};
let workerLegend = {
  first: "worker count",
  second: "consumer count",
};
let brokerLegend = {
  first: "broker connections",
};
let memoryLegend = {
  first: "GiB memory consumption",
};

let opensearchLegend = {
  first: "opensearch shards",
};

let activeShardsLegend = {
  first: "% active shards",
};

function App() {
  const [playbooksExecutions, setPlaybooksExecutions] = useState([]);
  const [worker, setWorker] = useState([]);
  const [brokerConnection, setBrokerConnection] = useState([]);
  const [memoryConsumption, setMemoryConsumption] = useState([]);

  const [opensearchShards, setOpensearchShards] = useState([]);
  const [activeShards, setActiveShards] = useState([]);

 

  useEffect(() => {
    

    const getPlaybooksData = new GetData();
    getPlaybooksData.getData().then(async () => {
      console.log(getPlaybooksData.openssearchShardsStatsData.active_primary_shards

        );

      setPlaybooksExecutions([
        {
          id: "Todays executions",
          data: [
            {
              x: "Today executions",

              y: getPlaybooksData.playbooksData.executionsToday,
            },
          ],
        },

        {
          id: "Total executions",
          data: [
            {
              x: "Total executions",
              y: getPlaybooksData.playbooksData.executionsTotal,
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

              y: getPlaybooksData.playbooksData.workerCount,
            },
          ],
        },

        {
          id: "Consumer Count",
          data: [
            {
              x: "Consumer Count",
              y: getPlaybooksData.playbooksData.publicServers[0].consumerCount,
            },
          ],
        },
      ]);

      setBrokerConnection([
        {
          id: "Broker Connections",
          data: [
            {
              x: "Broker Connections",

              y: getPlaybooksData.playbooksData.brokerConnectionCount,
            },
          ],
        },
      ]);

      setMemoryConsumption([
        {
          id: "Threatconnect Memory Consumption",
          data: [
            {
              x: "Threatconnect Memory Consumption",

              y: convertToGib(getPlaybooksData.jvmStatsData.heapMemoryUsed),
            },
          ],
        },
      ]);

      setOpensearchShards([
        {
          id: "Opensearch Shards",
          data: [
            {
              x: "Opensearch Shards",

              y: getPlaybooksData.openssearchShardsStatsData.active_primary_shards,
            },
          ],
        },
      ]);
      setActiveShards([
        {
          id: "Opensearch Shards",
          data: [
            {
              x: "Opensearch Shards",

              y: getPlaybooksData.openssearchShardsStatsData.active_shards_percent_as_number,
            },
          ],
        },
      ]);
    });

   

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <section className="radial-charts">
        <PlaybookStats
          legend={executionLegend}
          counter={JSON.parse(localStorage.getItem("counterExecution"))}
          maxValue={localStorage.getItem("maxExecutionLimit")}
          data={playbooksExecutions}
          title="Playbooks Activity Stats"
        ></PlaybookStats>
        <PlaybookStats legend={workerLegend} counter={JSON.parse(localStorage.getItem("counterWorker"))} maxValue={150} data={worker} title="Engine Metrics"></PlaybookStats>
        <PlaybookStats legend={brokerLegend} counter={JSON.parse(localStorage.getItem("counterBroker"))} maxValue={250} data={brokerConnection} title="Broker Connections"></PlaybookStats>
        <PlaybookStats
          legend={memoryLegend}
          counter={JSON.parse(localStorage.getItem("counterMemoryConsumption"))}
          maxValue={convertToGib(8000000000)}
          data={memoryConsumption}
          title="Memory Consumption"
        ></PlaybookStats>
        <PlaybookStats legend={opensearchLegend} counter={JSON.parse(localStorage.getItem("counterOpensearchShards"))} maxValue={50} data={opensearchShards} title="Opensearch Shards"></PlaybookStats> 

       <PlaybookStats
          legend={activeShardsLegend}
          counter={JSON.parse(localStorage.getItem("counterActiveShards"))}
          maxValue={100}
          data={activeShards}
          title="Active Shards Percentage"
        ></PlaybookStats> 
      </section>
    </div>
  );
}

export default App
