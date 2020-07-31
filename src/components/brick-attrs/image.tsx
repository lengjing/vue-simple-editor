import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CImage extends Vue {
  @Prop({ default: '图片内容' }) readonly title!: string;

  @Prop() readonly href!: string;

  render() {
    return (
      <div class="image-attr">
        <div class="title">{this.title}</div>
        {
          this.href
            ? <img href={this.href}></img>
            : <div></div>
        }
      </div>
    );
  }
}
