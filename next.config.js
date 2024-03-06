module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/auth/authorize',
        destination: 'http://localhost:8080/authorize',
        basePath: false
      },
      {
        source: "/api/auth/token",
        destination: "http://localhost:8080/token",
        basePath: false
      }
    ]
  },
}