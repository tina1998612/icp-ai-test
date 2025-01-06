# **Dai - Decentralized AI Chatbot on ICP**

Dai is a decentralized AI chatbot built on the Internet Computer Protocol (ICP). This README provides guidance on setting up and running the application.

## **Setup**

### **Frontend Canister**

### Setup

After setting up the frontend credentials, ensure that you have the **`dfx`** command-line tool installed on your computer. Check its version with the following command:

```bash
dfx --version

```


If you don't have it installed, follow the instructions in the [ICP SDK installation guide](https://internetcomputer.org/docs/current/developer-docs/setup/install#installing-the-ic-sdk-1).

For a smooth deployment, follow the [Azle installation documentation](https://demergent-labs.github.io/azle/installation.html#build-dependencies).
### Prerequisites

Before you begin, ensure you have met the following requirements:

- **dfx**: You have installed the latest version of the DFINITY Canister SDK, `dfx`. You can download it from the DFINITY SDK page. [installation guide](https://demergent-labs.github.io/azle/get_started.html#installation)

 ```
  use version dfx 0.22.0
 ```
- **Node.js**: You have installed Node.js, version 18 or above.
```
 v20.12.2

```
- Azle version use 
 ```
  azle 0.24.1
 ```

 - podman verion use

 ```
  podman version 3.4.4
  
 ```
Please ensure all these prerequisites are met before proceeding with the setup of the project.


## **Install Dependencies**

To install project dependencies, run the following command:

```bash
npm install
```

## **Run the App Locally**

Before running the app locally, start the local replica with the following command:

```sh
dfx start --clean
```

To run the app locally, ensure that **`dfx`** (Internet Computer CDK) is installed and running. Execute the following command in another terminal window without closing the replica:

```sh
dfx deploy

```

This command deploys both the frontend and backend canisters to your local network. However, you can also deploy them separately.

## **Preview the Deployment**

After deployment, you can access the local preview of the app using the links provided in **green**:

```bash

Frontend canister via browser dfinity_js_frontend: http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai
Backend canister via Candid interface dfinity_js_backend: http://127.0.0.1:4943/?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai
internet_identity: http://127.0.0.1:4943/?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai&id=be2us-64aaa-aaaaa-qaabq-cai

```

## **Separate Deployment**

You can deploy individual parts of the app separately:

- Deploy only the backend:

```sh
dfx deploy dfinity_js_backend
```

- Deploy only the frontend:

```sh
dfx deploy dfinity_js_frontend

```

- Test the frontend locally:

```sh
npm start
```

## **Troubleshooting**

If you encounter any issues, refer to this [documentation](https://demergent-labs.github.io/azle/deployment.html#common-deployment-issues) or reach out to [me](https://github.com/Jonath-z).

