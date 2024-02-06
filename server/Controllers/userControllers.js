const KJUR = require('jsrsasign');
require('dotenv').config();
const db = require('../Models/userModels.js');

const userControllers = {};

userControllers.generateToken = (req, res, next) => {
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
//add in teacher verification 

userControllers.verifyUser = (req, res, next) => {
  const {username, password} = req.body;
  const values = [username, password];
  const queryString = 'SELECT * FROM students WHERE username = $1 AND password = $2';
  db.query(queryString, values)
    .then(data => {
      console.log(data)
      if (data.rows.length) {
        res.locals.loggedIn = true;
        res.locals.username = username;
        return next();
      } else {
        console.log('no user')
        res.locals.loggedIn = false;
        res.locals.username = '';
        return next();
      }
    }).catch(err => {
      return next({err})
    })
};


module.exports = userControllers;