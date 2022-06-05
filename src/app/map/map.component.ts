import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

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
      document.getElementById("results")!.innerHTML = "Район такой-то";
    }

    var polygon = L.polygon([
      [56.3287, 44.002],
      [56.323, 44.000],
      [56.38, 44.200]
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
