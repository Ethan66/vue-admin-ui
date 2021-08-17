import onCreateBasicData from './basicObj'
import { menuRelation, menuSort, setItemProp } from './methods'
import atrans from '../core/instance'
import { Types } from './types/index'

export * from './types/index'

export default {
  onCreateBasicData,
  menuRelation,
  menuSort,
  setItemProp,
  atrans
} as Types
