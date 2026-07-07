export const CANARY_ACTION_EVENT = "canary:action";

export const CANARY_ACTIONS = {
  idle: {
    action: "idle",
    label: "Idle",
    folder: "01_IDLE",
    frames: 4,
    fps: 4,
    loop: true,
    priority: 10,
    cooldown: 0,
    interruptible: true,
    fallback: "idle",
  },
  blink: {
    action: "blink",
    label: "Blink",
    folder: "02_BLINK",
    frames: 2,
    fps: 5,
    loop: false,
    priority: 20,
    cooldown: 3500,
    interruptible: true,
    fallback: "idle",
    fallbackDuration: 450,
  },
  hop: {
    action: "hop",
    label: "Hop",
    folder: "03_HOP",
    frames: 4,
    fps: 7,
    loop: false,
    priority: 40,
    cooldown: 1200,
    interruptible: true,
    fallback: "idle",
    fallbackDuration: 620,
  },
  fly: {
    action: "fly",
    label: "Fly",
    folder: "04_FLY",
    frames: 6,
    fps: 9,
    loop: true,
    priority: 55,
    cooldown: 2500,
    interruptible: false,
    fallback: "idle",
    fallbackDuration: 1650,
  },
  sleep: {
    action: "sleep",
    label: "Sleep",
    folder: "05_SLEEP",
    frames: 2,
    fps: 2,
    loop: true,
    priority: 100,
    cooldown: 0,
    interruptible: false,
    fallback: "sleep",
  },
  curious: {
    action: "curious",
    label: "Curious",
    folder: "06_CORIOUS",
    frames: 3,
    fps: 5,
    loop: false,
    priority: 35,
    cooldown: 1400,
    interruptible: true,
    fallback: "idle",
    fallbackDuration: 760,
    frameStyles: {
      1: {
        transform: "scale(1.37)",
        transformOrigin: "50% 100%",
      },
    },
  },
  talk: {
    action: "talk",
    label: "Talk",
    folder: "07_TALK",
    frames: 4,
    fps: 6,
    loop: true,
    priority: 70,
    cooldown: 1000,
    interruptible: true,
    fallback: "idle",
    fallbackDuration: 1200,
  },
  alert: {
    action: "alert",
    label: "Alert",
    folder: "08_ALERT",
    frames: 3,
    fps: 6,
    loop: false,
    priority: 80,
    cooldown: 2200,
    interruptible: false,
    fallback: "idle",
    fallbackDuration: 1300,
  },
  glitch: {
    action: "glitch",
    label: "Glitch",
    folder: "09_GLITCH",
    frames: 3,
    fps: 8,
    loop: false,
    priority: 30,
    cooldown: 30000,
    interruptible: true,
    fallback: "idle",
    fallbackDuration: 700,
  },
  happy: {
    action: "happy",
    label: "Happy",
    folder: "10_HAPPY",
    frames: 3,
    fps: 6,
    loop: false,
    priority: 60,
    cooldown: 1600,
    interruptible: true,
    fallback: "idle",
    fallbackDuration: 780,
  },
};

export const CANARY_ACTION_NAMES = Object.keys(CANARY_ACTIONS);

export const CANARY_INTENTS = {
  contentPreview: {
    intent: "contentPreview",
    action: "talk",
    duration: 1100,
    hoverDelay: 240,
    move: false,
  },
  filterInspect: {
    intent: "filterInspect",
    action: "talk",
    duration: 1200,
    holdAction: true,
    holdMessage: true,
    ignoreCooldown: true,
    messageDuration: 1800,
    hoverDelay: 180,
    move: false,
    priority: 58,
  },
  filterApply: {
    intent: "filterApply",
    action: "hop",
    duration: 620,
    messageDuration: 1600,
    move: false,
    priority: 58,
  },
  anchorJump: {
    intent: "anchorJump",
    action: "hop",
    duration: 620,
    move: false,
  },
  navPreview: {
    intent: "navPreview",
    action: "blink",
    duration: 450,
    hoverDelay: 260,
    move: false,
  },
  navCommit: {
    intent: "navCommit",
    action: "fly",
    force: true,
    duration: 900,
    move: false,
  },
  positiveAction: {
    intent: "positiveAction",
    action: "happy",
    duration: 780,
    move: false,
  },
  problemState: {
    intent: "problemState",
    action: "alert",
    force: true,
    move: false,
  },
  selfInspect: {
    intent: "selfInspect",
    action: "blink",
    duration: 450,
    move: false,
  },
};

export const CANARY_INTENT_NAMES = Object.keys(CANARY_INTENTS);

export const CANARY_ACTION_OPTIONS = Object.values(CANARY_ACTIONS).map(
  ({ action, label }) => ({
    title: label,
    value: action,
  })
);

export const CANARY_DIALOGUE_TRIGGERS = [
  { title: "Auto", value: "auto" },
  { title: "Al entrar", value: "onEntry" },
  { title: "Al pasar encima", value: "onHover" },
  { title: "Al hacer click", value: "onClick" },
];

export const DEFAULT_CANARY_ACTION = "idle";
export const DEFAULT_CANARY_SIZE = 36;

export const normalizeCanaryAction = (action, fallback = DEFAULT_CANARY_ACTION) =>
  CANARY_ACTIONS[action] ? action : fallback;

export const normalizeCanaryIntent = (intent) =>
  CANARY_INTENTS[intent] ? intent : null;

export const getCanaryActionConfig = (action) =>
  CANARY_ACTIONS[normalizeCanaryAction(action)];

export const getCanaryIntentConfig = (intent) =>
  CANARY_INTENTS[normalizeCanaryIntent(intent)] || null;

export const getCanaryFrameSrc = (action, frameIndex) => {
  const config = getCanaryActionConfig(action);
  const frameNumber = String(frameIndex + 1).padStart(2, "0");

  return `/canary/${config.folder}/${frameNumber}.png`;
};

export const getCanaryActionDuration = (action) => {
  const config = getCanaryActionConfig(action);

  return Math.ceil((config.frames / config.fps) * 1000);
};

export const triggerCanaryAction = (detail = {}) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(CANARY_ACTION_EVENT, {
      detail,
    })
  );
};
