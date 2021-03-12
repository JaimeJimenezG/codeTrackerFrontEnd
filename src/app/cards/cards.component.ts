import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Observable, zip } from 'rxjs';
import { GetProjectsService } from '../service/get-projects.service';
import { GetDataProjectsService } from "../service/get-data-projects.service";

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


export class CardsComponent implements OnInit, OnDestroy {
  title = 'my-app';
  projects
  dataProject
  allProjects
  constructor(private getProjects: GetProjectsService, getDataProjects: GetDataProjectsService) {
    this.projects = getProjects.resolveItems();
    this.dataProject = getDataProjects;
  }
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  state = []
  options
  option = {
    title: {
      text: 'CPU use (single-threded)'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        params = params[0];
        const date = new Date(params.name);
        return "CPU : " + params.value[1];
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      },
      show: false,
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: true
      },
      min: 0,
      max: 100
    },
    series: [{
      name: 'Mocking Data',
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
    }]
  };
  updateOptions: any;

  private oneDay = 24 * 3600 * 1000;
  private now: Date;
  private value;
  private data;
  private timer: any;

  
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: any = {};

  toggle(idCard): void {
    this.state[idCard] = this.state[idCard] === 'collapsed' ? 'expanded' : 'collapsed';
  }
  
  ngOnInit(): void {
    this.constructDataArrays()
    this.dataToOptions()
    // generate some random testing data:
    this.now = new Date();
    console.log(this.data)
    for (let i = 0; i < 100; i++) {
      this.data.push(this.getUsage('java',0));
    }

    // initialize chart options:

    // Mock dynamic data:
    this.timer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.getUsage('java', 0));
      }
      // update series data:
      this.updateOptions = {
        series: [{
          data: this.data
        }]
      };
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getUsage(processName, type) {
    this.now = new Date(this.now.getTime() + this.oneDay);
    this.dataProject.getData().subscribe(val => {
      
      this.value = parseInt(val['response'][processName][type])
    })  
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        this.value
      ]
    };
  }
  dataToOptions() {
    var count = 0;
    var options=[]
    this.projects.forEach(element => {
      element.forEach(element => {
        options[count] = this.option
        options[count].series.data = this.data
        count++
      });
    });
    this.options = options
  }
  constructDataArrays(){
    var count = 0;
    this.data = []
    this.projects.forEach(element => {
      element.forEach(element => {
        this.data[count] = []
        count++
      })
    })
  }
}
