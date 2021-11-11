import axios from 'axios'
import JsSHA from 'jssha'

const instance = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/'
})

const getAuthorizationHeader = () => {
  const appID = process.env.VUE_APP_PTX_ID
  const appKey = process.env.VUE_APP_PTX_KEY

  const GMTString = new Date().toGMTString()
  const shaObj = new JsSHA('SHA-1', 'TEXT')
  shaObj.setHMACKey(appKey, 'TEXT')
  shaObj.update('x-date: ' + GMTString)
  const HMAC = shaObj.getHMAC('B64')
  const authorization = `hmac username="${appID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`

  return { Authorization: authorization, 'X-Date': GMTString /*, 'Accept-Encoding': 'gzip' */ }
}

instance.interceptors.request.use(
  (config) => {
    config.headers = getAuthorizationHeader()
    return config
  }, (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  }, (error) => {
    return Promise.reject(error)
  }
)

export default instance
