var map, heatmap;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: { lat: 21.3003437, lng: -157.8183039 },
		mapTypeId: 'satellite'
	});

	// Set radius to reflect trash per building
	heatmap = new google.maps.visualization.HeatmapLayer({
		data: getPoints(),
		map: map
	});
}

// Buttons are to be removed as heat circles reflect trash per building
function toggleHeatmap() {
	heatmap.setMap(heatmap.getMap() ? null : map);
}

// Buttons are to be removed as heat circles reflect trash per building
function changeGradient() {
	var gradient = [
		'rgba(0, 255, 255, 0)',
		'rgba(0, 255, 255, 1)',
		'rgba(0, 191, 255, 1)',
		'rgba(0, 127, 255, 1)',
		'rgba(0, 63, 255, 1)',
		'rgba(0, 0, 255, 1)',
		'rgba(0, 0, 223, 1)',
		'rgba(0, 0, 191, 1)',
		'rgba(0, 0, 159, 1)',
		'rgba(0, 0, 127, 1)',
		'rgba(63, 0, 91, 1)',
		'rgba(127, 0, 63, 1)',
		'rgba(191, 0, 31, 1)',
		'rgba(255, 0, 0, 1)'
	]
	heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

// Buttons are to be removed as heat circles reflect trash per building
function changeRadius() {
	heatmap.set('radius', heatmap.get('radius') ? null : 100);
}

// Buttons are to be removed as heat circles reflect trash per building
function changeOpacity() {
	heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

// Heatmap data: 1 Point for each Building
// Add extra point for "more trash"
function getPoints() {
	// idk what to do w/ these variables yet
	var QLC = new google.maps.LatLng(21.3003437, -157.8183036);
	var webster = new google.maps.LatLng(21.3001962, -157.8185224);
	var shidler = new google.maps.LatLng(21.3005778, -157.8204599);
	var sinclair = new google.maps.LatLng(21.2986725, -157.8206569);
	var hamilton = new google.maps.LatLng(21.3005079, -157.816839);
	var kennedy = new google.maps.LatLng(21.2985384, -157.8171935);
	var kuykendall = new google.maps.LatLng(21.2976342, -157.8170038);
	var sakamaki = new google.maps.LatLng(21.2966728, -157.8172046);
	var dorms = new google.maps.LatLng(21.2954775, -157.8160054);

	// If trash exceeds a certain point, add another point at building
	return [
		new google.maps.LatLng(21.3003437, -157.8183036),  // QLC
		new google.maps.LatLng(21.3003437, -157.8183037),  // QLC
		new google.maps.LatLng(21.3003437, -157.8183038),  // QLC
		new google.maps.LatLng(21.3003437, -157.8183039),  // QLC
		new google.maps.LatLng(21.3001962, -157.8185224),  // Webster
		new google.maps.LatLng(21.3005778, -157.8204599),  // Shidler
		new google.maps.LatLng(21.2986725, -157.8206569),  // Sinclair
		new google.maps.LatLng(21.3005079, -157.816839),   // Hamilton
		new google.maps.LatLng(21.3016856, -157.8155974),  // UH Seed Lab
		new google.maps.LatLng(21.2985384, -157.8171935),  // Kennedy
		new google.maps.LatLng(21.2976342, -157.8170038),  // Kuykendall
		new google.maps.LatLng(21.2966728, -157.8172046),  // Sakamaki
		new google.maps.LatLng(21.2954775, -157.8160054)   // Dorms
	];
}
