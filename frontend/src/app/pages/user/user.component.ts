import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  imports: [RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  showUserForm = false

  users: any = []

  userType = localStorage.getItem('type')

  constructor(private _userService: UserService) {
    this.getUsers()
  }

  userForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required])
  })

  getUsers() {
    this._userService.findAll().subscribe(data => { this.users = data })
  }

  create() {
    if (!this.userForm.valid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos',
        icon: "error",
        showConfirmButton: false,
        timer: 1200
      })
      return
    }
    this._userService.create(this.userForm.value).subscribe({
      next: data => {
        this.getUsers()
        this.showUserForm = false
        this.userForm.reset()
        Swal.fire({
          title: 'Usuario creado',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        })

      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: 'Ha ocurrido un error',
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })
  }

  editUser = false
  update(item: any) {
    this.editUser = true
    this.showUserForm = true
    this.userForm.setValue({
      userName: item.userName,
      password: "",
      type: item.type
    })
    this.id = item.id

  }
  id = ""
  saveData() {
    if (!this.userForm.valid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos',
        icon: "error",
        showConfirmButton: false,
        timer: 1200
      })
      return
    }

    this._userService.update(this.userForm.value, this.id).subscribe({
      next: data => {
        this.getUsers()
        this.showUserForm = false
        this.userForm.reset()
        Swal.fire({
          title: 'Usuario actualizado',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        })
        this.id = ""
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: 'Ha ocurrido un error',
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })
  }

  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.deleteUser()
        }
      })
  }

  deleteUser() {
    this._userService.remove(this.id).subscribe({
      next: data => {
        this.getUsers()
        this.showUserForm = false
        this.userForm.reset()
        Swal.fire({
          title: 'Usuario eliminado',
          icon: "success",
          showConfirmButton: false,
          timer: 1200
        })
        this.id = ""
      },
      error: (e: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: 'Ha ocurrido un error',
          icon: "error",
          showConfirmButton: false,
          timer: 1200
        })
      }
    })
  }

  cancel() {
    this.showUserForm = false
    this.editUser = false
    this.userForm.reset()
    this.userForm.controls['userName'].enable()
  }

  logOut() {
    localStorage.clear()
  }
}


