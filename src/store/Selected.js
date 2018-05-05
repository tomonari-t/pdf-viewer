import { observable, action, computed } from "mobx";

export default class SelectedStore {
  //
  @observable selectedRects = null;
  @observable isShow = false;


  @computed
  setReact(rects) {
    this.selectedRects = rects;
    if (rects) {

    }
  }
}
