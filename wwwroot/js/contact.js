// Office locations with their coordinates
const officeLocations = {
    kocaeli: {
        lat: 40.7658,
        lng: 29.9408,
        address: "Yahyakaptan Mh. Şehit Ali İhsan Çakmak Sokağı No:62 D:1-2 İzmit / KOCAELİ"
    },
    istanbul: {
        lat: 41.0704,
        lng: 28.9756,
        address: "Hamidiye Mh. Rumeli Cad. Blox Haliç III No:49 Kağıthane / İSTANBUL"
    },
    ankara: {
        lat: 39.9334,
        lng: 32.8597,
        address: "Mustafa Kemal Mh. 2079 Cad. VİA Garden Blok No:69 Çankaya / ANKARA"
    }
};

// Initialize Google Map
function initMap() {
    // Default to Kocaeli office
    const defaultLocation = officeLocations.kocaeli;
    const map = new google.maps.Map(document.getElementById('google-map'), {
        zoom: 15,
        center: { lat: defaultLocation.lat, lng: defaultLocation.lng },
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#7c93a3"}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"weight": 2}]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#000000"}, {"lightness": 20}]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{"color": "#dedede"}, {"lightness": 21}]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
            }
        ]
    });

    // Add markers for each office
    Object.entries(officeLocations).forEach(([office, location]) => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.address
        });
    });

    return map;
}

// Handle office tab switching
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.office-tab');
    const panels = document.querySelectorAll('.office-panel');
    let map;

    // Initialize map when the page loads
    if (typeof google !== 'undefined') {
        map = initMap();
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const office = this.dataset.office;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active panel
            panels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(`${office}-panel`).classList.add('active');
            
            // Update map center
            if (map && officeLocations[office]) {
                map.setCenter({
                    lat: officeLocations[office].lat,
                    lng: officeLocations[office].lng
                });
            }
        });
    });
}); 