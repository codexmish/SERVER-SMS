const app = require("./app");
const dbConfig = require("./config/dbConfig");
const dns = require("dns");
const envConfig = require("./helpers/envConfig");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const port = envConfig.PORT || 8000;

const main = async () => {
  app.listen(port, () => {
    dbConfig();
    console.log(`server is running at ${port}`);
  });
};

main().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});