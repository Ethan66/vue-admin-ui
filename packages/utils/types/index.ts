interface Ext {
  id: string
  level: number | string
  first?: boolean
  last?: boolean
  onlyOne?: boolean
}

declare global {
  interface Window {
      btnList: any;
  }
}

interface IdefaultDialogBtn {
  [key: string]: {
      name: string;
      type: string;
      disabled: boolean;
      show: boolean;
      code?: string;
      color?: string;
      clickFn?: string;
  };
}

interface Methods {
  /**
   *
   * 根据id进行父子级关联
   * @param data 需要进行关联的对象数组
   * @param pId parentId
   * @param level 等级
   * @param sort 排序标识，不排序可以不传
   * @param list 默认为'list'
   *
   */
  menuRelation<T extends Ext>(data: T[], id: string, pId: string, level: string, sort: string, list): T[],

   /**
   *
   * 根据sort进行排序
   * @param data 需要进行排序的对象数组
   * @param key 对数组对象中的数组排序
   * @param sort 排序字段
   *
   */
  menuSort<T extends Ext> (data: T[], key: string, sort: string): T[]

  /**
   *
   * 设置vue-admin的setItem,dialogItem的$attr属性
   * @param item 需要修改的对象数组
   * @param index 对象数组中的索引
   * @param prop 需要修改的属性
   * @param val 修改的值
   *
   */
  setItemProp(item: { '$attr': object, [key: string]: any }[], index: number, prop: string, val: boolean | string): void
}

interface BasicObj {
  /**
   *
   * 生成配置vue-admin每个页面的类
   * @param defaultDialogBtn 初始化dialog的btn
   *
   */
  onCreateBasicData: ({ defaultDialogBtn }: { defaultDialogBtn: IdefaultDialogBtn }) => Function;
}

export interface Types extends Methods, BasicObj {}