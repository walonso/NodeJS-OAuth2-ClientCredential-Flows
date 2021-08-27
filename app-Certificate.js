const msal = require('@azure/msal-node');
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');

const privateKeySource = fs.readFileSync('./certs/pocappcertificatebasedauth.key')

const privateKeyObject = crypto.createPrivateKey({
    key: privateKeySource,
    passphrase: "Portal12345!",
    format: 'pem'
});

const privateKey = privateKeyObject.export({
    format: 'pem',
    type: 'pkcs8'
});



//const privateKeySource = fs.readFileSync('./certs/pocappcertificatebasedauth.key');
//const privateKey = Buffer.from(privateKeySource, 'base64').toString().replace(/\r/g, "").replace(/\n/g, "");

const msalConfig = {
    auth: {
        clientId: "834524bd-f12e-4a26-a40a-55e2a282296b",
        authority: "https://login.microsoftonline.com/7d6682b3-106f-47ba-9b6f-dca224b821c0",
        clientCertificate: {
            thumbprint: "EA9C0EB8CC5E1EBF05DDBB47E2074521B25C7C4E", // a 40-digit hexadecimal string
            privateKey: privateKey
        }
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

try {
    getUsers(tokenRequest);
} catch(error){
console.log(error);
}





