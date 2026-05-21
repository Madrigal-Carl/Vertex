import emailQueue from "../queues/email.queue.js";

await emailQueue.add("welcome", {
  type: "email:welcome",
  data: {
    to: "your_email@gmail.com",
  },
});

console.log("Job added");
