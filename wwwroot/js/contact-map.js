// Office coordinates
var officeLocations = {
    kocaeli: {
        lat: 40.773582,
        lng: 29.9702927,
        title: 'KOCAELİ Merkez Ofisi',
        address: 'Yahyakaptan, Şht. Ali İhsan Çakmak Sk. No:62, 41040 İzmit/Kocaeli',
        mapsUrl: 'https://www.google.com/maps/place/Huş+Mühendislik+Ltd+Şti/@40.7735819,29.9654218,17z/data=!3m1!4b1!4m6!3m5!1s0x14cb4feec88fa429:0xa3bc89eb6a353b7e!8m2!3d40.773582!4d29.9702927!16s%2Fg%2F11yw3w8p44?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D'
    },
    istanbul: {
        lat: 41.09354394190768,
        lng: 28.98043872560703,
        title: 'İSTANBUL Şube Ofisi',
        address: 'Hamidiye Mh. Rumeli Cad. Blox Haliç III No:49 Kağıthane / İSTANBUL',
        mapsUrl: 'https://www.google.com/maps?q=41.09354394190768,28.98043872560703'
    },
    ankara: {
        lat: 39.90916999503069,
        lng: 32.74323390548175,
        title: 'ANKARA Şube Ofisi',
        address: 'Mustafa Kemal Mh. 2079 Cad. VİA Garden Blok No:69 Çankaya / ANKARA',
        mapsUrl: 'https://www.google.com/maps?q=39.90916999503069,32.74323390548175'
    }
};

var leafletMap = null;
var leafletMarkers = {};

document.addEventListener('DOMContentLoaded', function () {

    // --- Init Leaflet map ---
    var mapDiv = document.getElementById('google-map');
    if (!mapDiv) return;

    leafletMap = L.map('google-map', {
        center: [39.9, 32.8],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false
    });

    // OpenStreetMap tile layer — completely free
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(leafletMap);

    // Custom green marker icon
    var greenIcon = L.divIcon({
        className: '',
        html: '<div style="width:16px;height:16px;background:#2d5a3d;border:2.5px solid #fff;border-radius:50%;box-shadow:0 1px 6px rgba(0,0,0,0.35);"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -12]
    });

    // Add markers for all three offices
    Object.keys(officeLocations).forEach(function (key) {
        var loc = officeLocations[key];
        var marker = L.marker([loc.lat, loc.lng], { icon: greenIcon })
            .addTo(leafletMap)
            .bindPopup(
                '<strong>' + loc.title + '</strong><br>' +
                loc.address + '<br><br>' +
                '<a href="' + loc.mapsUrl + '" target="_blank" style="color:#2d5a3d;font-weight:600;font-size:12px;">\uD83D\uDCCD Google Maps\'ta A\u00E7</a>',
                { maxWidth: 260 }
            );

        // Clicking a marker also activates the matching office tab
        marker.on('click', function () {
            activateOffice(key);
        });

        leafletMarkers[key] = marker;
    });

    // Open Kocaeli popup by default
    leafletMarkers['kocaeli'].openPopup();

    // --- Office tab switching ---
    var officeTabs   = document.querySelectorAll('.office-tab');
    var officePanels = document.querySelectorAll('.office-panel');

    window.activateOffice = function (officeId) {
        officeTabs.forEach(function (tab) {
            tab.classList.toggle('active', tab.getAttribute('data-office') === officeId);
        });
        officePanels.forEach(function (panel) {
            panel.classList.toggle('active', panel.id === officeId + '-panel');
        });
        var loc = officeLocations[officeId];
        if (loc && leafletMap) {
            leafletMap.setView([loc.lat, loc.lng], 15, { animate: true });
            if (leafletMarkers[officeId]) {
                leafletMarkers[officeId].openPopup();
            }
        }
    };

    officeTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            window.activateOffice(this.getAttribute('data-office'));
        });
    });
});

// Keep stub so _Layout.cshtml's window.onload call doesn't throw
function loadGoogleMapsScript() {}
function initMap() {}