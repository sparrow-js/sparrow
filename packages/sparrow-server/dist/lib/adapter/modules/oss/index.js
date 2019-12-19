"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AliOSS = require("ali-oss");
const pathExists = require("path-exists");
const path = require("path");
const dir = require("node-dir");
const DOMAIN = 'aliyuncs.com';
class OSS {
    constructor(params) {
        this.buildDir = 'build';
        const { project, storage } = params;
        this.project = project;
        this.storage = storage;
    }
    async getBuckets() {
        const oss = this.storage.get('oss');
        const params = oss.find(({ project }) => project === this.project.path);
        const { region } = params;
        const aliOSS = new AliOSS(Object.assign(Object.assign({}, params), { endpoint: `${region}.${DOMAIN}` }));
        const { buckets } = await aliOSS.listBuckets();
        return buckets;
    }
    async getConfig() {
        const oss = this.storage.get('oss');
        return oss.find(({ project }) => project === this.project.path) || {};
    }
    async setConfig(args) {
        const oss = this.storage.get('oss');
        let newConfig;
        const projectOSS = oss.find(({ project }) => project === this.project.path);
        if (projectOSS) {
            // Change the prototype chain
            newConfig = Object.assign(projectOSS, args, { project: this.project.path });
        }
        else {
            newConfig = Object.assign(Object.assign({}, args), { project: this.project.path });
            oss.push(Object.assign(Object.assign({}, args), { project: this.project.path }));
        }
        this.storage.set('oss', oss);
        return newConfig;
    }
    async upload(args, ctx) {
        const { i18n } = ctx;
        const oss = this.storage.get('oss');
        const params = oss.find(({ project }) => project === this.project.path);
        const buildPath = path.join(this.project.path, this.buildDir);
        if (!await pathExists(buildPath)) {
            throw new Error(i18n.format('baseAdapter.oss.upload.dirEmptyError', { buildDir: this.buildDir }));
        }
        const files = await dir.promiseFiles(buildPath);
        if (!files.length) {
            throw new Error(i18n.format('baseAdapter.oss.upload.buildEmptyError'));
        }
        const { bucket, directory, region } = params;
        const aliOSS = new AliOSS(Object.assign(Object.assign({}, params), { endpoint: `${region}.${DOMAIN}` }));
        await aliOSS.setBucket(bucket);
        return await Promise.all(files.map(async (file) => {
            const fileRelativePath = path.relative(buildPath, file);
            const storeFilepath = path.join(directory, fileRelativePath)
                .replace(/\\/g, '/')
                .replace(/^\//, '');
            let result;
            try {
                const data = await aliOSS.put(storeFilepath, file);
                if (data && data.res && data.res.status === 200) {
                    result = {
                        success: true,
                        url: data.url,
                        path: fileRelativePath,
                    };
                }
                else {
                    result = {
                        success: false,
                        url: data.url,
                        path: fileRelativePath,
                    };
                }
            }
            catch (error) {
                result = {
                    success: false,
                    path: fileRelativePath,
                    message: error.message,
                };
            }
            return result;
        }));
    }
}
exports.default = OSS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvbW9kdWxlcy9vc3MvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBa0M7QUFDbEMsMENBQTBDO0FBQzFDLDZCQUE2QjtBQUM3QixnQ0FBZ0M7QUFHaEMsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDO0FBRTlCLE1BQXFCLEdBQUc7SUFPdEIsWUFBWSxNQUEwQztRQUZ0QyxhQUFRLEdBQVcsT0FBTyxDQUFDO1FBR3pDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVTtRQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxNQUFNLE1BQU0sR0FBeUIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlGLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDMUIsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLGlDQUFLLE1BQU0sS0FBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLElBQUksTUFBTSxFQUFFLElBQUUsQ0FBQztRQUV4RSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVNLEtBQUssQ0FBQyxTQUFTO1FBQ3BCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxP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