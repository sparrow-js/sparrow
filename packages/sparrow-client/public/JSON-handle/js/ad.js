
JH.mod.add('ad', function (modName, JH) {
	var _pri_static = {}, _pro_static = {}, _interface = [];



	var _pub_static = function (oIni) {
		var _checkArgs, _parseDOM, _init, _uiEvt, _custEvt, _airEvt, _main, _this = this, _args = arguments, _pri = {}, _pro = {}, _pub = {__varyContext_:function (pro, pub) {_pro = pro;_pub = pub;}}, _mod, _base, _parent;

		_main = function () {
			_pub = JH.mod.init(_pub_static, _this, _pro, _pub, _pro_static, _interface).pub;
			if(oIni) {
				_pri.getIni = function (cb) {
					cb({
						code : 1,
						data : oIni
					});
				};
			}
		};



		_pri["request"] = JH.request(_pub);

		JH.mergePropertyFrom(_pri, {
			"setIni" : _pri.request.create(null, 'setIni'),
			"getIni" : function (cb) {
				_pri.request.create(null, 'getIni', {
					succeed : function (oIni) {
						cb(oIni);
					}
				}).send();
			},
			"fetchAd" : function (cb) {
				_pri.getIni(function (oResp) {
					var oIni = oResp.data;
					var aList = oIni.adList;
					var oAd = null;
					var currIndex = oIni.adIndex;
					if(aList && aList.length) {
						if(currIndex >= aList.length) {
							currIndex = 0;
						}
						oAd = aList[currIndex];
						currIndex++;
					}
					if(oAd && oIni.adShoot[oAd.id]) {
						oAd = null;
					}
					_pri.setIni.send({
						adIndex : currIndex
					});
					cb(oAd);
				});
			}

		});


		JH.mergePropertyFrom(_pub, {
			"getAd" : function (cb) {
				_pri.fetchAd(function (oAd) {
					cb(oAd);
				});
			},
			"getAdList" : function (cb) {
				_pri.getIni(function (oResp) {
					cb(oResp.data.adList);
				});
			},

			"destroy" : function(){
				if(_pub) {
					
					_pri = _pro = _pub = null;
				}
			}
		//-------------------------------------------
		});


		_main();


		return _pub;
		
	};

	return _pub_static;
});