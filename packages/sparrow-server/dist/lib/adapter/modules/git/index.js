"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gitPromie = require("simple-git/promise");
class Git {
    constructor(params) {
        const { project, storage } = params;
        this.project = project;
        this.storage = storage;
        this.gitTools = gitPromie(this.project.path);
    }
    async getOriginBranches() {
        return await this.gitTools.branch(['--remotes', '--list', '-v']);
    }
    async getLocalBranches() {
        return await this.gitTools.branchLocal();
    }
    getUnstagedFiles(gitStatus) {
        const types = ['conflicted', 'not_added', 'modified', 'created', 'deleted', 'renamed'];
        let unstageFiles = [];
        if (gitStatus && gitStatus.files && gitStatus.files.length > 0) {
            types.forEach((type) => {
                const statusFiles = gitStatus[type];
                if (statusFiles) {
                    unstageFiles = unstageFiles.concat(statusFiles.map((file) => ({
                        type,
                        file,
                    })));
                }
            });
        }
        return unstageFiles;
    }
    async getStatus(params, ctx) {
        const { logger } = ctx;
        const isRepository = await this.gitTools.checkIsRepo();
        let currentBranch = '';
        let localBranches = [];
        let originBranches = [];
        let remoteUrl = '';
        let unstageFiles = [];
        try {
            const gitStatus = await this.gitTools.status();
            const branchLocal = await this.getLocalBranches();
            currentBranch = gitStatus.current;
            localBranches = branchLocal.all;
            const branchOrigin = await this.getOriginBranches();
            originBranches = branchOrigin.all;
            const originRemotes = await this.gitTools.getRemotes(true);
            const originRemote = originRemotes[0];
            if (originRemote && originRemote.refs) {
                remoteUrl = originRemote.refs.push;
            }
            unstageFiles = this.getUnstagedFiles(gitStatus);
        }
        catch (err) {
            logger.warn(err);
        }
        return {
            isRepository,
            remoteUrl,
            currentBranch,
            localBranches,
            originBranches,
            unstageFiles,
        };
    }
    async init(params) {
        const { remoteUrl } = params;
        await this.gitTools.init();
        await this.gitTools.addRemote('origin', remoteUrl);
    }
    async setRemote(params) {
        const { remoteUrl } = params;
        const originRemotes = await this.gitTools.getRemotes(true);
        if (originRemotes.length > 0) {
            await this.gitTools.removeRemote('origin');
        }
        await this.gitTools.addRemote('origin', remoteUrl);
    }
    async checkoutLocalBranch(params) {
        const { name } = params;
        const gitStatus = await this.gitTools.status();
        await this.gitTools.checkoutBranch(name, gitStatus.current);
    }
    async switchBranch(params) {
        const { checkoutBranch } = params;
        await this.gitTools.checkout(checkoutBranch);
    }
    async getBranches() {
        await this.gitTools.fetch();
        const originBranches = await this.gitTools.branch(['--remotes', '--list', '-v']);
        const localBranches = await this.gitTools.branchLocal();
        return {
            localBranches: localBranches.all,
            originBranches: originBranches.all,
        };
    }
    async pull(params) {
        const { branch } = params;
        await this.gitTools.pull('origin', branch);
    }
    async push(params) {
        const { branch } = params;
        await this.gitTools.push('origin', branch, { '--set-upstream': null });
    }
    async addAndCommit(params) {
        const { message, files } = params;
        await this.gitTools.add(files);
        await this.gitTools.commit(message);
    }
    async getLog(branches) {
        return await this.gitTools.log(branches);
    }
}
exports.default = Git;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2FkYXB0ZXIvbW9kdWxlcy9naXQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBZ0Q7QUFHaEQsTUFBcUIsR0FBRztJQU90QixZQUFZLE1BQTBDO1FBQ3BELE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVPLEtBQUssQ0FBQyxpQkFBaUI7UUFDN0IsT0FBTyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTyxLQUFLLENBQUMsZ0JBQWdCO1FBQzVCLE9BQU8sTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxTQUFTO1FBQ2hDLE1BQU0sS0FBSyxHQUFHLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2RixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDOUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNyQixNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMs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