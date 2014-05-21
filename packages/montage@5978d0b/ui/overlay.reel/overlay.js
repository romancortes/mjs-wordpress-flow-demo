var Montage=require("montage").Montage,Component=require("ui/component").Component,KeyComposer=require("composer/key-composer").KeyComposer,PressComposer=require("composer/press-composer").PressComposer,defaultEventManager=require("core/event/event-manager").defaultEventManager,CLASS_PREFIX="montage-Overlay";exports.Overlay=Component.specialize({_pressComposer:{value:null},_keyComposer:{value:null},_anchor:{value:null},anchor:{set:function(e){this._anchor=e,this.needsDraw=!0},get:function(){return this._anchor}},_position:{value:null},position:{set:function(e){this._position=e,this.needsDraw=!0},get:function(){return this._position}},_drawPosition:{value:null},_isShown:{value:!1},isShown:{get:function(){return this._isShown}},_isDisplayed:{value:!1},_resizeHandlerTimeout:{value:null},_previousActiveTarget:{value:null},delegate:{value:null},_dismissOnExternalInteraction:{value:!0},dismissOnExternalInteraction:{set:function(e){e!==this._dismissOnExternalInteraction&&(this._dismissOnExternalInteraction=e,e?this._pressComposer.addEventListener("pressStart",this,!1):this._pressComposer.removeEventListener("pressStart",this,!1))},get:function(){return this._dismissOnExternalInteraction}},constructor:{value:function(){this.super(),this._pressComposer=new PressComposer,this._pressComposer.lazyLoad=!0}},enterDocument:{value:function(e){var t,n;e&&(t=this.element.ownerDocument.body,t.appendChild(this.element),this.attachToParentComponent(),n=this.element.ownerDocument.defaultView,n.addEventListener("resize",this),this.addComposerForElement(this._pressComposer,this.element.ownerDocument),this._dismissOnExternalInteraction&&this._pressComposer.addEventListener("pressStart",this,!1),this._keyComposer=new KeyComposer,this._keyComposer.component=this,this._keyComposer.keys="escape",this._keyComposer.identifier="escape",this.addComposer(this._keyComposer),this._keyComposer.element=window)}},show:{value:function(){if(!this._isShown){if(this.isModal&&(this._previousActiveTarget=defaultEventManager.activeTarget,defaultEventManager.activeTarget=this,defaultEventManager.activeTarget!==this))return console.warn("Overlay "+this.identifier+" can't become the active target because ",defaultEventManager.activeTarget," didn't surrender it."),void 0;this.attachToParentComponent(),this.classList.add(CLASS_PREFIX+"--visible"),this._pressComposer.load(),this._keyComposer.load(),this._isShown=!0,this.needsDraw=!0,this._keyComposer.addEventListener("keyPress",this,!1)}}},hide:{value:function(){this._isShown&&(this.classList.remove(CLASS_PREFIX+"--visible"),this._pressComposer.unload(),this._keyComposer.unload(),this._isShown=!1,this.needsDraw=!0,this.isModal&&(defaultEventManager.activeTarget=this._previousActiveTarget),this._keyComposer.removeEventListener("keyPress",this,!1))}},isModal:{value:!0},surrendersActiveTarget:{value:function(e){return this.isShown&&this.isModal?e.element?this.element.contains(e.element):!1:!0}},handleResize:{value:function(){this.isShown&&(this.needsDraw=!0)}},handlePressStart:{value:function(e){this.element.contains(e.targetElement)||this.dismissOverlay(e)}},handleKeyPress:{value:function(e){"escape"===e.identifier&&this.dismissOverlay(e)}},dismissOverlay:{value:function(e){var t=!1;return this._isShown&&(t=this.callDelegateMethod("shouldDismissOverlay",this,e.targetElement,e.type),(void 0===t||t)&&(this.hide(),this._dispatchDismissEvent())),t}},willDraw:{value:function(){this._isDisplayed&&this._isShown&&this._calculatePosition(),this._isShown||this.callDelegateMethod("didHideOverlay",this)}},draw:{value:function(){this._isShown?this._isDisplayed?(this._reposition(),this.element.style.visibility="visible"):(this.element.style.visibility="hidden",this._isDisplayed=!0,this.callDelegateMethod("didShowOverlay",this),this.needsDraw=!0):this._isDisplayed=!1}},didDraw:{value:function(){this._isShown||this.detachFromParentComponent()}},_reposition:{value:function(){var e=this._drawPosition;this.element.style.top=e.top+"px",this.element.style.left=e.left+"px"}},_getElementPosition:{value:function(e){var t=0,n=0;do t+=e.offsetLeft,n+=e.offsetTop;while(e=e.offsetParent);return{top:n,left:t}}},_calculatePosition:{value:function(){var e,t;e=this.position?this.position:this.anchor?this._calculateAnchorPosition():this._calculateCenteredPosition(),t=this.callDelegateMethod("willPositionOverlay",this,e),t&&(e=t),this._drawPosition=e}},_calculateAnchorPosition:{value:function(){var e,t=this.anchor,n=this.element.offsetWidth,i=this._getElementPosition(t),r=t.offsetHeight||0,a=t.offsetWidth||0;return e={top:i.top+r,left:i.left+a/2-n/2},0>e.left&&(e.left=0),e}},_calculateCenteredPosition:{value:function(){var e=this.element.ownerDocument.defaultView,t=e.innerHeight,n=e.innerWidth,i=this.element.offsetHeight,r=this.element.offsetWidth;return{top:t/2-i/2,left:n/2-r/2}}},_dispatchDismissEvent:{value:function(){var e=document.createEvent("CustomEvent");e.initCustomEvent("dismiss",!0,!0,null),this.dispatchEvent(e)}}});