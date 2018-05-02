import React from 'react';
import './App.scss';
import PDFViewerComponent from '../PDFViewer/PDFViewer';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon
} from 'rmwc/Toolbar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarMenuIcon use="menu"/>
              <ToolbarTitle>Toolbar</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <ToolbarIcon use="save"/>
              <ToolbarIcon use="print"/>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <PDFViewerComponent />
      </div>
    );
  }
}

export default App;
