import { normalizeCanaryAction } from "./canaryActions";

const formatter = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const pluralize = (count, singular, plural) => (count === 1 ? singular : plural);

export const normalizeCanaryDialogues = (dialogues = []) => {
  if (!Array.isArray(dialogues)) {
    return [];
  }

  return dialogues
    .filter((dialogue) => dialogue?.enabled !== false && dialogue?.message)
    .map((dialogue) => ({
      _key: dialogue._key,
      message: dialogue.message,
      action: normalizeCanaryAction(dialogue.action, "talk"),
      trigger: dialogue.trigger || "auto",
    }));
};

export const getCanaryDialoguesForTrigger = (dialogues = [], trigger = "auto") =>
  normalizeCanaryDialogues(dialogues).filter(
    (dialogue) => dialogue.trigger === trigger
  );

export const pickCanaryMessage = (messages = [], seed = 0) => {
  const availableMessages = messages.filter((message) => message?.message);

  if (!availableMessages.length) {
    return null;
  }

  return availableMessages[Math.abs(seed) % availableMessages.length];
};

export const buildCanaryContextMessages = (context = {}) => {
  const messages = [];
  const pageType = context.pageType || "site";
  const contentLabel = context.contentType === "project" ? "proyecto" : "post";
  const categories = Array.isArray(context.categories) ? context.categories : [];
  const activeTags = Array.isArray(context.activeTags) ? context.activeTags : [];

  if (pageType === "blog") {
    messages.push({
      message: `Hay ${context.totalCount ?? 0} ${pluralize(
        context.totalCount,
        "post",
        "posts"
      )} en esta vista.`,
      action: context.totalCount === 0 ? "alert" : "talk",
      trigger: "auto",
    });
  }

  if (pageType === "projects") {
    messages.push({
      message: `Estoy viendo ${context.totalCount ?? 0} ${pluralize(
        context.totalCount,
        "proyecto",
        "proyectos"
      )}.`,
      action: context.totalCount === 0 ? "alert" : "talk",
      trigger: "auto",
    });
  }

  if (pageType === "search") {
    messages.push({
      message:
        context.totalCount === 0
          ? `No encontré resultados para ${context.categoryName || "esta categoría"}.`
          : `Encontré ${context.totalCount} ${pluralize(
              context.totalCount,
              "resultado",
              "resultados"
            )} para ${context.categoryName || "esta categoría"}.`,
      action: context.totalCount === 0 ? "alert" : "talk",
      trigger: "auto",
    });
  }

  if (pageType === "detail") {
    if (context.date) {
      messages.push({
        message: `Este ${contentLabel} fue publicado el ${formatter.format(
          new Date(context.date)
        )}.`,
        action: "talk",
        trigger: "auto",
      });
    }

    if (context.estimatedReadingTime) {
      messages.push({
        message: `Se lee en unos ${context.estimatedReadingTime} minutos.`,
        action: "talk",
        trigger: "onHover",
      });
    }

    if (categories.length) {
      messages.push({
        message: `Lo tengo marcado en ${categories
          .map((category) => `#${category.name}`)
          .join(", ")}.`,
        action: "talk",
        trigger: "onHover",
      });
    }
  }

  if (pageType === "notFound") {
    messages.push({
      message: "Esta ruta no existe. Yo también estoy confundido.",
      action: "glitch",
      trigger: "auto",
    });
  }

  if (activeTags.length) {
    messages.push({
      message: `Filtro activo: ${activeTags.join(", ")}.`,
      action: "talk",
      trigger: "auto",
    });
  }

  if (context.activeType && context.activeType !== "all") {
    messages.push({
      message: `Solo estoy mirando ${context.activeType === "projects" ? "proyectos" : "posts"}.`,
      action: "talk",
      trigger: "auto",
    });
  }

  if (context.activeSort) {
    messages.push({
      message: "El orden cambió; voy siguiendo el rastro.",
      action: "talk",
      trigger: "onHover",
    });
  }

  return messages;
};
