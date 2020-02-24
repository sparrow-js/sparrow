chrome.extension = chrome.extension || {
	sendRequest : function (o, f) {
		config.mode = '';
		f({});
	}
};



//chrome.extension.sendRequest({cmd:'getIni'}, (function () {
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

					//try{
						_pri.startJsonH(oResponseData.data);
					//}
					//catch(e) {
						//_pri.jsonH_error(oResponseData.data);
					//}
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
				//showValueInNav
				//showIco
				//icoAsFolder
				//showValue : Application.prefs.getValue('extensions.jsonhandle.showValue', true),
				//showIco : Application.prefs.getValue('extensions.jsonhandle.showIco', false),
				//showStyle : Application.prefs.getValue('extensions.jsonhandle.showStyle', '')
				//"checkShowIco" : function (elm) {
				//"checkShowValueInNav" : function (elm) {
				//"checkIcoAsFolderBtn" : function (elm) {//debugger;
		};

		_pri["jsonH_error"] = function (sJson) {
			alert(sJson);
		};


		_init.apply(_pub, arguments);
		return _pub;
	};



	return _pub_static(oResp.data);

}}).send();
});




//}()));





