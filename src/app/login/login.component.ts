import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        if (data["response"]) {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoggedIn = true;
          this.redirectToHome();
        }
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  redirectToHome(): void {
    window.location.replace("/projects");
  }

  loginClick = false;
  login() {
    this.loginClick = true;
  }
}