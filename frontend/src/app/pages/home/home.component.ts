import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username = ''
  password = ''
  error = ''
  constructor(private router: Router, private _userService: UserService) {
  }

  login() {
    if (this.validateData()) {
      this._userService.login({ userName: this.username, password: this.password }).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token)
          const decoded: any = jwtDecode(data.token)
          localStorage.setItem('userName', decoded.userName)
          localStorage.setItem('type', decoded.type)
          this.router.navigate(['/catalogo'])
        }, error: (e: HttpErrorResponse) => {
          if (e.status != 500) {
            this.error = e.error.message || 'error iniciando sesión'
          } else {
            this.error = 'error iniciando sesión'

          }
        }
      })

    }
  }

  private validateData(): boolean {

    const usernameRegex = /^[a-zA-Z0-9]{4,30}$/;
    const passwordRegex = /^.{8,}$/;



    if (!this.username) {
      this.error = 'Ingresar un usuario'
      return false
    }
    if (!this.password) {
      this.error = 'Ingresar una contraseña'
      return false
    }
    if (!usernameRegex.test(this.username)) {
      this.error = 'usuario debe tener almenos 4 letras'
      return false
    }
    if (!passwordRegex.test(this.password)) {
      this.error = 'Ingresar una contraseña valida'
      return false
    }
    return true
  }
}
