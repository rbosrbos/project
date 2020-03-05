import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  themeColors = [
    {
      name: "Cream (Default)",
      colors: ["#E6EBE0","#ED6B86","#463239","#A7C4B5","#FAB3A9","rgba(144,144,144,1)","rgba(128,128,128,1)"]
    },
    {
      name: "Blueish",
      colors: ["#38AECC","#183446","#463239","#046E8F","#046E8F","rgba(0,0,0,0.3)","rgba(0,0,0,0.3)"]
    },
    {
      name: "Purpleish",
      colors: ["#8A95A5","#474056","#463239","#757083","#F3D9DC","rgba(0,0,0,0.3)","rgba(0,0,0,0.3)"]
    },
    {
      name: "Quicksilver",
      colors: ["#F8F8F8","#A1A6B4","#463239","#B4D2E7","#94C5CC","rgba(0,0,0,0.3)","rgba(0,0,0,0.3)"]
    }
  ];

  constructor() { }
}
