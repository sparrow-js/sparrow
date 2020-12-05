
JH.mod.add(['jsonH.nav', 'listenResizeWin', 'ad', 'lang'], 'jsonH', function (modName, JH, $$) {
	
		var _interface = [];
		
		
	

	

		var _pri_static = {
			langOut : function (key) {},
			// _pri.oLang.getStr('msg_1')
			// .langID_msg_1
			langPack : {}
		};
	

	
		var _pro_static = {
			
		};
	

	var _pub_static = function (sJson) {
		var _checkArgs, _parseDOM, _init, _uiEvt, _custEvt, _airEvt, _main, _this = this, _args = arguments, _pri = {}, _pro = {}, _pub = {__varyContext_:function (pro, pub) {_pro = pro;_pub = pub;}}, _mod, _base, _parent;
		

		_pri["checkEvalAuthority"] = (function () {
			var _fun = function () {
				if(!_fun.isOk()) {
					$(_pri.node['jsObjEnterOk']).hide();
				}
			};
		
			//_fun["isOk"] = function () {
				//try{
					//Function('var a;');
				//}catch(e) {
					//return false;
				//}
				//return true;
			//};

			_fun["isOk"] = function () {
				return !~location.href.indexOf('chrome-extension:');
			};
		

			return _fun;

		}());

		_main = function () {
			_mod = JH.mod.init(_pub_static, _this, _pro, _pub, _pro_static, _interface, _base, _args);
			_pro = _mod.pro;
			_pub = _mod.pub;
			_parent = _mod.parent;

			_pri.checkEvalAuthority();

			
			//_pub_static.oIni.times = 1;

			_pro.oTreeNav = $$.jsonH.nav('#jsonNav');
			if(_pub_static.oIni.renderMode) {
				$('html')[0].className = _pub_static.oIni.renderMode;
			}
			_pro.oTreeNav.buildCallback = function () {
				top.postMessage({
					cmd : 'jhLoadedOk'
				}, '*');
				if(_pub_static.oIni.times % 20 === 0) {
					//var oAd = $$.ad().getAd(function (oAd) {
						//if(oAd) {
							//_pri.showAd(oAd);
							//_pub.showPanel();
						//}
					//});
				}
				if(_pub_static.oIni.saveKeyStatus) {
					_pri.actCollapsePath();
				}
			};
			_pro.oTreeNav.changeFlodCallback = function () {
				var aCollapsePath = [];
				$('.elmBlock').each(function () {
					if(($(this).hasClass('array') || $(this).hasClass('object')) && !$(this).hasClass('open')) {
						aCollapsePath.push(this.getAttribute('nodePath'));
					}
				});
				//console.log(aCollapsePath);
				_pri.setIniRequest.send({
					collapsePath : aCollapsePath
				});
			};
			_pri.setIniRequest.send({
				times : ++_pub_static.oIni.times
				//console.log(_pub_static.oIni.times);
			});

			_pri.oTreeNavListener = JH.event.buildListener(_pub);
			
			_pri.oTreeNavListener.add(_pro.oTreeNav, 'clickElm', function () {
				if(!_pri.holdPanel) {
					_pub.showPanel();
				}
			});
			
			if(_pri.goEnterInput) {
				_pri.showEnterInputDialog(sJson);
			}else{
				try{
					_pro.oTreeNav.build(_pro.oTreeNav.JSON.parse(sJson));
				}catch(e) {
					top.postMessage({
						cmd : 'jhLoadedError',
						msg : e.message
					}, '*');
				}
				
			}
			
			_pub.checkIcoAsFolderBtn($('#icoAsFolder')[0]);
			_pub.checkShowValueInNav($('#showValueInNav')[0]);
			_pub.checkShowArrLeng($('#showArrLeng')[0]);
			_pub.checkShowIco($('#showIco')[0]);
			_pub.checkShowImg($('#showImg')[0]);
			
			
			_pub_static.language = _pub_static.oIni.lang;
			_pub.resetLang();

			var iSI = setInterval(function() {try{
				if(_pri.sTempShowValue != _pri.node['showValue'].value) {
					_pri.sTempShowValue = _pri.node['showValue'].value;
					_pri.node['showValue'].style.color = '#000';
					$('#msgBox').html('');
				}
			}catch(e) {alert(e);clearInterval(iSI);}},500);
			$$.listenResizeWin.add(_pri.resizeLayout);
			_pri.resizeLayout($$.listenResizeWin.checkResize());
			document.addEventListener('copy', function () {
				$('#copyTips').addClass('show');
				$('#copyTips').removeClass('hide');
				setTimeout(function() {
					$('#copyTips').removeClass('show');
					$('#copyTips').addClass('hide');
				});
			});




			if(_pub_static.oIni.times % 9 === 0) {
				_pri.getVer(function (iVer) {
					if(iVer !== _pub_static.oIni.adVer) {
						_pri.getAdData(_pub_static.oIni.times, function (oResp) {
							var oAdData = oResp.data;
							try{
								_pub_static.oIni.adList = oAdData.adList;
								_pub_static.oIni.adVer = oAdData.adVer;
								_pub_static.oIni.adIndex = 0;
								localStorage['jhIni'] = JSON.stringify(_pub_static.oIni);
							}catch(e) {}
						});
					}
				});
			}

			$('#panel').show();

		};
		

		
		_checkArgs = function () {
			if(!sJson) {
				_pri.goEnterInput = true;
			}
		};
		


		
		_parseDOM = function () {

			_pri.node = {
				showValue : JH.e('#showValue'),
				enterValue : JH.e('#enterValue'),
				undoBtn : JH.e('#undoBtn'),
				enterForm : JH.e('#enterForm'),
				minBtn : JH.e('#minBtn'),
				valueAct : JH.e('#valueAct'),
				panel : JH.e('#panel'),
				saveFile : JH.e('#saveFile'),
				enterInputTips : JH.e('#enterInputTips'),
				jsObjEnterOk : JH.e('#jsObjEnterOk'),
				copyValue : JH.e('#copyValue'),
				copyTips : JH.e('#copy-tips'),
				rcmd : JH.e('#rcmd'),
				optBtn : JH.e('#optBtn'),
				closeAd : JH.e('#closeAd'),
				redoBtn : JH.e('#redoBtn')
			};

		};
		


		
		_uiEvt = function () {
			$('#saveBtn').on('click', _pri.uiEvtCallback.clickSaveBtn);
			$('#showIco').on('click', _pri.uiEvtCallback.clickShowIco);
			$('#icoAsFolder').on('click', _pri.uiEvtCallback.clickIcoAsFolder);
			$('#expandAll').on('click', _pri.uiEvtCallback.clickExpandAll);
			$('#expandCur').on('click', _pri.uiEvtCallback.clickExpandCur);
			$('#collapseAll').on('click', _pri.uiEvtCallback.clickCollapseAll);
			$('#gotoCur').on('click', _pri.uiEvtCallback.clickGotoCur);
			//$('#saveFile').on('click', _pri.uiEvtCallback.clickSaveFile);
			$('#showValueInNav').on('click', _pri.uiEvtCallback.clickShowValueInNav);
			$('#showArrLeng').on('click', _pri.uiEvtCallback.clickShowArrLeng);
			$('#showImg').on('click', _pri.uiEvtCallback.clickShowImg);
			$(_pri.node['undoBtn']).on('click', _pri.uiEvtCallback.clickUndoBtn);
			$(_pri.node['redoBtn']).on('click', _pri.uiEvtCallback.clickRedoBtn);
			$(_pri.node['minBtn']).on('click', _pri.uiEvtCallback.clickMinBtn);
			$(_pri.node['jsObjEnterOk']).on('click', _pri.uiEvtCallback.jsObjEnterOkClick);
			$(_pri.node['copyValue']).on('click', _pri.uiEvtCallback.clickCopyValue);
			$(_pri.node['rcmd']).on('click', _pri.uiEvtCallback.clickRcmd);
			$(_pri.node['closeAd']).on('click', _pri.uiEvtCallback.clickCloseAd);
			$(_pri.node['optBtn']).on('click', _pri.uiEvtCallback.clickOptBtn);
			$(document).on('click', '.rcmdContent', _pri.uiEvtCallback.clickRcmdContent);

			$(_pri.node['enterForm']).on('submit', _pri.uiEvtCallback.submitEnterForm);
			$('#closeError').on('click', _pri.uiEvtCallback.clickCloseError);
			$('#sigh').on('click', _pri.uiEvtCallback.clickSigh);
			$('#showValue, #enterValue').on('focus', function () {
				if(!_pri.holdErrorTips) {
					$('#errorTips').hide();
				}
			});

		};
		


		
		_custEvt = function () {
			
		};
		


		
		_airEvt = function () {
			
		};


		_pri["request"] = JH.request(_pub);

		_pub["showPanel"] = function (bIni) {
			$(_pri.node['panel']).removeClass('min');
			_pri.node['minBtn'].innerHTML = '◥';
			if(bIni) {
				setTimeout(function() {
					$(_pri.node['panel']).removeClass('disTransition');
				},500);
			}
		};

		_pub["hidePanel"] = function (bIni) {
			$(_pri.node['panel']).addClass('min');
			_pri.node['minBtn'].innerHTML = '◣';
			if(bIni) {
				setTimeout(function() {
					$(_pri.node['panel']).removeClass('disTransition');
				},500);
			}
		};

		_pri["strToObj"] = function (s) {
			var sFun = 'var o = ' + s + ';return o;';
			var f = new window['Functio'+'n'.toString()](sFun);
			var o = f();
			return o;
		};

		JH.mergePropertyFrom(_pri, {
			"setIniRequest" : _pri.request.create(JH.request.NS.jsonH, 'setIni'),
			"getAdData" : function (iTimes, cb) {
				//_pri.request.create(JH.request.NS.jsonH, 'getAdData', {
					//succeed : function (oAdData) {
						//cb(oAdData);
					//}
				//}).send({
					//url : 'http://jsonhandle-addondownload.stor.sinaapp.com/jh.json?times='+iTimes
				//});
			},
			"actCollapsePath" : function () {
				if(_pub_static.oIni.collapsePath) {
					_pub_static.oIni.collapsePath.forEach(function (sPath) {
						$('[nodepath]').each(function () {
							if(this.getAttribute('nodepath') === sPath) {
								$(this).removeClass('open');
							}
						});
					});
				}
			},
			"openTab" : function (url, cb) {
				_pri.request.create(JH.request.NS.jsonH, 'openTab', {
					succeed : function (oAdData) {
						cb && cb(oAdData);
					}
				}).send(url);
			},
			"uiEvtCallback" : {
				clickCopyValue : function () {
					var eV = $('<textarea></textarea>')[0];
					eV.value = JSON.stringify($('#showValue').prop('oData'), 0, 4);
					if(eV.value[0] === '"' && eV.value.slice(-1) === '"') {
						eV.value = eV.value.slice(1, -1);
					}
					$('#hideBox').empty().append(eV);
					eV.select();
					document.execCommand('copy');
					$(eV).remove();
				},
				clickGotoCur : function () {
					var eCurr = _pro.oTreeNav.gotoCurrElm();
				},
				clickMinBtn : function () {
					_pri.holdPanel = true;
					if($(_pri.node['panel']).hasClass('min')) {
						_pub.showPanel();
					}else{
						_pub.hidePanel();
					}
				},
				clickRcmdContent : function () {
					_pri.shootAd(this.getAttribute('data-id'));
				},
				clickRcmd : function (evt) {
					_pri.showAdTips();
					if(evt.target.id === 'closeAd') {
						evt.stopPropagation();
					}else if(evt.target.className === 'adHelp') {
						evt.preventDefault();
						_pri.openTab(evt.target.href);
					}
				},
				clickOptBtn : function (evt) {
					_pri.openTab('options.html');
				},
				clickCloseAd : function (evt) {
					_pri.showAdTips();
				},
				jsObjEnterOkClick : function () {
					_pri.inputFormatIsJsObj = true;
					if(confirm('! Make sure the code is secure, The code will run as javascript !\n! 请确保内容是安全的, 输入内容将按javascript脚本执行 !')) {
						_pri.uiEvtCallback.submitEnterForm();
					}
				},
				submitEnterForm : function (evt) {
					var sData = '';
					if (typeof evt === 'string') {
						sData = evt;
					} else {
						if(evt) {
							evt.preventDefault();
						}
						_pri.hasError = false;
	
						sData = _pri.node['enterValue'].value;
					}

					var sTxt;
					if(_pri.inputFormatIsJsObj) {
						try{
							sTxt = JSON.stringify(_pri.strToObj(sData));
						}catch(e) {
							_pri.node['enterValue'].style.color = 'red';
							_pri.hasError = true;
							alert(e.message);
							_pri.inputFormatIsJsObj = false;
							return false;
						}
						
					}
					sTxt = sTxt || _pri.filterStrFormat(sData);
					try{
						_pro.oTreeNav.build(_pro.oTreeNav.JSON.parse(sTxt));
						_pri.hideEnterInputDialog();
					}catch(e) {
						try{
							var sTempData = sData.slice(sData.indexOf('(')+1, sData.lastIndexOf(')'));
							_pro.oTreeNav.build(_pro.oTreeNav.JSON.parse(sTempData));
							_pri.hideEnterInputDialog();
						}catch(e) {
							_pri.node['enterInputTips'].style.color = 'red';
							_pri.showErrorTips(sData);
							_pri.hasError = true;
						}
					}
					if(_pub_static.oIni.holdPanel) {
						_pub.showPanel(true);
					}else{
						_pub.hidePanel(true);
					}
					
					if(!_pri.hasError) {
						$('#errorTips, #sigh').hide();
					}else{
						$('#errorTips, #sigh').show();
					}
					
					_pri.inputFormatIsJsObj = false;
					
					return false;
				},
				clickUndoBtn : function () {
					_pri.historyGoBack();
				},
				clickSaveFile : function () {
					//this.disabled = false;
				},
				clickRedoBtn : function () {
					_pri.historyGoForward();
				},
				clickSaveBtn : function () {
					var sCurId, sEval, eCurId = _pro.oTreeNav.getCur(), oResult;
					if(!eCurId) {
						_pri.showMsg(_pri.oLang.getStr('msg_1'));
						return false;
					}
					sCurId = eCurId.id;
					var oData = _pro.oTreeNav.getData();
					var oHistoryData = oData;
					_pri.hasError = false;
					try{
						//eval('(' + $('#showValue').val() + ');');
						var sTxt = _pri.filterStrFormat($('#showValue').val());
						oResult = _pro.oTreeNav.JSON.parse(sTxt);
						//debugger;
						if($('#showKey').val() !== $('#showKey').attr('oldValue')) {
							var sNewKey = $('#showKey').val().replace(/\'/g, '\\\'');
							sEval = 'delete ' + 'oData' + $('#showPath').val().slice(4) + ';' + 'oData' + $('#showPath').attr('parentpath').slice(4) + "['" + sNewKey + "']" ;
						}else{
							sEval = $('#showPath').val();
							if(sEval[4] === '[') {
								sEval = sEval.slice(5).replace(']', '');
							}else{
								sEval = sEval.slice(5);
							}
							
						}


						_pri.pushToHistory([oHistoryData, sCurId]);
						_pri.node['undoBtn'].style.visibility = 'visible';
						_pri.node['redoBtn'].style.visibility = 'hidden';
						if(sEval) {
							JH.setTo(oResult, sEval, oData);
						}else{
							oData = oResult;
						}
						//console.log(sEval+'| '+oResult+'| '+ oData);
						//eval(sEval);
						sCurId = _pro.oTreeNav.getCur().id;
						//debugger;
						_pro.oTreeNav.build(oData);
						_pro.oTreeNav.collapseAll();
						_pro.oTreeNav.expandCur(sCurId);
						_pri.node['saveFile'].disabled = false;
					}catch(e) {
						_pri.hasError = true;
						$('#msgBox').html(_pri.oLang.getStr('msg_2'));
						_pri.sTempShowValue = _pri.node['showValue'].value;
						$('#showValue').css('color', 'red');
						_pri.showErrorTips(_pri.sTempShowValue);
					}
					if(!_pri.hasError) {
						$('#errorTips, #sigh').hide();
					}else{
						$('#errorTips, #sigh').show();
					}
				},
				clickShowImg : function () {
					_pri.setIniRequest.send({
						showImg : _pub.checkShowImg(this)
					});
				},
				clickShowValueInNav : function () {
					_pri.setIniRequest.send({
						showValue : _pub.checkShowValueInNav(this)
					});
				},
				clickShowArrLeng : function () {
					_pri.setIniRequest.send({
						showArrLeng : _pub.checkShowArrLeng(this)
					});
				},
				clickShowIco : function () {
					_pri.setIniRequest.send({
						showIco : _pub.checkShowIco(this)
					});
				},
				clickIcoAsFolder : function () {
					_pri.setIniRequest.send({
						showStyle : _pub.checkIcoAsFolderBtn(this) ? 'folder' : ''
					});
				},
				clickExpandAll : function () {
					_pro.oTreeNav.expandAll(this);
				},
				clickExpandCur : function () {
					var eCur = _pro.oTreeNav.getCur();
					if(eCur) {
						_pro.oTreeNav.collapseAll();
						_pro.oTreeNav.expandCur();
					}else{
						_pri.showMsg(_pri.oLang.getStr('msg_1'));
					}

				},
				clickCollapseAll : function () {
					_pro.oTreeNav.collapseAll();
				},
				clickCloseError : function () {
					$('#errorTips').toggle();
				},
				clickSigh : function () {
					$('#errorTips').toggle();
					_pri.holdErrorTips = true;
				}
			},
			"shootAd" : function (id) {
				_pub_static.oIni.adShoot[id] = true;
				_pri.setIniRequest.send({
					adShoot : _pub_static.oIni.adShoot
				});
			},
			"getVer" : function (cb) {
				//var sStatsPicUrl = 'http://jsonhandle-addondownload.stor.sinaapp.com/jh.png';
				//var eImg = new Image();
				//eImg.src = sStatsPicUrl;
				//eImg.onload = function () {
					//var iVer = eImg.width * eImg.height;
					//cb(iVer);
				//};
			},
			"resizeLayout" : function (oWH) {
				$('#showValue').height(oWH.height * 0.8 - 220);
			},
			"showAdTips" : function () {
				$(_pri.node.rcmd).addClass('tips').empty().append(JH.parseHTML('<a href="'+(_pub_static.oIni.jhPath||'')+'../options.html#ad" target="_blank" class="adHelp langID_msg_11">'+_pri.oLang.getStr('msg_11')+'</a>'));
			},
			"showAd" : function (oAd) {
				$(_pri.node.rcmd).append(JH.parseHTML('<a href="'+oAd.url+'" target="_blank" class="rcmdContent" data-id="'+oAd.id+'" title="'+oAd.title+'"><img src="'+oAd.pic+'" /></a><button id="closeAd">☓</button>'));
			},
			"filterStrFormat" : function (s) {
				s = s.replace(/^\s+/, '').replace(/\s+$/, '');
				if(s.substr(0, 1) === '"' && s.substr(-1, 1) === '"') {
					s = s.replace(/\n/g, '\\n').replace(/\r/g, '').replace(/\t/g, '\\t');
				}
				return s;
			},
			"encodeToXMLchar" : function (sValue) {
				return sValue.replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;').replace(/\"/g,'&quot;');
			},
			"pushToHistory" : function (aData) {
				// [oData, sCurId]
				_pri.historyBackData = [_pro.oTreeNav.JSON.parse(_pro.oTreeNav.JSON.stringify(aData[0])), aData[1]];
			},
			"showErrorTips" : function (sJson) {
				var oJsonCheck = oLineCode(sJson);
				if(oJsonCheck.oError) {
					var s = _pri.oLang.getStr('msg_4') + _pri.oLang.getStr('msg_5', oJsonCheck.oError.line+1) + ' : ' + '<span id="errorTarget">'+_pri.encodeToXMLchar(oJsonCheck.oError.lineText)+'</span>';
					$('#tipsBox').html(s);
					_pri["holdErrorTips"] = false;
				}else{
					//alert('ok');
				}
				$('#errorCode').html(oJsonCheck.dom);
			},
			"historyGoBack" : function () {
				if(_pri.historyBackData) {
					_pri.historyForwardData = [_pro.oTreeNav.getData(), _pro.oTreeNav.getCur().id];
					_pro.oTreeNav.build(_pri.historyBackData[0]);
					_pro.oTreeNav.expandCur(_pri.historyBackData[1]);
					_pri.node['undoBtn'].style.visibility = 'hidden';
					_pri.node['redoBtn'].style.visibility = 'visible';
				}
			},
			"historyGoForward" : function () {
				if(_pri.historyForwardData) {
					_pri.historyBackData = [_pro.oTreeNav.getData(), _pro.oTreeNav.getCur().id];
					_pro.oTreeNav.build(_pri.historyForwardData[0]);
					_pro.oTreeNav.expandCur(_pri.historyForwardData[1]);
					_pri.node['undoBtn'].style.visibility = 'visible';
					_pri.node['redoBtn'].style.visibility = 'hidden';
				}
			},
			"showMsg" : function (sMsg) {
				$('#msgBox').html(sMsg);
				clearTimeout(_pri.showMsg.iS);
				_pri.showMsg.iS = setTimeout(function() {
					$('#msgBox').html('');
				},4000);
			},
			"showEnterInputDialog" : function (sJson) {
				sJson = sJson || '\u007b\u000d\u000a\u0020\u0020\u0020\u0020\u0022\u006c\u0031\u0022\u003a\u0020\u007b\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0031\u005f\u0031\u0022\u003a\u0020\u005b\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0031\u005f\u0031\u005f\u0031\u0022\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0031\u005f\u0031\u005f\u0032\u0022\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u005d\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0031\u005f\u0032\u0022\u003a\u0020\u007b\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0031\u005f\u0032\u005f\u0031\u0022\u003a\u0020\u0031\u0032\u0031\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u007d\u000d\u000a\u0020\u0020\u0020\u0020\u007d\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0022\u006c\u0032\u0022\u003a\u0020\u007b\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0032\u005f\u0031\u0022\u003a\u0020\u006e\u0075\u006c\u006c\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0032\u005f\u0032\u0022\u003a\u0020\u0074\u0072\u0075\u0065\u002c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0022\u006c\u0032\u005f\u0033\u0022\u003a\u0020\u007b\u007d\u000d\u000a\u0020\u0020\u0020\u0020\u007d\u000d\u000a\u007d';
				//sJson = JSON.stringify({
					//"l1": {
						//"l1_1": [
							//'http://toy.ggg/ad/ad1.png',
							//'http://toy.ggg/ad/ad2.png',
							//'http://toy.ggg/ad/ad3.png',
							//'http://toy.ggg/ad/ad4.png',
							////"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2997908931,3785893858&fm=58&t=.jpg",
							////"http://thumbs.dreamstime.com/z/%CA%AF%BD%A3-16312849.jpg",
							////"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2997908931,3785893858&fm=58&t=.jpag",
							////"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2997908931,3785893858&fm=58&t=.japg",
							////"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2997908931,3785893858&fm=58&t=.jpag",
							////"http://b.hiphotos.baidu.com/zhidao/pic/item/9f510fb30f2442a7688dff7ad143ad4bd0130269.jpg"
						//],
						//"l1_2": {
							//"l1_2_1": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2997908931,3785893858&fm=58&t=.jpg"
						//}
					//},
					//"l2": {
						//"l2_1": null,
						//"l2_2": true,
						//"l2_3": {}
					//}
				//});
				$('#mask').show();
				_pri.node['enterValue'].value = sJson;
			},
			"hideEnterInputDialog" : function () {
				$('#mask').hide();
			}

		});

		JH.mergePropertyFrom(_pro, {
			
			
		
		});
		

		JH.mergePropertyFrom(_pub, {
			
			"resetLang" : function () {
				_pri.oLang = $$.lang(_pub_static.language);
				_pri.oLang.setPage();
				//_pri.oLang.switchLang(sLang).setPage();
			},
			"langStr" : function (sId) {
				var sL = _pub_static.language || 'en';
				return _pri_static.langPack[sL][sId];
			},
			"checkShowValueInNav" : function (elm) {
				if(elm.checked) {
					$('#jsonNav').addClass('showValueInNav');
				}else{
					$('#jsonNav').removeClass('showValueInNav');
				}
				return elm.checked;
			},
			"checkShowArrLeng" : function (elm) {
				if(elm.checked) {
					$('#jsonNav').addClass('show-leng');
				}else{
					$('#jsonNav').removeClass('show-leng');
				}
				
				$('#jsonNav').addClass('lengMode-'+_pub_static.oIni.showLengthMode);
				return elm.checked;
			},
			"checkShowImg" : function (elm) {
				//elm.typeShow = _pub_static.oIni.showImgMode;
				if(elm.checked) {
					_pro.oTreeNav.showAllImg = true;
					$('#jsonNav').addClass('showImg');
					if(_pub_static.oIni.showImgMode === 'all') {
						$('#jsonNav').removeClass('hover-show-img');
						if(!$('#jsonNav').hasClass('hasLoadedValueImg')) {
							_pro.oTreeNav.renderValueImg();
						}
					}else{
						$('#jsonNav').addClass('hover-show-img');
						$('#jsonNav').on('mouseenter', '.elmSpan .value', function () {
							if(!$(this).hasClass('check-img')) {
								$(this).addClass('check-img');
								_pro.oTreeNav.checkValueImg(this);
							}
						});
					}
				}else{
					$('#jsonNav').removeClass('showImg');
				}
				return elm.checked;
			},
			"checkShowIco" : function (elm) {
				if(elm.checked) {
					$('#jsonNav').removeClass('noIco');
					$('#showIcoAsFolder').show();
				}else{
					$('#jsonNav').addClass('noIco');
					$('#showIcoAsFolder').hide();
				}
				return elm.checked;
			},
			"checkIcoAsFolderBtn" : function (elm) {
				if(elm.checked && $('#showIco')[0].checked) {
					$('#jsonNav').addClass('folderIco');
					$('#showIcoAsFolder').show();
				}else{
					$('#jsonNav').removeClass('folderIco');
				}
				return elm.checked;
			},
			"destroy" : function(){
				if(_pub) {
					
					
					_pri = _pro = _pub = null;
				}
			}
		
		});


		
		_init= function(){
			if(_checkArgs()) {
				return false;
			}
			_parseDOM();
			_main();
			_uiEvt();
			_custEvt();
			_airEvt();
			_pri.uiEvtCallback.submitEnterForm();
		};
		_init();
		
		_pub_static._pri = _pri;


		return _pub;
		
	};

	return JH.mergePropertyFrom(_pub_static, {
	
		language : 'en',
	
	});
});