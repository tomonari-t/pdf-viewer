import React from 'react';
import * as PDFJS from 'pdfjs-dist';
import sample_1_pdf from '../../pdf/sample_2.pdf';
import 'pdfjs-dist/web/pdf_viewer.css';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Icon from 'material-ui/Icon';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

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

class PDFViewerComponent extends React.Component {

  state = {
    scale: 1.5,
    pdfDoc: null
  }

  zoomUp = () => {
    this.setState({ scale: this.state.scale + 0.1});
    this.renderPDF();
  }

  zoomDown = () => {
    if (this.state.scale > 0) {
      this.setState({ scale: this.state.scale - 0.1});
      this.renderPDF();
    }
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
    if (this.state.pdfDoc) {
      this.refs.canvasContainer.innerHTML = '';
    } else {
      this.state.pdfDoc = await PDFJS.getDocument({
        url: sample_1_pdf,
        cMapUrl: CMAP_URL,
        cMapPacked: true,
      });
    }
    await this.renderPages(this.state.pdfDoc);
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
      const viewport = page.getViewport(this.state.scale);
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

  componentDidMount = async () => {
    this.renderPDF();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.container}>
        <div
          id="canvasContainer"
          ref="canvasContainer">
        </div>
        <div className={classes.btnContainer}>
          <div className={classes.btn}>
            <Button mini={true} variant="fab" color="primary" aria-label="add" className={classes.button}>
              <NavigateBeforeIcon />
            </Button>
          </div>
          <div className={classes.btn}>
            <Button onClick={this.zoomUp} mini={true} variant="fab" color="primary" aria-label="add" className={classes.button}>
              <AddIcon />
            </Button>
          </div>
          <div className={classes.btn}>
            <Button onClick={this.zoomDown}  mini={true} variant="fab" color="primary" aria-label="add" className={classes.button}>
              <RemoveIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PDFViewerComponent)
