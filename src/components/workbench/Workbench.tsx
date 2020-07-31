import { Component, Prop, Vue } from 'vue-property-decorator';
import { IBrick } from '@/common/brick';
import { namespace } from 'vuex-class';
import Operation from '../operation';
import './Workbench.less';

const Page = namespace('page');
@Component({
  components: {
    Operation,
  },
})
export default class Workbench extends Vue {
  @Prop({ default: () => [] })
  readonly bricks!: IBrick[];

  @Page.Mutation
  SET_CURRENT_BRICK!: (brick: IBrick | null) => void;

  @Page.Mutation
  SET_CURRENT_BRICK_VM!: (vm: Vue | null) => void;

  onMouseDown() {
    this.SET_CURRENT_BRICK(null);
    this.SET_CURRENT_BRICK_VM(null);
  }

  render() {
    return (
      <div class="workbench" onMousedown={this.onMouseDown}>
        <operation bricks={this.bricks}></operation>
      </div>
    );
  }
}
