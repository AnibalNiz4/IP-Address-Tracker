const input = document.querySelector('.input_text');
const button = document.querySelector('.button');

const ip = document.querySelector('.ip');
const locat = document.querySelector('.location');
const timezone = document.querySelector('.timezone');
const isp = document.querySelector('.isp');

var mymap = L.map('mapid').setView([34.04915, -118.09462], 13);
var marker = L.marker([34.04915, -118.09462]).addTo(mymap);
var circle = L.circle([34.04915, -118.09462], {
    color: 'hsl(200, 60%, 59%)',
    fillColor: 'hsl(200, 60%, 75%)',
    fillOpacity: 0.5,
    radius: 1000
}).addTo(mymap);

button.addEventListener('click', (e) =>{
    e.preventDefault();
    searchDate(input.value);
})

function searchDate(opa){
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_NZPj2sPwcAy3GPDoaaj698afKtbMu&ipAddress=${opa}`)
    .then(res => res.json())
    .then(data => {
        if (data.code === 422) {
            alert('your IP is non-existent') 
        }
        else{
            ip.innerHTML = data.ip;
            locat.innerHTML = data.location.city;
            timezone.innerHTML = data.location.timezone;
            isp.innerHTML = data.isp;
            mymap.setView([data.location.lat, data.location.lng], 13);
            marker.setLatLng([data.location.lat, data.location.lng]);
            circle.setLatLng([data.location.lat, data.location.lng]);
        }
    })
}

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicHV3aWlpIiwiYSI6ImNrbG1ybnkwMTBiejEybm84Zzh2MmoxcHkifQ.Cd71E5GLNG65nlDSWRkqvA'
}).addTo(mymap);