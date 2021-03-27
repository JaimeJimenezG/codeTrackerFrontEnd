import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Observable, zip } from 'rxjs';
import { GetProjectsService } from '../service/get-projects.service';
import { GetDataProjectsService } from "../service/get-data-projects.service";
import '@taeuk-gang/chartjs-plugin-streaming';

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


  options
  

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
  
  getNewData() {
    console.log(1)
    return { x: Date.now(),y: Math.random()}
  }

  ngOnInit(): void {
    console.log(this.datasets)
    for (var i = 0; i< 100; i++ ) {
      this.state.push("collapsed")
    }

    function getNewData(this) {
      console.log(this)
      return { x: Date.now(),y: Math.random()}
    }
    

    this.options = {
      scales: {
        xAxes: [{
          type: 'realtime',
          realtime: {
            onRefresh: function(chart: any) {
              var data = getNewData()

              chart.data.datasets.forEach(function(dataset: any) { 
                dataset.data.push(data);
              });
            },
            delay: 2000
          }
        }]
      }
    };
  }
  getDatasets() {
    console.log(this.state)
    this.dataProject.subscribe(data => {
        for (let key in data.response) {
          this.datasets.push([{ data: [{ x: Date.now(), y: data.response[key]["cpuUsage"] }], label: data.response[key]["process"]+"Cpu", lineTension: 0, borderDash: [8, 4] },{ data: [{ x: Date.now(), y: data.response[key]["cpuUsage"] }], label: data.response[key]["process"]+"Ram", lineTension: 0, borderDash: [8, 4] }])
        }
      })
      this.dataProject.forEach(element => {
        console.log(element.response)
      });
      return this.datasets
  }
}
