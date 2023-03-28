const KJUR = require('jsrsasign');
require('dotenv').config();

const jwtController = {};

jwtController.generateToken = (req, res, next) => {
    console.log(process.env.SDK_KEY)
    try {
        let signature = '';
        const iat = Math.round(new Date().getTime() / 1000);
        const exp = iat + 60 * 60 * 2;

        const oHeader = { alg: 'HS256', typ: 'JWT' };
        const {topic, passWord, userIdentity, sessionKey, roleType} = req.body
        const sdkKey = process.env.SDK_KEY;
        const sdkSecret = process.env.SDK_SECRET;
        const oPayload = {
            app_key: sdkKey,
            iat,
            exp,
            tpc: topic,
            pwd: passWord,
            user_identity: userIdentity,
            session_key: sessionKey,
            role_type: roleType,
        };
        const sHeader = JSON.stringify(oHeader);
        const sPayload = JSON.stringify(oPayload);
        signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret);
        res.locals.token = signature;
        // console.log('token',res.locals.token)
        return next();
    }
    catch(err) {
        return next({err})
    }
}


module.exports = jwtController;