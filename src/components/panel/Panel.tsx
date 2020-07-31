import { Component, Prop, Vue } from 'vue-property-decorator';

interface ITab {
  tab: string;
  icon?: string;
}

@Component({})
export default class Panel extends Vue {
  @Prop({ default: [] })
  tabs!: ITab[];

  @Prop({ default: true })
  visible!: boolean;

  private currentItem = 0;

  render() {
    const children = this.$slots.default || [];
    return (
      <div class="panel">
        <v-tabs
          v-model={this.currentItem}
          dark
          background-color="blue"
        >
          {this.tabs.map((tab) => (
            <v-tab>
              {tab.icon && <v-icon>{`mdi-${tab.icon}`}</v-icon>}
              {tab.tab}
            </v-tab>
          ))}
        </v-tabs>
        <v-tabs-items v-show={this.visible} value={this.currentItem}>
          {children.map((child, i) => (
            <v-tab-item value={i}>{child}</v-tab-item>
          ))}
        </v-tabs-items>
      </div>
    );
  }
}
