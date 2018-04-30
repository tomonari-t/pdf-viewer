import React from 'react';
import * as PDFJS from 'pdfjs-dist';
import sample_1_pdf from '../../pdf/sample_1.pdf';

export default class PDFViewerComponent extends React.Component {

  renderPages = async (pdfDoc) => {
    for (let num = 1; num <= pdfDoc.numPages; num++) {
      const page = await pdfDoc.getPage(num);
      const scale = 1.0;
      const canvasContaier = this.refs.canvasContainer;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const viewport = page.getViewport(scale);
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      canvasContaier.appendChild(canvas);
      page.render(renderContext);
    }
  }

  componentDidMount = async () => {
    const pdfDoc = await PDFJS.getDocument(sample_1_pdf);
    await this.renderPages(pdfDoc);
  }

  render() {
    return (
      <div id="canvasContainer" ref={'pdf'} ref="canvasContainer">
      </div>
    );
  }
}
