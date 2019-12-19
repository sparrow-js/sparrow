"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = require("package-json");
const storage_1 = require("./storage");
exports.default = async (source, iceVersion) => {
    let version = source.version;
    // TODO special material logic
    if (iceVersion === '1.x') {
        version = source['version-0.x'] || source.version;
    }
    const registryUrl = typeof source.npm === 'string' && source.npm.startsWith('@icedesign')
        ? 'https://registry.npm.taobao.org'
        : ((storage_1.default.get('npmClient') === 'custom' && storage_1.default.get('registry')) || source.registry);
    const packageData = await package_json_1.default(source.npm, {
        version,
        registryUrl,
    });
    return packageData.dist.tarball;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGFyYmFsbFVSTEJ5TWF0ZXJpZWxTb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2dldFRhcmJhbGxVUkxCeU1hdGVyaWVsU291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXVDO0FBQ3ZDLHVDQUFnQztBQUdoQyxrQkFBZSxLQUFLLEVBQUUsTUFBMEIsRUFBRSxVQUFtQixFQUFtQixFQUFFO0lBQ3hGLElBQUksT0FBTyxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFFckMsOEJBQThCO0lBQzlCLElBQUksVUFBVSxLQUFLLEtBQUssRUFBRTtRQUN4QixPQUFPLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7S0FDbkQ7SUFFRCxNQUFNLFdBQVcsR0FBRyxPQUFPLE1BQU0sQ0FBQyxHQUFHLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUN2RixDQUFDLENBQUMsaUNBQWlDO1FBQ25DLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssUUFBUSxJQUFJLGlCQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTVGLE1BQU0sV0FBVyxHQUFRLE1BQU0sc0JBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ3JELE9BQU87UUFDUCxXQUFXO0tBQ1osQ0FBQyxDQUFDO0lBRUgsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUNsQyxDQUFDLENBQUMifQ==