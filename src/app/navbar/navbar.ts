import { Component, OnInit, ViewChild, } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../services/login-service';
import { User } from '../interfaces/user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  user: User = { username: '', password: '' };
  loggedIn: boolean = false;
 constructor(public loginService: LoginService) {}

  @ViewChild('loginForm') loginForm: any;

  ngOnInit() {
    let newUser = this.loginService.getUser();
    if (newUser != null) {
      this.user = { ...newUser };
    };
  }

  login(user: User, form: NgForm): void {
    this.loginService.login(user.username, user.password).subscribe(event => {
      if (!this.loginService.isLogged()) {
        window.alert("Username or Password incorrect");
        form.resetForm({ username: '', password: '' });
      }
    });
  }
}
