# Changelog

### 0.0.2 (2024-08-30)

### Features

- refactor client, using context and reducer for state management
- reorganize component organization and files organization structure
- create hooks for fetch the api
- using rtk query instead of context
- ading devDependencies `@testing-library/react` and `@testing-library/jest-dom`, setup tests
- create unit test for the client start with the root (App.tsx)

### 0.0.1 (2024-08-29)

### Features

- separate server and client into dependent folder to make it easier to read
- using concurrently for development purpose, run client & server in parallel
- separate business logic and functionality in server, split files to route, controller, service, data
- create basic logic in server for validating form submitted data from the client side
- adding createRequest and getPendingRequests functionality; using simple nodemailer to use ethereal email for sending the request
- modify the react code structure and moving to components
- using vite proxy to fetch data to the backend which running on port 4000
- separate css files by using css modules
- use simple state management in react by using useState hooks
- added unit testing for `santa.service`
- added unit testing for `santa.controller`
- added unit testing for `santa.routes`
