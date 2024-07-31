"use server";

import Plunk from "@plunk/node";

export const sendEmailAction = async (userEmail: string, emailHtml: string) => {
  const plunk = new Plunk(process.env.PLUNK_API_KEY!);
  await plunk.emails.send({
    to: userEmail,
    subject: "Meeting Schedule Details",
    body: emailHtml,
  });
};
