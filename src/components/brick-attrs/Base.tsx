import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { IBrick } from '@/common/brick';

const Page = namespace('page');

@Component
export default class ABase extends Vue {
  @Page.Getter
  currentBrickStyle!: IBrick['style'];

  @Page.Mutation
  UPDATE_STYLE!: (payload: { style: any }) => void;

  private stylesWithUnit = [
    'width', 'height', 'left', 'top',
  ];

  private colorMenu = false;

  styleReg = /^(\d*\.?\d*)([^\1]*)$/;

  get style() {
    const result: any = {};
    if (this.currentBrickStyle) {
      Object.keys(this.currentBrickStyle)
        .forEach((key) => {
          if (this.stylesWithUnit.includes(key)) {
            const value = this.currentBrickStyle![key];
            const matches = this.styleReg.exec(value);
            if (matches) {
              result[key] = [matches[1], matches[2]];
            }
          } else {
            result[key] = this.currentBrickStyle![key];
          }
        });
    }
    return result;
  }

  onInput(style: string, value: number) {
    this.UPDATE_STYLE({ style: { [style]: value + this.style[style][1] } });
  }

  onColorChange(val: any) {
    this.UPDATE_STYLE({ style: { color: typeof val === 'string' ? val : val.hex } });
  }

  render() {
    return (
      <div class="attr-base">
        <div class="title">尺寸位置</div>
        <v-col>
          <v-row cols="12" sm="6">
            <v-text-field
              label="宽度"
              type="number"
              suffix={this.style.width[1]}
              value={this.style.width[0]} onInput={this.onInput.bind(this, 'width')}>
            </v-text-field>
          </v-row>
          <v-row cols="12" sm="6">
            <v-text-field
              label="高度"
              type="number"
              suffix={this.style.height[1]}
              value={this.style.height[0]} onInput={this.onInput.bind(this, 'height')}>
            </v-text-field>
          </v-row>
        </v-col>
        <div>{this.style.left}</div>
        <div>{this.style.top}</div>
        <v-menu
          v-model={this.colorMenu}
          close-on-content-click={false}
          min-width={200}
          offset-y={true}
          {...{
            scopedSlots: {
              activator: ({ on }: any) => (
                  <v-text-field
                    label="颜色"
                    // prepend-icon="access_time"
                    readonly
                    onClick={on.click}
                    onKeydown={on.keydown}
                    value={this.style.color}
                  ></v-text-field>
              ),
            },
          }}
        >
          <v-color-picker onInput={this.onColorChange} value={this.style.color}></v-color-picker>
        </v-menu>
      </div>
    );
  }
}
