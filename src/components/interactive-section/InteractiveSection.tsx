import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { IBrick } from '@/common/brick';
import Box, { IDragEvent, IResizeEvent } from '../box';

const Page = namespace('page');

@Component({
  components: {
    Box,
  },
})
export default class InteractiveSection extends Vue {
  @Prop()
  readonly section!: IBrick;

  @Prop({ default: () => [] })
  readonly bricks!: IBrick[];

  @Page.Mutation
  UPDATE_STYLE!: (payload: { brick: IBrick; style: any }) => void;

  private current!: IBrick;

  private offset!: { left: number; top: number; width: number; height: number };

  getOffset() {
    if (!this.current.style) {
      this.current.style = {};
    }
    const {
      left, top, width, height,
    } = this.current.style;

    return {
      top: top ? parseFloat(top) : 0,
      left: left ? parseFloat(left) : 0,
      width: width ? parseFloat(width) : 0,
      height: height ? parseFloat(height) : 0,
    };
  }

  onStart(brick: IBrick) {
    this.current = brick;
    this.offset = this.getOffset();

    this.$emit('select', brick);
  }

  onDrag(e: IDragEvent) {
    const deltaX = e.currentX - e.startX;
    const deltaY = e.currentY - e.startY;
    this.UPDATE_STYLE({
      brick: this.current,
      style: {
        left: `${this.offset.left + deltaX}px`,
        top: `${this.offset.top + deltaY}px`,
      },
    });
  }

  onResize(e: IResizeEvent) {
    const deltaX = e.currentX - e.startX;
    const deltaY = e.currentY - e.startY;
    if (e.direction === 'left') {
      this.UPDATE_STYLE({
        brick: this.current,
        style: {
          left: `${this.offset.left + deltaX}px`,
          width: `${this.offset.width - deltaX}px`,
        },
      });
    } else if (e.direction === 'right') {
      this.UPDATE_STYLE({
        brick: this.current,
        style: {
          width: `${this.offset.width + deltaX}px`,
        },
      });
    } else if (e.direction === 'top') {
      this.UPDATE_STYLE({
        brick: this.current,
        style: {
          top: `${this.offset.top + deltaY}px`,
          height: `${this.offset.height - deltaY}px`,
        },
      });
    } else if (e.direction === 'bottom') {
      this.UPDATE_STYLE({
        brick: this.current,
        style: {
          height: `${this.offset.height + deltaY}px`,
        },
      });
    } else if (e.direction === 'tr') {
      this.UPDATE_STYLE({
        brick: this.current,
        style: {
          top: `${this.offset.top + deltaY}px`,
          width: `${this.offset.width + deltaX}px`,
          height: `${this.offset.height - deltaY}px`,
        },
      });
    } else if (e.direction === 'bl') {
      this.UPDATE_STYLE({
        brick: this.current,
        style: {
          left: `${this.offset.left + deltaX}px`,
          width: `${this.offset.width - deltaX}px`,
          height: `${this.offset.height + deltaY}px`,
        },
      });
    } else if (e.direction === 'lt') {
      this.UPDATE_STYLE({
        brick: this.current,
        style: {
          top: `${this.offset.top + deltaY}px`,
          left: `${this.offset.left + deltaX}px`,
          width: `${this.offset.width - deltaX}px`,
          height: `${this.offset.height - deltaY}px`,
        },
      });
    } else if (e.direction === 'rb') {
      this.UPDATE_STYLE({
        brick: this.current,
        style: {
          width: `${this.offset.width + deltaX}px`,
          height: `${this.offset.height + deltaY}px`,
        },
      });
    }
  }

  render() {
    return (
      <div class="interactive-section">
        {this.bricks.map((brick) => (
          <box
            style={brick.style}
            onDrag={this.onDrag}
            onDragStart={this.onStart.bind(this, brick)}
            onResize={this.onResize}
            onResizeStart={this.onStart.bind(this, brick)}
          ></box>
        ))}
      </div>
    );
  }
}
