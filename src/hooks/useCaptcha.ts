// Create custom hook to handle captcha

import { useState } from "react";

export const useCaptcha = () => {
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleCaptchaChange = (token: string | null) => {
    setIsCaptchaVerified(!!token);
  };

  return { isCaptchaVerified, handleCaptchaChange };
};
