import axios, { AxiosInstance } from 'axios'
import https from 'https'
import crypto from 'crypto'
import config from '../../utils/config'
// import * as fs from "fs";

// Create https agent with self signed cyphernode certificate.

//TODO: switch to path from config
const cyphernodeKey = config.cyphernode.credentials.key
const cyphernodeKeyId = config.cyphernode.credentials.keyId

// const buffer = fs.readFileSync('../../cyphernode/cacert.pem');
const buffer = Buffer.from(config.cyphernode.credentials.cert)
console.log('ze buffer', buffer.toString() === config.cyphernode.credentials.cert)
// Todo, move to utils file
const httpsAgent = new https.Agent({
  rejectUnauthorized: true, // (NOTE: this will disable client verification)
  ca: buffer,
  // ca: Buffer.from(config.cyphernode.credentials.cert),
})

/**
 * Create fresh (NON-STANDARD) JWT Bearer token
 * Cyphernode has a weird implementation of JWT at the moment.
 * TODO: Implement standard JWT signing when cyphernode updates this.
 */
function getBearerToken(key: string, keyId: string): string {
  const current = Math.round(new Date().getTime() / 1000) + 86000
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
      headers: { Authorization: `Bearer ${getBearerToken(cyphernodeKey, cyphernodeKeyId)}` },
    })
  }

  return client
}
