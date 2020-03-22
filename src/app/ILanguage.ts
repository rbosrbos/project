export interface Browse {
  name: string;
  categories: string[];
  region: string[];
}
export interface ILanguage {
  home: string;
  browse: Browse;
  categories: string;
  region: string;
  contact: string;
  changeTheme: string;
  changeThemeOptions: string[];
  goBack: string;
  mainpageTitle: string;
  mainpageHeader: string;
  mainpageContent: string;
  mainpageMostvisited: string;
  navbarSunrise: string;
  navbarSunset: string;
  weatherforecastTitle: string;
  weatherforecastLocal: string;
  contactMessage: string;
  contactPlaceholderMessage: string;
}
