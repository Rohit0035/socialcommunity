import Notification from "@/models/Notification";

export async function createNotification({
  recipient,
  sender,
  type,
  post = null,
  reel = null,
  comment = null,
  message = null,
  previewImage = "",
  text = "",
  actionText = "",
}) {
  try {
    // Don't notify yourself
    if (
      recipient.toString() === sender.toString()
    ) {
      return null;
    }

    return await Notification.create({
      recipient,
      sender,
      type,
      post,
      reel,
      comment,
      message,
      previewImage,
      text,
      actionText,
    });
  } catch (error) {
    console.error(
      "Notification creation failed:",
      error
    );

    return null;
  }
}