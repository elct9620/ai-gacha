import { afterEach, describe, expect, it, vi } from 'vitest'
import Replicate from 'replicate-js'
import Model from './replicate'

describe('Replicate Adapter', () => {
  afterEach(() => { vi.restoreAllMocks() })

  const replicate = new Replicate({ token: 'TEST' })
  replicate.pollingInterval = 1
  vi.spyOn(replicate, 'startPrediction').mockImplementation(async () => Promise.resolve({ id: 'DUMMY', status: 'starting' }))

  it('is expected to return generated image', async () => {
    const responses = [
      {
        status: 'processing'
      },
      {
        status: 'completed',
        output: [
          'https://replicate.delivery/pbxt/LNCGDvqk8zZlONoTaW694Wx5CqA5z3mLexlA38gV0JHDr0RIA/out-0.png',
          'https://replicate.delivery/pbxt/4HnR6cU4csaJKBwlis3VOWpErv4EbVeUUiAUxqx2uI4Fr0RIA/out-0.png',
          'https://replicate.delivery/pbxt/5cvqlrCdze3YPKB8uJVwb4fTX1DhHE43hsQnft5MUBNrsSHhA/out-0.png'
        ]
      }
    ]

    let counter = 0
    vi.spyOn(replicate, 'getPrediction').mockImplementation(async () => {
      return Promise.resolve(responses[counter++])
    })

    const model = new Model(replicate, 'ba8b1f407cd6418fa589ca73e5c623c081600ecff19f7fc3249fa536d762bb29')
    expect(await model.generate().next()).toMatchObject({
      done: false,
      value: null
    })

    expect(await model.generate().next()).toMatchObject({
      done: true,
      value: 'https://replicate.delivery/pbxt/5cvqlrCdze3YPKB8uJVwb4fTX1DhHE43hsQnft5MUBNrsSHhA/out-0.png'
    })
  })
})
