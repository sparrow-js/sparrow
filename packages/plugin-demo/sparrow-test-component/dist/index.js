"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sparrow_utils_1 = require("@sparrow-vue/sparrow-utils");
const _ = require("lodash");
const fsExtra = require("fs-extra");
const path = require("path");
const cwd = process.cwd();
class TestComponent extends sparrow_utils_1.Component {
    constructor(params, storge) {
        super(storge);
        this.name = 'TestComponent';
        this.config = {};
        this.initVueParse();
        const { initType } = params;
        if (initType === 'auto') {
            this.config = params;
        }
        else {
            this.config = _.cloneDeep(require('./config').default);
        }
        this.setAttrsToStr();
    }
    initVueParse() {
        const fileStr = fsExtra.readFileSync(path.join(__dirname, '..', 'src/index.vue'), 'utf8');
        this.vueParse = new sparrow_utils_1.VueParse(this.uuid, fileStr);
    }
    insertEditText(params) {
        this.config.model.custom.label = params.value;
    }
    fragment() {
        const type = this.storage.get('preview_view_status') || 0;
        let divider = '';
        if (type === 0) {
            divider = `
      <div>
        <el-button :plain="true" @click="open">打开消息提示</el-button>
        <el-button :plain="true" @click="openVn">VNode</el-button>
      <div>`;
        }
        else {
            divider = `
        <div>
          <el-button :plain="true" @click="open">打开消息提示</el-button>
          <el-button :plain="true" @click="openVn">VNode</el-button>
        <div>
      `;
        }
        return divider;
    }
}
exports.default = TestComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4REFBK0Q7QUFDL0QsNEJBQTRCO0FBQzVCLG9DQUFvQztBQUNwQyw2QkFBNkI7QUFDN0IsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLE1BQXFCLGFBQWMsU0FBUSx5QkFBUztJQU1sRCxZQUFhLE1BQVcsRUFBRSxNQUFXO1FBQ25DLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQU5oQixTQUFJLEdBQVcsZUFBZSxDQUFDO1FBQy9CLFdBQU0sR0FBUSxFQUFFLENBQUM7UUFNZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsTUFBTSxFQUFDLFFBQVEsRUFBQyxHQUFHLE1BQU0sQ0FBQztRQUMxQixJQUFJLFFBQVEsS0FBSyxNQUFNLEVBQUc7WUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDdEI7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEQ7UUFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVPLFlBQVk7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDaEMsTUFBTSxPQUFPLEdBQVUsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHdCQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sY0FBYyxDQUFFLE1BQU07UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2hELENBQUM7SUFHTSxRQUFRO1FBRWIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNkLE9BQU8sR0FBRzs7OztZQUlKLENBQUE7U0FDUDthQUFNO1lBQ0wsT0FBTyxHQUFHOzs7OztPQUtULENBQUM7U0FDSDtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQWpERCxnQ0FpREMifQ==