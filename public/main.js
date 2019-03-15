import L from "leaflet";
import 'materialize-css';
import config from "./firebase.js";
import firebase from 'firebase/app';
import 'firebase/database';

// modal dialogs. There is only 1.
let aInstances = null;
// again only 1 map
let mymap = null;

firebase.initializeApp(config);
firebase.database().ref('waypoints').on("value", snapshot => {
    let oWaypoints = snapshot.val();
    console.log(oWaypoints);
    Object.keys(oWaypoints).map((key) => {
        let oWaypoint = oWaypoints[key];
        let marker = L.marker([oWaypoint.lat, oWaypoint.lng]).addTo(mymap);
        marker.bindPopup(oWaypoint.note).openPopup();
    });
});

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

    function onContextMenu(evt) {
        // right click ... this is a long press on a phone
        document.getElementById("lat").innerHTML = evt.latlng.lat;
        document.getElementById("lng").innerHTML = evt.latlng.lng;

        // get rid of previous handlers
        let el = document.getElementById('idButton'),
            elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);

        elClone.addEventListener("click", () => {
            let oNote = document.getElementById("idNote");
            // insert to firebase
            let waypointID = new Date().toISOString().replace(".", "_");
            // evt is a closure
            firebase.database().ref('waypoints/' + waypointID).set({
                lat: evt.latlng.lat,
                lng: evt.latlng.lng,
                note: oNote.value
            }).then(() => {
                console.log("inserted");
            });
            oNote.value = "";

        });
        aInstances[0].open();

    }

    mymap.on("contextmenu", (evt) => {
        // right click ... this is a long press on a phone
        document.getElementById("lat").innerHTML = evt.latlng.lat;
        document.getElementById("lng").innerHTML = evt.latlng.lng;

        // get rid of previous handlers
        let el = document.getElementById('idButton'),
            elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);

        elClone.addEventListener("click", () => {
            let oNote = document.getElementById("idNote");
            // insert to firebase
            let waypointID = new Date().toISOString().replace(".", "_");
            // evt is a closure
            firebase.database().ref('waypoints/' + waypointID).set({
                lat: evt.latlng.lat,
                lng: evt.latlng.lng,
                note: oNote.value
            }).then(() => {
                console.log("inserted");
            });
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