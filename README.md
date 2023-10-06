This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Motivation

User experience is one of the major driving factors behind mass adoption of technology. While great strides have been made in the SSI ecosystem in terms of technology, and we're starting to build out an ecosystem of wallets and products based on SSI our team feels more focus should be put on making this amazing, but complex, technology accessible and easy to use.

We built a Wallet with extremely simple functionality which is familar to users who have experience with Apple Wallet and Google Wallet, making it easy for even novice users to utilise the technology. We abstract abstract concepts like DIDs, trust, and selective disclosure behind easy to understand UI/UX concepts that we hope will make the user's life easier.

We recently saw a linkedIn post which perfectly summarises our motivation behind building our POC -


`"AS A user I WANT TO take control of my identity SO THAT I can be free of the tyranny of the tech giants" Is not one a requirement for any of our target users.`

## Running the project

In the project directory, you can run:

```
npm install
npm start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## App flow

At the root route (e.g. http://localhost:3000/) you will be able to register/login to your cloud agent. By default, if you enter unknown set of credentials it will automatically register you with a new account. In a more fleshed out wallet, this would be replaced with a proper authentication and account flows.

After successfully logging in, you will be taken to the homepage (e.g. http://localhost:3000/home) where you can see all your credentials in a quick view, clicking on them to see a more detailed view of the credential subject and the issuer of the credentials.

By clicking the QRCode button at the top right, you can scan proprietary QR codes produced by the Cloud Agent API. In a more fleshed out implementation, this would be using standardised protocols like OIDC4VC or OID4CI, but  we did not prioritise this implementation for our POC.

Based on the QR code, you will be taken to the appropriate screen to either

a) Accept a credential being issued to you.

b) Complete a credential presentation flow, where you can select which credentials to share and in the case of SD-JWTs, which fields to disclose to the verifier.