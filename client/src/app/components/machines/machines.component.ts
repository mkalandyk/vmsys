import { Component, OnInit, ViewChild } from '@angular/core';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { VendingMachineDetailsComponent } from '../vending-machine-details/vending-machine-details.component';
import { DetailsDialogComponent } from 'src/app/dialogs/details-dialog/details-dialog.component';
import { MatDialog } from '@angular/material';
import { EditDialogComponent } from 'src/app/dialogs/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from 'src/app/dialogs/add-dialog/add-dialog.component';

declare let L;
const provider = new OpenStreetMapProvider();
const searchControl = new GeoSearchControl({
  provider,
});

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  private map: any;

  constructor(
    private detailsDialog: MatDialog,
    private addDialog: MatDialog,
    private editDialog: MatDialog
  ) { }

  ngOnInit() {
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

    searchControl.addTo(this.map);

  }

  addPinToMap($event) {
    provider
      .search({query: $event.address})
      .then((results) => {
        const result = results[0];
        searchControl.onSubmit({ query: $event.address, data: result });
      });

    this.map.on('geosearch_showlocation', function(result) {
        L.marker([result.x, result.y]).addTo(this.map);
    });
  }

  details($event) {
    const dialogRef = this.detailsDialog.open(DetailsDialogComponent, {
      height: 'calc(100vh - 400px)',
      width: 'auto',
      data: {
        machineId: $event.machineId
      }
    });
  }

  editMachineContent($event) {
    const dialogRef = this.editDialog.open(EditDialogComponent, {
      height: 'calc(100vh - 375px)',
      width: 'auto',
      data: {
        machineId: $event.machineId
      }
    });
  }

  addMachine() {
    const dialogRef = this.addDialog.open(AddDialogComponent, {
      height: 'calc(100vh - 325px)',
      width: 'auto'
    });
  }
}


