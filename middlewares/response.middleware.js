const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query

      const { data, err } = res;
      const sendResponse = (data) => {
        return res.status(200).json({status: 'Success', data});
      };

      const sendError = (message, status = 400) => {
        return res.status(status).json({ error: true, message });
      };

      if (err) {
          sendError(err.message, err.statusCode)
      } else if (data) {
        sendResponse(data);
      }
  next();
};

export { responseMiddleware };
