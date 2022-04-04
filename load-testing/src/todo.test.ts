import { sleep, check } from 'k6'
import { Options } from 'k6/options'
import http from 'k6/http'

export const options: Options = {
  discardResponseBodies: true,
  scenarios: {
    listTodos: {
      executor: 'constant-vus',
      exec: 'listTodos',
      vus: 50,
      duration: '1m',
    },
    createTodos: {
      executor: 'constant-vus',
      exec: 'createTodos',
      vus: 50,
      duration: '1m',
    },
  },
}

export function listTodos() {
  const res = http.get('http://localhost:8081/todos')
  check(res, {
    'status is 200': () => res.status === 200,
  })
  sleep(1)
}

export function createTodos() {
  const res = http.post('http://localhost:8081/todos', {
    content: 'hello world',
  })
  check(res, {
    'status is 200': () => res.status === 200,
  })
  sleep(1)
}
