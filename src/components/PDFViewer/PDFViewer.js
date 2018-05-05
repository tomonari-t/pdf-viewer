import React from 'react';
import * as PDFJS from 'pdfjs-dist';
import sample_1_pdf from '../../pdf/sample_4.pdf';
import 'pdfjs-dist/web/pdf_viewer.css';
import { withStyles } from 'material-ui/styles';
import SelectedIcons from '../SelectedIcons/SelectedIcons';
import { inject, observer } from 'mobx-react';
import PDFController from '../PDFController/PDFController';
import { autorun } from 'mobx';
import PDFPage from './PDFPage';

const CMAP_URL = '/cmaps/';

const styles = {
  container: {
    width: '100%',
    overflow: 'auto',
    position: 'relative'
  }
};

// get Rect
const getSelectionRects = () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rects = range.getClientRects();

    if (rects.length > 0 && rects[0].width > 0 && rects[0].height > 0) {
      return rects;
    } else {
      return null;
    }
  }
};

const handleDocumentMouseup = (e) => {
  const rect = getSelectionRects();
  if (!rect) {
    return;
  }
  const { height, width, x, y } = rect[0];
};

const addEventListner = () => {
  document.addEventListener('mouseup', handleDocumentMouseup);
};

const removeEventListener = () => {
  document.removeEventListener('mouseup', handleDocumentMouseup);
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

  componentDidMount = async () => {
    addEventListner();
  }

  componentWillUnmount = () => {
    removeEventListener();
  }

  render() {
    const classes = this.props.classes;
    const pdfDoc = this.props.pdfViewer.pdfDoc;
    const pages = this.renderPagesElement(pdfDoc);
    return (
      <div className={classes.container}>
        <SelectedIcons />
        <div id="canvasContainer" ref="canvasContainer">
          {pages}
        </div>
        <PDFController />
      </div>
    );
  }
}

export default withStyles(styles)(PDFViewerComponent)
