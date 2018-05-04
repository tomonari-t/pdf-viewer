import { observable, action } from "mobx";

export default class SelectedStore {
  //
  @observable selectedRect = null;
  @observable isShow = false;

  set selectedRect(rect) {
    this.selectedRect = rect;
  }
}
