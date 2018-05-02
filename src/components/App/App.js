import React from 'react';
import './App.scss';
import PDFViewerComponent from '../PDFViewer/PDFViewer';



class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div>
            Hello
        </div>
        <PDFViewerComponent />
      </div>
    );
  }
}

export default App;
