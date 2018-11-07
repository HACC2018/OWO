db.settings({ timestampsInSnapshots: true });

let pieData = db.collection("collections").doc("UHM Architecture 10-20-2017");

pieData.get().then(function (trashData) {
	console.log("trashData:", trashData.data());
	let output = [];
	for (i = 0; i < trashData.data().categories.length; i++) {
		let category = trashData.data().categories[i].name;
		let totalWeight = 0;
		for (j = 0; j < trashData.data().categories[i].items.length; j++) {
			for (k = 0; k < trashData.data().categories[i].items[j].bags.length; k++) {
				totalWeight += trashData.data().categories[i].items[j].bags[k].weight;
			}
		}
		let temp = [category, Math.round(totalWeight * 100) / 100];
		output.push(temp);
	}

	Highcharts.chart('container', {

		chart: {
			type: 'pie',
			options3d: {
				enabled: true,
				alpha: 45,
				beta: 0
			}
		},

		title: {
			text: 'Waste Analysis of UHM Architecture'
		},

		tooltip: {
			pointFormat: '<b>{point.y} Lbs</b>'
		},

		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				depth: 35,
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

	Highcharts.chart('container3', {

		chart: {
			type: 'pie',
			options3d: {
				enabled: true,
				alpha: 45,
				beta: 0
			}
		},

		title: {
			text: 'Waste Weight Comparison of UHM Buildings'
		},

		tooltip: {
			pointFormat: '<b>{point.y} Lbs</b>'
		},

		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				depth: 35,
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
			data: [{
				name: 'Architecture',
				y: 129.05,
				color: Highcharts.getOptions().colors[0]
			}, {
				name: 'BusAd',
				y: 125.01,
				color: Highcharts.getOptions().colors[1]
			}, {
				name: 'QLC Dumpster',
				y: 492.4,
				color: Highcharts.getOptions().colors[2]
			}, {
				name: 'QLC Recycling',
				y: 49.5,
				color: Highcharts.getOptions().colors[3]
			}],
			showInLegend: true
		}]
	});
});

