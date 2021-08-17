import { Defaults, AtransStatic } from '../utils/types'
import Atrans from './Atrans'
import { extend, deepMerge } from './utils'
import initDefaults from './defaults'

function createInstance(defaults: Defaults): AtransStatic {
  const context = new Atrans(defaults)
  const instance = Atrans.prototype.generate.bind(context)
  extend(instance, context)
  return instance
}

const atrans = createInstance(initDefaults)

atrans.create = function(defaults) {
  return createInstance(deepMerge(initDefaults, defaults))
}

export default atrans