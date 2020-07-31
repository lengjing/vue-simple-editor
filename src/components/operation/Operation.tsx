import { Component, Prop, Vue } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';
import { IBrick } from '@/common/brick';

import { namespace } from 'vuex-class';
import InteractiveSection from '../interactive-section';
import RenderSection from '../render-section';
import './Operation.less';

const Page = namespace('page');

@Component({})
class AbsoluteFrame extends Vue {
  render() {
    return (
      <div class="absolute-frame">{this.$slots.default}</div>
    );
  }
}

@Component({
  components: {
    RenderSection,
    InteractiveSection,
  },
})
export default class Operation extends Vue {
  @Prop({ default: () => [] })
  readonly bricks!: IBrick[];

  @Page.Mutation
  SET_CURRENT_BRICK!: (brick: IBrick) => void;

  @Page.Mutation
  SET_CURRENT_BRICK_VM!: (vm: Vue | Element | Vue[] | Element[]) => void;

  get sections() {
    return this.bricks.filter((brick) => isSection(brick));
  }

  onSelect(brick: IBrick) {
    const vm = this.$refs[brick.uid];

    this.SET_CURRENT_BRICK(brick);
    this.SET_CURRENT_BRICK_VM(vm);
  }

  renderBrick(brick: IBrick, h: CreateElement) {
    const {
      uid, tag, children, parent, ...data
    } = brick;
    return h('absolute-frame', { style: data.style }, [h(tag, { ...data, ref: String(uid) })]);
  }

  renderRenderLayer() {
    return (
      <div class="render-layer">
        {
          this.sections.map((section) => (
              <render-section section={section} bricks={this.bricks}></render-section>
          ))
        }
      </div>
    );
  }

  renderInteractiveLayer() {
    return (
      <div class="interactive-layer">
        {
          this.sections.map((section) => (
              <interactive-section section={section} bricks={this.bricks} onSelect={this.onSelect}></interactive-section>
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <div class="operation" onMousedown={(e: MouseEvent) => e.stopPropagation()}>
        {this.renderRenderLayer()}
        {this.renderInteractiveLayer()}
      </div>
    );
  }
}

function isSection(brick: IBrick) {
  return brick.tag === 'div' && brick.parent === undefined;
}
