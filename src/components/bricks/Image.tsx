import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BImage extends Vue {
  @Prop() private href!: string;

  render() {
    return (
      <img href={this.href}></img>
    );
  }
}
