import { observable, action, computed } from "mobx";

export default class SelectedStore {
  //
  @observable selectedRects = null;
  @observable selectedPageNum = null;
  @observable offset = { x: null, y: null };

  @action
  selectRects = (pageNum, rects, offsetX, offsetY) => {
    this.selectedPageNum = pageNum;
    this.selectedRects = rects;
    this.offset.x = offsetX;
    this.offset.y = offsetY;
  }

  getSelectedRects() {
    return {
      rects: this.selectedRects,
      offset: { x: this.offset.x, y: this.offset.y }
    };
  }

  get pageNum() {
    return this.selectedPageNum;
  }

}
