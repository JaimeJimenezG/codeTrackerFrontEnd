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
  @Input()
  projects
  dataProject
  constructor(private getProjects: GetProjectsService, getDataProjects: GetDataProjectsService) {
    this.projects = getProjects.resolveItems();
    this.dataProject = getDataProjects;
  }
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  state = []

  options: any;
  updateOptions: any;

  private oneDay = 24 * 3600 * 1000;
  private now: Date;
  private value;
  private data = [[],[],[]];
  private timer: any;

  
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: any = {};

  toggle(idCard): void {
    this.state[idCard] = this.state[idCard] === 'collapsed' ? 'expanded' : 'collapsed';
  }
  
  ngOnInit() {
    var count = 0;
    this.projects.forEach(element => {
      element.forEach(element => {
        // initialize chart options:
        this.options = {
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
            data: this.data[count]
          }]
        };
        for (let i = 0; i < 200; i++) {
          
          this.data[count].push(this.randomData(element.procesName));
        }
        // Mock dynamic data:
        this.timer = setInterval(() => {
          console.log(this.data)
          for (let n = 0; n < 3; n++) {
            for (let i = 0; i < 5; i++) {
              console.log(this.randomData("java"))
              this.data[n].shift();
              this.data[n].push(this.randomData(element.procesName));
            }
          }
          

          // update series data:
          this.updateOptions = {
            series: [{
              data: this.data[count]
            }]
          };
        }, 1000);
        console.log(this.data)

        this.state.push("collapsed");
        count++;
      });
    });
    this.now = new Date(2020, 9, 3);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  randomData(processName) {
    this.now = new Date(this.now.getTime() + this.oneDay);
    this.dataProject.getData(processName).subscribe(val => {
      this.value = parseInt(val["response"]["cpu%"])
    })  
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        this.value
      ]
    };
  }
}