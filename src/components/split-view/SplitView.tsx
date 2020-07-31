import { Component, Prop, Vue } from 'vue-property-decorator';
import Sash, { Orientation, ISashEvent } from '../sash';

import { ViewItem } from '../view';
import './SplitView.less';

export interface IViewProp {
  initialSize?: number;
  maxSize?: number;
  minSize?: number;
}

export interface IViewItem {
  size: number;
}

@Component({
  components: { Sash, ViewItem },
})
export default class SplitView extends Vue {
  @Prop({ default: Orientation.VERTICAL })
  orientation!: Orientation;

  @Prop({ default: () => [] })
  views!: IViewProp[];

  @Prop({ default: 4 })
  sashSize!: number;

  private currentSize!: number[];

  private viewItems: IViewItem[] = this.views.map((v) => ({ size: v.initialSize || 0 }));

  onStart(e: ISashEvent, idx: number) {
    this.currentSize = [this.viewItems[idx].size, this.viewItems[idx + 1].size];
  }

  onChange(e: ISashEvent, idx: number) {
    const deltaX = e.currentX - e.startX;
    const deltaY = e.currentY - e.startY;
    const delta = this.orientation === Orientation.VERTICAL ? deltaX : deltaY;
    const maxSize = this.views[idx].maxSize || this.viewItems[idx].size + this.viewItems[idx + 1].size;
    const minSize = this.views[idx].minSize || 0;

    const diff = delta > 0
      ? Math.min(delta, maxSize - this.currentSize[0])
      : Math.max(delta, minSize - this.currentSize[0]);

    this.viewItems[idx].size = this.currentSize[0] + diff;
    this.viewItems[idx + 1].size = this.currentSize[1] - diff;
  }

  getPosition(idx: number) {
    let position = 0;
    for (let i = 0; i <= idx; i++) {
      position += this.viewItems[i].size;
    }
    return position - this.sashSize / 2;
  }

  renderSash() {
    const sashes = [];
    for (let i = 0; i < this.viewItems.length - 1; i++) {
      sashes.push(
        <sash
          ref={`sash${i}`}
          size={this.sashSize}
          orientation={this.orientation}
          position={this.getPosition(i)}
          onStart={(e: ISashEvent) => this.onStart(e, i)}
          onChange={(e: ISashEvent) => this.onChange(e, i)}>
        </sash>,
      );
    }
    return (
      <div class="sash-container">{sashes}</div>
    );
  }

  renderView() {
    const children = this.$slots.default || [];
    const className = ['view-container', this.orientation === Orientation.VERTICAL ? 'vertical' : 'horizontal'];
    return (
      <div class={className}>
        {this.viewItems.map((v, i) => (
          <view-item
            ref={`viewItem${i}`}
            orientation={this.orientation}
            size={v.size}>
            {children[i]}
          </view-item>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div class="split-view" ref="splitView">
        {this.renderSash()}
        {this.renderView()}
      </div>
    );
  }
}
