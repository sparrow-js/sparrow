const request = require('request-promise-native');
const semver = require('semver');

module.exports = async function getNpmTarball(npm, version, registry) {
  const url = `${registry}/${npm}`;
  const body = await request({
    url,
    json: true,
  });

  if (!semver.valid(version)) {
    version = body['dist-tags'].latest;
  }

  if (
    semver.valid(version) &&
    body.versions &&
    body.versions[version] &&
    body.versions[version].dist
  ) {
    const tarball = body.versions[version].dist.tarball;
    return tarball;
  }

  throw new Error(`${name}@${version} 尚未发布`);
};
