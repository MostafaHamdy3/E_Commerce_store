import {vars} from 'nativewind';

export const themesVariables = {
  light: {
    '--bgScreen': '#F9F9F9',
    '--bgContainer': '#FFFFFF',
    '--mainColor': '#333',
    '--primaryColor': '#3BAE49',
    '--secondaryColor': '#F6871F',
    '--descColor': '#4F4F4F',
    '--error': '#d40e0e',
    '--borderColor': '#E0E0E0',
    '--placeholder': '#828282',
  },
  dark: {
    '--bgScreen': '#232321',
    '--bgContainer': '#31312F',
    '--mainColor': '#EEEEEE',
    '--primaryColor': '#3BAE49',
    '--secondaryColor': '#F6871F',
    '--descColor': '#BDBDBD',
    '--error': '#d40e0e',
    '--borderColor': '#828282',
    '--placeholder': '#E0E0E0',
  },
};

export const themes = {
  light: vars(themesVariables.light),
  dark: vars(themesVariables.dark),
};
