const msal = require('@azure/msal-node');
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');

const privateKeySource = fs.readFileSync('./certs/pocappcertificatebasedauth.key')

const privateKeyObject = crypto.createPrivateKey({
    key: privateKeySource,
    passphrase: "PASSPHRASE_CERTIFICATE",
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
        clientId: "CLIENT_ID",
        authority: "https://login.microsoftonline.com/TENANT_ID",
        clientCertificate: {
            thumbprint: "THUMBPRINT", // a 40-digit hexadecimal string
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





