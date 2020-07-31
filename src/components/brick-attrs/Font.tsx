import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { IBrick } from '@/common/brick';

const Page = namespace('page');

@Component({})
export default class AFont extends Vue {
  @Prop()
  propName!: string;

  @Page.Getter
  currentBrickProps: IBrick['props'];

  @Page.Mutation
  UPDATE_PROPS!: (props: any) => void;

  get value() {
    return this.currentBrickProps && this.currentBrickProps[this.propName];
  }

  onInput(value: string) {
    this.UPDATE_PROPS({ [this.propName]: value });
  }

  render() {
    return (
      <div class="attr-font">
        <div class="title">文字样式</div>
        <div>
          <v-select
            label="字体"
          ></v-select>
        </div>
      </div>
    );
  }
}
