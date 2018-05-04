import { observable, action } from "mobx";

export default class PDFViewerStore {
  @observable _scale = 1.5;
  @observable _pdfDoc = null

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
    this.scale = this.scale - 0.1;
  }

  get pdfDoc () {
    return this._pdfDoc;
  }

  set pdfDoc (doc) {
    this._pdfDoc = doc;
  }
}