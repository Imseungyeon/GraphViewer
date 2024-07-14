import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import highstock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const ChartComponent = React.memo(({ seriesData, plotLinesSeries }) => { //useMemo

  const chartRef = useRef(null);

  const options = useMemo(() => {
    const seriesConfig = new Array(16).fill(0).map((_, index) => ({
      name: `variable ${index + 1}`,
      data: seriesData[index] || [],
    }));
    return {
      chart: {
        type: 'line',
        allowMutatingData: false,
        animation: true,
        zoomType: "x",
      },
      accessibility: {
        enabled: false
      },
      title: {
        text: 'Chart'
      },
      xAxis: {
        title: {
          text: 'x'
        },
        scrollbars: {
          enabled:true,
          liveRedraw: true
        },
        gridLineWidth: 1,
        plotLines: plotLinesSeries
       },
       yAxis: {
        title: {
          text: 'value'
        },
        max: 128,
        min: -127,
        gridLineWidth: 1,
        tickPositions: [-127, -64, 0, 64, 128], 
      },
      scrollbar: {
        enabled: true,
        liveRedraw: true
      },
      series: seriesConfig,
    };
  }, [seriesData, plotLinesSeries]);

  useEffect(() => {
    if (chartRef.current && seriesData) {
      const chart = chartRef.current.chart;
      if (chart) {
        let maxXValue = Math.max(...chart.series[0].data.map(point => point.x));
        //스크롤 이동
        chart.xAxis[0].setExtremes(Math.max(0, maxXValue - 2500), maxXValue, true, false);

        seriesData.forEach((data, index) => {
          const series = chart.series[index];
          const lastPoint = series.data[series.data.length - 1];

          const newData = data.slice(lastPoint ? lastPoint.x + 1 : 0);
          newData.forEach(point => series.addPoint(point, false, false));
        });
        // chart.redraw();
      }
    }
  }, [seriesData]);

  return <HighchartsReact highcharts={highstock} options={options} ref={chartRef}/>;

});

ChartComponent.propTypes = {
  seriesData: PropTypes.arrayOf(PropTypes.array).isRequired,
  plotLinesSeries: PropTypes.array.isRequired,
};

export default ChartComponent;