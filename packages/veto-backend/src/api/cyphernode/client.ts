import axios, { AxiosInstance } from 'axios'
import https from 'https'
import crypto from 'crypto'
import config from '../../utils/config'
// Create https agent with self signed cyphernode certificate.

//TODO: switch to path from config
const cyphernodeKey = config.cyphernode.credentials.key
const cyphernodeKeyId = config.cyphernode.credentials.keyId

const buffer = Buffer.from(config.cyphernode.credentials.cert)
const httpsAgent = new https.Agent({
  rejectUnauthorized: true, // (NOTE: this will disable client verification)
  ca: buffer,
})

/**
 * Create fresh (NON-STANDARD) JWT Bearer token
 * Cyphernode has a weird implementation of JWT at the moment.
 * TODO: Implement standard JWT signing when cyphernode updates this.
 */
function getBearerToken(key: string, keyId: string): string {
  const current = Math.round(new Date().getTime() / 1000) + 86000 // Token expiry set to ~24 hours. TODO: Regenerate new tokens frequently.
  const h64 = Buffer.from('{"alg":"HS256","typ":"JWT"}').toString('base64')
  const payload = '{"id":"' + keyId + '","exp":' + current + '}'
  const p64 = Buffer.from(payload).toString('base64')

  const hmac = crypto.createHmac('sha256', key)
  hmac.update(h64 + '.' + p64)
  const s = hmac.digest('hex')

  const token = h64 + '.' + p64 + '.' + s
  return token
}

// Creates axios https instance with Cyphernode certificate and fresh Bearer token.
let client: AxiosInstance
export default function makeClient(): AxiosInstance {
  if (!client) {
    client = axios.create({
      httpsAgent,
      baseURL: 'https://localhost:2009/v0/',
      timeout: 1000,
    })

    client.interceptors.request.use(
      (config) => {
        // Generate a new token for every request
        config.headers.Authorization = `Bearer ${getBearerToken(cyphernodeKey, cyphernodeKeyId)}`
        return config
      },
      (error) => {
        Promise.reject(error)
      },
    )
  }

  return client
}
