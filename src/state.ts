type Schema = {
  token?: string
}

let store: Schema = {}

class State {
  get hasToken(): boolean {
    return store.token != undefined && store.token!.length > 0
  }

  get token() {
    return store.token
  }

  updateToken(token: string) {
    store.token = token
  }
}

export function resetState() {
  store = {}
}

export function getState() {
  return new State()
}
