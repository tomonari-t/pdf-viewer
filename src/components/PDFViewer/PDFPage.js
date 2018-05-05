import React from 'react';
import { inject } from 'mobx-react';
import { autorun } from 'mobx';
import * as PDFJS from 'pdfjs-dist';

@inject('pdfViewer', 'selected')
export default class PDFPage extends React.Component {
  page = null;

  componentDidMount = () => {
    this.refs.container.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    this.refs.container.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp = (e) => {
    const pageNum = this.props.pageNum;
    const rects = this.getSelectionRects();
    if (rects) {
      const pageOffsetX = e.target.offsetLeft;
      const pageOffsetY = e.target.offsetTop;
      this.props.selected.selectRects(pageNum, rects, pageOffsetX, pageOffsetY);
    } else {
      this.props.selected.selectRects(null, null, null, null);
    }
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
    this.refs.annotationLayer.innerHTML = '';
    this.refs.annotationLayer.setAttribute('class', 'annotationLayer');
    this.refs.annotationLayer.setAttribute('style',  `width: ${this.props.pdfViewer.viewport.width}px; height: ${this.props.pdfViewer.viewport.height}px; margin: 0 auto;`);
  }

  renderTextLayer = async () => {
    this.refs.textLayer.innerHTML = '';
    const textContent = await this.page.getTextContent();
    this.refs.textLayer.setAttribute('style', `width: ${this.props.pdfViewer.viewport.width}px; height: ${this.props.pdfViewer.viewport.height}px; margin: 0 auto;`)
    PDFJS.renderTextLayer({
      textContent,
      container: this.refs.textLayer,
      pageIndex: this.page.pageIndex,
      viewport: this.props.pdfViewer.viewport
    });
  }

  renderPDF = autorun(async () => {
    const scale = this.props.pdfViewer.scale;
    const pdfDoc = this.props.pdfViewer.pdfDoc;
    if (pdfDoc) {
      this.page = await pdfDoc.getPage(this.props.pageNum);
      const context = this.refs.canvas.getContext('2d');
      this.props.pdfViewer.viewport = this.page.getViewport(scale);
      this.refs.canvas.height = this.props.pdfViewer.viewport.height;
      this.refs.canvas.width = this.props.pdfViewer.viewport.width;
      const renderContext = {
        canvasContext: context,
        viewport: this.props.pdfViewer.viewport
      };
      await this.page.render(renderContext);
      await this.renderTextLayer();
    }
  })

  render() {
    const pageNum = this.props.pageNum;
    return (
      <div ref="container" id={`page-${pageNum}`} data-page={pageNum} style={{'position': 'relative'}}>
        <canvas ref="canvas" style={{display: 'block', margin: '0 auto'}}></canvas>
        <div ref="textLayer" className="textLayer"></div>
        <div ref="annotationLayer" className="annotationLayer"></div>
      </div>
    );
  }
}