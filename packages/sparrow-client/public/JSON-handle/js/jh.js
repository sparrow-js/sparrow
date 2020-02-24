if(!JH) {var JH;(function () {
	var root = this, $;

	var forInAct = function (obj, fnF, bOwn, oContent) {
		oContent = oContent || obj;
		var i, l, bRF, err;
		if(!obj) {
			return false;
		}
		if(!fnF || ({}).toString.call(fnF) !== "[object Function]") {
			err = new Error('第二参数不为函数。');
			err.message += err.stack;
			throw err;
		}
		for (i in obj) {
			if(bOwn && !obj.hasOwnProperty(i)) {
				continue;
			}
			bRF = fnF.call(oContent, obj[i], i);
			if(bRF !== undefined) {
				return bRF;
			}
		}
	};

	JH = $ = {
		"__ver_" : '1.2.0.2',
		/**
		* 创建一个函数 
			* @author gaoyuan
			* @name newFun
			* @memberOf JH
			* @function
			* @return {Function} 返回一个函数
			* 
			* @param fn {Function} 函数构造逻辑

			* @example 
			<pre>
				var f = JH.newFun(function ($) {
					var _fun = function (a) {
						_fun.id++;
						alert(a);
					};

					return $.mergePropertyFrom(_fun, {
						'id': 0,
						'showId': function () {
							alert(_fun.id);
						}
					});
				});
				f('a');
				f('b');
				alert(f.id);
			</pre>
			*/
		"newFun" : function (fn) {
			return fn($);
		},

		"extendObj" : function (obj, property) {
			var c = function () {};
			c.prototype = obj;
			var o = new c();
			o.constructor = c;
			if(property) {
				$.mergePropertyFrom(o, property);
			}
			return o;
		},

		"mergePropertyFrom" : function(targetObj, srcObj, notOwnIsOk) {//debugger;
			var i;
			for (i in srcObj) {
				if(notOwnIsOk || srcObj.hasOwnProperty(i)) {
					targetObj[i] = srcObj[i];
				}
			}
			return targetObj;
		},

		/**
		* 遍历数组 
			* @author gaoyuan
			* 
			* @name forEach
			* @param aE {Array} 要遍历的数组
			* @param fnF {Function} 遍历时执行的操作函数
			* @param thisArg {Object} fnF的this指向此对象，没有指向window
			* @example 
			<pre>

				JH.forEach(a, function (oE) {
					b.push(oE+1)
				});


				JH.forEach(a, function (oE, i) {
					a[i] = oE+1;
				});

				JH.forEach(a, function (oE) {
					a[i] = oE + this.b;
				}, {b:1});

			</pre>
			*/
		"forEach" : function (aE, fnF, thisArg) {
			var i, l, bRF, err;
			if(!fnF || ({}).toString.call(fnF) !== "[object Function]") {
				err = new Error('第二参数必须是函数。');
				err.message += err.stack;
				throw err;
			}
			if(!aE || aE.length === undefined || aE.length.constructor !== Number) {
				err = new Error('第一参数必须是数组。');
				err.message += err.stack;
				throw err;
			}
			thisArg = thisArg || aE;
			for (i=0, l = aE.length; i < l; ++i) {
				bRF = fnF.call(thisArg, aE[i], i);
				if(bRF !== undefined) {
					return bRF;
				}
			}
		},
		"forEachDel" : function (aE, fnF, thisArg) {
			thisArg = thisArg || aE;
			var i, l, bRF;
			for (i=0, l = aE.length; i < l; ++i) {
				if(fnF.call(thisArg, aE[i], i)) {
					aE.splice(i, 1);
					i--;
					l--;
				}
			}
			return aE;
		},
		/**
		* 遍历对象 
			* @author gaoyuan
			* 
			* @name forIn
			* @param array {Array} 要遍历的数组
			* @param function {Function} 遍历时执行的操作函数
			* @param boolean 是否只遍历自有属性
			* @example 
			<pre>

				JH.forIn(a, function (oE) {
					b.push(oE+1)
				});


				JH.forIn(a, function (oE, i) {
					a[i] = oE+1;
				});

			</pre>
			*/
		"forIn" : function (obj, fnF, thisArg) {
			return forInAct(obj, fnF, false, thisArg);
		},

		"forInOwn" : function (obj, fnF, thisArg) {
			return forInAct(obj, fnF, true, thisArg);
		},
		
		"throwLine" : function (sMsg, noThrow) {
			var err;
			err = new Error(sMsg);
			var sErrMsg = err.message;
			if(err.stack) {
				err.message += (err.stack.toString()).replace(sErrMsg, '');
			}
			if(!noThrow) {
				throw err;
			}
			return {
				log : err.message,
				message : sErrMsg,
				toString : function () {
					return err.message;
				}
			};
		},

		"md" : {
			__modInfo_ : {
				nsName : 'JH.md'
			}
		},

		/**
		* 按w3c方式注册事件 
			* @author gaoyuan
			* 
			* @return {Function} 注册到事件监听的函数引用
			* 
			* @param obj {htmlElement} 注册事件的元素
			* @param type {String} 事件名称  注意：没有“on”前缀  正确写法为 ‘click’，‘mouse out’
			* @param fn {Function} 事件要响应的函数
			* 
			* @example 
			<pre>
			//给id为‘button1’的元素添加一个click事件监听，事件触发时输出元素的id值
			var fff = JH.addEvent(JH.$('#button1'),'click',function () {
				alert('我的id值为'+this.id);
			});

			//注销掉‘button1’的click事件响应的fff函数
			//JH.removeEvent(JH.$('#button1'),'click',fff);
			</pre>
			*/
		"addEvent" : function(obj, type, fn){
			if(obj.addEventListener){
				obj.addEventListener(type,fn,false);
			}else if(obj.attachEvent) {
				obj[type+fn] = function () {
					return fn.call(obj, root.event);
				};
				obj.attachEvent('on'+type,obj[type+fn]);
			}
			return fn;
		},

		/**
		* 按w3c方式注销事件 
			* @author gaoyuan
			* 
			* @param obj {htmlElement} 注销事件的元素
			* @param type {String} 事件名称
			* @param fn {Function} 事件要注销的函数
			* 
			* @example 
			<pre>
			//给id为‘button1’的元素添加一个click事件监听，事件触发时输出元素的id值
			var fff = JH.addEvent(JH.$('#button1'),'click',function () {
				alert('我的id值为'+this.id);
			});

			//注销掉‘button1’的click事件响应的fff函数
			//JH.removeEvent(JH.$('#button1'),'click',fff);
			</pre>
			*/
		"removeEvent" : function (obj, type, fn){
			if(obj.removeEventListener){
				if(fn !== null){
					obj.removeEventListener(type, fn, false);
				}
			}else if(obj.detachEvent) {
				if(obj[type+fn]) {
					obj.detachEvent('on'+type, obj[type+fn]);
					obj[type+fn] = null;
					//delete obj[type+fn];
				}
			}
			return obj;
		},

		"e" : function (s) {
			if(!s) {
				return null;
			}
			if(s.slice(0,1) !== '#') {
				return $.throwLine('如果选择元素ID必须用#开头。');
			}
			return root.document.getElementById( s.slice(1));
		},

		"setTo" : function (oValue, sPath, oRoot) {
			var pack, current = oRoot;
			var aPath = $.str.parseJsonPath(sPath);
			while(aPath.length) {
				pack = aPath.shift();
				if(aPath.length) {
					current[pack] = current[pack] || {};
					current = current[pack];
				}else{
					current[pack] = oValue;
				}
			}
			
		},

		"getFrom" : function (sPath, oRoot) {
			oRoot = oRoot || root;
			var mod;
			var aPath = $.str.parseJsonPath(sPath);
			mod = oRoot[aPath.shift()];
			while(mod && aPath.length) {
				mod = mod[aPath.shift()];
			}
			return mod;
		}

	};

	$["mod"] = {

		'NS' : $.md,

		//JH.mod.add([
				//'common.editDialog',
				//'kit.string.trim',
				//APP,
				//'common.regDialog',
				//'common.loginDialog'
		//],'modName', function (modName, $, $$, $$$) {
		'add' : function (aImport, modName, fn, ns) {
			var oTemp;
			if(typeof aImport === 'string') {
				ns = fn;
				fn = modName;
				modName = aImport;
				aImport = null;
			}
			if(typeof ns === 'string') {
				ns = $.mod.get(ns);
			}
			ns = ns || $.md;
			var oMod = $.getFrom(modName, ns);
			if(oMod) {
				// 可能有无modInfo的对象已存在
				if(oMod.__modInfo_ === undefined) {
					oTemp = oMod;
				}else{
					return false;
				}
			}
			var oCite = $.mod.getImport(aImport);
			oMod = fn(modName, $, oCite.mod, oCite.modEx);
			$.mod.set(modName, oMod, ns);
			oMod.__modInfo_ = {
				ns : ns.__modInfo_.nsName,
				modName : modName,
				//operation : {},
				//attr : {},
				parent : null
			};
			if(oTemp) {
				$.mergePropertyFrom(oMod, oTemp);
			}

			return oMod;
		},

		'getImport' : function (aImport) {
			var i, l, err;
			var mod = {}, modEx = {};
			var oCiteNs = mod;
			var oNS = $.mod.NS || $.md;
			if(aImport) {
				for (i=0, l = aImport.length; i < l; ++i) {
					if(typeof aImport[i] === 'string') {
						$.setTo($.getFrom(aImport[i], oNS), aImport[i], oCiteNs);
					}else{
						if(aImport[i] && aImport[i].__modInfo_ && aImport[i].__modInfo_.nsName) {
							oNS = aImport[i];
							oCiteNs = modEx[oNS.__modInfo_.nsName] = {};
						}else{
							err = new Error('getImport 的mod命名空间对象必须含有 __modInfo_.nsName 属性对应对象的变量名。');
							err.message += err.stack;
							throw err;
						}
					}
				}
			}
			return {
				mod : mod,
				modEx : modEx
			};
		},

		'checkInterfaceIn' : function (oSort, aInterface, sSortName) {

			var sAttrList, sName, hasError;
			return $.forEach(aInterface, function(oInterface) {//debugger;
				var sAttrList = ',', hasError;
				$.forIn(oSort, function(o, sName) {
					sAttrList += sName + ',';
				});//debugger;
				return $.forEach(oInterface[sSortName], function(sName) {
					if(sAttrList.indexOf(','+sName+',') < 0) {
						return oInterface.__modInfo_.interfaceModName + '接口属性' + sName;
					}
				});

				
			});
		},


		'init' : function (_class, _this, _pro, _pub, _pro_static, _interface, _base, _args) {

			var proto, _protoProtected, _protoProtectedStatic, pub, pro, pro_static = _pro_static;

			pub = proto = _pub;
			pro = _pro;
			_protoProtected = _pro;
			_protoProtectedStatic = _pro_static;

			if(_base) {
				proto = _base.apply(_base, _args);
				pub = $.extendObj(proto, _pub);
				_protoProtected = proto.__pro_;
				_protoProtectedStatic = proto.__pro_static_;
				pro = $.extendObj(_protoProtected, _pro);
				proto.__varyContext_(pro, pub);
				_class.__modInfo_.parent = _base;
			}




			if(_class === _this) {
				pub.__pro_ = _pro;
				pub.__pro_static_ = _pro_static;
				_interface = [];
			}else{
				delete proto.__varyContext_;
				delete pub.__varyContext_;
				delete proto.__pro_;
				delete proto.__pro_static_;
			}

			var sHasInterfaceError = $.mod.checkInterfaceIn(pro, _interface, 'pro');
			if(sHasInterfaceError) {
				throw new Error('模块' + _class.__modInfo_.modName + '定义时缺少' + sHasInterfaceError);
			}
			

			pub.constructor = _class;

			return {
				pub : pub,
				pro : pro,
				parent : {
					_pro : _protoProtected,
					_pro_static : _protoProtectedStatic,
					_pub : proto
				}
			};
		},

		'setNS' : function (modNS) {
			var err;
			if(!modNS) {
				err = new Error('setNS()的参数必须是一个mod命名空间对象');
				err.message += err.stack;
				throw err;
			}
			if(!modNS.__modInfo_ || !modNS.__modInfo_.nsName) {
				err = new Error('mod命名空间对象必须含有 __modInfo_.nsName 属性对应对象的变量名。');
				err.message += err.stack;
				throw err;
			}
			$.mod.NS = modNS;
		},

		'get' : function (modName, ns) {
			ns = ns || $.mod.NS || $.md;
			return $.getFrom(modName, ns);
		},

		'set' : function (modName, mod, ns) {
			var err;
			/// 模块默认绑到 ns > JH.mod.NS > JH.md 对象上
			ns = ns || $.mod.NS || $.md;
			if(!ns.__modInfo_ || !ns.__modInfo_.nsName) {
				err = new Error('mod命名空间对象必须含有 __modInfo_.nsName 属性对应对象的变量名。');
				err.message += err.stack;
				throw err;
			}
			$.setTo(mod, modName, ns);
			//ns[modName] = mod;
		}

	};

	$["str"] = {

		"decodeJsStr" : function(s) {
			s = ('{"'+s+'":true}').replace(/\\\'/g, "'");
			//var s = '{"' + s + '":true}';
			var o = JSON.parse(s);
			var i;
			for (i in o) {
				return i;
			}
			return $.throwLine('decodeJsStr 传入的参数无法被解析。');
		},

		"encodeJsStr" : function(s) {
			var o = {};
			o[s] = true;
			s = JSON.stringify(o);
			return (s.match(/\{"(.+)"\:true\}/)[1]).replace(/\'/g, "\\'");
		},

		
		"parseJsonPath" : function(s) {
			var aPath = [];
			var rF = /^\.?(.+?)(?=[\.\[]|$)/;
			var rS = /^\[(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|(.+?))\]/;
			var oR, oRS;
			oR = s.match(rF);
			while(oR || oRS) {

				if(oRS) {
					//var_dump(oRS);
					aPath.push($.str.decodeJsStr(oRS[1] || oRS[2] || oRS[3]));
					s = s.replace(rS, '');
				}else if(oR) {
					aPath.push(oR[1]);
					s = s.replace(rF, '');
				}
				oRS = s.match(rS);
				oR = s.match(rF);

			}

			return aPath;
			
		}

	};

	/**
	* 数据绑定 
		* 
		* 
		* @return {type} returnDescription
		* 
		* @param agr {type} returnParam
		* @example 
		<pre>
			// 创建obj 的数据
			$.data.set(obj);
			$.data.set(obj, key);

			// 创建并返回obj 的uuid
			$.data.getId(obj);

			// 按uuid得到数据
			$.data.id(sUUID);
			$.data.id(sUUID, key);

			// 返回obj 的数据
			$.data(obj);
			$.data(obj, key);

			// 删除obj的数据
			$.data.del(obj);
			$.data.del(obj, key);

			// 销毁某个对象的数据
			$.data.destroy(obj);
			// 销毁所有对象的数据
			$.data.destroy();
		</pre>
		*/
	$["data"] = $.newFun(function () {
		var _pri = {
			objList : {}
		};
		var _fun = function (obj, key) {
			var sUUID = _fun.getId(obj);
			return _fun.id(sUUID, key);
		};

		return $.mergePropertyFrom(_fun, {
			//"set" : function (obj, key, value) {
				//var oData;
				//sUUID = _fun.getId(obj);
				//if(sUUID) {
					//oData = _pri.objList[sUUID];
				//}else{
					//oData = _pri.objList[_fun.setUUID(obj)] = {};
				//}
				//if(key !== undefined && key !== '') {
					//oData[key] = value;
				//}
				//return oData;
			//},
			"del" : function (obj, key) {
				_fun.checkObj(obj);
				key = (key || '').toString() ? '_'+key : '';
				var sUUID = _fun.getId(obj);
				if(sUUID) {
					delete _pri.objList[sUUID+key];
				}
			},
			//"hasBind" : function (obj, key) {
				//_fun.checkObj(obj, key);
				//key = key || '';
				//var sUUID = obj.__UUID_;
				//if(sUUID) {
					//return true;
				//}else{
					//return false;
				//}
			//},
			"set" : function (obj, key) {
				var sUUID = _fun.getId(obj);
				key = (key || '').toString() ? '_'+key : '';
				if(!sUUID) {
					//if(sUUID && !_pri.objList[sUUID]) {
						//$.throwLine('__UUID_ 异常');
					//}
				//}else{
					sUUID = _fun.setUUID(obj);
				}
				_pri.objList[sUUID+key] = _pri.objList[sUUID+key] || {};
				return _pri.objList[sUUID+key];
			},
			"getId" : function (obj) {
				_fun.checkObj(obj);
				return obj.__UUID_;
			},
			"setUUID" : function (obj) {
				var sUUID;
				_fun.checkObj(obj);
				sUUID = $.data.createUUID('-');
				obj.__UUID_ = sUUID;
				return sUUID;
			},
			"checkObj" : function (obj) {
				if(typeof obj !== 'object' || obj === null || obj === undefined) {
					return $.throwLine('JH.data() 的第一个参数必须为非 null 和 非undefined 的object对象。');
				}
			},
			"id" : function (sUUID, key) {
				key = (key || '').toString() ? '_'+key : '';
				var oData = null;
				if(sUUID) {
					oData = _pri.objList[sUUID+key] || null;
				}
				return oData;
			},
			"destroy" : function (obj) {
				if(obj === undefined) {
					_pri.objList = {};
					return;
				}
				var sUUID = _fun.getId(obj);
				if(sUUID) {
					$.forInOwn(_pri.objList, function (o, key) {
						if(key.indexOf(sUUID) > -1) {
							delete _pri.objList[key];
						}
					});
				}
			},
			"createUUID" : function(sGap) {
				var sUUID = '';
				sGap = sGap || '';

				while(sUUID.length < 32) {
					sUUID += Math.floor(Math.random()*16).toString(16);
				}
				var aS = sUUID.split('');
				aS = [
					aS.splice(0,8).join(''),
					aS.splice(0,4).join(''),
					aS.splice(0,4).join(''),
					aS.splice(0,4).join(''),
					aS.slice(0).join('')
				];
				sUUID = aS.join(sGap);
				//print_r(aS.join('-'));

				return sUUID;
			}
		});
	});


	var eventObjList = {};
	$["event"] = {
		"destroy" : function () {
			
		},
		"buildEvent" : function (obj) {
			if($.data(obj, 'event')) {
				return $.throwLine('每个对象只允许创建一次自定义事件');
			}
			$.data.set(obj, 'event');
			eventObjList[$.data.getId(obj)] = {
				eventList : {}
			};

			var custEvent = {
				'define' : function (sEventType, oDefData) {
					var sUUID = $.data.getId(obj);
					if(!eventObjList[sUUID].eventList[sEventType]) {
						eventObjList[sUUID].eventList[sEventType] = {
							defData : oDefData,
							callbackList : []
						};
					}
					return this;
				},
				'getTypeList' : function () {
					var oList = eventObjList[$.data.getId(obj)].eventList;
					var aList = [];
					$.forInOwn(oList, function (o, key) {
						aList.push(key);
					});
					return aList;
				},
				'removeDefine' : function (sEventType) {
					return this;
				},
				'fire' : function (sEventType, oFireData) {
					return custEvent.exFire(sEventType, oFireData);
				},
				'checkType' : function (sEventType) {
					return !!(eventObjList[$.data.getId(obj)].eventList[sEventType]);
				},
				'exFire' : function (sEventType, oFireData, oTarget) {
					oTarget = (oTarget === undefined) ? obj : oTarget;
					var eventObj =  eventObjList[$.data.getId(obj)].eventList[sEventType];
					if(!eventObj) {
						return $.throwLine('事件 "' + sEventType + '" 在 fire() 前需要先 define() .');
					}
					var allCallbackIsOk = true;
					var i, l;
					var oAddContextData;
					for (i=0, l = eventObj.callbackList.length; i < l; ++i) {
						var oCallbackObjarr = eventObj.callbackList[i];
						if(typeof oCallbackObjarr[2] !== undefined) {
							oAddContextData = $.extendObj(oCallbackObjarr[2]);
						}else{
							oAddContextData = {};
						}
						//*		oAddContextData.__def_ === oDefData;
						//*		oAddContextData.__target_ === oComp1;
						//*		this === oComp2;
						oAddContextData.__def_ = eventObj.defData;
						oAddContextData.__target_ = oTarget;
						allCallbackIsOk = (oCallbackObjarr[0].call(oCallbackObjarr[1], oFireData, oAddContextData) === false) ? false : allCallbackIsOk;
					}
					return allCallbackIsOk === false ? false : true;
				},
				'destroy' : function () {
					$.data.del(obj, 'event');
					delete eventObjList[$.data.getId(obj)];
				}
				
			};

			return custEvent;
		},


		"buildListener" : function (obj) {
			//$.data.set(obj, 'listener');
			//sListenerUUID = JH.data.getId(obj);
			var abjListenToList = [];
			var listener = {
				/**
				*  监听一个事件
					* @method JH.buildListener(oComp2).add
					* @return {Function} callback
					* @param {Object} objListenTo
					* @param {String} sEventType
					* @param {Function} fnCallback(oFireData, oAddContextData)
					*		oAddContextData.__def_ === oDefData;
					*		oAddContextData.__target_ === oComp1;
					*		this === oComp2;
					* @param {Object} oAddContextData
					* @example
						
					*/
				'add' : function (objListenTo, sEventType, fnCallback, oAddContextData) {
					var sUUID = $.data.getId(objListenTo);
					if(!sUUID) {
						return;
					}
					var eventObj = eventObjList[sUUID];
					if(eventObj && eventObj.eventList[sEventType]) {
						eventObj.eventList[sEventType].callbackList.push([fnCallback, obj, oAddContextData]);
						if(!$.forEach(abjListenToList, function (o) {
							if(o === objListenTo) {
								return true;
							}
						})) {
							abjListenToList.push(objListenTo);
						}
						
					}
					return this;
				},
				'remove' : function (objListenTo, sEventType, fnCallback) {
					var oEvent = eventObjList[$.data.getId(objListenTo)].eventList[sEventType];
					if(oEvent) {
						$.forEachDel(oEvent.callbackList, function (o) {
							if(o[0] === fnCallback) {
								return true;
							}
						});
					}
					return this;
				},
				'clear' : function (objListenTo, sEventType) {
					var oEventList = eventObjList[$.data.getId(objListenTo)].eventList;
					if(sEventType === undefined) {
						$.forInOwn(oEventList, function (o, sEventType) {
							$.forEachDel(o.callbackList, function (a) {
								if(a[1] === obj) {
									return true;
								}
							});
						});
						$.forEachDel(abjListenToList, function (o) {
							if(o === obj) {
								return true;
							}
						});
					}else{
						//if(oEventList[sEventType]) {
							//oEventList[sEventType].callbackList = [];
						//}
						if(oEventList[sEventType]) {
							$.forEachDel(oEventList[sEventType].callbackList, function (a) {
								if(a[1] === obj) {
									return true;
								}
							});
						}
					}
					return this;
				},
				'destroy' : function () {
					var _this = this;
					$.forEach(abjListenToList, function (o) {
						_this.clear(o);
					});
					abjListenToList = [];
				}
			};

			return listener;
		}
	};

	var oChannelList = {};
	$["air"] = {
		"destroy" : function () {
			
		},
		"buildAir" : function (obj) {
			var oListener = $.event.buildListener(obj);
			return {
				'listen' : function (oChannel, sType, fnCallback, oListenContextData) {
					oListenContextData = $.extendObj(oListenContextData, {
						__channel_ : oChannel,
						__channelData_ : oChannelList[$.data.getId(oChannel)][1]
					});
					oListener.add(oChannel, sType, fnCallback, oListenContextData);
					return this;
				},
				'publish' : function (oChannel, sType, oPublishData) {
					var oEvent = oChannelList[$.data.getId(oChannel)][0];
					if(!oEvent.checkType(sType)) {
						return $.throwLine('事件 "' + sType + '" 在 publish() 前需要先 define() .');
					}
					oEvent.exFire(sType, oPublishData, obj);
					return this;
				},
				'remove' : function (oChannel, sType, fnCallback) {
					oListener.remove(oChannel, sType, fnCallback);
					return this;
				},
				'clear' : function (oChannel, sType) {debugger;
					if(!oChannel) {
						oListener.destroy();
					}else{
						oListener.clear(oChannel, sType);
					}
					return this;
				},
				'destroy' : function () {
					oListener.destroy();
				}
			};
		},
		"buildChannel" : function (oTypeAndData, oChannelData) {
			//if($.data(oChannelData, 'air')) {
				//return $.throwLine('每个对象只允许创建一次频道');
			//}
			//$.data.set(oChannelData, 'air');
			var oChannel = {
				'setData' : function (oData) {
					oChannelData = oData;
					return this;
				},
				'define' : function (sType, oTypeDefData) {
					oEvent.define(sType, oTypeDefData);
					return this;
				},
				'getTypeList' : function () {
					return oEvent.getTypeList();
				},
				'removeDefine' : function (sType) {
					oEvent.removeDefine(sType);
					return this;
				},
				'destroy' : function () {
					oEvent.destroy();
				}
			};
			$.data.set(oChannel, 'air');
			var oEvent = $.event.buildEvent(oChannel);
			$.forIn(oTypeAndData, function (o, key) {
				oChannel.define(key, o);
			});
			oChannelList[$.data.getId(oChannel)] = [oEvent, oChannelData];

			return oChannel;
		}
	};


	$["request"] = {
		"buildRequest" : function (obj) {
			
		},
		"register" : function (oInit) {
			
		}
	};


}());}


