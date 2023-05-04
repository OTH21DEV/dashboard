import React, { useState, useEffect } from "react";
import { ResponsiveRadialBar } from "@nivo/radial-bar";

import "./playbookStats.css";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

axios.defaults.headers = {
  statuskey: "sebuxor",
};

const PlaybookStats = ({ title, data, maxValue, counter, legend }) => {
  console.log(counter);
  const dotToday = <FontAwesomeIcon icon={faCircle} color={"#e8c1a0"} fontSize={"10px"} />;
  const dotTotal = <FontAwesomeIcon icon={faCircle} color={"#f47560"} fontSize={"10px"} />;

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
      <h2>{title}</h2>

      <div className="chart-wrapper">
        <ResponsiveRadialBar
          data={data}
          // centerValue={{
          //   value: 2500,
          //   formatted: true
          // }}
          // legendLabel={(x)=>${x.value}}
          //  valueFormat="0=-0.0%"
          // tooltip={(data) => <div className="tooltip">{data.bar.data.y}</div>}
          maxValue={maxValue}
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
          <p>
            {dotTotal}
            {"\u00A0"}
            <span>{counter ? counter.first : ""}</span> {"\u00A0"} {legend ? legend.first : ""}{" "}
          </p>
          <p>
            {dotToday}
            {"\u00A0"} <span>{counter ? counter.second : ""}</span>
            {"\u00A0"} {legend ? legend.second : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaybookStats;
