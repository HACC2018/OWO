db.settings({ timestampsInSnapshots: true });

let pieData = db.collection("collections").doc("UHM Architecture 10-20-2017");

pieData.get().then(function(trashData) {
    console.log("trashData:", trashData.data());
    let output = [];
    for(i = 0; i < trashData.data().categories.length; i++) {
      let category = trashData.data().categories[i].name;
      let totalWeight = 0;
      for(j = 0; j < trashData.data().categories[i].items.length; j++) {
        for(k = 0; k < trashData.data().categories[i].items[j].bags.length; k++) {
          totalWeight += trashData.data().categories[i].items[j].bags[k].weight;
        }
      }
      let temp = [category, totalWeight];
      output.push(temp);
    }


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
        data: output,
        showInLegend: true
      }]
    });
});

