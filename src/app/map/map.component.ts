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

    var polygon = L.polygon([
      [56.3, 44.1],
      [56.2, 44.2],
      [56.35, 44.15]
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
