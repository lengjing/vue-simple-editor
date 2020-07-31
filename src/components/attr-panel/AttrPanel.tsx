import { Component, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { namespace } from 'vuex-class';
import { IBrick } from '@/common/brick';
import { ATTR_KEY, IAttrType } from '@/common/attribute';
import Panel from '../panel';
import AText from '../brick-attrs/Text';
import ABase from '../brick-attrs/Base';
import AFont from '../brick-attrs/Font';

type IAttrPropType = {
  type: IAttrType[];
  prop: string;
}

const Page = namespace('page');

@Component({
  components: {
    Panel,
    AText,
    ABase,
    AFont,
  },
})
export default class Attribute extends Vue {
  @Page.State
  currentBrick!: IBrick;

  @Page.State
  currentBrickVM!: Vue;

  private tabs = [
    { tab: '属性' },
    { tab: '样式' },
  ]

  get attrs(): IAttrPropType[] {
    const result: IAttrPropType[] = [];
    const props: any = this.currentBrickVM?.$options.props || {};
    Object.keys(props)
      .forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(props[key], ATTR_KEY)) {
          let { type } = props[key][ATTR_KEY];
          if (typeof type === 'string') {
            type = [type];
          }
          result.push({
            type,
            prop: key,
          });
        }
      });
    return result;
  }

  get styles() {
    return this.currentBrick ? ['base', 'font'] : [];
  }

  renderAttrs(h: CreateElement) {
    const ret = [];
    for (let i = 0; i < this.attrs.length; i++) {
      const attr = this.attrs[i];
      for (let j = 0; j < attr.type.length; j++) {
        ret.push(
          h(`a-${attr.type[j]}`, { props: { propName: attr.prop } }),
        );
      }
    }
    return ret;
  }

  renderStyles(h: CreateElement) {
    return this.styles.map((s) => h(`a-${s}`));
  }

  render(h: CreateElement) {
    return (
      <div class="attr-panel">
        <panel
          tabs={this.tabs}
          visible={!!this.currentBrick}
        >
          <div>{this.renderAttrs(h)}</div>
          <div>{this.renderStyles(h)}</div>
        </panel>
      </div>
    );
  }
}
