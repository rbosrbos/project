import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public open(e: string) {
    let modal = document.getElementById(e);
    modal.style.display = 'block';
    setTimeout(function(){
      modal.style.opacity = '1';
    },1);
  }
}
