/*
 HTML5 Shiv v3.7.0 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
(function(l,f){function m(){var a=e.elements;return"string"==typeof a?a.split(" "):a}function i(a){var b=n[a[o]];b||(b={},h++,a[o]=h,n[h]=b);return b}function p(a,b,c){b||(b=f);if(g)return b.createElement(a);c||(c=i(b));b=c.cache[a]?c.cache[a].cloneNode():r.test(a)?(c.cache[a]=c.createElem(a)).cloneNode():c.createElem(a);return b.canHaveChildren&&!s.test(a)?c.frag.appendChild(b):b}function t(a,b){if(!b.cache)b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag();
a.createElement=function(c){return!e.shivMethods?b.createElem(c):p(c,a,b)};a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){b.createElem(a);b.frag.createElement(a);return'c("'+a+'")'})+");return n}")(e,b.frag)}function q(a){a||(a=f);var b=i(a);if(e.shivCSS&&!j&&!b.hasCSS){var c,d=a;c=d.createElement("p");d=d.getElementsByTagName("head")[0]||d.documentElement;c.innerHTML="x<style>article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}</style>";
c=d.insertBefore(c.lastChild,d.firstChild);b.hasCSS=!!c}g||t(a,b);return a}var k=l.html5||{},s=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,r=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,j,o="_html5shiv",h=0,n={},g;(function(){try{var a=f.createElement("a");a.innerHTML="<xyz></xyz>";j="hidden"in a;var b;if(!(b=1==a.childNodes.length)){f.createElement("a");var c=f.createDocumentFragment();b="undefined"==typeof c.cloneNode||
"undefined"==typeof c.createDocumentFragment||"undefined"==typeof c.createElement}g=b}catch(d){g=j=!0}})();var e={elements:k.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:"3.7.0",shivCSS:!1!==k.shivCSS,supportsUnknownElements:g,shivMethods:!1!==k.shivMethods,type:"default",shivDocument:q,createElement:p,createDocumentFragment:function(a,b){a||(a=f);
if(g)return a.createDocumentFragment();for(var b=b||i(a),c=b.frag.cloneNode(),d=0,e=m(),h=e.length;d<h;d++)c.createElement(e[d]);return c}};l.html5=e;q(f)})(this,document);


/** Add/RemoveEventListener Polyfill (<= IE8) */
(function(){if(!document.createElement("div").addEventListener){var e="_eventListeners",t=function(t,n){var r=this;if(!(e in r))r[e]={};if(!r[e][t])r[e][t]=[];var i=r[e][t],o;for(o in i)if(n===i[o][0])return;i.push([n,n=function(e){return function(t){var t=t||window.event;if(!("target"in t))t.target=t.srcElement;if(!t.preventDefault)t.preventDefault=function(){this.returnValue=false};return e.call(r,t)}}(n)]);r.attachEvent("on"+t,n)},n=function(t,n){var r=this;if(!(e in r))r[e]={};if(!r[e][t])r[e][t]=[];var i=r[e][t],o;for(o in i){if(n===i[o][0]){r.detachEvent("on"+t,i[o][1]);delete i[o]}}};Object.defineProperty(Element.prototype,"addEventListener",{value:t});Object.defineProperty(Element.prototype,"removeEventListener",{value:n});document.addEventListener=t;document.removeEventListener=n;window.addEventListener=function(){t.apply(document,arguments)};window.removeEventListener=function(){n.apply(document,arguments)}}})();

/** DOMTokenList Polyfill */
window.DOMTokenList||function(){var t="defineProperty"in Object||"__defineGetter__"in Object.prototype||null,e=function(e,n,i,r){Object.defineProperty?Object.defineProperty(e,n,{configurable:!1===t?!0:!!r,get:i}):e.__defineGetter__(n,i)};if(t)try{e({},"support")}catch(n){t=!1}var i=function(t,n){var i,r=[],l={},s=0,o=0,a=function(){if(s>=o)for(;s>o;++o)(function(t){e(this,t,function(){return c.call(this),r[t]},!1)}).call(this,o)},c=function(){var e;if(arguments.length)for(e=0;e<arguments.length;++e)if(/\s/.test(arguments[e])){var o=new SyntaxError('String "'+arguments[e]+'" contains an invalid character');throw o.code=5,o.name="InvalidCharacterError",o}if(i!==t[n]){r=(""+t[n]).replace(/^\s+|\s+$/g,"").split(/\s+/),l={};for(var e=0;e<r.length;++e)l[r[e]]=!0;s=r.length,a.call(this)}};return c.call(this),e(this,"length",function(){return c.call(this),s}),this.toLocaleString=this.toString=function(){return c.call(this),r.join(" ")},this.item=function(t){return c.call(this),r[t]},this.contains=function(t){return c.call(this),!!l[t]},this.add=function(){c.apply(this,arguments);for(var e,i=0;i<arguments.length;++i)e=arguments[i],l[e]||(r.push(e),l[e]=!0);s!==r.length&&(s=r.length>>>0,t[n]=r.join(" "),a.call(this))},this.remove=function(){c.apply(this,arguments);for(var e={},i=0;i<arguments.length;++i)e[arguments[i]]=!0,delete l[arguments[i]];for(var o=[],i=0;i<r.length;++i)e[r[i]]||o.push(r[i]);r=o,s=o.length>>>0,t[n]=r.join(" "),a.call(this)},this.toggle=function(t,e){return c.apply(this,[t]),void 0!==e?e?(this.add(t),!0):(this.remove(t),!1):l[t]?(this.remove(t),!1):(this.add(t),!0)},function(t,e){if(e)for(var n="item contains add remove toggle toString toLocaleString".split(" "),i=0;7>i;++i)e(t,n[i],{enumerable:!1})}(this,Object.defineProperty),this};i.polyfill=!0,window.DOMTokenList=i;var r=function(n,l,s){e(n.prototype,l,function(){var n,o="__defining_"+l+"__";if(this[o])return n;if(this[o]=!0,!1===t){for(var a,c=r.mirror=r.mirror||document.createElement("div"),h=c.childNodes,u=h.length,f=0;u>f;++f)if(h[f].reflectedElement===this){a=h[f];break}a||(a=document.createElement("div"),c.appendChild(a)),n=i.call(a,this,s)}else n=new i(this,s);return e(this,l,function(){return n}),delete this[o],n},!0)};r(Element,"classList","className"),r(HTMLLinkElement,"relList","rel"),r(HTMLAnchorElement,"relList","rel"),r(HTMLAreaElement,"relList","rel")}();


/** ECMAScript5 */
if(!Array.prototype.forEach){Array.prototype.forEach=function(r,o){if(typeof r!=="function")throw new TypeError(r+" is not a function");if(this==null)throw new TypeError('"this" is null or undefined.');var t,i=0,n=Object(this),e=n.length>>>0;while(i<e){if(i in n)r.call(o,n[i],i,n);++i}}}
Date.now				=	Date.now || function(){return +new Date};
String.prototype.trim	=	String.prototype.trim || function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");};


/** Store "constants" on the window object to flag specific versions of Explorer. */
(function(win){
	for(var i = 6; i < 10; ++i){
		if(function(v){
			var d		=	document.createElement("div");
			d.innerHTML	=	"<!--[if IE "+v+"]><i></i><![endif]-->";
			return d.getElementsByTagName("i").length;
		}(i))

		win["IS_IE"+i]		=	true,
		win["IE_VERSION"]	=	i;
	}
}(window));



function IE8PropertyPunch(fn, argIndex, argName){
	return function(){
		var p, args	=	arguments,
			THIS	=	args[argIndex || 0];
		if(argName)
			THIS	=	THIS[argName];

		for(p in fn.prototype)
			THIS[p]	=	fn.prototype[p];

		fn.apply(THIS, args);
		return THIS;
	};
}