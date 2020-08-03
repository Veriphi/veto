import { default as baseConfig, Config as BaseConfig } from '@veto/config'

const DEFAULT_DEV_CERT = `-----BEGIN CERTIFICATE-----
MIIE5jCCAs6gAwIBAgIUFK6Hx127kArexm6jKtlie1I/fbYwDQYJKoZIhvcNAQEL
BQAwFDESMBAGA1UEAwwJbG9jYWxob3N0MB4XDTIwMDQyNjEwMTg1MFoXDTMwMDQy
NDEwMTg1MFowFDESMBAGA1UEAwwJbG9jYWxob3N0MIICIjANBgkqhkiG9w0BAQEF
AAOCAg8AMIICCgKCAgEAv2kTAhEUWwphyjpQebagILgJ1Ol3hiEmX1l09r6ByrwY
SNv2TdKlPc9qChag1k5ODnZeaO9DiC7UMAoT7NAIp+IVDmtKS6sF2ik0oYsKCKR8
IS0NqowtCo6wWqoQ6bwWL6vXlEaTHo3RRFNk++zxDNmvXRPSUo8dgEHoDb3pPd/s
/jASBqG7QVEfvMK/Imm+cI0urh815anOGn39jLuKikdn+G7VKBJ2pJBeVDPfGkHi
2qqwnOBrnBD372DW4V5DGTqNOSwYZqTMB0V63V45ASZGwuZQMS24bU4ZvW7lhuWS
soBqG46wQyBM9BEjmHwEYPdByiWPncq6hF36NFco7cqu3riJVsqY9hyokvpwVLJi
YE0cWy4QG2od7UrhVwGppH4lKvXbf0kl74dbFlanieO7hMRfI/r2/w5pQEH7WXVy
tHRRRKEnWXwEA5LHTLKkeCIrxh5p0aVfUGJDFhz8Xr2fZdzG8bw3WeBMfsdABFqN
8nfMb7FcuNt2WyOwnjDR0GH3b0me9c50Lsu5ZzV0kuUwJW6xFpUiildgvG5BxoGU
IAFXGVqcqGcfXYueUIOM05XrNp4JcqEQvHzGhzHrnAHfhlZA3JBzrgzKA8Dy2Ehl
b+ijdryTHFfttzYr9vhqkCgxUz/3D/hqbLuU0PQjrRgF6gUAvWz6RdXznlfeEoEC
AwEAAaMwMC4wLAYDVR0RBCUwI4IJbG9jYWxob3N0ggpnYXRla2VlcGVyhwR/AAAB
hwQi5aYCMA0GCSqGSIb3DQEBCwUAA4ICAQAu1uQgSzABculkPH4t5kX2r7rxB5jc
UnBwXPZqo8KqO0Wa59SNiuakVC7TC9L5YA5jlFlIk4KjphE/YifkIyyNiDiWzwcV
jBKB9Z2QtukUKmUIfDs4RdDVQP2POdHzOHDldLGst/rvPM3uNebKvLheauNG8SF7
pri4RE/XDfsaa1KpTJeet7WALO25J37YWL2JYY1CspZ9pO1EMIQKQzWrq7Db3+ew
46Shk/YMOdcVurIQwU8mz81MMdjplUeg+VBxl0OWBjDUl74Djf3avUfVIcrOV8Le
XfYzNhBXPAc6aq2yqnp6hUJkTWt38dkGTrZQhp5GwJZEmPrpMi/wFCqXjUocvnT0
n+l5oiAQVznwbwcXz0iuH8+colnRxg+aESWXBMELQ9DayTBi1nStxJ3x0fh4laQc
ja2nGdhyBVpEE740YyDut4A1rQMV2JUrlummFNHxen5gCtWCqolXDKZi8k22qzpl
DNWJVWjqo/7uEsnedBpvr15FG2XeI7BkTKIhHN8FhoArkg1ijOVB2EVkgZHbLaXy
jKVpVIyH8hxJvC3pw7c6tNl8KDb/OKLLNZ0z+p2aVTvsKiWlHgKUsC4PSh/pAmUU
GHPeWcxDjaywcJmYrdpSZ9PzaZbgxQ6hvHnjUe6WRvgXSEesigyFxnH4dBZscDlQ
u8xsI62kQX1RoA==
-----END CERTIFICATE-----
`

export type Config = BaseConfig & {
  appName: string
  pathToStaticFiles: string
  cyphernode: {
    gatewayUrl: string
    user: string
    password: string
    credentials: {
      cert: string
      key: string
      keyId: string
    }
  }
  db: {
    filePath: string
  }
}

export default {
  ...baseConfig,
  appName: 'Veto',
  pathToStaticFiles: process.env.PATH_TO_STATIC_FILES ?? './frontend',
  port: process.env.VETO_PORT ?? process.env.PORT ?? 8181,
  cyphernode: {
    // Gateway url used to communicate with cyphernode's ecosystem
    gatewayUrl: process.env.CYPHERNODE_URL ?? 'https://ec2-3-87-237-195.compute-1.amazonaws.com:2009/v0/',
    // gatewayUrl: 'https://localhost:2009/v0/', Use this one if running cyphernode locally instead of the aws hosted instance.

    // Gateway user provided during cyphernode setup process
    user: process.env.CYPHERNODE_USER ?? 'cyphernode',
    // Gateway password provided during cyphernode setup process
    password: process.env.CYPHERNODE_PSW ?? 'zWVt9TXDLSGkWinQ',
    credentials: {
      cert: process.env.CYPHERNODE_CERT ?? DEFAULT_DEV_CERT,
      // Key generated during cyphernode setup process (key 003 with highest priviledge found in `./client.7z`)
      key: process.env.CYPHERNODE_KEY ?? '80de14532ac1b1705bc5e710cc3d61ef567f17636534ac94e1ba16f35de4417e',
      // Id associated with the cyphernode key passed to veto
      keyId: process.env.CYPHERNODE_KEY_ID ?? '003',
    },
  },
  db: {
    filePath: process.env.VETO_DB_PATH ?? '.db-data',
  },
} as Config
