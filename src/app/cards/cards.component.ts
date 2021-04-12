import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import { ProjectsService } from '../service/projects.service';
import '@taeuk-gang/chartjs-plugin-streaming';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
  datasets = []
  projectService
  constructor(projectService: ProjectsService) {
    this.projectService = projectService;
  }

  projectsStates = []
  processStates = []
  projectsIDs = {}


  form = new FormGroup({
    "name": new FormControl("", Validators.required),
    "path": new FormControl("", Validators.required),
    "desc": new FormControl("", Validators.required),
    "procesName": new FormControl("", Validators.required),
    "workspace": new FormControl("", Validators.required),
  });

  dropdownList = [];
  dropdownSettings = {};

  options = {
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          onRefresh: (chart) => {
            chart.data.datasets.forEach((dataset: any) => {
              this.projectService.getData().subscribe(data => {
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

  ngOnInit(): void {
    this.projects = this.projectService.resolveItems();
    this.datasets = this.getDatasets();
    this.getIdOfProces()
  }

  getIdOfProces(){
    this.projectService.resolveItems().forEach(project => {
      project.forEach(proces => {
        this.projectService.getData().subscribe(data => {
          var id = 0
          for (let key in data.response) {
            if (data.response[key].process == proces.procesName) {
              this.projectsIDs[proces.procesName] = id
            }
            id++
          }
        })
      });
    })
  }

  toggleProjects(idCard): void {
    this.projectsStates[idCard] = this.projectsStates[idCard] === 'collapsed' ? 'expanded' : 'collapsed';
  }
  
  toggleProcess(idCard): void {
    this.processStates[idCard] = this.processStates[idCard] === 'collapsed' ? 'expanded' : 'collapsed';
  }

  getDatasets() {
    this.projectService.getData().subscribe(data => {
        for (let key in data.response) {
          this.datasets.push([{ data: [{ x: Date.now(), y: data.response[key]["cpuUsage"] }], processName: data.response[key]["process"], id: data.response[key]["process"]+"Cpu",  label: 'Cpu usage', lineTension: 0, borderDash: [8, 4] },{ data: [{ x: Date.now(), y: data.response[key]["memoryUsage"] }], processName: data.response[key]["process"], id: data.response[key]["process"]+"Ram", label: 'Ram usage', lineTension: 0, borderDash: [8, 4] }])
        }
      })
      return this.datasets
  }

  onSubmit(){
    this.projectService.newProject(this.form.value).subscribe()
    window.location.reload()
  }

  onDelele(_id){
    console.log(_id)
    this.projectService.deleteProject(_id).subscribe()
  }
}
