var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: { lat: 21.3003437, lng: -157.8183039 },
	});

	setMarkers(map);
}

// Attaches an info window to a marker with the provided message. When the
// marker is clicked, the info window will open with the secret message.
function attachMessage(marker, message) {
	var infowindow = new google.maps.InfoWindow({
		content: message
	});

	marker.addListener('click', function () {
		infowindow.open(marker.get('map'), marker);
	});
}

// Sets building markers and adds messages
function setMarkers(map) {
// Building Info
// Name, latitude, longitude
	let buildings = [
		['QLC', 21.3003437, -157.8183039],
		['Webster', 21.3001962, -157.8185224],
		['Shindler', 21.3005778, -157.8204599],
		['Sinclair', 21.2986725, -157.8206569],
		['Webster', 21.3001962, -157.8185224],
		['Hamilton', 21.3005079, -157.816839],
		['Kennedy', 21.2985384, -157.8171935],
		['Kuykendall', 21.2976342, -157.8170038],
		['Sakamaki', 21.2966728, -157.8172046],
		['EXTRA', 21.3003437, -157.8183039]
	];

	for (var i = 0; i < buildings.length; i++) {
		var building = buildings[i];
		var marker = new google.maps.Marker({
			position: { lat: building[1], lng: building[2] },
			map: map,
			title: building[0]
		});
		attachMessage(marker, building[0] + " Waste: 420.69")
	}
}