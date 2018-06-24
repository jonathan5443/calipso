import Services from "../services";

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: `you have not autorizacion`
    });
  }

  const token = req.headers.authorization;

  Services.decodeToken(token)
    .then(response => {
      req.user = response;
      next();
    })
    .catch(response => {
      res.status(response.status);
    });
}

module.exports = isAuth;
