import { Component, OnInit } from '@angular/core';
import { IpServiceService } from "../service/ip-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  
  constructor(private ip:IpServiceService) { }

  ipAddress:string;  
  idUser: string
  ngOnInit(): void {
    this.getIp();  
  }
  isLoggedIn() {
    if (sessionStorage.getItem('auth-user')) {
      this.idUser = "/" + JSON.parse( sessionStorage.getItem('auth-user'))["id"];
      return true;
    } else {
      return false;
    }
  }

  getIp()  
  {  
    this.ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
    });  
  }  

  logout(){
    window.sessionStorage.clear();
    window.location.reload();
  }
}
