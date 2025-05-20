const { CronJob } = require("cron");
const { env } = require("../config");
const { userService } = require("../services");

const cronTime = env?.CRON_SCHEDULE;
const job = async () => {
  await userService.deleteAll();
  console.log("Deleted all users");
};

const deleteUsersJob = new CronJob(cronTime, job, null, true);

module.exports = { deleteUsersJob };
