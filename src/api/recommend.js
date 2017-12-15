/*
 * @Author: Cphayim
 * @Date: 2017-12-12 18:11:12
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-12-12 19:32:33
 */

import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

/**
 * @function getRecommend
 * @desc 获取推荐数据
 * @return {Promise}
 */
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}