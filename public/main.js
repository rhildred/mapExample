let L = require("leaflet");
require('materialize-css');

// modal dialogs. There is only 1.
let aInstances = null;
// again only 1 map
let mymap = null;

function showPosition(oPosition) {
    mymap = L.map('mapid').setView([oPosition.coords.latitude, oPosition.coords.longitude], 13);
    // Use OpenStreetMap tiles and attribution
    let osmTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '© OpenStreetMap contributors';

    // Create the basemap and add it to the map
    L.tileLayer(osmTiles, {
        maxZoom: 18,
        attribution: attribution
    }).addTo(mymap);

    mymap.on("contextmenu", (evt) =>{
        // right click ... would need to change this for a phone
        document.getElementById("lat").innerHTML = evt.latlng.lat;
        document.getElementById("lng").innerHTML = evt.latlng.lng;

        // get rid of previous handlers
        let el = document.getElementById('idButton'),
            elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);

        elClone.addEventListener("click", (evtClick)=>{
            let oNote = document.getElementById("idNote");
            // evt is a closure
            alert("saving note: " + oNote.value + " latitude: " + evt.latlng.lat + " longitude: " + evt.latlng.lng );
            oNote.value = "";
        });
        aInstances[0].open();
    });


}

window.addEventListener("load", () => {
    let options = {};

    // set up modal dialogs from materialize
    let aElems = document.querySelectorAll('.modal');
    aInstances = M.Modal.init(aElems, options);

    console.log("loaded");
    if (navigator.geolocation) {
        // kick off with the current location
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

});