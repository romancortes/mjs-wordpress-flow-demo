var Montage=require("../../core").Montage,Labeler=require("mousse/serialization/labeler").Labeler;exports.MontageLabeler=Montage.specialize.call(Labeler,{_labelRegexp:{value:/^[a-zA-Z_$][0-9a-zA-Z_$]*$/},constructor:{value:function(){Labeler.call(this)}},getTemplatePropertyLabel:{value:function(e){var t=this.superForValue("getObjectLabel")(e);if(":"!==t[0])throw Error("Template property's labels need to start with a colon (:), (\""+t+'").');return t}},getObjectLabel:{value:function(e){var t=this.super(e);if(":"===t[0])throw Error('Labels starting with colon (:) can only be used for template properties, ("'+t+'").');return t}},getObjectName:{value:function(e){var t,n=e.identifier;return n&&this._labelRegexp.test(n)?t=e.identifier:"getInfoForObject"in e||"getInfoForObject"in e.constructor?(t=Montage.getInfoForObject(e).objectName,t=t.toLowerCase()):t=Labeler.prototype.getObjectName.call(this,e),t}}});