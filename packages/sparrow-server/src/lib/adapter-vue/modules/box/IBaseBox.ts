export interface IBaseBox {
  getBox(): Promise<void>,
}


/**
 * export interface IGitModule extends IBaseModule {
  getStatus(params: any, ctx: IContext): Promise<IGitGetStatus>;
  init(params: {remoteUrl: string}): Promise<void>;
  setRemote(params: {remoteUrl: string}): Promise<void>;
  checkoutLocalBranch(params: {name: string}): Promise<void>;
  switchBranch(params: IGitSwitchBranchParams): Promise<void>;
  getBranches(): Promise<IGitBranchs>;
  pull(params: {branch: string}): Promise<void>;
  push(params: {branch: string}): Promise<void>;
  addAndCommit(params: IGitAddAndCommitParams): Promise<void>;
  getLog(branches: string[]): Promise<IGitGetLog>;
}
 */