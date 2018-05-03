import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const theme = createMuiTheme()
ReactDOM.render(
  <MuiThemeProvider muiTheme={theme}>
    <App />
  </MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();
