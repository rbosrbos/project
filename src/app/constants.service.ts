import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  themeColors = [
    {
      name: 'Cream',
      colors: ['#8CFBDE', '#70A9A1', '#a7c4b5', '#ed6b86', '#463239']
    },
    {
      name: 'Greenish',
      colors: ['#D0B17A', '#F5C396', '#F5FDC6', '#41521F', '#A89F68']
    },
    {
      name: 'Marine',
      colors: ['#90FFDC', '#87CBAC', '#8DE4FF', '#8AC4FF', '#7A7978']
    },
    {
      name: 'Quicksilver',
      colors: ['#F8F8F8', '#B4D2E7', '#94C5CC', '#A1A6B4', '#463239']
    },
    {
      name: 'The Best',
      colors: ['#0fff95', '#70a9a1', '#8cfbde', '#103900', '#06ba63']
    }
  ];

  constructor() { }
}
