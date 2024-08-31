const santaService = require('../services/santa.service');

const submitRequest = async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        status: '400',
        title: 'Bad Request',
        message: 'Name or Message are required',
      });
    }

    const result = await santaService.addRequest(name, message);

    if (result.isValid) {
      res.status(200).json({
        id: result.id,
        message: result.message,
      });
    } else {
      res
        .status(400)
        .json({ status: '400', title: 'Bad Request', message: result.error });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: '500', title: 'Server Error', message: error.message });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const requests = await santaService.getPendingRequests();
    if (requests) {
      res.json({
        data: requests.map((r) => ({
          id: r.id,
          attributes: {
            username: r.username,
            address: r.address,
            message: r.message,
          },
        })),
      });
    } else {
      res.json({ data: [] });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: '500', title: 'Server Error', message: error.message });
  }
};

module.exports = {
  submitRequest,
  getPendingRequests,
};
