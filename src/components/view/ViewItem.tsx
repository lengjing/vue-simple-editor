import { Component, Prop, Vue } from 'vue-property-decorator';
import { Orientation } from '../sash';

@Component({})
export class ViewItem extends Vue {
  @Prop()
  size!: number;

  @Prop()
  orientation!: Orientation;

  private get style(): any {
    if (this.orientation === Orientation.VERTICAL) {
      return {
        width: this.size + (typeof this.size === 'string' ? '' : 'px'),
        height: '100%',
      };
    }
    return {
      height: this.size + (typeof this.size === 'string' ? '' : 'px'),
      width: '100%',
    };
  }

  render() {
    return (
      <div class="view-item" style={this.style}>{this.$slots.default}</div>
    );
  }
}
