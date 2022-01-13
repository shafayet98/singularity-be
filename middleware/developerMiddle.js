function interMsgDev(req, res, next) {
    var customMsg = "custom message: request done via developer";
    req.body = customMsg;
    next();
}

module.exports = interMsgDev;