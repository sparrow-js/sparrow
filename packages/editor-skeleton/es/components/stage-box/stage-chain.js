import { EventEmitter } from 'events';
var StageChain = /*#__PURE__*/function () {
  function StageChain(stage) {
    this.emitter = void 0;
    this.stage = void 0;
    this.emitter = new EventEmitter();
    this.stage = stage;
  }
  var _proto = StageChain.prototype;
  _proto.stagePush = function stagePush(stage) {
    if (!stage) return;
    stage.setPrevious(this.stage);
    stage.setReferLeft(this.stage);
    this.stage = stage;
    this.emitter.emit('stagechange');
  };
  _proto.stageBack = function stageBack() {
    var stage = this.stage.getPrevious();
    if (!stage) return;
    stage.setReferRight(this.stage);
    this.stage = stage;
    this.emitter.emit('stagechange');
  }

  /**
   * 回到最开始
   */;
  _proto.stageBackToRoot = function stageBackToRoot() {
    var rootStage = this.stage.getPrevious();
    while (rootStage && !rootStage.isRoot) {
      rootStage = rootStage.getPrevious();
    }
    if (!rootStage) return;
    rootStage.setReferRight(this.stage);
    this.stage = rootStage;
    this.emitter.emit('stagechange');
  };
  _proto.getCurrentStage = function getCurrentStage() {
    return this.stage;
  };
  _proto.onStageChange = function onStageChange(func) {
    var _this = this;
    this.emitter.on('stagechange', func);
    return function () {
      _this.emitter.removeListener('stagechange', func);
    };
  };
  return StageChain;
}();
export { StageChain as default };