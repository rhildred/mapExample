let L = require("leaflet");

function showPosition(oPosition) {
    let mymap = L.map('mapid').setView([oPosition.coords.latitude, oPosition.coords.longitude], 13);
    // Use OpenStreetMap tiles and attribution
    let osmTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '© OpenStreetMap contributors';

    // Create the basemap and add it to the map
    L.tileLayer(osmTiles, {
        maxZoom: 18,
        attribution: attribution
    }).addTo(mymap);


}

window.addEventListener("load", () => {
    console.log("loaded");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

});