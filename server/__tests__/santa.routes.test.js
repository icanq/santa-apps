const { santaRouter } = require('../routes/santa.routes')

describe("SantaRouter", () => {
  test("POST /api/santa/request | should call submitRequest controller", () => {
    const mockSubmitRequest = jest.fn()
    santaRouter.post = jest.fn((path, cb) => {
      expect(path).toBe('/request')
      cb({})
      expect(mockSubmitRequest).toHaveBeenCalled()
    })
    
    santaRouter.post('/request', mockSubmitRequest);
  })
  
  test("POST /api/santa/pending | should call getPendingRequests controller", () => {
    const mockGetPendingRequests = jest.fn()
    santaRouter.post = jest.fn((path, cb) => {
      expect(path).toBe('/pending')
      cb({})
      expect(mockGetPendingRequests).toHaveBeenCalled()
    })
    
    santaRouter.post('/pending', mockGetPendingRequests);
  })
  
})