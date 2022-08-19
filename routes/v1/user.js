const { authJwt } = require('../../service/index');
const AUTH_CONTROLLER = require('../../controllers/auth/index');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/all", AUTH_CONTROLLER.allAccess);
    app.get(
        "/api/test/seller",
        [authJwt.verifyToken],
        AUTH_CONTROLLER.sellerBoard
    );
}