import axios from "axios";
import { setDataInLocalStorage } from "../utils/setDataInLocalStorage";
// const dotenv = require('dotenv')
// dotenv.config()

axios.defaults.headers = {
  statuskey: process.env.REACT_APP_STATUSKEY,
};

export default class GetData {
  constructor() {
    this.playbooksData = null;
    this.jvmStatsData = null;
    this.openssearchShardsStatsData =null
  }
  getData = async () => {
    const playbooksStats = axios.get(process.env.REACT_APP_PLAYBOOKS_URL);
    const jvmStats = axios.get(process.env.REACT_APP_JVM_URL);
    const openssearchShardsStats = axios.get(process.env.REACT_APP_SHARDS_URL, delete axios.defaults.headers["statuskey"]);
    return await axios
      .all([playbooksStats, jvmStats, openssearchShardsStats])

      .then(
        axios.spread((...response) => {
          const playbooksResponse = response[0];
          const jvmStatsResponse = response[1];
          const openssearchShardsStatsResponse = response[2];

          console.log(playbooksResponse);
          console.log(openssearchShardsStatsResponse);

          console.log(playbooksResponse.data.data);
          
          this.playbooksData = playbooksResponse.data.data;
          this.jvmStatsData = jvmStatsResponse.data.data;
          this.openssearchShardsStatsData = openssearchShardsStatsResponse.data
          //localstorage
          setDataInLocalStorage(playbooksResponse, jvmStatsResponse,openssearchShardsStatsResponse);
        })
      )

      .catch((err) => {
        console.log(err);
      });
  };
}

