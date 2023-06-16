const axios = require('axios');
const sessionController = {};

sessionController.getId = async (req, res, next) => {
  const url = 'https://api.zoom.us/v2/videosdk/sessions?type=past&from=2023-05-23&to=2023-06-15';
  let sessionId;
  try {
    sessionId = await axios({
      method: 'GET', 
      url, 
      headers: { 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlRNQUhXOTYxUU5Pb1dxb1J6STJnZXciLCJleHAiOjE2ODY4NDQ4MDAsImlhdCI6MTY4NTAzMTI2M30.EgNuJ_zT5kT9-bpMOVrQnwYC6HEPMb6OUdxJRtkr9Hw' }
    })
    sessionId = sessionId.data;
    res.locals.sessionId = sessionId.sessions[0].id;
    return next();
  } catch (err) {
    return next({
      log: `Error in sessionController.getId: ${err}`,
      status: 500, 
      message: {err: 'Error has occurred'}
    })
  }
}

sessionController.getUsers = async (req, res, next) => {
  const url = `https://api.zoom.us/v2/videosdk/sessions/${res.locals.sessionId}/users?type=past&page_size=30`;
  let users = [];
  try {
    let result = await axios({
      method: 'GET', 
      url, 
      headers: {
        "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlRNQUhXOTYxUU5Pb1dxb1J6STJnZXciLCJleHAiOjE2ODY4NDQ4MDAsImlhdCI6MTY4NTAzMTI2M30.EgNuJ_zT5kT9-bpMOVrQnwYC6HEPMb6OUdxJRtkr9Hw'
      }
    })
    result = result.data.users;
    //make time look pretty later by splitting string, reformatting, and concating 
    for (let i =0; i < result.length; i++) {
        users.push({
          userId: result[i].id,
          name: result[i].name,
          TOA: result[i].join_time
        })
      }
      res.locals.users = users;
      return next();
    }
  catch(err) {
    return next({
      log: `Error in sessionController.getUsers: ${err}`,
      status: 500, 
      message: {err: 'Error has occurred'}
    })
  }
}

sessionController.getDetails = async (req, res, next) => {
  const url  = `https://api.zoom.us/v2/videosdk/sessions/${res.locals.sessionId}?type=past`;
  try {
    let result = await axios({
      method: 'GET',
      url, 
      headers: {
        "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlRNQUhXOTYxUU5Pb1dxb1J6STJnZXciLCJleHAiOjE2ODY4NDQ4MDAsImlhdCI6MTY4NTAzMTI2M30.EgNuJ_zT5kT9-bpMOVrQnwYC6HEPMb6OUdxJRtkr9Hw'
      }
    })
    result = result.data;
    res.locals.details = result;
    return next();
  } catch(err) {
    return next({
      log: `Error in sessionController.getDetails: ${err}`,
      status: 500, 
      message: {err: 'Error has occurred'}
    })
  }
}

module.exports = sessionController;


