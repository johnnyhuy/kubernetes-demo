import { sleep, check } from 'k6'
import { Options } from 'k6/options'

import http from 'k6/http'

function randomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const options: Options = {
  vus: 50,
  duration: '10s',
}

export default () => {
  const res = http.post('https://httpbin.org/status/400')
  check(res, {
    'status is 400': () => res.status === 400,
  })
  sleep(randomIntBetween(1, 5))
}
