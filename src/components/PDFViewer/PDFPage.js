import React from 'react';
import { inject } from 'mobx-react';
import { autorun, trace } from 'mobx';
import * as PDFJS from 'pdfjs-dist';
import { withStyles } from 'material-ui';

const styles = {
  annotationLayer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    lineHeight: 1.0
  }
};

@inject('pdfViewer', 'selected')
class PDFPage extends React.Component {
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

  renderAnnotationLayer = autorun(async () => {
    const annotations = this.props.selected.annotations.peek();
    if (this.refs.annotationLayer) {
      this.refs.annotationLayer.innerHTML = '';
      this.refs.annotationLayer.setAttribute('style',  `width: ${Math.ceil(this.props.pdfViewer.viewport.width)}px; height: ${Math.ceil(this.props.pdfViewer.viewport.height)}px; margin: 0 auto;`);
      const scale = this.props.pdfViewer.scale;
      annotations.forEach(annotation => {
        const page = annotation.pageNum;
        if (page === this.props.pageNum) {
          const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          group.setAttribute('fill', '#7ED321');
          group.setAttribute('fill-opacity', 0.5);
          group.setAttribute('uuid', annotation.uuid);
          group.setAttribute('pageNum', annotation.pageNum);

          annotation.rects.forEach((rectInfo) => {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('width', rectInfo.width * scale);
            rect.setAttribute('height', rectInfo.height * scale);
            rect.setAttribute('x', rectInfo.x * scale);
            rect.setAttribute('y', rectInfo.y * scale);
            group.appendChild(rect);
          })
          this.refs.annotationLayer.appendChild(group);
        }
      });
    }
  });

  renderTextLayer = async () => {
    this.refs.textLayer.innerHTML = '';
    const textContent = await this.page.getTextContent();
    this.refs.textLayer.setAttribute('style', `width: ${Math.ceil(this.props.pdfViewer.viewport.width)}px; height: ${Math.ceil(this.props.pdfViewer.viewport.height)}px; margin: 0 auto;`)
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
      this.refs.canvas.height = Math.ceil(this.props.pdfViewer.viewport.height);
      this.refs.canvas.width = Math.ceil(this.props.pdfViewer.viewport.width);
      const renderContext = {
        canvasContext: context,
        viewport: this.props.pdfViewer.viewport
      };
      await this.page.render(renderContext);
      await this.renderTextLayer();
    }
  })

  render() {
    const classes = this.props.classes;
    const pageNum = this.props.pageNum;
    return (
      <div ref="container" id={`page-${pageNum}`} data-page={pageNum} style={{'position': 'relative'}}>
        <canvas ref="canvas" style={{display: 'block', margin: '0 auto'}}></canvas>
        <svg ref="annotationLayer" className={classes.annotationLayer}></svg>
        <div ref="textLayer" className="textLayer"></div>
      </div>
    );
  }
}

export default withStyles(styles)(PDFPage);