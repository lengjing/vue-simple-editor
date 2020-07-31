import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { IBrick } from '@/common/brick';
import { Orientation } from '@/components/sash';
import NavPanel from '../components/nav-panel';
import Workbench from '../components/workbench';
import SplitView from '../components/split-view';
import AttrPanel from '../components/attr-panel';

const Page = namespace('page');

@Component({
  components: {
    NavPanel,
    Workbench,
    SplitView,
    AttrPanel,
  },
})
export default class Site extends Vue {
  @Page.State
  readonly bricks!: IBrick[];

  @Page.State
  readonly currentBrick!: IBrick;

  @Page.State
  readonly currentBrickVM!: any;

  render() {
    return (
      <v-app>
        <v-app-bar
          app
          color="primary"
          dark
        >
          <div class="d-flex align-center">
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
            />

            <v-img
              alt="Vuetify Name"
              class="shrink mt-1 hidden-sm-and-down"
              contain
              min-width="100"
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
              width="100"
            />
          </div>

          <v-spacer></v-spacer>

          <v-btn
            href="https://github.com/vuetifyjs/vuetify/releases/latest"
            target="_blank"
            text
          >
            <span class="mr-2">Latest Release</span>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <v-btn
            text
          >
            撤销
            <v-icon>mdi-reply</v-icon>
          </v-btn>
          <v-btn
            text
          >
            恢复
            <v-icon>mdi-share</v-icon>
          </v-btn>
        </v-app-bar>
        <v-content>
          <div class="site-editer" style={{ height: '100%', display: 'flex' }}>
            <split-view
              style={{ width: '100%', height: '100%' }}
              orientation={Orientation.VERTICAL}
              views={[
                { initialSize: window.innerWidth * 0.25 },
                { initialSize: window.innerWidth * 0.5 },
                { initialSize: window.innerWidth * 0.25 },
              ]}
            >
              <nav-panel></nav-panel>
              <workbench bricks={this.bricks}></workbench>
              <attr-panel></attr-panel>
            </split-view>
          </div>
        </v-content>
      </v-app>
    );
  }
}
