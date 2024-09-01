# README - Documentation

# A Letter to Santa 🎅

This is a simple web application allows _registered_ children to send messages to Santa. I made this to match the specifications, and make it simple no overengineering.

  <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/eb7b62bf012f4b3990ee08f413c2dd98-bf605c356ecaaf2f-full-play.gif" href="https://www.loom.com/embed/eb7b62bf012f4b3990ee08f413c2dd98?sid=133683af-c827-4bde-828f-d01af0922831">
  
- [Demo](https://www.loom.com/embed/eb7b62bf012f4b3990ee08f413c2dd98?sid=133683af-c827-4bde-828f-d01af0922831)
- [App](https://sphenoid-coral-coelurus.glitch.me/)
- [Coverage](https://sphenoid-coral-coelurus.glitch.me/coverage)

## Table of Contents

1. Project Overview
2. Prerequisites & Dependencies
3. Installation & Usage
4. Architecture
5. BackEnd
6. API Endpoints
7. FrontEnd
8. Configuration
9. Testing
10. Deployment
11. Future Improvements

## 1. Project Overview

This Santa Letter Application is a web-based system that allows registered children to send messages to Santa Claus. It includes features for submitting request, validate child, and sending emails with simple queue.

### Key Features

- Child request submission
- Age and registration validation
- Periodic email sending for pending message requests
- RESTful API for request management

## 2. Prerequisites & Dependencies:

- Node.js (v16 or later)
- npm (v8 or later)
- Modern browser (Chrome, chromium, firefox)
- Ethereal email [https://ethereal.email/](https://ethereal.email/), username password given in the `.env.example`

### Dependencies

#### Server Dependencies

- `dotenv`: For loading environment variables
- `express`: Web application framework
- `morgan`: HTTP request logger middleware
- `http`: Node.js HTTP module
- `path`: Node.js path module
- `uuid`: to Generate unique identifiers
- `concurrently`: Runs multiple commands concurrently.
- `jest`: JavaScript testing framework.
- `nodemon`: Monitors for changes and automatically restarts the server.

#### FrontEnd Dependencies

- `@hookform/resolvers`: Provides validation resolvers for react-hook-form.
- `@reduxjs/toolkit`: A set of tools to simplify Redux development.
- `react` and `react-dom`: Core React libraries.
- `react-hook-form`: Library for managing form state in React.
- `react-redux`: Official React bindings for Redux.
- `yup`: JavaScript schema builder for value parsing and validation.
- `@testing-library/jest-dom` and `@testing-library/react`: Testing utilities for React.
- `@types/*` packages: TypeScript type definitions for various libraries.
- `@vitejs/plugin-react`: Vite plugin for React projects.
- `jest`: JavaScript testing framework.
- `jsdom`: JavaScript implementation of web standards for use with Node.js.
- `typescript`: Adds static typing to JavaScript.
- `vite`: Build tool and development server.
- `vitest`: Vite-native unit test framework.

### npm packages added

- nodemailer: to send the email
- jest: testing module
- uuid: generate uid for the message sent to santa

and updates all the package version

## 3. Installation & Usage

### Via Glitch

1. **Login to glitch**: make sure you are logged in to glitch.com

2. **Clone**: Go to this URL: https://glitch.com/~js-santa-app and click the `Remix your own` button to clone the code. This will copy all the code to a new, randomly generated URL (e.g. https://glitch.com/edit/#!/capable-toothpaste).

3. **Code**: You can edit the code directly in the Glitch editor or use your editor of choice (VSCode, Sublime, etc) and copy paste the files into Glitch. Git import and export is also available in the Tools menu on the bottom left. How you edit the code is entirely up to you, so long as your finished work is viewable at the URL created in the previous step.

> **NOTE**: Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.

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

server test

```
npm run test:server
```

client test

```
npm run
```

Generate coverage

```
npm run test:coverage
```

To simply access the coverage we can see in

[https://sphenoid-coral-coelurus.glitch.me/coverage/](https://sphenoid-coral-coelurus.glitch.me/coverage/)

## 4. Architecture

This app follows a client and server architecture:

- BackEnd: Node.js with Express.js; written in JS
- FrontEnd: React with Typescript; Build with Vite
- Database: In memory storage (only for demo)
- Test: Backend (Jest); Frontend (Jest + Vitest)

## 5. BackEnd

### 5.1 Server setup

The main server file set up the Express application, configure middlewares, and define API routes. And handle email sending in pending requests, and using proxy for development.

### 5.2 Santa Service

This service manages the core business logic to:

1. Validating the incoming requests
2. Add new requests
3. Retrieve the pending requests

### 5.3 Santa Controller

This controller manage HTTP Requests and responses for the related santa operations:

1. Submit request
2. Get Pending request

### 5.4 Email Utils

This manage sending email functionality using `nodemailer`:

1. Send periodic email from the pending requests
2. Configurable SMTP settings

## 6. API Endpoints Overview

- `GET /api/health`: To check if the server health (run check)
- `GET /api/santa/pending`: Retrieve all pending requests to santa
- `POST /api/santa/request`: Send Message to santa

## 7. FrontEnd

This implements basic react setup with ReduxToolkit for state management and displaying responses or errors in the app

### 7.1 Santa Form Component

A form component for submitting requests to Santa, including input validation and character count using rtk and `react-hooks-form`

### 7.2 Redux Setup

- store configuration: `client/src/config/redux/store/index.ts`
- root reducer: `client/src/config/redux/store/rootReducer.ts`
- santa slice: `client/src/config/redux/slices/santaSlice.ts`

As the application grows we can modify the santa slice, or creating new slice for new features.

### 7.3 API service

Defines API endpoints using RTK-Query for interacting with backend (`client/src/services/santaApi.ts`); as the app grows we can create new api service in this folder

## 8. Configuration

- Environment variables are defined in `.env.example`
- Vite configuration: `vite.config.ts`
- TypeScript configuration: `tsconfig.json` and `tsconfig.node.json`
- Test configuration: `jest.config.js` and `vitest.config.ts`

## 9. Testing

### 9.1 Backend Tests

Controller tests: `server/__tests__/santa.controller.test.js`
Service tests: `server/__tests__/santa.service.test.js`
Route tests: `server/__tests__/santa.routes.test.js`

### 9.2 Frontend Tests

App component test: `client/__tests__/App.test.tsx`
SantaForm component test: `client/src/components/SantaForm/SantaForm.test.tsx`
Footer component test: `client/src/components/Footer/Footer.test.tsx`

### Coverage

In this project it only setup for coverage in `server`, to run the coverage we can use

```
npm run test:coverage
```

## 10. Deployment

This app is already compatible with`glitch.com`. to deploy just follow simple steps:

1. **Login to glitch**: make sure you are logged in to glitch.com

2. **Clone**: Go to this URL: [https://glitch.com/~sphenoid-coral-coelurus](https://glitch.com/~sphenoid-coral-coelurus) and click the `Remix your own` button to clone the code. This will copy all the code to a new, randomly generated URL (e.g. https://glitch.com/edit/#!/capable-toothpaste).

## 11. Future Improvements

1. Implement persistent storage (e.g., database) for requests
2. Add user authentication for enhanced security
3. Improve frontend UI/UX with more interactive features
4. Implement rate limiting to prevent abuse
5. Add more comprehensive error handling and logging
6. Enhance email templates for better readability
7. Implement continuous integration and deployment (CI/CD) pipeline (idk how to do this in glitch)

## Notes

The client and server are running parallel using `concurrently`. somehow, everytime glitch run it will choose the first port that run. And this will make the hot reload in vite not working correctly, but it's working fine in local environment, idk how to fix this since the time is very limited.
