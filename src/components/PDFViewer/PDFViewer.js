import React from 'react';
import 'pdfjs-dist/web/pdf_viewer.css';
import { withStyles } from 'material-ui/styles';
import SelectedIcons from '../SelectedIcons/SelectedIcons';
import { inject, observer } from 'mobx-react';
import PDFController from '../PDFController/PDFController';
import PDFPage from './PDFPage';

const styles = {
  container: {
    width: '100%',
    position: 'relative',
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  canvasContainer: {
    position: 'relative'
  }
};

@inject('pdfViewer')
@observer
class PDFViewerComponent extends React.Component {

  renderPagesElement = (pdfDoc) => {
    if (!pdfDoc) {
      return (<div>loading</div>);
    }

    const divList = [];
    for (let num = 1; num <= pdfDoc.numPages; num++) {
      const pageDiv = <PDFPage pageNum={num} key={num}></PDFPage>
      divList.push(pageDiv);
    }
    return divList;
  }

  render() {
    const classes = this.props.classes;
    const pdfDoc = this.props.pdfViewer.pdfDoc;
    const pages = this.renderPagesElement(pdfDoc);
    return (
      <div className={classes.container}>
        <PDFController />
        <div id="canvasContainer" className={classes.canvasContainer} ref="canvasContainer">
          <SelectedIcons />
          {pages}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PDFViewerComponent)
