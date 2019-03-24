import { Component, OnInit } from '@angular/core';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

declare let L;
const provider = new OpenStreetMapProvider();
const searchControl = new GeoSearchControl({
  provider: provider,
});

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  private map : any;

  constructor() { }

  ngOnInit() {
    this.map = L.map('map').setView([50.03, 22.00], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

    L.Icon.Default.imagePath = '../assets/leaflet/images/';

    this.map.adjustMap = function() {
      L.getMap().then(function(map) {
          setTimeout(function() {
              map.invalidateSize();
              map._resetView(map.getCenter(), map.getZoom(), true);   
          }, 200);
      });
    };

    searchControl.ser
    searchControl.addTo(this.map);

  }

  addPinToMap($event) {
    provider
      .search({query: $event})
      .then(function(results) {
        var result = results[0];
        searchControl.onSubmit({ query: $event, data: result });
      });

    this.map.on('geosearch_showlocation', function (result) {
        L.marker([result.x, result.y]).addTo(this.map)
    });
  }

}
