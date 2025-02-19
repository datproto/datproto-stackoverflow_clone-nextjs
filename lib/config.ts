export const config = {
  github: {
    clientId: process.env.NODE_ENV == 'production' ? process.env.AUTH_GITHUB_ID_PROD : process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.NODE_ENV == 'production' ? process.env.AUTH_GITHUB_SECRET_PROD : process.env.AUTH_GITHUB_SECRET
  }
}