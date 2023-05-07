import axios from "axios";
import { setDataInLocalStorage } from "../utils/setDataInLocalStorage";

axios.defaults.headers = {
  statuskey: "sebuxor",
};

// const axiosInstance = axios.create({
//   headers: {
//     statuskey: "sebuxor",
//   },
// });

export default class GetData {
  constructor() {
    this.playbooksData = null;
    this.jvmStatsData = null;
  }
  getData = async () => {
    const playbooksStats = axios.get("https://purplecore.xyz/api/v1/management/playbooks/activity/stats");
    const jvmStats = axios.get("https://purplecore.xyz/api/v1/management/jvm/stats");
    const tes = axios.get("http://51.222.159.234:9200/_cluster/health", delete axios.defaults.headers["statuskey"]);
    return await axios
      .all([playbooksStats, jvmStats, tes])

      .then(
        axios.spread((...response) => {
          const playbooksResponse = response[0];
          const jvmStatsResponse = response[1];
          const test = response[2];

          console.log(playbooksResponse);
          console.log(test);

          console.log(playbooksResponse.data.data);
          //localstorage
          setDataInLocalStorage(playbooksResponse, jvmStatsResponse);

          this.playbooksData = playbooksResponse.data.data;
          this.jvmStatsData = jvmStatsResponse.data.data;
        })
      )

      .catch((err) => {
        console.log(err);
      });
  };
}

// export class GetOpensearchData {
//   constructor() {
//     this.opensearchData = null;
//   }
//   getData = async () => {
//     delete axios.defaults.headers["statuskey"];
//     const playbooksStats = axios.get("http://51.222.159.234:9200/_cluster/health");

//     // const jvmStats = axios.get("https://purplecore.xyz/api/v1/management/jvm/stats");

//     return await axios
//       .all([playbooksStats])

//       .then(
//         axios.spread((...res) => {
//           console.log(res[0]);
//         })

//       )

//       // axios.spread((...response) => {
//       //   const opensearchResponse = response[0];
//       //   // const jvmStatsResponse = response[1];

//       //   // console.log(opensearchResponse);

//       //   // console.log(playbooksResponse.data.data);
//       //   // //localstorage
//       //   // setDataInLocalStorage(playbooksResponse, jvmStatsResponse);

//       //   this.opensearchData = opensearchResponse.data.data;
//       //   // this.jvmStatsData = jvmStatsResponse.data.data;
//       // })

//       // .then(res=>res.json())
//       // .then(data=>{
//       //   console.log(data)
//       // })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }
