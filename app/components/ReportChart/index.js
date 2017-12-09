import React from 'react';
import PropTypes from 'prop-types';
import AmCharts from '@amcharts/amcharts3-react';

// var chartData = generateChartData();

export default class ReportChart extends React.Component {
  render() {
    return (
      <AmCharts.React
        style={{
          width: "100%",
          height: "200px"
        }}
        options={{
          "type": "serial",
          "theme": "light",
          "legend": {
            "useGraphSettings": true
          },
          "dataProvider": this.props.data,
          "synchronizeGrid":true,
          "valueAxes": [{
            "id":"v1",
            "axisColor": "#FF6600",
            "axisThickness": 2,
            "axisAlpha": 1,
            "position": "left"
          },{
            "id":"v2",
            "axisColor": "#FCD202",
            "axisThickness": 2,
            "axisAlpha": 1,
            "position": "right"
          }],
          "graphs": [{
            "id": "g1",
            "valueAxis": "v1",
            "lineColor": "#FF6600",
            "bullet": "round",
            "bulletBorderThickness": 1,
            "bulletColor": "#FFFFFF",
            "bulletBorderAlpha": 1,
            "useLineColorForBulletBorder": true,
            "hideBulletsCount": 30,
            "title": "Previous",
            "valueField": "clicks",
            "fillAlphas": 0
          },{
            "id": "g2",
            "valueAxis": "v2",
            "lineColor": "#B0DE09",
            "bullet": "round",
            "bulletBorderThickness": 1,
            "bulletColor": "#FFFFFF",
            "bulletBorderAlpha": 1,
            "useLineColorForBulletBorder": true,
            "hideBulletsCount": 30,
            "title": "Current",
            "valueField": "ctr",
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
  // render() {
  //   return (
  //     <AmCharts.React
  //       style={{
  //         width: "100%",
  //         height: "500px"
  //       }}
  //       options={{
  //         "type": "serial",
  //         "theme": "light",
  //         "legend": {
  //           "useGraphSettings": true
  //         },
  //         "dataProvider": chartData,
  //         "synchronizeGrid":true,
  //         "valueAxes": [{
  //           "id":"v1",
  //           "axisColor": "#FF6600",
  //           "axisThickness": 2,
  //           "axisAlpha": 1,
  //           "position": "left"
  //         }, {
  //           "id":"v2",
  //           "axisColor": "#FCD202",
  //           "axisThickness": 2,
  //           "axisAlpha": 1,
  //           "position": "right"
  //         }],
  //         "graphs": [{
  //           "valueAxis": "v1",
  //           "lineColor": "#FF6600",
  //           "bullet": "round",
  //           "bulletBorderThickness": 1,
  //           "bulletColor": "#FFFFFF",
  //           "bulletBorderAlpha": 1,
  //           "useLineColorForBulletBorder": true,
  //           "hideBulletsCount": 30,
  //           "title": "Previous",
  //           "valueField": "visits",
  //           "fillAlphas": 0
  //         }, {
  //           "valueAxis": "v2",
  //           "lineColor": "#FCD202",
  //           "bullet": "round",
  //           "bulletBorderThickness": 1,
  //           "bulletColor": "#FFFFFF",
  //           "bulletBorderAlpha": 1,
  //           "useLineColorForBulletBorder": true,
  //           "hideBulletsCount": 30,
  //           "title": "Pessemizer",
  //           "valueField": "hits",
  //           "fillAlphas": 0
  //         }, {
  //           "valueAxis": "v3",
  //           "lineColor": "#B0DE09",
  //           "bullet": "round",
  //           "bulletBorderThickness": 1,
  //           "bulletColor": "#FFFFFF",
  //           "bulletBorderAlpha": 1,
  //           "useLineColorForBulletBorder": true,
  //           "hideBulletsCount": 30,
  //           "title": "Current",
  //           "valueField": "views",
  //           "fillAlphas": 0
  //         },
  //           {
  //             "valueAxis": "v4",
  //             "lineColor": "#0066FF",
  //             "bullet": "round",
  //             "bulletBorderThickness": 1,
  //             "bulletColor": "#FFFFFF",
  //             "bulletBorderAlpha": 1,
  //             "useLineColorForBulletBorder": true,
  //             "hideBulletsCount": 30,
  //             "title": "Throttler",
  //             "valueField": "visits",
  //             "fillAlphas": 0
  //           }],
  //         "chartScrollbar": {},
  //         "chartCursor": {
  //           "cursorPosition": "mouse"
  //         },
  //         "categoryField": "date",
  //         "categoryAxis": {
  //           "parseDates": true,
  //           "axisColor": "#DADADA",
  //           "minorGridEnabled": true
  //         },
  //         "export": {
  //           "enabled": true,
  //           "position": "bottom-right"
  //         }
  //       }} />
  //   );
  // }
}

ReportChart.propTypes = {
  data: PropTypes.array,
};

// function generateChartData() {
//   var chartData = [];
//   var firstDate = new Date();
//   firstDate.setDate(firstDate.getDate() - 100);
//
//   var visits = 1600;
//   var hits = 2900;
//   var views = 8700;
//
//
//   for (var i = 0; i < 100; i++) {
//     // we create date objects here. In your data, you can have date strings
//     // and then set format of your dates using chart.dataDateFormat property,
//     // however when possible, use date objects, as this will speed up chart rendering.
//     var newDate = new Date(firstDate);
//     newDate.setDate(newDate.getDate() + i);
//
//     visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
//     hits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
//     views += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
//
//     chartData.push({
//       date: newDate,
//       hits: hits,
//       views: views
//     });
//   }
//   return chartData;
// }
