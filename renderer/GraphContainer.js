import React from 'react';
import ChartComponent from './ChartComponent.jsx';

const GraphContainer = ({ seriesData}) => {
  return (
    <div>
      <ChartComponent seriesData={seriesData} />
    </div>
  );
};

export default GraphContainer;