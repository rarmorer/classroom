const axios = require('axios');
const sessionController = {};
const bearerToken = '';

sessionController.getId = async (req, res, next) => {
  const url = 'https://api.zoom.us/v2/videosdk/sessions?type=past&from=2023-05-23&to=2023-06-15';
  let sessionId;
  try {
    sessionId = await axios({
      method: 'GET', 
      url, 
      header: {
        "Authorization" : `Bearer ${bearerToken}`
      }
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
        "Authorization" : `Bearer ${bearerToken}`
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
        "Authorization" : `Bearer ${bearerToken}`      }
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


