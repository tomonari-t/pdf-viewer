import React from 'react';
import { inject } from 'mobx-react';
import { autorun } from 'mobx';
import * as PDFJS from 'pdfjs-dist';

@inject('pdfViewer')
export default class PDFPage extends React.Component {
  page = null;
  viewport = null;

  componentDidMount = () => {
    this.refs.container.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    this.refs.container.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp = () => {
    const pageNum = this.props.pageNum;
    const rect = this.getSelectionRects();
    if (!rect) {
      return;
    }
    const { height, width, x, y } = rect[0];
    console.log(`page${pageNum}`, x, y, height, width);
  }

  getSelectionRects = () => {
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
  }

  renderAnnotationLayer = async () => {
    this.refs.annotationLayer.setAttribute('class', 'annotationLayer');
    this.refs.annotationLayer.setAttribute('style',  `width: ${this.viewport.width}px; height: ${this.viewport.height}px; margin: 0 auto;`);
  }

  renderTextLayer = async () => {
    const textContent = await this.page.getTextContent();
    this.refs.textLayer.setAttribute('style', `width: ${this.viewport.width}px; height: ${this.viewport.height}px; margin: 0 auto;`)
    PDFJS.renderTextLayer({
      textContent,
      container: this.refs.textLayer,
      pageIndex: this.page.pageIndex,
      viewport: this.viewport
    });
  }

  renderPDF = autorun(async () => {
    const scale = this.props.pdfViewer.scale;
    const pdfDoc = this.props.pdfViewer.pdfDoc;
    if (pdfDoc) {
      this.page = await pdfDoc.getPage(this.props.pageNum);
      const context = this.refs.canvas.getContext('2d');
      this.viewport = this.page.getViewport(scale);
      this.refs.canvas.height = this.viewport.height;
      this.refs.canvas.width = this.viewport.width;
      const renderContext = {
        canvasContext: context,
        viewport: this.viewport
      };
      await this.page.render(renderContext);
      await this.renderTextLayer();
    }
  })

  render() {
    const pageNum = this.props.pageNum;
    return (
      <div ref="container" id={`page-${pageNum}`} dataPage={pageNum} style={{'position': 'relative'}}>
        <canvas ref="canvas" style={{display: 'block', margin: '0 auto'}}></canvas>
        <div ref="textLayer" className="textLayer"></div>
        <div ref="annotationLayer" className="annotationLayer"></div>
      </div>
    );
  }
}