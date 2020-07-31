interface IBrickCommon {
  tag: string;
  class?: any;
  style?: { [key: string]: any };
  props?: { [key: string]: any };
}

export interface IBrickTree extends IBrickCommon {
  children?: IBrickTree[];
}

export interface IBrick extends IBrickCommon {
  children?: number[];
  parent?: number;
  readonly uid: number;
}

const _uid = {
  uid: 0,
};
export default class Brick implements IBrick {
  tag: string;

  class?: IBrick['class'];

  style?: IBrick['style'];

  props?: IBrick['props'];

  parent?: IBrick['parent'];

  children?: IBrick['children'];

  readonly uid: number;

  constructor(tag: string, data?: Pick<IBrick, 'style' | 'props' | 'class' | 'parent'>, children?: number[]) {
    this.tag = tag;
    if (data) {
      this.class = data.class;
      this.style = data.style;
      this.props = data.props;
      this.parent = data.parent;
    }
    this.children = children;
    this.uid = _uid.uid++;
  }
}

export class BrickService {
  private bricks: IBrick[];

  constructor(bricks: IBrick[]) {
    this.bricks = bricks;
    const brick = bricks.reduce((a, b) => (b.uid > a.uid ? b : a));
    if (brick) {
      this.setUID(brick.uid + 1);
    }
  }

  setUID(uid: number) {
    _uid.uid = uid;
  }

  create(brick: IBrickTree): IBrick[] {
    const bricks: IBrick[] = [];

    const rootBrick = createRootBrick(brick);
    bricks.push(rootBrick);

    if (brick.children) {
      createBrickList(brick.children, rootBrick);
    }

    return bricks;

    function createRootBrick(node: IBrickTree) {
      const { tag, children, ...data } = node;
      return new Brick(tag, data, children ? [] : undefined);
    }

    function createBrick(node: IBrickTree, parent: IBrick) {
      const { tag, children, ...data } = node;
      const brick = new Brick(tag, data, children ? [] : undefined);
      brick.parent = parent.uid;
      parent.children!.push(brick.uid);
      return brick;
    }

    function createBrickList(nodeList: IBrickTree[], parent: IBrick) {
      let node: IBrickTree;
      for (let i = 0; i < nodeList.length; i++) {
        node = nodeList[i];
        const brick = createBrick(node, parent);
        bricks.push(brick);
        if (node.children) {
          createBrickList(node.children, brick);
        }
      }
    }
  }
}
