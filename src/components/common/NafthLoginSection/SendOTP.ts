import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "../../../firebase";

export const sendOTP = (phone: string): Promise<ConfirmationResult> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window is undefined."));
      return;
    }

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }

    window.recaptchaVerifier.render().then(() => {
      signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          console.log("OTP sent!");
          resolve(confirmationResult);
        })
        .catch((error) => {
          console.error("Failed to send OTP:", error);
          reject(error);
        });
    });
  });
};
