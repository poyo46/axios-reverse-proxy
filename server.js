const fastify = require('fastify')({
  logger: false,
})
const axios = require('axios')

fastify.options('/request', (request, reply) => {
  reply.header('allow', 'POST, OPTIONS')
  reply.header('access-control-allow-origin', '*')
  reply.header('access-control-allow-headers', 'content-type')
  reply.code(204).send()
})

fastify.post('/request', async (request, reply) => {
  let body = request.body
  if (typeof body === 'string' || body instanceof String) {
    body = JSON.parse(body)
  }
  const axiosResponse = await axios(body.request)
  reply.code(axiosResponse.status)
  reply.headers(axiosResponse.headers)
  if (body.response) {
    if (body.response.updateHeaders) {
      for (const [key, value] of Object.entries(body.response.updateHeaders)) {
        reply.header(key, value)
      }
    }
    if (body.response.removeHeaders) {
      for (let key of body.response.removeHeaders) {
        reply.removeHeader(key)
      }
    }
  }
  reply.send(axiosResponse.data)
})

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
  }
  console.log(`Your app is listening on ${address}`)
  fastify.log.info(`server listening on ${address}`)
})
