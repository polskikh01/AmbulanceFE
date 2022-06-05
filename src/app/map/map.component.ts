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

    function onPolygonClick(){
      //alert("Hello there!");
      
      fetch('http://localhost:8080/test', { mode: 'cors'})
        .then(
        function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }

            response.json().then(function(data) {
              document.getElementById("results")!.innerHTML = data.message;
              console.log(data);
            });
        }).catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }

    var polygon = L.polygon([ //автозаводский р-н
      [56.250861, 43.947081],
      [56.289988, 43.885569],
      [56.266470, 43.822102],
      [56.276884, 43.763038],
      [56.193383, 43.708395],
      [56.185967, 43.807143],
      [56.250861, 43.947081]
    ]).on('click', onPolygonClick).addTo(this.map);

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
