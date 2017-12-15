import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  if (typeof url !== 'string') {
    throw TypeError('jsonp 接收的 url 参数必须是 string 类型')
  }
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 将对象转为 url 参数
 * @param   {object} data
 * @return  {string}
 */
function param(data) {
  let url = ''
  if (typeof data !== 'object') {
    throw TypeError('jsonp 接收的 data 参数应该是一个对象!')
  }
  let keys = Object.keys(data)
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    // 如果值是 undefined，使用 ''
    let value = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url ? url.slice(1) : ''
}