

interface ChainConfig {
  tokens: any
}

interface Config {
  boba: ChainConfig
}
const config: Config = {
  boba: {
    tokens: require('./../asset/boba/boba_tokens.ts').default
  }
}

export default config