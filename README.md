# README - Documentation

# A Letter to Santa 🎅

This is a simple web application allows _registered_ children to send messages to Santa. I made this to match the specifications, and make it simple no overengineering.

- [App](https://sphenoid-coral-coelurus.glitch.me/)
- [Coverage](https://sphenoid-coral-coelurus.glitch.me/coverage)

## Prerequisites & Dependencies:

- Node.js (v16 or later)
- npm (v8 or later)
- Modern browser (Chrome, chromium, firefox)
- Ethereal email [https://ethereal.email/](https://ethereal.email/), username password given in the `.env.example`

### npm packages added

- nodemailer: to send the email
- jest: testing module
- uuid: generate uid for the message sent to santa

and updates all the package version

## Installation & Usage

### Via Glitch

1. **Login to glitch**: make sure you are logged in to glitch.com

2. **Clone**: Go to this URL: https://glitch.com/~js-santa-app and click the `Remix your own` button to clone the code. This will copy all the code to a new, randomly generated URL (e.g. https://glitch.com/edit/#!/capable-toothpaste).

3. **Code**: You can edit the code directly in the Glitch editor or use your editor of choice (VSCode, Sublime, etc) and copy paste the files into Glitch. Git import and export is also available in the Tools menu on the bottom left. How you edit the code is entirely up to you, so long as your finished work is viewable at the URL created in the previous step.

> **NOTE**: Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.

4. **Turn in**: When you finish coding, send your URL to us so we can review your code.

### Direct from github

1. Clone the repository:

```bash
  git clone git@github.com:icanq/santa-apps.git
```

2. Install dependencies

```
npm install
```

### Configuration

1. create `.env` you can paste from the `.env.example`

### Running the Application

#### Development Mode

Start both client and server

```
npm run start
```

Server only

```
npm run start:server
```

Client only

```
npm run start:client
```

#### Production Mode

Build the client:

```
npm run build
```

Since server written using JS we don't need to build it.

#### Tests

Run tests with

```
npm run test
```

Generate coverage

```
npm run test:coverage
```

To simply access the coverage we can see in

[https://sphenoid-coral-coelurus.glitch.me/coverage/](https://sphenoid-coral-coelurus.glitch.me/coverage/)

## API Endpoints Overview

- `GET /api/health`: To check if the server health (run check)
- `GET /api/santa/pending`: Retrieve all pending requests to santa
- `POST /api/santa/request`: Send Message to santa

## Deployment

This app is already compatible with`glitch.com`. to deploy just follow simple steps:

1. **Login to glitch**: make sure you are logged in to glitch.com

2. **Clone**: Go to this URL: [https://glitch.com/~sphenoid-coral-coelurus](https://glitch.com/~sphenoid-coral-coelurus) and click the `Remix your own` button to clone the code. This will copy all the code to a new, randomly generated URL (e.g. https://glitch.com/edit/#!/capable-toothpaste).

## Features

Features:

1. Child wishes form
2. Child register validation
3. Message validation
4. Age Validation
5. Error Handling
6. Request Confirmation

## Tips and detailed instructions:

- Somebody started to work on the app, but left it unfinished and did not use any modern technology. We added React for you to have a clean base but feel free to use any other technology you might prefer.
- The UI and UX of the application for this challenge is not the priority. The pages/email do not need to look good, as long as they convey the information effectively.
- You should fetch the JSON data at every form submission (consider it as an API).
- For the sake of the challenge, you can keep the requests in-memory only.
- You are encouraged to select and use npm packages as needed (you can add packages by editing package.json, or using `npm install` from the glitch console).
- To get an smtp server for emails, go to https://ethereal.email/ and click "Create Ethereal Account".\
  This will give you an account (take note of your username and pwd if you need to re-logon later) and smtp server (actual emails do not get delivered).\
  Go to https://ethereal.email/messages to see the emails that have been received by the smtp server.

## Some things we will look for in your submission

- Code quality (readability, use of modern syntax...)
- Does the app work as designed (cf. objectives overview)
- App architecture (folder structure, configuration management...)
- Documentation (why did you choose to change or add a package...)

## Tips on usage of glitch

Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.
When your app is running, you can access logs and console using the "Tools" button at the bottom left.

## Notes

The client and server are running parallel using `concurrently`. somehow, everytime glitch run it will choose the first port that run. And this will make the hot reload in vite not working correctly, but it's working fine in local environment, idk how to fix this since the time is very limited.
