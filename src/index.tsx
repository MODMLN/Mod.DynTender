import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
// Translation Hook
import { setTranslations, setDefaultLanguage } from 'react-multi-lang';
import { Settings } from "luxon";
import he from './translations/he/common.json'
import en from './translations/en/common.json'
// Do this two lines only when setting up the application
setTranslations({ he, en })
setDefaultLanguage('he')
Settings.defaultLocale = "he";//en
Settings.defaultZone = "Asia/Jerusalem";//times in json are utc too ,//Asia/Jerusalem //UTC

ReactDOM.render(
  <React.StrictMode>
   
      <Provider store={store}>
        
            <App />
         
      </Provider>
 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
