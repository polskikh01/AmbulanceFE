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

    var polygon4 = L.polygon([ //московский р-н
      [56.314330, 43.898231],
      [56.307708, 43.738282],
      [56.321514, 43.771522],
      [56.341511, 43.807734],
      [56.343747, 43.840717],
      [56.331910, 43.861945],
      [56.344451, 43.873697],
      [56.336814, 43.886015],
      [56.358110, 43.897150],
      [56.351966, 43.921850],
      [56.337121, 43.921054],
      [56.324193, 43.914092],
      [56.314330, 43.898231]
    ],{color: 'violet'}).on('click', onPolygonClick.bind(null,3,null)).addTo(this.map);

    var polygon5 = L.polygon([ //канавинский р-н
      [56.314564, 43.898439],
      [56.305791, 43.904933],
      [56.267765, 43.801832],
      [56.276921, 43.763748],
      [56.277491, 43.772672],
      [56.305882, 43.760665],
      [56.309500, 43.758772],
      [56.314564, 43.898439]
    ],{color: 'violet'}).on('click', onPolygonClick.bind(null,4,null)).addTo(this.map);

    var polygon6 = L.polygon([ //сормовский р-н
      [56.355325, 43.906159],
      [56.350494, 43.894757],
      [56.336564, 43.885718],
      [56.344055, 43.873824],
      [56.335842, 43.869570],
      [56.333209, 43.857391],
      [56.339138, 43.844597],
      [56.337090, 43.839586],
      [56.341851, 43.835771],
      [56.339322, 43.829857],
      [56.334825, 43.820200],
      [56.334540, 43.803868],
      [56.353446, 43.725320],
      [56.374900, 43.716829],
      [56.402193, 43.747063],
      [56.398797, 43.811333],
      [56.389163, 43.869797],
      [56.355325, 43.906159]
    ],{color: 'violet'}).on('click', onPolygonClick.bind(null,5,null)).addTo(this.map);

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
