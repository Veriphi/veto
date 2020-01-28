import axios, { AxiosInstance } from 'axios'
import https from 'https'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import config from '../../utils/config'

// Create https agent with self signed cyphernode certificate.

//TODO: switch to path from config
const pathToCert = path.normalize(config.cyphernode.pathToCert)
const cyphernodeKey = config.cyphernode.key
const cyphernodeKeyId = config.cyphernode.keyId

// Todo, move to utils file
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
  ca: fs.readFileSync(pathToCert),
})

/**
 * Create fresh (NON-STANDARD) JWT Bearer token
 * Cyphernode has a weird implementation of JWT at the moment.
 * TODO: Implement standard JWT signing when cyphernode updates this.
 */
function getBearerToken(cyKey: string): string {
  const current = Math.round(new Date().getTime() / 1000) + 60
  const h64 = Buffer.from('{"alg":"HS256","typ":"JWT"}').toString('base64')
  const payload = '{"id":"' + cyphernodeKeyId + '","exp":' + current + '}'
  const p64 = Buffer.from(payload).toString('base64')

  const hmac = crypto.createHmac('sha256', cyKey)
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
      headers: { Authorization: `Bearer ${getBearerToken(cyphernodeKey)}` },
    })
  }

  return client
}
