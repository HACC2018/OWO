
Highcharts.chart('container2', {
  title: {
    text: 'Waste Audits of 2018'
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
      html: 'Total waste of UH Manoa buildings',
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
    name: 'POST',
    data: [3, 2, 1, 3, 4]
  }, {
    type: 'column',
    name: 'Sakamaki',
    data: [2, 3, 5, 3, 6]
  }, {
    type: 'column',
    name: 'Holmes',
    data: [4, 3, 3, 4, 0]
  },  {
    type: 'column',
    name: 'Campus Center',
    data: [4, 3, 3, 5, 0]
  },
    {
      type: 'spline',
      name: 'Average',
      data: [3, 2.67, 3, 6.33, 3.33],
      marker: {
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[3],
        fillColor: 'white'
      }
    }, {
      type: 'pie',
      name: 'Total consumption',
      data: [{
        name: 'POST',
        y: 13,
        color: Highcharts.getOptions().colors[0]
      }, {
        name: 'Sakamaki',
        y: 23,
        color: Highcharts.getOptions().colors[1]
      }, {
        name: 'Holmes',
        y: 19,
        color: Highcharts.getOptions().colors[2]
      }, {
        name: 'Campus Center',
        y: 29,
        color: Highcharts.getOptions().colors[3]
      }],
      center: [100, 50],
      size: 100,
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }]
});

