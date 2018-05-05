import { observable, action, computed, autorun } from "mobx";

const REGEXP = /[xy]/g;
const PATTERN = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

const replacer = (targetCharacter) => {
  let replcaedCharacter;
  if (targetCharacter === 'x') {
    replcaedCharacter = Math.floor(Math.random() * 16);
  } else if (targetCharacter === 'y') {
    replcaedCharacter = Math.floor((Math.random() * 4) + 8);
  }
  return replcaedCharacter.toString(16);
}

const uuid = () => {
  return PATTERN.replace(REGEXP, replacer);
};

export default class SelectedStore {
  //
  @observable selectedRects = null;
  @observable selectedPageNum = null;
  @observable offset = { x: null, y: null };
  @observable annotations = [];

  @action
  selectRects = (pageNum=null, rects=null, offsetX=null, offsetY=null) => {
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

  @action
  saveLineMark = (scale) => {
    console.log(scale);
    const rectsNum = this.selectedRects.length;
    const rects = [];
    for (let i = 0; i < rectsNum; i++) {
      const rect = this.selectedRects[i];
      console.log(rect);
      rects.push({
        height: Math.ceil(rect.height / scale),
        width: Math.ceil(rect.width / scale),
        x: Math.ceil(rect.x / scale),
        y: Math.ceil(rect.y / scale)
      });
    }
    const lineMarkAnnotation = {
      type: 'linemark',
      pageNum: this.selectedPageNum,
      uuid: uuid(),
      rects: rects
    };
    this.annotations.push(lineMarkAnnotation);
    this.selectRects();
  }
}
