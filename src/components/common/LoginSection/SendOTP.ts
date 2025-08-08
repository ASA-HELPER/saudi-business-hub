import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "../../../firebase";

export const sendOTP = async (phone: string): Promise<ConfirmationResult> => {
  // Ensure we're in a browser environment
  if (typeof window === "undefined") {
    throw new Error("This function can only run in the browser.");
  }

  // Ensure the container exists
  const recaptchaContainer = document.getElementById("recaptcha-container");
  if (!recaptchaContainer) {
    throw new Error(
      "reCAPTCHA container not found. Add a `<div id='recaptcha-container'></div>` to your HTML."
    );
  }

  try {
    // Initialize reCAPTCHA verifier if it doesn't exist
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth, // Firebase Auth instance (must come first)
        "recaptcha-container", // ID of the DOM element
        { size: "invisible" } // Options
      );
    }

    // Send OTP
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );

    // Store confirmation result for later use
    window.confirmationResult = confirmationResult;
    console.log("OTP sent successfully!");
    return confirmationResult;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw error; // Re-throw so the caller can handle it
  }
};
