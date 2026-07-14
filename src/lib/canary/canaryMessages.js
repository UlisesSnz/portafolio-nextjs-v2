import { normalizeCanaryAction } from './canaryActions';

export const normalizeCanaryDialogues = (dialogues = []) => {
  if (!Array.isArray(dialogues)) return [];

  return dialogues
    .filter((dialogue) => dialogue?.enabled !== false && dialogue?.message)
    .map((dialogue) => ({
      _key: dialogue._key,
      message: dialogue.message,
      action: normalizeCanaryAction(dialogue.action, 'talk'),
      trigger: dialogue.trigger || 'auto',
    }));
};

export const getCanaryDialoguesForTrigger = (dialogues = [], trigger = 'auto') =>
  normalizeCanaryDialogues(dialogues).filter((dialogue) => dialogue.trigger === trigger);

export const pickCanaryMessage = (messages = [], seed = 0) => {
  const availableMessages = messages.filter((message) => message?.message);
  if (!availableMessages.length) return null;

  return availableMessages[Math.abs(seed) % availableMessages.length];
};

export const buildCanaryContextMessages = (context = {}, t, formatDate) => {
  const messages = [];
  const pageType = context.pageType || 'site';
  const contentType = context.contentType === 'project' ? t('project') : t('post');
  const categories = Array.isArray(context.categories) ? context.categories : [];
  const activeTags = Array.isArray(context.activeTags) ? context.activeTags : [];

  if (pageType === 'blog') {
    messages.push({
      message: t('blogCount', { count: context.totalCount ?? 0 }),
      action: context.totalCount === 0 ? 'alert' : 'talk',
      trigger: 'auto',
    });
  }

  if (pageType === 'projects') {
    messages.push({
      message: t('projectCount', { count: context.totalCount ?? 0 }),
      action: context.totalCount === 0 ? 'alert' : 'talk',
      trigger: 'auto',
    });
  }

  if (pageType === 'search') {
    const category = context.categoryName || t('categoryFallback');
    messages.push({
      message: context.totalCount === 0
        ? t('searchEmpty', { category })
        : t('searchCount', { count: context.totalCount, category }),
      action: context.totalCount === 0 ? 'alert' : 'talk',
      trigger: 'auto',
    });
  }

  if (pageType === 'detail') {
    if (context.date) {
      messages.push({
        message: t('published', { type: contentType, date: formatDate(context.date) }),
        action: 'talk',
        trigger: 'auto',
      });
    }

    if (context.estimatedReadingTime) {
      messages.push({
        message: t('reading', { minutes: context.estimatedReadingTime }),
        action: 'talk',
        trigger: 'onHover',
      });
    }

    if (categories.length) {
      messages.push({
        message: t('marked', { categories: categories.map(({ name }) => `#${name}`).join(', ') }),
        action: 'talk',
        trigger: 'onHover',
      });
    }
  }

  if (pageType === 'notFound') {
    messages.push({ message: t('notFound'), action: 'glitch', trigger: 'auto' });
  }

  if (activeTags.length) {
    messages.push({
      message: t('activeFilter', { tags: activeTags.join(', ') }),
      action: 'talk',
      trigger: 'auto',
    });
  }

  if (context.activeType && context.activeType !== 'all') {
    messages.push({
      message: t(context.activeType === 'projects' ? 'onlyProjects' : 'onlyPosts'),
      action: 'talk',
      trigger: 'auto',
    });
  }

  if (context.activeSort) {
    messages.push({ message: t('sortChanged'), action: 'talk', trigger: 'onHover' });
  }

  return messages;
};
