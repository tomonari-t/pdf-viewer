import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme } from 'material-ui/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectedStore from './store/Selected';
import { Provider } from 'mobx-react';
import PDFViewerStore from './store/PDFViewer';


const stores = {
  selected: new SelectedStore(),
  pdfViewer: new PDFViewerStore()
};

const theme = createMuiTheme()
ReactDOM.render(
  <MuiThemeProvider muiTheme={theme}>
    <Provider {...stores}>
      <App />
    </Provider>
  </MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();
