import { messagingServerToken } from "../utils/CONSTANTS";

export const sendPushNotification = async (token, title, body,) => {
    
  
    const FIREBASE_API_KEY =messagingServerToken
  
    const message = {
      registration_ids: [token],
      notification: {
        title: title,
        body: body,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: "high",
        content_available: true
      },
    };
  
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "key=" + FIREBASE_API_KEY
    });
  
    let response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers,
      body: JSON.stringify(message)
    });
    response = await response.json();
  };
  