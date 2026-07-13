import article from './article';
import category from './category';
import comment from './comment';
import education from './education';
import job from './job';
import portableTable from './portableTable';
import profile from './profile';
import project from './project';
import seo from './seo';
import seoPage from './seoPage';

export const schema = {
  types: [portableTable, seo, seoPage, profile, job, education, project, comment, category, article],
}
