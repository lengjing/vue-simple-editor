import Vue from 'vue';
import * as bricks from '../components/bricks';

Object.keys(bricks).forEach((key) => {
  const Brick = (bricks as any)[key];

  Vue.component(Brick.name, Brick);
});
