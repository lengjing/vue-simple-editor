import { Component, Prop, Vue } from 'vue-property-decorator';

import './Box.less';

export type IType = 'drag' | 'resize';

export interface IDragEvent {
  target: any;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export interface IResizeEvent extends IDragEvent {
  direction: 'top' | 'right' | 'bottom' | 'left' | 'tr' | 'rb' | 'bl' | 'lt';
}

@Component({})
export default class Box extends Vue {
  @Prop({ default: true })
  knob!: boolean;

  @Prop({ default: true })
  sash!: boolean;

  private type?: IType;

  private dragEvent: IDragEvent = {
    target: null, startX: 0, startY: 0, currentX: 0, currentY: 0,
  }

  private resizeEvent: IResizeEvent = {
    target: null, startX: 0, startY: 0, currentX: 0, currentY: 0, direction: 'top',
  }

  private current!: IDragEvent | IResizeEvent;

  mounted() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  destoryed() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onDragMouseDown(e: MouseEvent) {
    this.type = 'drag';
    this.current = this.dragEvent;
    this.dragEvent.target = e.target;
    this.dragEvent.startX = e.pageX;
    this.dragEvent.startY = e.pageY;

    this.$emit('dragStart', this.dragEvent);
  }

  onResizeMouseDown(direction: IResizeEvent['direction'], e: MouseEvent) {
    this.type = 'resize';
    this.current = this.resizeEvent;
    this.resizeEvent.target = e.target;
    this.resizeEvent.startX = e.pageX;
    this.resizeEvent.startY = e.pageY;
    this.resizeEvent.direction = direction;
    e.stopPropagation();

    this.$emit('resizeStart', this.resizeEvent);
  }

  onMouseMove(e: MouseEvent) {
    if (this.current?.target) {
      this.current.currentX = e.pageX;
      this.current.currentY = e.pageY;

      if (this.type === 'drag') {
        this.$emit('drag', this.dragEvent);
      } else {
        this.$emit('resize', this.resizeEvent);
      }
    }
  }

  onMouseUp(e: MouseEvent) {
    if (this.current?.target) {
      this.current.currentX = e.pageX;
      this.current.currentY = e.pageY;

      if (this.type === 'drag') {
        this.$emit('dragEnd', this.dragEvent);
      } else {
        this.$emit('resizeEnd', this.dragEvent);
      }

      this.current.target = null;
    }
  }

  render() {
    return (
      <div class="box" onMousedown={this.onDragMouseDown} onMouseup={this.onMouseUp}>
        {
          this.sash && (
            [
              <div class="box-sash top" onMousedown={this.onResizeMouseDown.bind(this, 'top')}></div>,
              <div class="box-sash right" onMousedown={this.onResizeMouseDown.bind(this, 'right')}></div>,
              <div class="box-sash bottom" onMousedown={this.onResizeMouseDown.bind(this, 'bottom')}></div>,
              <div class="box-sash left" onMousedown={this.onResizeMouseDown.bind(this, 'left')}></div>,
            ]
          )
        }
        {
          this.knob && (
            [
              <div class="box-knob tl" onMousedown={this.onResizeMouseDown.bind(this, 'lt')}></div>,
              <div class="box-knob tr" onMousedown={this.onResizeMouseDown.bind(this, 'tr')}></div>,
              <div class="box-knob bl" onMousedown={this.onResizeMouseDown.bind(this, 'bl')}></div>,
              <div class="box-knob br" onMousedown={this.onResizeMouseDown.bind(this, 'rb')}></div>,
            ]
          )
        }
        {this.$slots.default}
      </div>
    );
  }
}
