import { Component, Prop, Vue } from 'vue-property-decorator';

export enum Orientation {
  VERTICAL,
  HORIZONTAL,
}

export interface ISashEvent {
  target: any;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

/**
 * <Sash orientation="vertical" size="4" onChange={} onStart={} onEnd={} />
 */
@Component({})
export default class Sash extends Vue {
  @Prop({ default: Orientation.VERTICAL })
  orientation!: Orientation;

  @Prop({ default: 4 })
  size!: number;

  @Prop()
  position!: number;

  private get style(): any {
    if (this.orientation === Orientation.VERTICAL) {
      return {
        width: `${this.size}px`,
        height: '100%',
        left: `${this.position}px`,
      };
    }
    return {
      width: '100%',
      height: `${this.size}px`,
      top: `${this.position}px`,
    };
  }

  private get className() {
    return ['sash', this.orientation === Orientation.VERTICAL ? 'vertical' : 'horizontal'];
  }

  private current: ISashEvent = {
    target: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  }

  mounted() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  destoryed() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown(e: MouseEvent) {
    this.current.target = e.target;
    this.current.startX = e.pageX;
    this.current.startY = e.pageY;

    this.$emit('start', this.current);
  }

  onMouseMove(e: MouseEvent) {
    if (this.current?.target) {
      this.current.currentX = e.pageX;
      this.current.currentY = e.pageY;

      this.$emit('change', this.current);
    }
  }

  onMouseUp(e: MouseEvent) {
    if (this.current?.target) {
      this.current.currentX = e.pageX;
      this.current.currentY = e.pageY;

      this.$emit('end', this.current);

      this.current.target = null;
    }
  }

  render() {
    return (
      <div class={this.className} style={this.style} onMousedown={this.onMouseDown}></div>
    );
  }
}
