const {
  submitRequest,
  getPendingRequests,
} = require('../controllers/santa.controller');
const santaService = require('../services/santa.service');

jest.mock('../services/santa.service');

describe('SantaController', () => {
  let req;
  let res;

  beforeEach(() => {
    (req = {
      body: {
        name: 'test.child',
        message: 'test test test',
      },
    }),
      (res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });
  });

  describe('submitRequest', () => {
    test('should submit a valid req', async () => {
      santaService.addRequest.mockResolvedValue({
        isValid: true,
        id: 'blablabla123',
        message: 'Request received successfully',
      });

      await submitRequest(req, res);

      expect(santaService.addRequest).toHaveBeenCalledWith(
        'test.child',
        'test test test'
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 'blablabla123',
        message: 'Request received successfully',
      });
    });

    test('should handle missing name', async () => {
      req.body = { message: 'test test test' };
      await submitRequest(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: '400',
        title: 'Bad Request',
        message: 'Name or Message are required',
      });
    });

    test('should handle missing message', async () => {
      req.body = { name: 'test.child' };
      await submitRequest(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: '400',
        title: 'Bad Request',
        message: 'Name or Message are required',
      });
    });

    test('should handle an invalid request: child is not registered', async () => {
      santaService.addRequest.mockResolvedValue({
        isValid: false,
        error: 'Child is not registered',
      });

      await submitRequest(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: '400',
        title: 'Bad Request',
        message: 'Child is not registered',
      });
    });

    test('should handle an invalid request: child is more than 10y', async () => {
      santaService.addRequest.mockResolvedValue({
        isValid: false,
        error: 'Child is 10 years old or older',
      });

      await submitRequest(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: '400',
        title: 'Bad Request',
        message: 'Child is 10 years old or older',
      });
    });

    test('should handle server error', async () => {
      const msg = 'Server Error';
      santaService.addRequest.mockRejectedValue(new Error(msg));

      await submitRequest(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: '500',
        title: 'Server Error',
        message: msg,
      });
    });
  });

  describe('getPendingRequests', () => {
    test('should return pending requests', async () => {
      const mockRequests = [
        {
          id: 'req1',
          username: 'child1',
          address: 'address1',
          message: 'msg1',
        },
        {
          id: 'req2',
          username: 'child2',
          address: 'address2',
          message: 'msg2',
        },
      ];

      santaService.getPendingRequests.mockResolvedValue(mockRequests);

      await getPendingRequests(req, res);

      expect(res.json).toHaveBeenCalledWith({
        data: mockRequests.map((mock) => ({
          id: mock.id,
          attributes: {
            username: mock.username,
            address: mock.address,
            message: mock.message,
          },
        })),
      });
    });

    test('should return empty data when theres no request', async () => {
      santaService.getPendingRequests.mockResolvedValue([]);

      await getPendingRequests(req, res);

      expect(res.json).toHaveBeenCalledWith({ data: [] });
    });

    test('should return empty data when theres no request', async () => {
      santaService.getPendingRequests.mockResolvedValue(null);

      await getPendingRequests(req, res);

      expect(res.json).toHaveBeenCalledWith({ data: [] });
    });

    test('should handle server errors', async () => {
      const msg = 'Internal Server Error';
      santaService.getPendingRequests.mockRejectedValue(new Error(msg));

      await getPendingRequests(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: '500',
        title: 'Server Error',
        message: msg,
      });
    });
  });
});
