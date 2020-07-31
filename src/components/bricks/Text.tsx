import { Component, Prop, Vue } from 'vue-property-decorator';
import Attr from '../../common/attribute';

@Component
export default class BText extends Vue {
  @Attr({ type: 'text' })
  @Prop()
  text!: string;

  @Prop({ default: '请添加文本内容' }) readonly placeholder!: string;

  render() {
    return (
      <p class={this.$props.class} style={this.$props.style}>{this.text || this.placeholder}</p>
    );
  }
}
