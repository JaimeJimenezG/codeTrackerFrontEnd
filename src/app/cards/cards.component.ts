import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Observable, zip } from 'rxjs';
import { GetProjectsService } from '../service/get-projects.service';
import { GetDataProjectsService } from "../service/get-data-projects.service";
import '@taeuk-gang/chartjs-plugin-streaming';
import { ChartsModule } from 'angular-bootstrap-md';
import { ChartView } from 'echarts';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})

export class CardsComponent implements OnInit {
  title = 'my-app';
  projects
  dataProject
  datasets: Array<any> = []
  constructor(private getProjects: GetProjectsService, getDataProjects: GetDataProjectsService) {
    this.projects = getProjects.resolveItems();
    this.dataProject = getDataProjects.getData();
    this.datasets = this.getDatasets();
  }


  options = {
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          onRefresh: (chart) => {
            chart.data.datasets.forEach((dataset: any) => {
              this.dataProject.subscribe(data => {
                for (let key in data.response) {
                  if (dataset.id == key+'Ram') {
                    dataset.data.push({ x: Date.now(), y: data.response[key]["memoryUsage"]})
                  } else if(dataset.id == key+'Cpu')
                  dataset.data.push({ x: Date.now(), y: data.response[key]["cpuUsage"]})
                }
              })
            });
          },
          delay: 2000
        }
      }]
    }
  };
  

  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  state = []

  
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: any = {};

  toggle(idCard): void {
    this.state[idCard] = this.state[idCard] === 'collapsed' ? 'expanded' : 'collapsed';
  }

  ngOnInit(): void {
    for (var i = 0; i< 100; i++ ) {
      this.state.push("collapsed")
    }
  }
  getDatasets() {
    this.dataProject.subscribe(data => {
        for (let key in data.response) {
          this.datasets.push([{ data: [{ x: Date.now(), y: data.response[key]["cpuUsage"] }], processName: data.response[key]["process"], id: data.response[key]["process"]+"Cpu",  label: 'Cpu usage', lineTension: 0, borderDash: [8, 4] },{ data: [{ x: Date.now(), y: data.response[key]["memoryUsage"] }], processName: data.response[key]["process"], id: data.response[key]["process"]+"Ram", label: 'Ram usage', lineTension: 0, borderDash: [8, 4] }])
        }
      })
      this.dataProject.forEach(element => {
      });
      return this.datasets
  }
}
