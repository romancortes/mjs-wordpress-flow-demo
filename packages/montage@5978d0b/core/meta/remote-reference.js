"use strict";var Montage=require("montage").Montage,Promise=require("core/promise").Promise,logger=require("core/logger").logger("blueprint");exports.RemoteReference=Montage.specialize({constructor:{value:function(){return this.superForValue("constructor")(),this._value=null,this._reference=null,this._promise=null,this}},initWithValue:{value:function(e){return this._value=e,this._reference=null,this._promise=null,this}},serializeSelf:{value:function(e){this._reference||(this._reference=this.referenceFromValue(this._value)),e.setProperty("valueReference",this._reference)}},deserializeSelf:{value:function(e){this._value=null,this._reference=e.getProperty("valueReference"),this._promise=null}},_value:{value:null},_reference:{value:null},_promise:{value:null},promise:{value:function(e){return this._promise||(this._promise=this._value?Promise.resolve(this._value):this.valueFromReference(this._reference,e)),this._promise}},valueFromReference:{value:function(){return Promise.resolve(null)}},referenceFromValue:{value:function(){return{}}},blueprintModuleId:require("montage")._blueprintModuleIdDescriptor,blueprint:require("montage")._blueprintDescriptor});