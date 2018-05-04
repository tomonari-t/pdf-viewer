import React from 'react';
import * as PDFJS from 'pdfjs-dist';
import sample_1_pdf from '../../pdf/sample_4.pdf';
import 'pdfjs-dist/web/pdf_viewer.css';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AddIcon from '@material-ui/icons/Add';
import SelectedIcons from '../SelectedIcons/SelectedIcons';
import { inject, observer } from 'mobx-react';
import PDFController from '../PDFController/PDFController';
import { autorun } from 'mobx';

const CMAP_URL = '/cmaps/';

const styles = {
  container: {
    width: '100%',
    overflow: 'auto',
    position: 'relative'
  },
  btnContainer: {
    position: 'fixed',
    left: '70%',
    bottom: '10px',
    zIndex: 10
  },
  btn: {
    marginTop: '10px'
  }
};

// get Rect
const getSelectionRects = () => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const rects = range.getClientRects();

  if (rects.length > 0 && rects[0].width > 0 && rects[0].height > 0) {
    return rects;
  } else {
    return null;
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


  zoomUp = () => {
    this.props.pdfViewer.scaleUp();
    this.renderPDF();
  }

  zoomDown = () => {
    if (this.props.pdfViewer.scale > 0) {
      this.props.pdfViewer.scaleDown();
      this.renderPDF();
    }
  }

  renderAnnotationLayer = async (pageContainer, page, viewport) => {
    const annotationLayer = document.createElement('div');
    annotationLayer.setAttribute('class', 'annotationLayer');
    annotationLayer.setAttribute('style',  `width: ${viewport.width}px; height: ${viewport.height}px; margin: 0 auto;`);
    pageContainer.appendChild(annotationLayer);
  }

  renderTextLayer = async (pageContainer, page, viewport) => {
      const textContent = await page.getTextContent();
      const textLayerDiv = document.createElement('div');
      textLayerDiv.setAttribute('class', 'textLayer');
      textLayerDiv.setAttribute('style', `width: ${viewport.width}px; height: ${viewport.height}px; margin: 0 auto;`)
      pageContainer.appendChild(textLayerDiv);
      PDFJS.renderTextLayer({
        textContent,
        container: textLayerDiv,
        pageIndex: page.pageIndex,
        viewport: viewport
      });
  }

  renderPDF = async () => {
    const pdfDoc = this.props.pdfViewer.pdfDoc;
    if (pdfDoc) {
      this.refs.canvasContainer.innerHTML = '';
    } else {
      this.props.pdfViewer.pdfDoc = await PDFJS.getDocument({
        url: sample_1_pdf,
        cMapUrl: CMAP_URL,
        cMapPacked: true,
      });
    }
    await this.renderPages(this.props.pdfViewer.pdfDoc);
  }

  renderPages = async (pdfDoc) => {
    for (let num = 1; num <= pdfDoc.numPages; num++) {
      const page = await pdfDoc.getPage(num);
      const canvasContaier = this.refs.canvasContainer;
      const div = document.createElement('div');
      div.setAttribute('id', `page-${page.pageIndex + 1}`);
      div.setAttribute('style', 'position: relative');
      canvasContaier.appendChild(div);
      const canvas = document.createElement('canvas');
      canvas.setAttribute('style', 'display: block; margin: 0 auto');
      div.appendChild(canvas);

      const context = canvas.getContext('2d');
      const viewport = page.getViewport(this.props.pdfViewer.scale);
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      await page.render(renderContext);

      this.renderTextLayer(div, page, viewport);
    }
  }

  getPDFMeta = async () => {
    const data = await this.props.pdfViewer.pdfDoc.getMetadata();
    console.log('============');
    console.log(data);
    console.log('============');
  }

  componentDidMount = async () => {
    await this.renderPDF();
    await this.getPDFMeta();
    addEventListner();
  }

  componentWillUnmount = () => {
    removeEventListener();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.container}>
        <SelectedIcons />
        <div
          id="canvasContainer"
          ref="canvasContainer">
        </div>
        <PDFController />
      </div>
    );
  }
}

export default withStyles(styles)(PDFViewerComponent)
