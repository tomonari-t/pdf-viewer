import React from 'react';
import * as PDFJS from 'pdfjs-dist';
import sample_1_pdf from '../../pdf/sample_2.pdf';
import 'pdfjs-dist/web/pdf_viewer.css';
const CMAP_URL = '/cmaps/';

export default class PDFViewerComponent extends React.Component {

  renderPages = async (pdfDoc) => {
    for (let num = 1; num <= pdfDoc.numPages; num++) {
      const page = await pdfDoc.getPage(num);
      const scale = 1.5;
      const canvasContaier = this.refs.canvasContainer;
      const div = document.createElement('div');
      div.setAttribute('id', `page-${page.pageIndex + 1}`);
      div.setAttribute('style', 'position: relative; width: 80%; margin: 0 auto');
      canvasContaier.appendChild(div);

      const canvas = document.createElement('canvas');
      div.appendChild(canvas);

      const context = canvas.getContext('2d');
      const viewport = page.getViewport(scale);
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      await page.render(renderContext);

      // text-layer
      const textContent = await page.getTextContent();
      const textLayerDiv = document.createElement('div');
      textLayerDiv.setAttribute('class', 'textLayer');
      textLayerDiv.setAttribute('style', `width: ${viewport.width}px; height: ${viewport.height}px; margin: 0 auto;`)
      div.appendChild(textLayerDiv);
      PDFJS.renderTextLayer({
        textContent,
        container: textLayerDiv,
        pageIndex: page.pageIndex,
        viewport: viewport
      });
      // anotation-layer
    }
  }

  componentDidMount = async () => {
    const pdfDoc = await PDFJS.getDocument({
      url: sample_1_pdf,
      cMapUrl: CMAP_URL,
      cMapPacked: true,
    });
    await this.renderPages(pdfDoc);
  }

  render() {
    return (
      <div
        id="canvasContainer"
        ref="canvasContainer">
      </div>
    );
  }
}
