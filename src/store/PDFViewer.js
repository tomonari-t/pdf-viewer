import { observable, action, autorun } from "mobx";
import sample_pdf from '../pdf/sample_4.pdf';
import * as PDFJS from 'pdfjs-dist';

const CMAP_URL = '/cmaps/';

export default class PDFViewerStore {
  @observable _scale = 1.5;
  @observable _pdfDoc = null;
  @observable _pages = null;

  constructor () {
    this.getPDFDocument();
    autorun(async () => {
      if (this.pdfDoc) {
        const data = await this.pdfDoc.getMetadata();
        console.log(data);
      }
    });
  }

  getPDFDocument = async () => {
    this.pdfDoc = await PDFJS.getDocument({
      url: sample_pdf,
      cMapUrl: CMAP_URL,
      cMapPacked: true,
    });
  }

  getPage = async (num) => {
    if (this.pdfDoc) {
      return await this.pdfDoc.getPage(num);
    }
  }

  get scale () {
    return this._scale;
  }

  set scale (scale) {
    this._scale = scale;
  }

  @action
  scaleUp = () => {
    this.scale = this.scale + 0.1;
  }

  @action
  scaleDown = () => {
    if (this.scale > 0) {
      this.scale = this.scale - 0.1;
    }
  }

  get pdfDoc () {
    return this._pdfDoc;
  }

  set pdfDoc (doc) {
    this._pdfDoc = doc;
  }
}