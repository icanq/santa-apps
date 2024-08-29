const concurrently = require("concurrently");

concurrently(
  [
    { command: "node server/index.js", name: "SERVER" },
    { command: "vite --port 3000", name: "CLIENT" },
  ],
  {
    prefix: "name",
    killOthers: ["failure", "success"],
    restartTries: 3,
  }
).then(
  () => console.log("All processes exited with success"),
  (error) => console.error("Error occurred:", error)
);
