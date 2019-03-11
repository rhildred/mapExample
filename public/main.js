let L = require("leaflet");

window.addEventListener("load", ()=>{
    console.log("loaded");
    let mymap = L.map('mapid').setView([51.505, -0.09], 13);
    // Use OpenStreetMap tiles and attribution
    let osmTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '© OpenStreetMap contributors';

    // Create the basemap and add it to the map
    L.tileLayer(osmTiles, {
        maxZoom: 18,
        attribution: attribution
    }).addTo(mymap);

});