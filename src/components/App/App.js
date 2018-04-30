import React from 'react';
import './App.css';
import PDFViewerComponent from '../PDFViewer/PDFViewer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PDFViewerComponent />
      </div>
    );
  }
}

export default App;
