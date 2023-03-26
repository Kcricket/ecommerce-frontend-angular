import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../service/auth.service";
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginForm = this.builder.group({
    userName: this.builder.control('', Validators.compose([Validators.required])),
    userPassword: this.builder.control('', Validators.compose([Validators.required])),
  });

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        this.authService.setRoles(response.user.role);
        this.authService.setToken(response.jwtToken);
        console.log(response);
        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/profile']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
