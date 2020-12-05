<template>
  <div>
    <div id="jsonData" style="display:none;"></div>

    <div id="pathTips"></div>

    <div id="panel" class="min disTransition" style="display:none;">
      <span id="minBtn">◥</span>
      <div id="valueAct">
        <div class="topBox">
          <span class="inputTitle langID_title_1">Path: </span
          ><input
            type="text"
            id="showPath"
            readonly="true"
            class="textInpub"
          /><br />
          <span class="lableInput"
            ><span class="inputTitle langID_title_2">Key: </span
            ><input type="text" id="showKey" class="textInpub" /><span>
              :</span
            ></span
          >
          <span>
            <button id="copyValue" class="langID_button_9">复制</button>
            <span id="copyTips" class="copy-tips langID_msg_6"></span> </span
          ><br />
        </div>
        <textarea
          id="showValue"
          rows="22"
          cols="66"
          spellcheck="false"
        ></textarea
        ><br />
        <div class="bottomBox">
          <a href="#" target="_blank" id="showLink" class="langID_title_3"
            >Link</a
          >
          <button id="saveBtn" type="button" class="langID_button_1">
            修改
          </button>
          <button
            id="undoBtn"
            type="button"
            class="langID_button_5"
            style="visibility:hidden;"
          >
            &#8678;撤销
          </button>
          <button
            id="redoBtn"
            type="button"
            class="langID_button_6"
            style="visibility:hidden;"
          >
            前进&#8680;
          </button>
          <div id="msgBox"></div>

          <button id="gotoCur" type="button" class="langID_button_7">
            gotoCur
          </button>
          <button id="expandAll" type="button" class="langID_button_4">
            expandAll
          </button>
          <button id="collapseAll" type="button" class="langID_button_2">
            collapseAll
          </button>
          <button id="expandCur" type="button" class="langID_button_3">
            expandCur
          </button>
          <br /><br />
          <input type="checkbox" id="showValueInNav" checked="checked" /><label
            for="showValueInNav"
            class="langID_label_1"
            >显示值</label
          >
          <span id="showImgAuto"
            ><input type="checkbox" id="showImg" /><label
              for="showImg"
              class="langID_label_4"
              >自动展示图片</label
            ></span
          >
          <span
            ><input type="checkbox" id="showArrLeng" /><label
              for="showArrLeng"
              class="langID_label_5"
              >显示数组长度</label
            ></span
          >
          <input type="checkbox" id="showIco" /><label
            for="showIco"
            class="langID_label_2"
            >图标</label
          >
          <span id="showIcoAsFolder"
            ><input type="checkbox" id="icoAsFolder" /><label
              for="icoAsFolder"
              class="langID_label_3"
              >文件夹风格</label
            ></span
          >
          <div class="tools2">
            <button
              style="display:none;"
              disabled="true"
              id="saveFile"
              type="button"
              class="langID_button_8"
            >
              saveFile
            </button>
          </div>
        </div>
      </div>
      <button
        id="optBtn"
        class="setting-btn langTitleID_title_10"
        type="button"
      ></button>

      <div id="rcmd"></div>
    </div>
    <div id="jsonNav" class="treeNav"></div>
    <div id="mask" style="display:none;">
      <div id="enterInputDialog">
        <div id="enterInputTips">
          <label for="enterValue">Input JSON String... </label>
        </div>
        <form id="enterForm" method="get" action="">
          <textarea
            id="enterValue"
            name="enterValue"
            spellcheck="false"
          ></textarea
          ><br />
          <button
            id="jsObjEnterOk"
            type="button"
            name="inputFormat"
            value="jsObj"
            title="input string is js object code."
          >
            js object
          </button>
          <button id="enterOk" type="submit">OK</button>
        </form>
      </div>
    </div>
    <span id="sigh" style="display:none;">!</span>
    <div id="errorTips" style="display:none;">
      <div id="errorBtn"><span id="closeError">☓</span></div>
      <div id="tipsBox"></div>
      <div id="errorCode"></div>
    </div>
    <div id="hideBox"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'JsonHandler'
})
export default class extends Vue {
  @Prop({ default: JSON.stringify({}) }) private jsonData: string;
  private JH = null;

  @Watch('jsonData', { immediate: true })
  private onjsonDataChange() {
    this.JH &&
      this.JH.md.jsonH._pri.uiEvtCallback.submitEnterForm(this.jsonData);
  }

  created() {
    window.EventCustomer.addListener('get_jh', data => {
      this.JH = data;
      this.JH.md.jsonH._pri.uiEvtCallback.submitEnterForm(this.jsonData);
    });

    /* eslint-disable */
		chrome.extension = chrome.extension || {
			sendRequest : function (o, f) {
				config.mode = '';
				f({});
			}
		};
		setTimeout(function() {
			JH.request({}).create(null, 'getIni', {succeed : function (oResp) {

				var _pub_static = function () {var _pri = {}, _pub = {};
					var _init = function (oIni) {
						JH.md.jsonH.language = oIni.lang;
						JH.md.jsonH.oIni = oIni;
						_pri.oIni = oIni;
						
						if(config.mode === 'request') {
							var jsonH_Request = JH.request(_pub);
							var getJsonStringRequest = jsonH_Request.create(JH.request.NS.jsonH, 'getJsonString', {succeed : function (oResponseData, oRequestData) {
								_pri.startJsonH(oResponseData.data);
							}});
							try{
								getJsonStringRequest.send('first view');
							}catch(e) {
								_pri.startJsonH();
							}
							
						}else if(config.mode === 'script_string') {
							_pri.startJsonH(script_JsonString);
						}else if(config.mode === 'dom') {
							_pri.startJsonH($('#jsonData').html());
						}else{
							_pri.startJsonH();
						}

					};
					
					_pri["startJsonH"] = function (sJson) {
						var oJH = JH.md.jsonH(sJson);
						window.EventCustomer.emit('get_jh', JH);
						JH.e('#enterValue').select();

						if(_pri.oIni) {
							JH.e('#showValueInNav').checked = _pri.oIni.showValue === undefined ? true : _pri.oIni.showValue;
							oJH.checkShowValueInNav(JH.e('#showValueInNav'));

							JH.e('#showImg').checked = _pri.oIni.showImg;
							oJH.checkShowImg(JH.e('#showImg'));

							JH.e('#showArrLeng').checked = _pri.oIni.showArrLeng;
							oJH.checkShowArrLeng(JH.e('#showArrLeng'));

							JH.e('#showIco').checked = _pri.oIni.showIco;
							oJH.checkShowIco(JH.e('#showIco'));

							JH.e('#icoAsFolder').checked = _pri.oIni.showStyle == 'folder';
							oJH.checkIcoAsFolderBtn(JH.e('#icoAsFolder'));

							if(_pri.oIni.holdPanel) {
								oJH.showPanel(true);
							}else{
								oJH.hidePanel(true);
							}
						}
					};

					_pri["jsonH_error"] = function (sJson) {
						alert(sJson);
					};


					_init.apply(_pub, arguments);
					return _pub;
				};



				return _pub_static(oResp.data);

			}}).send();
			/* eslint-enable */
    });
  }
}
</script>
<style lang="scss" scoped>
#panel {
  display: none !important;
}
</style>
