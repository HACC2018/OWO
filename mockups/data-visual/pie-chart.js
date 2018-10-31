Highcharts.chart('container', {

  title: {
    text: 'Pie point CSS'
  },

  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
