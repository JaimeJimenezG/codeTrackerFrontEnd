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
  public dataProject
  allProjects
  constructor(private getProjects: GetProjectsService, getDataProjects: GetDataProjectsService) {
    this.projects = getProjects.resolveItems();
    this.dataProject = getDataProjects;
  }


  datasets: any[] = [[{
    data: [],
    label: 'Dataset 1',
    lineTension: 0,
    borderDash: [8, 4]
  }, {

    data: [],
    label: 'Dataset 2',
    lineTension: 0,
    borderDash: [8, 4]
  }],
  [{
    data: [],
    label: 'Dataset 3',
    lineTension: 0,
    borderDash: [8, 4]
  }, {

    data: [],
    label: 'Dataset 4',
    lineTension: 0,
    borderDash: [8, 4]
  }],
  [{
    data: [],
    label: 'Dataset 3',
    lineTension: 0,
    borderDash: [8, 4]
  }, {

    data: [],
    label: 'Dataset 4',
    lineTension: 0,
    borderDash: [8, 4]
  }],
];
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
  
  ngOnInit(): void {

    this.options = {
      
      scales: {
        xAxes: [{
          type: 'realtime',
          realtime: {
            onRefresh: function(chart: any) {
                chart.data.datasets.forEach(function(dataset: any) { 
                console.log()
                dataset.data.push({
                  x: Date.now(),
                  y: Math.random()
                });
              });
            },
            delay: 2000
          }
        }]
      }
    };
  }
  getDatasets() {
    return 2
  }
}
