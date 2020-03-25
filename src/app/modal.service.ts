import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public open(i: number) {
    const modal = document.getElementById('modal-' + i);
    const body = document.getElementsByTagName('BODY') as HTMLCollectionOf<HTMLElement>;
    modal.style.top = '0';
    body[0].style.overflow = 'hidden';
    const closeButton = document.getElementsByClassName('close-modal')[0] as HTMLElement;
    closeButton.style.display = 'block';
    setTimeout(() => {
      closeButton.style.opacity = '1';
    }, 1000);
  }
  public close() {
    const modal = document.getElementsByClassName('modal-background');
    const body = document.getElementsByTagName('BODY') as HTMLCollectionOf<HTMLElement>;
    for (const i of Object.keys(modal)) {
      modal[i].style.top = '-110vh';
    }
    body[0].style.overflow = 'auto';
    const closeButton = document.getElementsByClassName('close-modal')[0] as HTMLElement;
    closeButton.style.display = 'none';
    closeButton.style.opacity = '0';
  }
}
