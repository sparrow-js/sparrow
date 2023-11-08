import { linkTemplateUrl } from './linkTemplateUrl';
import { evalTemplate } from './evalTemplate';
import { LinkProps, Source, ProjectOptions } from '../types/types';
import { Targets } from '../shared';
import { OptionsStore } from './optionsStore';
import { transformPath } from './transformPath';

let internalProjectPath: string | null = null;
export function setInternalProjectPath(projectPath: string) {
  internalProjectPath = projectPath;
}

export function getSavedProjectPath(options: ProjectOptions) {
  return options.projectPath || internalProjectPath;
}

export function buildLink(
  linkProps: LinkProps,
  targets: Targets,
  options: ProjectOptions,
  localLinkTypeOrTemplate?: string,
): string {
  const params = {
    filePath: linkProps.filePath,
    projectPath: getSavedProjectPath(options) || linkProps.projectPath,
    line: String(linkProps.line),
    column: String(linkProps.column),
  };

  const template = linkTemplateUrl(targets, options, localLinkTypeOrTemplate);
  const replacePathObj = options.replacePath;
  let evaluated = evalTemplate(template, params);

  if (replacePathObj) {
    evaluated = transformPath(
      evaluated,
      replacePathObj.from,
      replacePathObj.to,
    );
  }
  return evaluated;
}

export function buildLinkFromSource(
  source: Source,
  targets: Targets,
  options: ProjectOptions,
): string {
  return buildLink(
    {
      filePath: source.fileName,
      projectPath: source.projectPath || '',
      line: source.lineNumber,
      column: source.columnNumber || 0,
    },
    targets,
    options,
  );
}
