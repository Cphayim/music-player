/*
 * @Author: Cphayim
 * @Date: 2017-12-12 18:11:12
 * @Last Modified by: Cphayim
 * @Last Modified time: 2018-01-02 13:16:34
 */

import jsonp from 'cy-jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

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

/**
 * @function getDiscList
 * @desc 获取歌单列表
 * @return {Promise}
 */
export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}