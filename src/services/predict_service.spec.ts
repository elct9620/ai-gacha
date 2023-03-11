import { afterEach, describe, expect, it, vi } from 'vitest'
import Replicate from 'replicate-js'
import { PredictService } from './predict_service'
import { Card, PredictState } from '../entities'

describe('Predict Service', () => {
  afterEach(() => { vi.restoreAllMocks() })

  const card = new Card()
  const replicate = new Replicate({ token: 'TEST' })
  replicate.pollingInterval = 1

  it('is expected to return generated image', async () => {
    const responses = [
      {
        status: 'processing'
      },
      {
        status: 'succeeded',
        output: [
          'https://replicate.delivery/pbxt/LNCGDvqk8zZlONoTaW694Wx5CqA5z3mLexlA38gV0JHDr0RIA/out-0.png',
          'https://replicate.delivery/pbxt/4HnR6cU4csaJKBwlis3VOWpErv4EbVeUUiAUxqx2uI4Fr0RIA/out-0.png',
          'https://replicate.delivery/pbxt/5cvqlrCdze3YPKB8uJVwb4fTX1DhHE43hsQnft5MUBNrsSHhA/out-0.png'
        ]
      }
    ]

    let counter = 0
    vi.spyOn(replicate, 'startPrediction').mockImplementation(async () => Promise.resolve({ id: 'DUMMY', status: 'starting' }))
    vi.spyOn(replicate, 'getPrediction').mockImplementation(async () => {
      return Promise.resolve(responses[counter++])
    })

    const service = new PredictService(replicate, 'ba8b1f407cd6418fa589ca73e5c623c081600ecff19f7fc3249fa536d762bb29')
    const state = service.predict(card)
    expect(await state.next()).toMatchObject({
      done: false,
      value: new PredictState(false)
    })

    expect(await state.next()).toMatchObject({
      done: false,
      value: new PredictState(true, 'https://replicate.delivery/pbxt/5cvqlrCdze3YPKB8uJVwb4fTX1DhHE43hsQnft5MUBNrsSHhA/out-0.png')
    })

    expect(await state.next()).toMatchObject({
      done: true,
      value: undefined
    })
  })

  describe('when predict failed', () => {
    it('is expected to return empty output', async() => {
      const responses = [
        {
          status: 'processing'
        },
        {
          status: 'failed',
          output: undefined
        }
      ]

      let counter = 0
      vi.spyOn(replicate, 'startPrediction').mockImplementation(async () => Promise.resolve({ id: 'DUMMY', status: 'starting' }))
      vi.spyOn(replicate, 'getPrediction').mockImplementation(async () => {
        return Promise.resolve(responses[counter++])
      })

      const service = new PredictService(replicate, 'ba8b1f407cd6418fa589ca73e5c623c081600ecff19f7fc3249fa536d762bb29')
      const state = service.predict(card)

      expect(await state.next()).toMatchObject({
        done: false,
        value: new PredictState(false)
      })

      expect(await state.next()).toMatchObject({
        done: false,
        value: new PredictState(true)
      })

      expect(await state.next()).toMatchObject({
        done: true,
        value: undefined
      })
    })
  })
})
