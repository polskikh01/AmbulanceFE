import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map: L.Map | undefined;
  private centroid: L.LatLngExpression = [56.3287, 44.002]; //

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 11
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    function onPolygonClick(region: number){
      //alert("Hello there!");
      
      fetch('http://localhost:8080/test?id='+region, { mode: 'cors'})
        .then(
        function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }

            response.json().then(function(data) {
              //document.getElementById("results")!.innerHTML = data.message;
              document.getElementById("results")!.innerHTML = data.region;
              console.log(data);
            });
        }).catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }

    var polygon1 = L.polygon([ //автозаводский р-н
      [56.250861, 43.947081],
      [56.289988, 43.885569],
      [56.266470, 43.822102],
      [56.276884, 43.763038],
      [56.193383, 43.708395],
      [56.185967, 43.807143],
      [56.250861, 43.947081]
    ],{color: 'violet'}).on('click', onPolygonClick.bind(null,0,null)).addTo(this.map);

    var polygon2 = L.polygon([ //приокский р-н
      [56.258944, 43.959536],
      [56.257898, 44.009519],
      [56.271996, 44.025500],
      [56.295820, 44.033955],
      [56.290497, 43.994960],
      [56.290024, 43.963362],
      [56.258944, 43.959536]
    ],{color: 'violet'}).on('click', onPolygonClick.bind(null,1,null)).addTo(this.map);

    var polygon3 = L.polygon([ //ленинский р-н
      [56.251164, 43.947094],
      [56.289727, 43.886943],
      [56.266038, 43.818652],
      [56.271184, 43.813503],
      [56.306035, 43.905235],
      [56.295909, 43.935099],
      [56.299122, 43.961909],
      [56.264046, 43.963838],
      [56.251164, 43.947094]
    ],{color: 'violet'}).on('click', onPolygonClick.bind(null,2,null)).addTo(this.map);

    /*
    L.marker([56.5, 43.09]).addTo(this.map)
    .bindPopup('Hello there.<br> Custom me.')
    .openPopup();
    */

  }

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }
}
