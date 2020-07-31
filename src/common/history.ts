export interface IHistory<S> {
  forward: () => void;
  revert: () => void;
  startRecord: () => void;
  endRecord: () => void;
}

export default class History<S> implements IHistory<S> {
  revert() {

  }

  forward() {

  }

  startRecord() {

  }

  endRecord() {

  }
}
