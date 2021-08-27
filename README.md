Guide Article: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/certificate-credentials.md

# Instructions to run project
- `npm install` to install dependencies.
- `npm start` to run app-Certificate.js script. (if you want to change it, go to package.json and change script->start property). 


# HELP - Example of how to generate certificates:
openssl req -x509 -newkey rsa:2048 -sha256 -days 365 -keyout pocappcertificatebasedauth.key -out pocappcertificatebasedauth.crt -subj "/CN=pocappcertificatebasedauth.com"
