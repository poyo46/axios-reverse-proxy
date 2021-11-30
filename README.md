# Axios Reverse Proxy

A simple reverse proxy server.
It uses the [Axios Request Config](https://axios-http.com/docs/req_config) as a request.
It features the ability to edit the response header for each request.

## Examples

```javascript
const data = {
  request: {
    url: 'http://httpbin.org/get',
    method: 'get',
    params: {
      message: 'Hello, World!',
      year: 2021,
    },
  },
  response: {
    updateHeaders: {
      'access-control-allow-origin': '*',
    },
    removeHeaders: ['transfer-encoding'],
  },
}

fetch('http://servername:3000/request', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => console.log(JSON.stringify(data)))
```
