const msal = require('@azure/msal-node');
const axios = require('axios');
const fs = require('fs');

const msalConfig = {
    auth: {
        clientId: "CLIENT_ID",
        authority: "https://login.microsoftonline.com/TENANT_ID",
        clientSecret: "SECRET",
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






