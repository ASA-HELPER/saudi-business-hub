export const validatePasswordConditions = (pw: string): boolean => {
  if (pw.length < 8) return false;

  const letters = pw.match(/[A-Za-z]/g) || [];
  const digits = pw.match(/\d/g) || [];
  const specialChars = pw.match(/[^A-Za-z0-9]/g) || [];

  return letters.length >= 5 && digits.length >= 2 && specialChars.length >= 1;
};

export const checkPasswordStrength = (pw: string): "weak" | "avg" | "good" | "" => {
  if (!pw) return "";

  if (validatePasswordConditions(pw)) return "good";

  const letters = pw.match(/[A-Za-z]/g) || [];
  const digits = pw.match(/\d/g) || [];
  const specialChars = pw.match(/[^A-Za-z0-9]/g) || [];

  if (
    pw.length >= 8 &&
    ((letters.length >= 5 && digits.length >= 2) ||
      (letters.length >= 5 && specialChars.length >= 1) ||
      (digits.length >= 2 && specialChars.length >= 1))
  ) {
    return "avg";
  }

  return "weak";
};
