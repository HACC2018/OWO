
Highcharts.chart('container2', {
  title: {
    text: 'Waste Audits of 2017'
  },
  xAxis: {
    categories: ['Items of Interest', 'Paper', 'Plastic', 'Glass', 'Metals', 'Organics', 'Misc']
  },

  yAxis: {
    title: {
      text: 'Pounds (Ibs)'
    }
  },

  labels: {
    items: [{
      html: 'Waste by Category of UH Manoa Buildings',
      style: {
        left: '50px',
        top: '0px',
        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
      }
    }]
  },

  tooltip: {
    pointFormat: '<b>{point.y} Lbs</b>'
  },

  series: [{
    type: 'column',
    name: 'Architecture',
    data: [17.4, 35.1, 21.25, 9.15, 11, 35.15, 0]
  }, {
    type: 'column',
    name: 'BusAd',
    data: [28.45, 34.55, 24.35, 1.85, 1.15, 25.5, 9.16]
  }, {
    type: 'column',
    name: 'QLC Dumpster',
    data: [31.4, 335.1, 59.65, 1.1, 2.85, 42.9, 19.4]
  },  {
    type: 'column',
    name: 'QLC Recycling',
    data: [0, 49.5, 0, 0, 0, 0, 0]
  },
    {
      type: 'spline',
      name: 'Average',
      data: [19.13, 113.56, 26.31, 3.03, 3.75, 25.89, 7.14],
      marker: {
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[3],
        fillColor: 'white'
      }
    }]
});



