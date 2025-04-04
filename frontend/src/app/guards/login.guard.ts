import { inject } from '@angular/core'
import { Router } from '@angular/router'

export const loginGuard = (): boolean => {
    const router = inject(Router)
    if (localStorage.getItem('token')) {
        return true
    } else {
        router.navigate([''])
        return false
    }
}

export const adminGuard = (): boolean => {
    const router = inject(Router)
    if (localStorage.getItem('type') === 'Administrador') {
        return true
    } else {
        router.navigate([''])
        return false
    }
}

export const inactiveSession = (): boolean => {
    const router = inject(Router)
    if (!localStorage.getItem('token')) {
        return true
    } else {
        router.navigate(['/catalogo'])
        return false
    }
}