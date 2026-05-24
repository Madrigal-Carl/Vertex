import { Worker } from "bullmq";
import redis from "../../config/redis.js";
import { sendEmail } from "../../services/email.service.js";
import { EMAIL_JOBS } from "../email.jobs.js";

import { verifyEmailTemplate } from "../../templates/email/verify.template.js";
import { resetPasswordTemplate } from "../../templates/email/reset-password.template.js";

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { type, data } = job.data;

    const handlers = {
      [EMAIL_JOBS.VERIFY_EMAIL]: async () => {
        return sendEmail({
          to: data.to,
          subject: "Verify Your Email",
          html: verifyEmailTemplate({ verifyUrl: data.verifyUrl }),
        });
      },

      [EMAIL_JOBS.RESET_PASSWORD]: async () => {
        return sendEmail({
          to: data.to,
          subject: "Reset Your Password",
          html: resetPasswordTemplate({ resetUrl: data.resetUrl }),
        });
      },
    };

    const handler = handlers[type];

    if (!handler) {
      throw new Error(`Unknown email job type: ${type}`);
    }

    return handler();
  },
  {
    connection: redis,
  },
);

emailWorker.on("completed", (job) => {
  console.log(`Email job completed: ${job.id}`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Email job failed: ${job?.id}`, err);
});

export default emailWorker;
