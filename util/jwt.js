let opts = {}
opts.jwtFromRequest = function (req) { // tell passport to read JWT from cookies
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt']
    }
    return token
};
opts.secretOrKey = 'secret';


module.exports = opts