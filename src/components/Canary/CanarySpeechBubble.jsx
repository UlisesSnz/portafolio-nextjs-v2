const actionToneClasses = {
  alert:
    "border-primary bg-light text-dark shadow-[4px_4px_0_rgba(182,62,150,0.22)] dark:border-primaryDark dark:bg-dark dark:text-light dark:shadow-[4px_4px_0_rgba(88,230,217,0.2)]",
  glitch:
    "border-dark bg-light text-dark shadow-[4px_4px_0_rgba(27,27,27,0.25)] dark:border-light dark:bg-dark dark:text-light dark:shadow-[4px_4px_0_rgba(245,245,245,0.2)]",
  happy:
    "border-primary bg-light text-dark shadow-[4px_4px_0_rgba(182,62,150,0.18)] dark:border-primaryDark dark:bg-dark dark:text-light dark:shadow-[4px_4px_0_rgba(88,230,217,0.18)]",
};

const CanarySpeechBubble = ({ action = "talk", message, side = "right" }) => {
  if (!message) {
    return null;
  }

  const toneClass =
    actionToneClasses[action] ||
    "border-dark bg-light text-dark shadow-[4px_4px_0_rgba(27,27,27,0.18)] dark:border-light dark:bg-dark dark:text-light dark:shadow-[4px_4px_0_rgba(245,245,245,0.18)]";

  const arrowClass =
    side === "left"
      ? "absolute -right-[7px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-inherit bg-inherit"
      : "absolute -left-[7px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b-2 border-l-2 border-inherit bg-inherit";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative max-w-full break-words rounded-md border-2 px-3 py-2 text-sm font-semibold leading-snug xs:text-xs ${toneClass}`}
    >
      <span aria-hidden="true" className={arrowClass} />
      {message}
    </div>
  );
};

export default CanarySpeechBubble;
