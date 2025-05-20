const { connectDB, env } = require("./src/config");
const app = require("./src/app");
const { deleteUsersJob } = require("./src/jobs");

connectDB();

app.listen(env.PORT, () => {
  deleteUsersJob.start();
  console.warn(`Server is listening on port ${env.PORT}`);
});
