Highcharts.chart('container', {

  title: {
    text: 'Trash Audit of Building XX'
  },

  tooltip: {
    pointFormat: '<b>{point.y} Lbs</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y} Lbs',
        style: {
          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
        }
      }
    }
  },

  series: [{
    type: 'pie',
    allowPointSelect: true,
    keys: ['name', 'y', 'selected', 'sliced'],
    data: [
      ['Items of Interest', 17.4, false],
      ['Paper', 35.1, false],
      ['Plastic', 21.25, false],
      ['Glass', 9.15, false],
      ['Metals', 3.1, false],
      ['Organics', 35.15, false],
      ['Misc', 0, false, false],
    ],
    showInLegend: true
  }]
});

