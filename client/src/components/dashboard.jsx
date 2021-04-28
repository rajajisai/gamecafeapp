import React, { useRef, useCallback, useState } from "react";


import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { useEffect } from "react";


const sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-project-0-cmave',
  });
  const chart = sdk.createChart({
    chartId: 'f3963677-37ed-46ef-9aa5-bd5877131bab',
  });
  const chart2= sdk.createChart({
    chartId: 'd7d507b1-7ff9-4a7f-98d3-28a604755f09',
  });
  const chart3= sdk.createChart({
    chartId: '2606c3e0-dacb-46b2-8549-44cf02e6c6c0',
  });

export default function Dashboard() {
  const refChart = useRef(null);
  const refChart2 = useRef(null);
  const refChart3 = useRef(null);


  const renderChart = useCallback(async (ref) => {
    try {
      await chart.render(ref);
    } catch (e) {
      console.error(e);
    }
  }, []);
  const renderChart2 = useCallback(async (ref) => {
    try {
      await chart2.render(ref);
    } catch (e) {
      console.error(e);
    }
  }, []);
  const renderChart3 = useCallback(async (ref) => {
    try {
      await chart3.render(ref);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const setChart3 = useCallback(
    (ref) => {
      if (ref) {
        renderChart3(ref);
      }
      // Save a reference to the node
      refChart3.current = ref;
    },
    [renderChart3]
  );
  const setChart = useCallback(
    (ref) => {
      if (ref) {
        renderChart(ref);
      }
      // Save a reference to the node
      refChart.current = ref;
    },
    [renderChart]
  );
  const setChart2 = useCallback(
    (ref) => {
      if (ref) {
        renderChart2(ref);
      }
      // Save a reference to the node
      refChart2.current = ref;
    },
    [renderChart2]
  );

  const handleChange = (_event, newValue) => {
    // setYear(newValue);
  };
  
  const handleChangeCommitted = (_event, newValue) => {
    // setYear(newValue);
    // getDataFromAllPreviousYears(newValue);
  };
 

  // This function is creating the filter that will be executed on the data



  return (
    
 
      <div className="charts">
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh',width : '60vh'}} id="Chart" ref={setChart}></div>
        <br/>
        <div className = "charts"></div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh',width : '60vh', background : 'black' }} id="Chart" ref={setChart2}></div>
        <div className = "charts"></div>
        <br/>
        
        <div style={{display: 'block', height: '50vh',width : '60vh', background : 'black' }} id="Chart" ref={setChart3}></div>
      </div>
      
      
    
  );
}