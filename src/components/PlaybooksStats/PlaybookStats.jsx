import React, { useState, useEffect} from "react";
import { ResponsiveRadialBar } from "@nivo/radial-bar";

import "./playbookStats.css";
import GetData from "../../services/services";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

axios.defaults.headers = {
  statuskey: "sebuxor",
};

const PlaybookStats = () => {
  const dotToday = <FontAwesomeIcon icon={faCircle} color={'#e8c1a0'} />
  const dotTotal = <FontAwesomeIcon icon={faCircle} color={'#f47560'} />
  const [playbooksExecutions, setPlaybooksExecutions] = useState([]);

  const url = "https://purplecore.xyz/api/v1/management/playbooks/activity/stats";

  const getStats = async () => {
    const result = await axios.get(url);
    console.log(result);

  

    localStorage.setItem("executionsToday", result.data.data.executionsToday);
    localStorage.setItem("executionsTotal", result.data.data.executionsTotal);

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
  };
  // console.log(playbooksExecutions.length)

  useEffect(() => {
    getStats();
  }, []);

 
  // console.log(playbooksExecutions[0].data[0].y)

  //////////////////////////////////:V2

  // useEffect(() => {
  //   const stats = new GetData();

  //   stats.getData().then( async() => {
  //     // setExecutionsTotal([
  //     //   {
  //     //     id: "Total executions",
  //     //     ranges: [],
  //     //     measures: test.playbooksData.executionsTotal,
  //     //     markers: [test.playbooksData.executionsTotal],
  //     //   },
  //     // ]);
  //     // setExecutionsToday([
  //     //   {
  //     //     id: "Today's executions ",
  //     //     ranges: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
  //     //     measures: test.playbooksData.executionsToday,
  //     //     markers: [test.playbooksData.executionsToday],
  //     //   },
  //     // ]);

  //    setPlaybooksExecutions([
  //       {
  //         id: "Todays executions",
  //         data: [
  //           {
  //             x: "Today executions",

  //             y: stats.playbooksData.executionsToday,
  //           },

  //         ],
  //       },

  //       {
  //         id: "Total executions",
  //         data: [
  //           {
  //             x: "Total executions",
  //             y: stats.playbooksData.executionsTotal,
  //           },
  //         ],
  //       },
  //       // {
  //       //   id: "Execution limits",
  //       //   data: [
  //       //     {
  //       //       x: "Execution limits",
  //       //       y: 10000,
  //       //     },
  //       //   ],
  //       // },
  //     ]);

  //   });

  // }, []);

  const theme = {
    // background: "#222222",
    axis: {
      fontSize: "14px",
      tickColor: "#eee",

      ticks: {
        // line: {
        //   stroke: "#555555",
        //   tickCount: "2",
        // },
        text: {
          fill: "#ffffff",
        },
      },
      // legend: {
      //   text: {
      //     fill: "#aaaaaa",
      //   },
      // },
    },
    dots: {
      text: {
        fill: "#ffffff",
      },
    },
    grid: {
      line: {
        stroke: "#555555",
      },
    },
  };

  // const axisBottom = {
  //   tickCount: 1,

  //   tickSize: 5,
  //   tickPadding: 5,
  //   tickRotation: 0,
  //   legend: "Map",
  //   legendPosition: "middle",
  //   legendOffset: 32,
  // };

  // const legends = [
  //   {
  //     dataFrom: "keys",
  //     anchor: "bottom-right",
  //     direction: "column",
  //     justify: false,
  //     translateX: 120,
  //     translateY: 0,
  //     itemsSpacing: 2,
  //     itemWidth: 100,
  //     itemHeight: 20,
  //     itemDirection: "left-to-right",
  //     itemOpacity: 0.85,
  //     itemTextColor: "#ffffff",
  //     symbolSize: 20,
  //     effects: [
  //       {
  //         on: "hover",
  //         style: {
  //           itemOpacity: 1,
  //         },
  //       },
  //     ],
  //   },
  // ];
  //  console.log(executionsTotal[0].measures)
  // <<<<<<<<<<<<<<<<  console.log(playbooksExecutions)>>>>>>>>>>>>>>>>

  return (
    <div className="bullet-container">
      <h2>Playbooks Activity Stats</h2>
      {/* <div className="test"> */}
      {/* <ResponsiveBullet
        data={executionsTotal}
        margin={{ top: 50, right: 90, bottom: 50, left: 190 }}
        spacing={46}
        titleAlign="start"
        titleOffsetX={-120}
        measureSize={0.2}
        rangeColors={"seq:yellow_green"}
        measureBorderWidth={"13px"}
        theme={theme}
        axisBottom={axisBottom}
        legends={legends}
        tickValues={[0, 10000]}
        animate={true}
        maxValue={10000}
      />
  
      <ResponsiveBullet
        data={executionsToday}
        margin={{ top: 50, right: 90, bottom: 50, left: 190 }}
        spacing={46}
        titleAlign="start"
        titleOffsetX={-120}
        measureSize={0.2}
        rangeColors={"seq:orange_red"}
        measureBorderWidth={"13px"}
      /> */}
<div className="chart-wrapper">
      <ResponsiveRadialBar
        data={playbooksExecutions}
        // centerValue={{
        //   value: 2500,
        //   formatted: true
        // }}
        // legendLabel={(x)=>${x.value}}
        //  valueFormat="0=-0.0%"
        // tooltip={(data) => <div className="tooltip">{data.bar.data.y}</div>}
        maxValue={10000}
        startAngle={-90}
        endAngle={90}
        // endAngle={275}
        innerRadius={0.25}
        padding={0.4}
        padAngle={0}        
        margin={{ top: 40 }}
      
        // margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", "25"]],
        }}
        //   theme={{
        //     dots: {
        //         text: {
        //             fill: '#ffffff',
        //         },
        //     },
        // }}
        enableTracks={true}
        //legende of bars
        // radialAxisStart={{ tickSize: 20, tickPadding: 9, tickRotation: 0 }}
        // circularAxisOuter={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        enableLabels={false}
        label="value"
        labelsTextColor={{ theme: "labels.text.fill" }}
        enableRadialGrid={false}
        enableCircularGrid={false}
        radialAxisStart={false}
        motionConfig="gentle"
        isInteractive={true}
        theme={theme}
        // tooltip={({ bar }) => {
        //   return (
        //     <BasicTooltip
        //       value={`${bar.value}`}
        //       color={bar.color}
        //       id={
        //         <span>
        //           {bar.category} - {bar.groupId}
        //         </span>
        //       }
        //       enableChip
        //     />
        //   );
        // }}

        layers={["grid", "tracks", "bars", "labels", "legends", "CenteredMetric"]}
        // legends={[
        //   {
        //     dataFrom: "keys",
        //     // data: keys.map((item,index)=>({
        //     //   id: item.id,
        //     //   label:item.y
        //     // })),
        //     anchor: "right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 60,
        //     //  translateY: -17,
        //     itemWidth: 103,
        //     itemHeight: 20,
        //     itemsSpacing: 5,
        //     symbolSize: 10,
        //     itemDirection: "left-to-right",
        //     symbolShape: "circle",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemTextColor: "#f77c08",
        //         },
        //       },
        //     ],
        //     itemTextColor: "white",
        //   },
        // ]}
      />
      <div className="chart-legend">
      <p>{dotTotal }{"\u00A0"}<span>{localStorage.getItem("executionsTotal")}</span> {"\u00A0"} total executions </p>
      <p>{dotToday }{"\u00A0"} <span>{localStorage.getItem("executionsToday")}</span>{"\u00A0"} today's executions</p>
      </div>

    </div>
    </div>
  );
};

export default PlaybookStats;
