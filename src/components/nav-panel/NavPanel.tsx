import { Component, Vue } from 'vue-property-decorator';
import Panel from '../panel';
import './NavPanel.less';

@Component({
  components: { Panel },
})
export default class NavPanel extends Vue {
  private tabs = [
    { tab: '页面模板' },
    { tab: '模块' },
    { tab: '组件' },
  ];

  render() {
    return (
      <div class="nav-panel">
        <panel
          tabs={this.tabs}
        >
          <div>页面模版</div>
          <div>模块</div>
          <div>组件</div>
        </panel>
      </div>
    );
  }
}
