import axios from "axios";
axios.defaults.headers= {
    "statuskey": "sebuxor",
  };
export default class GetData {
  constructor() {
    this.playbooksData = null;
    // this.testData =null;
  }
  getData = async () => {
    const playbooksStats = axios.get("https://purplecore.xyz/api/v1/management/playbooks/activity/stats");
    // const test = axios.get("https://purplecore.xyz/api/v1/management/playbooks/activity/stats");
    console.log(playbooksStats);
    return await axios
      .all([playbooksStats])
   
      .then(
        axios.spread((...response) => {
          const playbooksResponse = response[0];
        //   const testResponse = response[0]
          console.log(playbooksResponse);
       
          this.playbooksData = playbooksResponse.data.data;
        //   this.testData = testResponse.data.data;

        })
      )
      // .then(res=>res.json())
      // .then(data=>{
      //   console.log(data)
      // })
      .catch((err) => {
        console.log(err);
      });
 
}
}