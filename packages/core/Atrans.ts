import { AtransConfig, Defaults, AtransConfigRes, Interceptor, InterceptorFn } from "../utils/types"
import Dispatch from "./dispatch"

export default class Atrans {
  defaults: Defaults
  config: AtransConfigRes
  interceptor: Interceptor

  constructor(initDefaults: Defaults) {
    this.defaults = initDefaults
    this.interceptor = { use: function (fn: InterceptorFn): void {
      if (typeof fn === 'function') {
        this.chains.push(fn)
      }
    }, chains: [] }
  }

  // 转换配置项成目标对象
  generate(config?: AtransConfig): AtransConfigRes {
    this.config = new Dispatch(config, this.defaults).config
    if (this.defaults.version) {
      this.interceptor.use(this.defaults.interceptors[this.defaults.version])
    }
    if (this.interceptor.chains.length) {
      this.interceptor.chains.forEach((fn => {
        this.config = fn(this.config)
      }))
    }
    return this.config
  }
}