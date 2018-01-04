/*
 * @Author: Cphayim 
 * @Date: 2018-01-04 22:50:41 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2018-01-04 22:57:59
 */

import jsonp from 'cy-jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744
  })
  return jsonp(url, data, options)
}