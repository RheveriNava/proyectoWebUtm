import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class CambioInfoService
{
  private messageSource = new BehaviorSubject<string>("");
  currentMsg$ = this.messageSource.asObservable();
  constructor() { }
  enviar()
  {
    console.log("enviando datos a todos los que escuchan");
    this.messageSource.next("");
  }
}
