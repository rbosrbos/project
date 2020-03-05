import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface IDropDown {
  id?:number;
  href?:string;
  name:string;
}
export interface IMenu {
  href:string;
  name:string;
  title:string;
  icon?:IconDefinition;
  dropdown?:Array<IDropDown>;
}