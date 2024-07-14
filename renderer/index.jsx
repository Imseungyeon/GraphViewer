import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import GraphContainer from './GraphContainer.js';

const App = () => {

  const [seriesData, setSeriesData] = useState(Array.from({ length: 16 }, () => []));
  const [bufferedData, setBufferedData] = useState([]);
  const [plotLinesSeries, setPlotLinesSeries] = useState([]);

  let currentValue = 0;

  const handleAllStart = () => {
    electronApi.startViewAll();
  }

  const handleSinStart = () => {
    electronApi.startSinInterval();
  };

  const handleRandomStart = () => {
    electronApi.startRandomInterval();
  };

  const handleStepStart = () => {
    electronApi.startStepInterval();
  };

  const handleStop = () => {
    electronApi.stopScroll();
  };
  
  const updateStateWithBatchedData = useCallback((data) => {
    setSeriesData((prevData) =>
      prevData.map((prevSeriesData, index) => [
        ...prevSeriesData,
        ...data.map((dataPoint) => [dataPoint.xValue, dataPoint[`variable${index + 1}Value`]]),
      ])
    );
  }, []);

  useEffect(() => {
      let accumulatedData = [];
  
      const intervalId = setInterval(() => {
        if (accumulatedData.length > 0) {
          updateStateWithBatchedData(accumulatedData);
          accumulatedData = [];
        }
      }, 50);
  

    electronApi.onAllValue((data) => {
      accumulatedData.push(data);
      if (accumulatedData.length > 0) {
        setBufferedData([...accumulatedData]);
      }
    });

    // plotLines 1000ms 주기로 추가

    electronApi.onUpdatePlotLines((data) => {
      if (seriesData[0].length * 33 >= currentValue) {
        currentValue += 1000;
        setPlotLinesSeries((prevData) => [...prevData, { color: 'red', width: 0.5, zIndex: 5, value: currentValue, }]);
      }
    });

    return () => {
      clearInterval(intervalId);
      electronApi.stopScroll();
    };
  }, [updateStateWithBatchedData]);


  //화면
  return (
    <div>
      <div id="btn-wrap" className="forn-wrap">
      <button id="startAllButton" onClick={handleAllStart}> All</button>
        <button id="sinStartButton" onClick={handleSinStart}>Sin</button>
        <button id="randomStartButton" onClick={handleRandomStart}>Random</button>
        <button id="stepStartButton" onClick={handleStepStart}>Step</button>
      </div>
      <br/>
      <GraphContainer
          seriesData={seriesData}
          plotLinesSeries={plotLinesSeries}
      />
      <div id="stop-wrap" className="stop-wrap">
        <button id="stopButton" onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));