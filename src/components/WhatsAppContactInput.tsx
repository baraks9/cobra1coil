"use client";

import React, { useEffect, useRef, useState } from "react";

interface WhatsAppCTAButtonProps {
  phone?: string;
  placeholder?: string;
  buttonText?: string;
  helperText?: string;
  className?: string;
}

const WhatsAppCTAButton: React.FC<WhatsAppCTAButtonProps> = ({
  phone = "972502138028",
  placeholder = 'הקלד אזור שירות... למשל: תל אביב / רעננה / ראשל"צ',
  buttonText = "מצא מדביר",
  helperText = "טיפ: כתבו עיר/אזור וקבלו הצעת מחיר מהירה בווצאפ.",
  className = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showError, setShowError] = useState(false);
  const [pageTitle, setPageTitle] = useState("ללא כותרת");
  const hiddenLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setPageTitle(document.title || "ללא כותרת");
    }
  }, []);

  const handleSend = () => {
    const trimmedMsg = inputValue.trim();

    if (!trimmedMsg) {
      setShowError(true);
      return;
    }

    setShowError(false);
    const cleanPhone = phone.replace(/\D/g, "");
    const fullMessage = `מצא לי ${pageTitle} | ל${trimmedMsg}`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`;

    // הפעלת הקישור הנסתר עבור GTM
    if (hiddenLinkRef.current) {
      hiddenLinkRef.current.href = whatsappUrl;
      hiddenLinkRef.current.click();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSend();
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center gap-3 rounded-full border-4 border-green-400 bg-yellow-200 px-3 py-2 shadow-lg">
        <input
          type="text"
          className="flex-1 bg-white rounded-full px-4 py-2 text-gray-700 placeholder:text-gray-500 outline-none"
          placeholder={placeholder}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
            if (event.target.value.trim()) setShowError(false);
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-green-500 px-5 py-2 text-white font-bold hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleSend}
          disabled={!inputValue.trim()}
          aria-label="שלח בווצאפ"
        >
          {buttonText}
          <i className="icon-whatsapp" aria-hidden="true" />
        </button>
      </div>

      {helperText ? (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      ) : null}

      {showError ? (
        <p className="mt-2 text-sm text-red-600">אנא כתוב משהו לפני השליחה</p>
      ) : null}

      {/* קישור סמוי לטריגר Just Links ב-GTM */}
      <a
        ref={hiddenLinkRef}
        className="wa-link"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default WhatsAppCTAButton;