# CMPE_295
Project repository for the course CMPE 295. Decentralized Certificate Verification based on Hyperledger Blockchain.

## Project Setup
1. Prerequisites:
*   NodeJS v8.9
*   Python v2.7
*   GoLang v1.11
*   IBM Blockchain Platform Extension for Visual Studio Code (For packaging chaincode)

2. Setting up Fabric 2.0 on IBM Cloud:
*   Deploy blockchain network 2.0 by following the link below:
    https://cloud.ibm.com/docs/services/blockchain?topic=blockchain-ibp-v2-deploy-iks

3. Setting up Client Application:

    terminal 1
    ```
    cd app/client
    npm install
    npm start
    ```
    New tab localhost:3000 will open on browser once the client starts.

    terminal 2
    ```
    cd app/server
    npm install
    npm start
    ```

4.  Setting up Backend:
    Follow steps mentioned [here](./backend/README.md)

5.  Develop and Package chaincode:
    Follow steps mentioned [here](./chaincode/README.md)




