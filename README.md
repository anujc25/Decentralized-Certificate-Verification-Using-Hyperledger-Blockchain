# Decentralized Certificate Verification Service Based on Hyperledger

## Overview
The **Decentralized Certificate Verification Service** is a blockchain-based system built on **Hyperledger Fabric** to provide a secure and efficient method for verifying academic certificates. The project aims to replace the traditional, time-consuming verification process with an **instant and tamper-proof** solution.

## Features
- **Decentralized Storage**: Certificates are stored securely on **IPFS** and linked to the Hyperledger Fabric blockchain.
- **Permissioned Blockchain**: Only authorized institutions (universities, employers, students) can access relevant data.
- **Immutable Records**: Once issued, certificates cannot be modified or deleted, ensuring integrity.
- **User Roles**:
  - **Universities**: Upload and register certificates.
  - **Students**: View and share their certificates.
  - **Employers**: Verify certificates via blockchain.
- **Attribute-Based Access Control (ABAC)**: Ensures only authorized users can perform specific actions.

## System Architecture
The system consists of four main components:
1. **Decentralized Desktop Application**: 
   - Built using **Electron.js** for cross-platform compatibility.
   - UI developed with **React.js**.
   - Integrates with Hyperledger Fabric SDK.
   
2. **Middleware Tier**:
   - Implements authentication and identity management.
   - Developed using **Spring Boot** with **MongoDB** for storing user data.

3. **Database & Storage**:
   - Uses **IPFS** to store diploma documents.
   - **Hyperledger Fabric's CouchDB** is used for blockchain transactions.

4. **Hyperledger Fabric Network**:
   - Deployed on **IBM Cloud Kubernetes**.
   - Core components include peers, orderers, and membership service providers (MSP).

## Installation & Setup
### 1. Prerequisites
- [Node.js v8.9](https://nodejs.org/)
- [Python v2.7](https://www.python.org/)
- [Docker](https://www.docker.com/)
- [Hyperledger Fabric](https://hyperledger-fabric.readthedocs.io/)
- [GoLang v1.11](https://go.dev/)
- [IPFS](https://docs.ipfs.io/)
- IBM Blockchain Platform Extension for Visual Studio Code (For packaging chaincode)

### 2. Deploying Hyperledger Fabric 2.0 on IBM Cloud
Follow the steps in the IBM documentation to set up your blockchain network:
[Deploy Hyperledger Fabric 2.0 on IBM Cloud](https://cloud.ibm.com/docs/services/blockchain?topic=blockchain-ibp-v2-deploy-iks)

### 3. Setting Up the Client Application
Open two terminal windows and run the following commands:

**Terminal 1 (Client Frontend):**
```sh
cd app/client
npm install
npm start
```
Once the client starts, a new browser tab will open at `http://localhost:3000`.

**Terminal 2 (Client Backend):**
```sh
cd app/server
npm install
npm start
```

### 4. Setting up Backend:
    Follow steps mentioned [here](./backend/README.md)

### 5. Develop and Package chaincode:
    Follow steps mentioned [here](./chaincode/README.md)

## Usage
1. **University** registers and uploads verified student certificates.
2. **Student** logs in and shares their certificates securely.
3. **Employer** verifies certificate authenticity via the system.

## Performance & Security
- **Optimized for scalability**: Handles batch uploads and concurrent queries efficiently.
- **Data immutability**: Ensures certificates cannot be altered after issuance.
- **Secure access control**: Implements **Role-Based & Attribute-Based Access Control**.

## Contributors
- **Anuj Chaudhari**
- **Nishantkumar Bhalani**
- **Jay Desai**
- **Tejas Panchal**
