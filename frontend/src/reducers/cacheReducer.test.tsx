import cacheReducer, { setCache, clearCache } from './cacheReducer'

describe('Test cache reducer', () => {
  test('Default state', () => {
    const state = cacheReducer(null, clearCache())
    expect(state).toBe(null)
  })

  test('Setting item', () => {
    const state = cacheReducer(null, setCache('string'))
    expect(state).toBe('string')
  })

  test('Clearing state', () => {
    const state = cacheReducer('string', clearCache())
    expect(state).toBe(null)
  })
})
