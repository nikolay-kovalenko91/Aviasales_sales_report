import React from 'react';
import PropTypes from 'prop-types';
import AmCharts from '@amcharts/amcharts3-react';


function ReportChart(props) {
  return (
    <AmCharts.React
      style={{
        width: "100%",
        height: "450px"
      }}
      options={{
        "type": "serial",
        "theme": "light",
        "legend": {
          "useGraphSettings": true
        },
        "dataProvider": props.data,
        "synchronizeGrid":true,
        "valueAxes": [{
          "id":"v1",
          "axisColor": "#FF6600",
          "axisThickness": 2,
          "axisAlpha": 1,
          "position": "left",
        },{
          "id":"v2",
          "axisColor": "#FCD202",
          "axisThickness": 2,
          "axisAlpha": 1,
          "position": "left",
          "offset": 50
        },{
          "id":"v3",
          "axisColor": "#B0DE09",
          "axisThickness": 2,
          "axisAlpha": 1,
          "position": "right"
        },{
          "id":"v4",
          "axisColor": "#0000FF",
          "axisThickness": 2,
          "axisAlpha": 1,
          "position": "right",
          "offset": 50
        }],
        "graphs": [{
          "id": "g1",
          "valueAxis": "v1",
          "lineColor": "#0000FF",
          "bullet": "round",
          "bulletBorderThickness": 1,
          "bulletColor": "#FFFFFF",
          "bulletBorderAlpha": 1,
          "useLineColorForBulletBorder": true,
          "hideBulletsCount": 30,
          "title": "CTR",
          "valueField": "ctr",
          "fillAlphas": 0
        },{
          "id": "g2",
          "valueAxis": "v2",
          "lineColor": "#FCD202",
          "bullet": "round",
          "bulletBorderThickness": 1,
          "bulletColor": "#FFFFFF",
          "bulletBorderAlpha": 1,
          "useLineColorForBulletBorder": true,
          "hideBulletsCount": 30,
          "title": "Clicks",
          "valueField": "clicks",
          "fillAlphas": 0
        },{
          "id": "g3",
          "valueAxis": "v3",
          "lineColor": "#B0DE09",
          "bullet": "round",
          "bulletBorderThickness": 1,
          "bulletColor": "#FFFFFF",
          "bulletBorderAlpha": 1,
          "useLineColorForBulletBorder": true,
          "hideBulletsCount": 30,
          "title": "Sales",
          "valueField": "sales",
          "fillAlphas": 0
        },{
          "id": "g4",
          "valueAxis": "v4",
          "lineColor": "#FF6600",
          "bullet": "round",
          "bulletBorderThickness": 1,
          "bulletColor": "#FFFFFF",
          "bulletBorderAlpha": 1,
          "useLineColorForBulletBorder": true,
          "hideBulletsCount": 30,
          "title": "Searches",
          "valueField": "searches",
          "fillAlphas": 0
        }],
        "chartScrollbar": {
          "scrollbarHeight": 20,
          "backgroundAlpha": 0,
          "selectedBackgroundAlpha": 0.1,
          "selectedBackgroundColor": "#888888",
          "graphFillAlpha": 0,
          "graphLineAlpha": 0.5,
          "selectedGraphFillAlpha": 0,
          "selectedGraphLineAlpha": 1,
          "autoGridCount": true,
          "color": "#AAAAAA"
        },
        "chartCursor": {
          "categoryBalloonDateFormat": "DD MMM YYYY JJ:NN",
          "cursorPosition": "mouse"
        },
        "categoryField": "time",
        "dataDateFormat": 'YYYY-MM-DD JJ:NN',
        "categoryAxis": {
          "parseDates": true,
          "axisColor": "#DADADA",
          "equalSpacing": true,
          "minorGridEnabled": true,
          "minorGridAlpha": 0.1,
          "minPeriod": "hh"
        },
        "export": {
          "enabled": true,
          "position": "bottom-right"
        }
      }} />
  );
}

ReportChart.propTypes = {
  data: PropTypes.array,
};

export default ReportChart;
