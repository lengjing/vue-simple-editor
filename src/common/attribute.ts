import Vue from 'vue';
import { createDecorator } from 'vue-class-component';

export type IAttrType = 'input' | 'text' | 'radio' | 'image' |
  'audio' | 'video' | 'richText' | 'number' | 'date';

interface AttrOptions {
  /**
   * input    单行输入框
   *
   * text     多行输入框
   *
   * enum     列表单选    需提供选项字段defaultList， 支持数组、map结构
   *
   * image    图片选择
   *
   * audio    音频选择
   *
   * video    视频选择
   *
   * richtext 富文本
   *
   * number   数字
   *
   * function 方法设置
   *
   * data     json数据
   *
   * date     时间选择
   *
   * checkbox 多选框      同enum 不提供defaultList字段时，输入值为布尔类型
   *
   * radio    单选框      同enum
   */
  type?: IAttrType | IAttrType[];
}

export const ATTR_KEY = '__attr';

export default function Attr(options: AttrOptions) {
  return (target: Vue, key: string) => {
    createDecorator((componentOptions, k) => {
      const props = (componentOptions.props || ((componentOptions.props = {}) as any));
      props[k] = props[k] || {};
      props[k][ATTR_KEY] = options;
    })(target, key);
  };
}
