import { Targets } from '../shared';
import { ProjectOptions } from '../types/types';

export const getLinkTypeOrTemplate = (
  targets: Targets,
  options: ProjectOptions,
  localLinkTypeOrTemplate?: string,
) =>
  localLinkTypeOrTemplate ||
  options.templateOrTemplateId ||
  document.documentElement.dataset.locatorTarget ||
  Object.entries(targets)[0]![0];

export function linkTemplateUrl(
  targets: Targets,
  options: ProjectOptions,
  localLinkTypeOrTemplate?: string,
): string {
  const templateOrType = getLinkTypeOrTemplate(
    targets,
    options,
    localLinkTypeOrTemplate,
  );
  const target = targets[templateOrType];
  if (target) {
    return target.url;
  }
  return templateOrType;
}
