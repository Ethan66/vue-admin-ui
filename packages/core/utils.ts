
export function deepMerge(...objs: object[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      if (isPlainObject(value)) {
        if (isPlainObject(result[key])) {
          result[key] = deepMerge(result[key], value)
        } else {
          result[key] = deepMerge(value)
        }
      } else {
        result[key] = value
      }
    })
  })
  return result
}

export function isPlainObject(value: any): value is object {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for(const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}