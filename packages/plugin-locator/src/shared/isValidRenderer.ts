import { gte } from 'semver';

export const MIN_SUPPORTED_VERSION = '16.9.0';
export const BUNDLE_TYPE_PROD = 0;
export const BUNDLE_TYPE_DEV = 1;

export function isValidRenderer(
  {
    rendererPackageName,
    version,
    bundleType,
  }: {
    rendererPackageName?: string;
    version?: string;
    bundleType?: number;
  },
  reportError?: (message: string) => void,
): boolean {
  if (
    rendererPackageName !== 'react-dom' ||
    typeof version !== 'string' ||
    !/^\d+\.\d+\.\d+(-\S+)?$/.test(version) ||
    !gte(version, MIN_SUPPORTED_VERSION)
  ) {
    reportError &&
      reportError(
        `Unsupported React renderer (only react-dom v${MIN_SUPPORTED_VERSION}+ is supported). Renderer: ${
          rendererPackageName || 'unknown'
        }, Version: ${version || 'unknown'}`,
      );

    return false;
  }

  if (bundleType !== BUNDLE_TYPE_DEV) {
    reportError &&
      reportError(
        `Unsupported React renderer, only bundle type ${BUNDLE_TYPE_DEV} (development) is supported but ${bundleType} (${
          bundleType === BUNDLE_TYPE_PROD ? 'production' : 'unknown'
        }) is found`,
      );

    return false;
  }

  return true;
}
