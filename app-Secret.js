const msal = require('@azure/msal-node');
const axios = require('axios');
const fs = require('fs');

const msalConfig = {
    auth: {
        clientId: "834524bd-f12e-4a26-a40a-55e2a282296b",
        authority: "https://login.microsoftonline.com/7d6682b3-106f-47ba-9b6f-dca224b821c0",
        clientSecret: "pg3o8SC73sHqQFf3e1b_-gwph0ir-OSh_R",
   }
};

const tokenRequest = {
    scopes: [ 'https://graph.microsoft.com/.default' ],
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

async function getUsers(tokenRequest) {	
    const result = await cca.acquireTokenByClientCredential(tokenRequest); 
    console.log("token: ",result.accessToken);

    const options = {
        headers: {
            Authorization: `Bearer ${result.accessToken}`
        }
    };

    const response = await axios.default.get("https://graph.microsoft.com/v1.0/users", options);
    console.log("users: ", response.data);

}

getUsers(tokenRequest);






