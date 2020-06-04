// api接口
import { httpPost, httpGet } from './axios.js'


export const apiOnLogin = prames => httpPost('/v1/user/login', prames)   // 登录