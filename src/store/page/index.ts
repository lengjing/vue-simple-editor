import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { IBrick, BrickService } from '../../common/brick';
import * as types from './mutationTypes';

const _initData: IBrick[] = [
  {
    tag: 'div',
    uid: 0,
    children: [1, 2],
  },
  {
    tag: 'b-image', uid: 2, style: { width: '30px', height: '20px', backgroundColor: 'red' },
  },
  { tag: 'b-text', uid: 1, style: { width: '30px', height: '20px' } },
];
const brickService = new BrickService(_initData);

export interface IPageState {
  bricks: IBrick[];
  currentBrick: IBrick | null;
  currentBrickVM: Vue | null;
}

const state: IPageState = {
  bricks: _initData,
  currentBrick: null,
  currentBrickVM: null,
};

const actions: ActionTree<IPageState, any> = {
  updateClass({ commit }, payload) {

  },
  updateProps() {

  },
  updateStyle({ commit }, payload) {
    commit('UPDATE_STYLE', payload);
  },
  addBrick({ commit }, payload) {
    const bricks = brickService.create(payload);
    commit('ADD_BRICK', { bricks });
  },
};

const mutations: MutationTree<IPageState> = {
  [types.ADD_BRICK](state, { bricks }) {
    state.bricks = state.bricks.concat(bricks);
  },
  [types.DEL_BRICK](state, { brick }) {
    const { parent, children, uid } = brick;
    if (parent) {

    }
  },
  [types.MOV_BRICK](state, { from, to }) {

  },
  [types.UPDATE_STYLE](state, { brick, style }) {
    const currentBrick = brick || state.currentBrick;
    currentBrick.style = {
      ...currentBrick!.style,
      ...style,
    };
  },
  [types.UPDATE_PROPS](state, props) {
    state.currentBrick!.props = {
      ...state.currentBrick!.props,
      ...props,
    };
  },
  [types.SET_CURRENT_BRICK](state, brick: IBrick | number | null) {
    if (typeof brick === 'number') {
      state.currentBrick = getBrickById(state.bricks, brick);
    } else {
      state.currentBrick = brick;
    }
  },
  [types.SET_CURRENT_BRICK_VM](state, vm: Vue | null) {
    state.currentBrickVM = vm;
  },
};

const getters: GetterTree<IPageState, any> = {
  currentBrickProps(state) {
    return state.currentBrick?.props;
  },
  currentBrickStyle(state) {
    return state.currentBrick?.style;
  },
};

function getBrickById(bricks: IBrick[], id: number) {
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].uid === id) {
      return bricks[i];
    }
  }
  return null;
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
