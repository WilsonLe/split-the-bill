import * as functions from "firebase-functions";
import { db } from "./firebase.config";

exports.removeOldEvent = functions.pubsub
  .schedule("0 0 * * *")
  .timeZone("America/New_York")
  .onRun(async (context) => {
    const daysBack = 90;
    const now = new Date();
    const cutoffDate = new Date().setDate(now.getDate() - daysBack);
    const eventSnap = await db
      .collection("events")
      .where("createdAt", "<=", cutoffDate)
      .get();
    const batch = db.batch();
    eventSnap.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    console.log("Clean up");
  });
