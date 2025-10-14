import { Component, OnInit, ViewChild, } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../services/login-service';
import { User } from '../interfaces/user';
import { CommonModule } from '@angular/common';
import { RouterLink ,RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {
  user: User = { username: '', password: '' };
  loggedIn: boolean = false;
  constructor(public loginService: LoginService) { }

  @ViewChild('loginForm') loginForm: any;

  login(user: User, form: NgForm): void {
    this.loginService.login(user.username, user.password).subscribe(success => {
      if (success) {
        const name = user.username;
        form.setValue({ username: name, password: '' });
      } else {
        window.alert("Username or Password incorrect");
        form.resetForm({ username: '', password: '' });
      }
    });
  }

  logout(form: NgForm): void {
    this.user = { username: '', password: '' };
    this.loginService.logout();
    form.resetForm({ username: '', password: '' });
  }
}