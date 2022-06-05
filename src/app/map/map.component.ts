import {Component, OnInit} from '@angular/core';

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

    function onPolygonClick(region: number) {
      //alert("Hello there!");

      fetch('http://localhost:8080/test?id=' + region, {mode: 'cors'})
        .then(
          function (response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }

            response.json().then(function (data) {
              //document.getElementById("results")!.innerHTML = data.message;
              document.getElementById("results")!.innerHTML = data.region;
              console.log(data);
            });
          }).catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
    }

    L.polygon([ //автозаводский р-н
      [56.250861, 43.947081],
      [56.289988, 43.885569],
      [56.266470, 43.822102],
      [56.276884, 43.763038],
      [56.193383, 43.708395],
      [56.185967, 43.807143],
      [56.250861, 43.947081]
    ], {color: 'gold'}).on('click', onPolygonClick.bind(null, 0, null)).addTo(this.map);

    L.polygon([ //приокский р-н
      [56.258944, 43.959536],
      [56.257898, 44.009519],
      [56.271996, 44.025500],
      [56.295820, 44.033955],
      [56.290497, 43.994960],
      [56.290024, 43.963362],
      [56.258944, 43.959536]
    ], {color: 'orange'}).on('click', onPolygonClick.bind(null, 1, null)).addTo(this.map);

    L.polygon([ //ленинский р-н
      [56.251164, 43.947094],
      [56.289727, 43.886943],
      [56.266038, 43.818652],
      [56.271184, 43.813503],
      [56.306035, 43.905235],
      [56.295909, 43.935099],
      [56.299122, 43.961909],
      [56.264046, 43.963838],
      [56.251164, 43.947094]
    ], {color: 'green'}).on('click', onPolygonClick.bind(null, 2, null)).addTo(this.map);

    L.polygon([ //московский р-н
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
    ], {color: 'violet'}).on('click', onPolygonClick.bind(null, 3, null)).addTo(this.map);

    L.polygon([ //канавинский р-н
      [56.314564, 43.898439],
      [56.305791, 43.904933],
      [56.267765, 43.801832],
      [56.276921, 43.763748],
      [56.277491, 43.772672],
      [56.305882, 43.760665],
      [56.309500, 43.758772],
      [56.314564, 43.898439]
    ], {color: 'blue'}).on('click', onPolygonClick.bind(null, 4, null)).addTo(this.map);

    L.polygon([ //сормовский р-н
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
    ], {color: 'yellow'}).on('click', onPolygonClick.bind(null, 5, null)).addTo(this.map);

    L.polygon([ //нижегородский р-н
      [56.191486, 44.051401],
      [56.187541, 44.080147],
      [56.190789, 44.107269],
      [56.174356, 44.154991],
      [56.160402, 44.152931],
      [56.158108, 44.139198],
      [56.160402, 44.104179],
      [56.158490, 44.085640],
      [56.158681, 44.066414],
      [56.162123, 44.040321],
      [56.156196, 44.014915],
      [56.162727, 44.005207],
      [56.164238, 43.994563],
      [56.165755, 43.977493],
      [56.179898, 43.987450],
      [56.190980, 44.016975],
      [56.197921, 44.018559],
      [56.201063, 44.031833],
      [56.192736, 44.054709],
      [56.191426, 44.051508]
    ], {color: 'red'}).on('click', onPolygonClick.bind(null, 5, null)).addTo(this.map);

    L.polygon([ //советский р-н
      [56.277184, 43.963974],
      [56.314619, 43.963287],
      [56.313953, 43.971184],
      [56.317571, 43.974102],
      [56.317380, 43.982857],
      [56.313191, 43.992641],
      [56.320046, 44.031094],
      [56.313287, 44.042252],
      [56.293096, 44.054440],
      [56.290238, 44.052551],
      [56.285760, 44.055126],
      [56.281187, 44.052895],
      [56.278614, 44.053066],
      [56.266032, 44.077099],
      [56.260789, 44.080189],
      [56.255163, 44.077099],
      [56.252779, 44.072464],
      [56.246294, 44.077957],
      [56.245054, 44.068516],
      [56.248678, 44.065083],
      [56.245435, 44.059246],
      [56.249632, 44.032810],
      [56.262314, 44.044140],
      [56.277089, 44.032810],
      [56.295763, 44.033840],
      [56.290619, 43.995388],
      [56.291828, 43.982025],
      [56.277592, 43.978511],
      [56.277007, 43.964106]
    ], {color: 'white'}).on('click', onPolygonClick.bind(null, 5, null)).addTo(this.map);

    /*
    L.marker([56.5, 43.09]).addTo(this.map)
    .bindPopup('Hello there.<br> Custom me.')
    .openPopup();
    */

  }

  stations = [
    {lat: 56.244610, lng: 43.862220},
    {lat: 56.316674, lng: 43.944766},
    {lat: 56.275369, lng: 43.923988},
    {lat: 56.335046, lng: 43.843966},
    {lat: 56.309534, lng: 44.008762},
    {lat: 56.245120, lng: 43.976279},
    {lat: 56.305943, lng: 44.068312},
    {lat: 56.350991, lng: 43.835226},
    {lat: 56.271081, lng: 43.893203}
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.initMap();
  }

  addTag() {
    // @ts-ignore
    this.markers = L.marker(this.stations[document.getElementById('choisePsmp').value - 1]).addTo(this.map);
  }
}
