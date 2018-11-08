var map, heatmap;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: { lat: 21.3003437, lng: -157.8183039 },
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

	// If trash exceeds a certain point, add another point at building
	return [

		new google.maps.LatLng(21.3003437, -157.8183039),  // QLC
		new google.maps.LatLng(21.3001962, -157.8185224),  // Webster
		new google.maps.LatLng(21.3005778, -157.8204599),  // Shidler
		new google.maps.LatLng(21.2986725, -157.8206569),  // Sinclair
		new google.maps.LatLng(21.3005079, -157.816839),   // Hamilton
		new google.maps.LatLng(21.3016856, -157.8155974),  // UH Seed Lab
		new google.maps.LatLng(21.2985384, -157.8171935),  // Kennedy
		new google.maps.LatLng(21.2976342, -157.8170038),  // Kuykendall
		new google.maps.LatLng(21.2966728, -157.8172046),  // Sakamaki
		new google.maps.LatLng(21.2998957,-157.8189337),   // Crawford
		new google.maps.LatLng(21.2974888, -157.8207703),   // Sinclair Bus Stop
		new google.maps.LatLng(21.2974888,-157.8207703),   // University + Dole Bus Stop
		new google.maps.LatLng(21.2978686,-157.8196653),   // Lower Campus Bus Stop
		new google.maps.LatLng(21.2966991,-157.8169509),   // Dole St. Bus Stop
		new google.maps.LatLng(21.2962767,-157.8161571),   // Dorm Bus Stop
		new google.maps.LatLng(21.298164,-157.8156412),   // East West Bus Stop
		new google.maps.LatLng(21.3004329,-157.8155577),   // Lincoln Hall Bus Stop
		new google.maps.LatLng(21.3004329,-157.8155577),   // Paradise Palms Bus Stop
		new google.maps.LatLng(21.3007086,-157.8191234),   // Upper Campus Bus Stop
		new google.maps.LatLng(21.2986022,-157.8190096),   // UHM Bookstore
		new google.maps.LatLng(21.2982064,-157.8183116),   // CC Food Court
		new google.maps.LatLng(21.2992596,-157.8175757),   // East West
		new google.maps.LatLng(21.2975703,-157.8157095),   // Art Bldg
		new google.maps.LatLng(21.2954775, -157.8160054)   // Dorms

	];
}
