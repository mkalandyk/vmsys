import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VendingMachineService } from '../../modules/vending-machine/vending-machine.service';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';

declare let L;

@Component({
  selector: 'app-vending-machine-list',
  templateUrl: './vending-machine-list.component.html',
  styleUrls: ['./vending-machine-list.component.css']
})
export class VendingMachineListComponent implements OnInit {

  @Output() addPin = new EventEmitter();
  @Output() showDetails = new EventEmitter();
  @Output() editMachine = new EventEmitter();
  @Output() addMachine = new EventEmitter();
  vendingMachines: Array<any>;
  admin: boolean;

  alive = true;

  constructor(private vendingMachineService: VendingMachineService) {
    Observable.timer(0, 10000)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      this.getData();
    });
  }

  ngOnInit() {
    this.admin = JSON.parse(localStorage.getItem('user')).role === 'admin';
    this.getData();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getData() {
    this.vendingMachineService.getAll().subscribe(data => {
      $.each(data, (index, item) => {
        let warn = false;
        let error = false;
        let message = '';

        if (item.billon_10 === 0 || item.billon_20 === 0 ||
          item.billon_50 === 0 || item.billon_1 === 0 ||
          item.billon_2 === 0 || item.billon_5 === 0) {
            error = true;
            message += 'Billon is out! Please refill!\n';
        }

        if (item.billon_10 > 100 || item.billon_20 > 100 ||
          item.billon_50 > 100 || item.billon_1 > 100 ||
          item.billon_2 > 100 || item.billon_5 > 100) {
            error = true;
            message += 'Billon overfill! Please remove billon!\n';
        }

        $.each(item, (k, v) => {
          if (k === 'machineContent') {
            $.each(v, (index, item) => {
              if (item.quantity === 0) {
                warn = true;
                message += item.product.name + ' is out.\n';
              }
            });
          }
        });

        if (!warn && !error) {
          item.icon = '../../../assets/icons/Accept-icon.png';
          message = 'OK!';
        } else if (warn && !error) {
          item.icon = '../../../assets/icons/dialog-warning-icon.png';
        } else {
          item.icon = '../../../assets/icons/dialog-error-icon.png';
        }

        item.statusMessage = message;
      });
      this.vendingMachines = data;
    });
  }

  onDetailsClick(address) {
    this.showDetails.emit(address);
  }

  onListHover(address) {
    this.addPin.emit(address);
  }

  onEditClick(address) {
    this.editMachine.emit(address);
  }

  onAddClick() {
    this.addMachine.emit();
  }
}
