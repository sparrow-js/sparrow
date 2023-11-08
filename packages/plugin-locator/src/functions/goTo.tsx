import { Targets } from '../shared';
import { buildLinkFromSource, buildLink } from './buildLink';
import { LinkProps, Source, ProjectOptions } from '../types/types';
import { OptionsStore } from './optionsStore';
export const HREF_TARGET = '_self';

export function goTo(link: string, options: OptionsStore) {
  window.open(link, options.getOptions().hrefTarget);
}

export function goToLinkProps(
  linkProps: LinkProps,
  targets: Targets,
  options: ProjectOptions,
) {
  const link = buildLink(linkProps, targets, options);
  window.open(link, options.hrefTarget || HREF_TARGET);
}

export function goToSource(
  source: Source,
  targets: Targets,
  options: OptionsStore,
) {
  return goTo(buildLinkFromSource(source, targets, options), options);
}
