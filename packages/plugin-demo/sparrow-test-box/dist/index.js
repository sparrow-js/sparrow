"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sparrow_utils_1 = require("@sparrow-vue/sparrow-utils");
const _ = require("lodash");
class Divider extends sparrow_utils_1.Component {
    constructor(params, storge) {
        super(storge);
        this.name = 'Divider';
        this.config = {};
        const { initType } = params;
        if (initType === 'auto') {
            this.config = params;
        }
        else {
            this.config = _.cloneDeep(require('./config').default);
        }
        this.setAttrsToStr();
    }
    insertEditText(params) {
        this.config.model.custom.label = params.value;
    }
    fragment() {
        const type = this.storage.get('preview_view_status') || 0;
        let divider = '';
        if (type === 0) {
            divider = `<el-divider ${this._attrStr}></el-divider> <div>asdasd</div>`;
        }
        else {
            divider = `
        <el-divider ${this._attrStr}></el-divider>
        <div>asdasd</div>
      `;
        }
        return divider;
    }
}
exports.default = Divider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4REFBcUQ7QUFDckQsNEJBQTRCO0FBRTVCLE1BQXFCLE9BQVEsU0FBUSx5QkFBUztJQUs1QyxZQUFhLE1BQVcsRUFBRSxNQUFXO1FBQ25DLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUxoQixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBQ3pCLFdBQU0sR0FBUSxFQUFFLENBQUM7UUFLZixNQUFNLEVBQUMsUUFBUSxFQUFDLEdBQUcsTUFBTSxDQUFDO1FBQzFCLElBQUksUUFBUSxLQUFLLE1BQU0sRUFBRztZQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN0QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU0sY0FBYyxDQUFFLE1BQU07UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2hELENBQUM7SUFHTSxRQUFRO1FBRWIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNkLE9BQU8sR0FBRyxlQUFlLElBQUksQ0FBQyxRQUFRLGtDQUFrQyxDQUFBO1NBQ3pFO2FBQU07WUFDTCxPQUFPLEdBQUc7c0JBQ00sSUFBSSxDQUFDLFFBQVE7O09BRTVCLENBQUM7U0FDSDtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQW5DRCwwQkFtQ0MifQ==