
JH.mod.add('JSON', function (modName, JH) {
	var _pri_static = {}, _pro_static = {}, _interface = [];



	var _pub_static = function () {
		var _checkArgs, _parseDOM, _init, _uiEvt, _custEvt, _airEvt, _main, _this = this, _args = arguments, _pri = {}, _pro = {}, _pub = {__varyContext_:function (pro, pub) {_pro = pro;_pub = pub;}}, _mod, _base, _parent;

		_pub = JH.mergePropertyFrom(JSON, _pub);

		_main = function () {
			_pub = JH.mod.init(_pub_static, _this, _pro, _pub, _pro_static, _interface).pub;

		};




		JH.mergePropertyFrom(_pri, {

			

		});


		JH.mergePropertyFrom(_pub, {



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