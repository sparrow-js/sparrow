
JH.mod.add(['JSON'], 'treeNav', function (modName, JH, $$) {
	var _interface = [], _pri_static = {}, _pro_static = {};

	var _pub_static = function (sId) {
		var _checkArgs, _parseDOM, _init, _uiEvt, _custEvt, _airEvt, _main, _this = this, _args = arguments, _pri = {}, _pro = {}, _pub = {__varyContext_:function (pro, pub) {_pro = pro;_pub = pub;}}, _mod, _base, _parent;
		


		_main = function () {
			_pub = JH.mod.init(_pub_static, _this, _pro, _pub, _pro_static, _interface).pub;

			_pub.JSON = $$.JSON();
			_pri.level = [0];
			_pri.event = JH.event.buildEvent(_pub);
			

		};



		_checkArgs = function () {
			if(!sId) {
				JH.throwLine('缺少模块入口节点id');
			}
		};




		_parseDOM = function () {

			_pri.checkCur();
			
		};




		_uiEvt = function () {
			$(sId).on('m'.charAt()+'ousedown', '.elmBlock', _pri.uiEvtCallback.mousedowElmBlock);
			$(sId).on('d'.charAt()+'blclick', '.elmBlock', _pri.uiEvtCallback.dblclicElmBlock);
			$(sId).on('m'.charAt()+'ouseover', '.elmBlock', _pri.uiEvtCallback.mouseoveElmBlock);
			$(sId).on('m'.charAt()+'ouseout', '.elmBlock', _pri.uiEvtCallback.mouseouElmBlock);
		};



		_custEvt = function () {
			_pri.event.define('clickElm');
			_pri.event.define('overElm');
			_pri.event.define('outElm');
			_pri.event.define('drawElm');
		};




		_airEvt = function () {
			
		};



		JH.mergePropertyFrom(_pri, {

			uiEvtCallback : {
				dblclicElmBlock : function () {
					_pri.toggleList(this);
					return false;
				},
				mousedowElmBlock : function (evt) {
					var eT = $(evt.target);
					var eCurTemp;
					if(eT.closest('.row').length > 0) {
						if(eT.hasClass('ico') || eT.closest('.elmBox').length > 0) {
							_pri.actElm(this);
							return false;
						}
					}
					_pri.toggleList(this);
					return false;
				},
				mouseoveElmBlock : function (eBlock) {
					_pro.overElmCallback(this);
					_pri.event.fire('overElm', eBlock);
					return false;
				},
				mouseouElmBlock : function (eBlock) {
					_pro.outElmCallback(this);
					_pri.event.fire('outElm', eBlock);
					return false;
				}
			},
			"encodeToXMLchar" : function (sValue) {
				return sValue.replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;').replace(/\"/g,'&quot;');
			},
			"toggleList" : function (elm) {
				//$('>.elmList', elm).toggle();
				//if($('>.elmList', elm).css('display') === 'none') {
					//$(elm).removeClass('open');
				//}else{
					//$(elm).addClass('open');
				//}
				$(elm).toggleClass('open');
				_pro.changeFlodCallback();
			},
			"actCur" : function (eCurTemp) {
				eCurTemp.toggleClass('cur');
				_pri.eCur.toggleClass('cur');
				_pri.eCur = eCurTemp;
			},
			"checkCur" : function () {
				_pri.eCur = $('.cur').eq(0);
				$('.cur').removeClass('cur');
				_pri.eCur.addClass('cur');
			},
			"actElm" : function (eBlock) {
				_pri.actCur($(eBlock));
				_pro.clickElmCallback(eBlock);
				// _pri.event.fire('clickElm', eBlock);

			},
			"drawElm" : function (oData, sKey, targetBox) {//debugger;
				var sType, nextTarget, elmBlock;
				oData = typeof oData === 'undefined' ? null : oData;
				targetBox = targetBox || _pri.documentFragment;
				sKey = (sKey === undefined ? 'JSON' : sKey);
				_pri.level[_pri.level.length - 1] = _pri.level[_pri.level.length - 1] + 1;
				if(oData instanceof Array) {
					sType = 'array';
				}else if(typeof oData === 'number') {
					sType = 'number';
				}else if(typeof oData === 'string') {
					sType = 'string';
				}else if(typeof oData === 'boolean') {
					sType = 'boolean';
				}else if(oData === null) {
					sType = 'null';
				}else{
					sType = 'object';
				}
				
				var sLevel = _pri.level.slice(0).join('_');

				if(targetBox.tagName && targetBox.tagName === 'UL') {
					elmBlock = document.createElement('li');
				}else{
					elmBlock = document.createElement('div');
				}
				elmBlock.className = 'elmBlock ' + _pro.icoConfig[sType].className;
				elmBlock.id = sId.slice(1) + '_l'+sLevel.slice(2);
				var showID = '', sValue = '';
				//showID = ' | ' + elmBlock.id;
				//debugger;
				sValue = _pub.JSON.stringify(oData, null, 4);
				sValue = _pri.encodeToXMLchar(sValue);
				var sElmKeyType = 'object-key';
				if(targetBox.elmType === 'array') {
					sElmKeyType = 'array-key';
				}
				var leng = -1;
				if(sType === 'array') {
					leng = oData.length;
				}else if(sType === 'object') {
					leng = Object.keys(oData).length;
				}
				var sHTML = [
					'<div class="row">',
						'<img class="ico" src="css/treePic/' + _pro.icoConfig[sType].icoName + '" alt="" />',
						'<div class="elmBox">',
							'<span class="elmSpan"><span class="elm '+sElmKeyType+'" title="' + sValue + '">' + sKey + showID + '</span></span>',
							leng > -1 ? '<span class="array-leng">'+leng+'</span>' : '',
						'</div>',
					'</div>'
				].join('');
				
				JH.elementHtml(elmBlock, sHTML);
				if(sType === 'array' || sType === 'object') {
					nextTarget = document.createElement('ul');
					nextTarget.className = 'elmList';
					elmBlock.appendChild(nextTarget);
				}

				targetBox.appendChild(elmBlock);
				elmBlock.oData = oData;
				elmBlock.sKeyName = sKey;
				elmBlock.sType = sType;
				if(_pub.showAllImg) {
					_pro.drawElmCallback(elmBlock, 1);
					$('#jsonNav').addClass('hasLoadedValueImg');
				}else{
					_pro.drawElmCallback(elmBlock);
				}
				
				_pri.event.fire('drawElm', elmBlock);

				if(sType === 'array') {
					_pri.level.push(0);
					nextTarget.elmType = 'array';
					JH.forEach(oData, _pri.drawElmFun, nextTarget);
					_pri.level.pop();
				}else if(sType === 'object') {
					_pri.level.push(0);
					JH.forIn(oData, _pri.drawElmFun, nextTarget);
					_pri.level.pop();
				}
				
			},
			"drawElmFun" : function (value, key) {
				_pri.drawElm(value, key, this);

			},
			"insertChildNodesTo" : function (eSrc, eTarget) {
				while(eSrc.firstChild) {
					eTarget.appendChild(eSrc.firstChild);
				}
			},
			"documentFragment" : document.createElement('div'),

			"drawElmCallback" : function (eBlock, bShowImg) {
				var sV = _pub.JSON.stringify(eBlock.oData);
				var sImg = '', sHasImgClass = '';
				//debugger;
				if(bShowImg && _pri.isImgUrl(sV)) {
					sImg = '<br /><img src="'+_pri.encodeToXMLchar(sV.slice(1, -1))+'" />';
					$(eBlock).addClass('imgUrl');
				}
				if(sImg) {
					sHasImgClass = 'has-img';
				}
				if($(eBlock).hasClass('node')) {
					$('.elmSpan', eBlock).append('<span class="value '+sHasImgClass+'">' + _pri.encodeToXMLchar(sV) + sImg +'</span>');
				}
			},

			"isImgUrl" : function (sV) {
				sV = sV.slice(1, -1);
				var bUrl = false;
				if(/^(http\:|https\:|file\:).+/.test(sV)) {
					bUrl = true;
				}
				if(bUrl) {
					var aP = sV.split('?');
					var sP = aP[0];
					if(/.+(\.jpg|\.jpeg|\.gif|\.png|\.ico|\.bmp)$/.test(sP)) {
						return  true;
					}
				}
				if(/^(data\:image\/).+/.test(sV)) {
					return  true;
				}
				return false;
			}

		});

		JH.mergePropertyFrom(_pro, {

			"icoConfig" : {
				'array' : {
					className : 'open folder array',
					icoName : 'objectOpen.gif'
				},
				'number' : {
					className : 'node number',
					icoName : 'elm.gif'
				},
				'string' : {
					className : 'node string',
					icoName : 'elm.gif'
				},
				'boolean' : {
					className : 'node boolean',
					icoName : 'elm.gif'
				},
				'null' : {
					className : 'node null',
					icoName : 'elm.gif'
				},
				'object' : {
					className : 'open folder object',
					icoName : 'objectOpen.gif'
				}
			},
			"fixTreeView" : function (eTree) {
				$('.elmList', eTree).each(function (iIndex, eUl) {
					var eLastChild = $('>li:last-child', eUl).eq(0);
					if(eLastChild) {
						eLastChild.addClass('last');
					}
					if(!$('>*', eUl).length) {
						$(eUl).parent().addClass('empty');
					}
				});
				$('div.elmBlock', eTree).each(function (iIndex, eDiv) {

					$(eDiv).addClass('root');
				});
			},
			"clickElmCallback" : function (eBlock) {


			},
			"overElmCallback" : function (eBlock) {
				
			},
			"outElmCallback" : function (eBlock) {
				
			},
			"changeFlodCallback" : function (eBlock) {
				
			},
			"drawElmCallback" : function (eBlock) {
				_pri.drawElmCallback(eBlock);
			}


		});

		JH.mergePropertyFrom(_pub, {

			"build" : function (oData, sKey) {
				//alert(_pub.JSON.stringify(oData, null, 4));

				JH.elementHtml(JH.e(sId), '');
				JH.elementHtml(_pri.documentFragment, '');
				JH.e(sId).setAttribute('data-json', JSON.stringify(oData, null, 4));
				_pro.data = oData;
				_pri.drawElm(oData, sKey);
				_pro.fixTreeView(_pri.documentFragment);

				//debugger;
				JH.e(sId).appendChild(_pri.documentFragment);
				_pub.expandCur('jsonNav_l');
				_pub.buildCallback();
			},
			"buildCallback" : function () {
				
			},
			"expandCur" : function (sId) {
				sId = sId || '';
				if(sId) {
					sId = (sId.slice(0, 1) === '#' ? '' : '#') + sId;
				}
				var eCur = JH.e(sId);
				eCur = eCur || _pub.getCur();
				if(eCur) {
					_pri.actElm(eCur);
					$(eCur).parents('.elmList').each(function (i, e) {
						//$(e).show();
						$(e).parent().addClass('open');
					});
				}
				_pro.changeFlodCallback();
				//location.hash = '';
				//location.hash = eCur.id;

				$(document).scrollTop($(eCur).offset().top - 100);
			},
			"getCurrElm" : function () {
				return _pri.eCur;
			},
			"gotoCurrElm" : function () {
				var eCur = _pub.getCurrElm();
				if(eCur) {
					$(document).scrollTop($(eCur).offset().top - 100);
				}
			},
			"expandAll" : function () {
				$(sId + ' .elmList').each(function (i, e) {
					$(e).parent().addClass('open');
				});
				_pro.changeFlodCallback();
			},
			"collapseAll" : function () {
				$('.root>.elmList .elmList').each(function (i, e) {
					//$(e).hide();
					$(e).parent().removeClass('open');
				});
				_pro.changeFlodCallback();
			},
			"getCur" : function () {
				var eCur = null;
				if($(sId + ' .cur').length) {
					eCur = $('.cur')[0];
				}
				return eCur;
			},
			"checkValueImg" : function (eElmValue) {
				var eBlock = $(eElmValue).parents('.elmBlock')[0];
				var sV = _pub.JSON.stringify(eBlock.oData);
				if(_pri.isImgUrl(sV)) {
					sImgHtml = '<img src="'+_pri.encodeToXMLchar(sV.slice(1, -1))+'" />';
					$(eBlock).addClass('imgUrl');
					$(eElmValue).addClass('has-img').append(sImgHtml);
				}
			},
			"renderValueImg" : function () {
				$('#jsonNav').addClass('hasLoadedValueImg');
				$('.elmBlock').each(function () {
					if(!$('.elmBlock', this).length) {
						$('.value', this).remove();
						_pro.drawElmCallback(this, true);
						_pri.event.fire('drawElm', this);
					}
				});
			},
			"destroy" : function(){
				if(_pub) {
					_pri = _pro = _pub = null;
				}
			}

		});



		_init= function(){
			_checkArgs();
			_parseDOM();
			_main();
			_uiEvt();
			_custEvt();
			_airEvt();
		};
		_init();



		return _pub;
		
	};

	return JH.mergePropertyFrom(_pub_static, {

		

	});
});