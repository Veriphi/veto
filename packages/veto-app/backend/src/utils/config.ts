import { default as baseConfig, Config as BaseConfig } from '@veto/config'

const DEFAULT_DEV_CERT = `-----BEGIN CERTIFICATE-----
MIIE7TCCAtWgAwIBAgIULqsKg3lxw+EG8gZgWMa7GaAsK7swDQYJKoZIhvcNAQEL
BQAwFDESMBAGA1UEAwwJbG9jYWxob3N0MB4XDTIwMDExOTIwMzI1NloXDTMwMDEx
NjIwMzI1NlowFDESMBAGA1UEAwwJbG9jYWxob3N0MIICIjANBgkqhkiG9w0BAQEF
AAOCAg8AMIICCgKCAgEAxKoHdEEOTfJJCQzR+XRNj2dTe3uwF5+a4exGwRBJZmoP
4Vn2q80vOo6o0iXjtP/sobDJtopa91QvOthO8Xn7g2+cGmE6VW/9jzRx1L6W7Uc/
8OPOEwU+/oa5q6d5HimAvWT4a5a7P4DF5fQPqd6GI0Sw3s5xKQ5jb5B3MWY7lNKB
7+VCRr54X+bk45weXEtrEwzK+06lJSsxr6lWZm2ioFIy3nwPwait+GSOFRSrBt4C
WgLhGlJZzyW2uKe2VBNzMDQD2dPv3Cns3j0PyWf//jekJCEQmk7wQN42fdSwoyVR
Em430rZyLTydlDMWVhUVqqezXUlSu42OilHZq+nMZYltFmW8JxYTnJoquY+F+e1f
WG0jrlpN/cYJ9thBggfdqqxf2C+dG9sT8Fy5K+uWz9VtyGPqQgjNH4hkrMv564oy
6Ni5A5HuKgUDAK+K4k3F5GXdpQrNdrgVNff1fVtpSWzeLp+iOmgZRNBeqmKJTHmS
9CPks/Q5kR+DbVqE34E9/2jqsCsr72cPMRoFjdKgfKPOridmxjbxHsxA8zQfaflV
ea2O1Ne5AYaiM76Y8Lm0vDZ5Q93CCxYxv1hMNZ/1P/UM5ecJXrRj5iXPbHigRBD8
KudM/RjDEDC61OEJ7/ry5einEJYHXF9JiAwjZCPQMfrqtHjnFqo6/bHu+a02MgsC
AwEAAaM3MDUwMwYDVR0RBCwwKoIJbG9jYWxob3N0ggpnYXRla2VlcGVyggt2ZXJp
cGhpLWRldocEfwAAATANBgkqhkiG9w0BAQsFAAOCAgEARgqVO7gKb/AAUkcGeLB8
8oU+lMCAt0BZgyID4pcOIWjcbjdyxO61RfPZitxIi+GOOs6/DGJAsCQewNRqKDWx
0BykOmbDWhUTvb6NuqmnS5+u1gfAUrzp5yB7+kTXNaqANLh2l21ESQQ/8aEmTaTG
SUt+9+i+7XLReHyWSYF9Lod2ex0oLFN3FH8w0erwB38HFcTZqVdKzwGPmmb7B6di
LfOHpc8L7Yspfwd6Q+aFadKfRbKUTC7kK+F1KmZ9c0N8vNNVRJLazXTEJ9gCdDlZ
To1WxE0WVVJdI46BNfttSXbifaIG/ykczAjZfXmaqeGIMwWj8nfrZe0e3RPlvdRi
MB0WDXQiv2FQj941SbmdhFTqtPfjIPM2XFf5qJqiCA73dXnpYwxawMBDFBELJa9k
/9iY+8srjpvKksU1ANZl8NqiOpNp9n/3Du/5mIAW5RQexUtlbkOJXpXT11/I00dB
3ZTnZAzZFCYXZBrcZqf4AjktAN6LM26nbsRErCq62FYThLhSVHh7xYvn6/sgusgE
MrzKY+mq7gzO0yLP3JndMZ1W43lgwHP+sc52uhzvTV3J7WbgPqzt+RNOGACo7yvg
6+xkdz/buhbfOJWte5htiqA4q4zjWjB/cA9Lyw5fDkb5XbUekChOObDm0qWsdw4Z
lVk64l0ca8NWEuIOFxFI1G0=
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
    gatewayUrl: process.env.CYPHERNODE_URL ?? 'https://ec2-54-145-103-133.compute-1.amazonaws.com:2009/v0/',
    // gatewayUrl: 'https://localhost:2009/v0/', Use this one if running cyphernode locally instead of the aws hosted instance.

    // Gateway user provided during cyphernode setup process
    user: process.env.CYPHERNODE_USER ?? 'veriphi-dev',
    // Gateway password provided during cyphernode setup process
    password: process.env.CYPHERNODE_PSW ?? 'veriphirocks!',
    credentials: {
      cert: process.env.CYPHERNODE_CERT ?? DEFAULT_DEV_CERT,
      // Key generated during cyphernode setup process (key 003 with highest priviledge found in `./client.7z`)
      key: process.env.CYPHERNODE_KEY ?? '4ac7ca763d62c89e76a2f37c53b9b61aedebfb07c5cc682c31936862a4d7fc1d',
      // Id associated with the cyphernode key passed to veto
      keyId: process.env.CYPHERNODE_KEY_ID ?? '003',
    },
  },
  db: {
    filePath: process.env.VETO_DB_PATH ?? '.db-data',
  },
} as Config
