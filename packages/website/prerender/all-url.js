const fs = require('fs')
const axios = require('axios')
const { arrayDistinct } = require('helper-js')

const PREVIEW_BASE_URL = 'http://127.0.0.1:5000'
const API_BASE_URL = 'http://127.0.0.1:8000/api'
const FALLBACK_LOCALE = 'en'

module.exports = async function () {
  let urls = []
  for (const v of ['/', '/pro-plugin', '/examples', '/v1/guide', '/v1/api']) {
    urls.push(PREVIEW_BASE_URL + v)
    urls.push(PREVIEW_BASE_URL + '/zh' + v)
  }
  return { urls, origin: PREVIEW_BASE_URL }
}
