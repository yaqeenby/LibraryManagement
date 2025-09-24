import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor() { }

  ngOnInit(): void { }

  info(title: string, message: string = '') {
    return Swal.fire({
      title: title,
      text: message
    });
  }

  success(title: string, message: string = '') {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 8000
    });
  }

  warning(title: string, message: string = '') {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 8000
    });
  }

  error(title: string, message: string = '') {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 8000
    });
  }

  confirmBox(title: string, message: string = '') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    })
  }
}
