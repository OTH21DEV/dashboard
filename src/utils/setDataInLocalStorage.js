import { convertToGib } from "./convertToGib";

//params - response when axios call
export function setDataInLocalStorage(playbooksResponse, jvmStatsResponse, openssearchShardsStatsResponse) {
  let counterExecution = {
    first: playbooksResponse.data.data.executionsTotal,
    second: playbooksResponse.data.data.executionsToday,
  };
  localStorage.setItem("counterExecution", JSON.stringify(counterExecution));

  let counterWorker = {
    first: playbooksResponse.data.data.workerCount,
    second: playbooksResponse.data.data.publicServers[0].consumerCount,
  };
  localStorage.setItem("counterWorker", JSON.stringify(counterWorker));

  let counterBroker = {
    first: playbooksResponse.data.data.brokerConnectionCount,
  };

  localStorage.setItem("counterBroker", JSON.stringify(counterBroker));
  let counterMemoryConsumption = {
    first: convertToGib(jvmStatsResponse.data.data.heapMemoryUsed),
  };

  localStorage.setItem("counterMemoryConsumption", JSON.stringify(counterMemoryConsumption));

  let counterOpensearchShards = {
    first: openssearchShardsStatsResponse.data.active_primary_shards,
  };
  localStorage.setItem("counterOpensearchShards", JSON.stringify(counterOpensearchShards));

  let counterActiveShards = {
    first: openssearchShardsStatsResponse.data.active_shards_percent_as_number,
  };

  localStorage.setItem("counterActiveShards", JSON.stringify(counterActiveShards));
}
