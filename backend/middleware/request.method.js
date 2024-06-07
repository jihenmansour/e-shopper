const requestMethod = () => {
    const allowedMethods = [
        "OPTIONS",
        "HEAD",
        "CONNECT",
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "PATCH",
      ];
    
      if (!allowedMethods.includes(req.method)) {
        res.status(405).send(`${req.method} not allowed.`);
      }
    
      next();
}

module.exports = requestMethod