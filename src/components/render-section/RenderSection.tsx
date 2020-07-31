import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { IBrick } from '@/common/brick';
import { CreateElement, VNode } from 'vue';
import { keyBy } from 'lodash';

const Page = namespace('page');

@Component({
  components: {
  },
})
export default class RenderSection extends Vue {
  @Prop()
  section!: IBrick;

  @Prop()
  bricks!: IBrick[];

  get brickMap() {
    return keyBy(this.bricks, 'uid');
  }

  getBricksByIds(ids: number[]): IBrick[] {
    return ids.map((id) => this.brickMap[id]);
  }

  renderBricks(bricks: IBrick[], h: CreateElement): VNode[] {
    const result = [];

    for (let i = 0; i < bricks.length; i++) {
      const brick = bricks[i];
      const {
        uid, tag, children, parent, ...data
      } = brick;

      if (parent === undefined) {
        if (children && Array.isArray(children)) {
          result.push(
            h(tag, { ...data, ref: String(uid) }, this.renderBricks(this.getBricksByIds(children), h)),
          );
        } else {
          result.push(
            h(tag, { ...data, ref: String(uid) }),
          );
        }
      }
    }
    return result;
  }

  render(h: CreateElement) {
    const children = this.section.children || [];
    return (
      <div class="render-section" {...this.section.style}>
        {
          this.renderBricks(this.getBricksByIds(children), h)
        }
      </div>
    );
  }
}
