import { Component, OnInit } from '@angular/core';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import { OrdersServiceService } from 'src/app/modules/order-service/orders-service.service';
import { GraphhopperServiceService } from 'src/app/modules/graphhopper-service/graphhopper-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { WarehouseServiceService } from 'src/app/modules/warehouse-service/warehouse-service.service';

declare let L;

const provider = new OpenStreetMapProvider();
const searchControl = new GeoSearchControl({
  provider,
});
let routingEngine;

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {

  private map: any;

  constructor(
    private orderListService: OrdersServiceService,
    private graphhopperService: GraphhopperServiceService,
    private warehouseService: WarehouseServiceService,
    private router: Router) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) === null ) {
      this.router.navigate(['forbidden']);
    }

    this.map = L.map('map').setView([50.03, 22.00], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

    L.Icon.Default.imagePath = '../assets/leaflet/images/';

    this.map.adjustMap = () => {
      L.getMap().then((map) => {
          setTimeout(() => {
              map.invalidateSize();
              map._resetView(map.getCenter(), map.getZoom(), true);
          }, 200);
      });
    };

    routingEngine = L.Routing.control({
      waypoints: [ ],
      routeWhileDragging: true,
      showAlternatives: true,
      router: L.Routing.graphHopper('1c34de8d-f28e-4606-98e9-8efec60f41f3', {
        serviceUrl: 'https://graphhopper.com/api/1/route'
      })
    });

    routingEngine.addTo(this.map);

    searchControl.addTo(this.map);

    this.checkOrderList();
  }

  checkOrderList() {
    this.orderListService.getAllM().subscribe(data => {
      if (data.length > 0) {

        const vehicles = [
          {
            vehicle_id: 'my_vehicle',
            start_address: {
              location_id: 'warehouse',
              lon: 0,
              lat: 0
            }
          }
        ];

        this.warehouseService.getAll().subscribe(warehouse => {
          provider
            .search({ query: warehouse.address })
            .then(result => {
              vehicles[0].start_address.lon = Number(result[0].x);
              vehicles[0].start_address.lat = Number(result[0].y);
          });
        });

        const services = [];

        let counter = data.length;

        data.forEach(e => {
          provider
            .search({ query: e.machine.address })
            .then(result => {
              services.push({
                id: e.machine.address,
                name: 'supply' + e.machine.address,
                address: {
                    location_id: e.machine.address,
                    lon: Number(result[0].x),
                    lat: Number(result[0].y)
                }
              });
              counter--;
              if (counter === 0) {
                const optBodyReq = {vehicles, services};
                this.graphhopperService.postForOptimization(optBodyReq).subscribe(jobID => {
                  let processed = 0;
                  this.delay(3000).then(() => {
                    this.graphhopperService.getJobStatus(jobID.job_id).subscribe(response => {
                      if (response.status === 'finished') {
                        processed = 1;
                      }
                      if (processed === 1) {
                        const waypoints = [];
                        response.solution.routes[0].activities.forEach(activity => {
                          waypoints.push(L.latLng(activity.address.lat, activity.address.lon));
                        });
                        routingEngine.setWaypoints(waypoints);
                      }
                    });
                  });
                });
              }
            });
        });
      }
    });
  }

  completeSchedule() {
    console.log('completing');
    this.orderListService.completeSchedule().subscribe(res => {
      if (res === true) {
        this.router.navigate(['admin-panel']);
      }
    });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

}
