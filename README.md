# Classroom Starter Kit - Video SDK for Web

The Video SDK Classroom Starter Kid is a boilerplate Virtual Classroom space built using React, Node + Express, and Zoom's Video SDK. It features landing pages for both students and teacher, with features specific to both.  

Use this sample application to preview video-call integration into a classroom-style application, or as a base for building your own virtual meeting space. 

## Features 
1. Login Portal 
2. Access to Session Statistics 
3. Access to Classroom (student) data
4. Access to curated attendance data
5. Integrated Chat Feature
6. Integrated Video-Calling with Screen-Sharing

## Prerequisites 
- Working knowledge of the following: 
  - React 
  - Node.js + Express
  - SQL 
- Zoom Video SDK Account 
- Video SDK Credentials (general & API-specific credentials)
- Established database 

# Getting Started

`
# Clone this repository 
`https://git.zoom.us/sample-apps/classroom`

# navigate into the cloned project directory 
cd classroom 

# run NPM install to install dependencies 
npm install 
`

## Configuring Your Application 

To get started, make sure to fill in the necessary information in the mentioned files: 

-Add in the link to your database in server/Models/userModels.js (can utilize [ElephantSQL](https://www.elephantsql.com/) to create a new instance), ensure database follows the given key:value conventions OR change SQL statements in /server/Controllers/userConrollers.js, line 43. 

-Add in your SDK_key and SDK_secret to server/.env (can be found on marketplace.zoom.us, after logging in to your Video SDK account)

-Add in your Video SDK API JWT token, as a bearer token, to server/Controllers/sessionControllers.js, on line 3

## Customizing Your Application 

You can customize the outputted data for your application in the following ways: 
- Change the type of session data received in `sessionControllers.getId()`, by adjusting the values after the `type` keyword in the  url value (line 6). You can keep the type of data as 'past' and change the dates, or change the type to 'live' (`type=live`) for current session data. More information query parameters can be found [here](https://developers.zoom.us/docs/video-sdk/apis/#operation/sessions)


