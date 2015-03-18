(function(){

	/** Global shorthand/MUNGE bench */
	var	win			=	window,
		doc			=	document,
		body		=	doc.body,
		


	/** Which property to use when getting/setting an HTMLElement's textual content (thanks for NaN, IE8) */
		TEXT		=	"textContent" in body ? "textContent" : "innerText",


	/** Page anatomy */
		top			=	doc.getElementById("top"),
		masthead	=	doc.getElementById("masthead"),
		main		=	doc.querySelector("main"),


	/** Search bar */
		sb				=	doc.getElementById("search-bar"),
		sbDisclosure	=	sb.querySelector(".disclosure[for=mode-1c]"),
		sbField			=	doc.getElementById("s"),
		sbOpen			=	doc.getElementById("mode-1c"),
		sbClose			=	doc.getElementById("mode-1a"),



	/** Strips any text nodes from the immediate descendants of an element. */
	pruneTextNodes	=	function(el, emptyOnly){
		if(!el || !el.childNodes.length) return el;
		el.normalize();
	
		var i	=	el.lastChild,
			r	=	/^\s*$/;
	
		/** If the last node's a textNode, shoot it. */
		if(3 === i.nodeType && (!emptyOnly || r.test(i.data))){
			el.removeChild(i);
			i = el.lastChild;
			if(!i) return el;
		}
	
		/** Run through each child node and nuke whatever isn't an element. */
		while(i = i.previousSibling)
			if(3 === i.nodeType && (!emptyOnly || r.test(i.data))) el.removeChild((i = i.nextSibling).previousSibling);
	
		return el;
	};




	/** DOM Extensions */
	NodeList.prototype.forEach			=
	HTMLCollection.prototype.forEach	=	Array.prototype.forEach;
	if(win.StaticNodeList)
		StaticNodeList.prototype.forEach	=	Array.prototype.forEach;


	/** Stops a function from firing too quickly. */
	Function.prototype.debounce	=	function(limit, soon){
		var fn		=	this,
			limit	=	limit < 0 ? 0 : limit,
			started, context, args, timer,
	
	
			delayed	=	function(){
	
				/** Get the time between now and when the function was first fired. */
				var timeSince	=	Date.now() - started;
	
				if(timeSince >= limit){
					if(!soon) fn.apply(context, args);
					if(timer) clearTimeout(timer);
					timer = context = args	=	null;
				}
	
				else timer = setTimeout(delayed, limit - timeSince);
			};
	
	
		/** Debounced copy of the original function. */
		return function(){
			context		=	this,
			args		=	arguments;
	
			if(!limit)
				return fn.apply(context, args);
	
			started	=	Date.now();
			if(!timer){
				if(soon) fn.apply(context, args);
				timer	=	setTimeout(delayed, limit);
			}
		};
	};



	/** Shifts input focus to the newly-revealed search pane. */
	sbOpen.addEventListener("change", function(e){
		if(e.target.checked)
			setTimeout(function(){ sbField.focus(); }, 100);
	});

	/** If clicking/tapping anywhere in the page's body, close any open menus. */
	doc.body.addEventListener("click", function(e){
		sbClose.checked	=	main.contains(e.target);
	});





	/** Accordions: adjust heights on window resize */
	var accordions	=	document.querySelectorAll(".fold");
	if(accordions.length){
	
		/** Update each accordion's maxHeight to fit their (possibly resized) content. */
		window.addEventListener("resize", (new function(){
	
			accordions.forEach(function(o){
				o.style.maxHeight	=	o.scrollHeight + "px";
			});
	
			return this.constructor;
		}).debounce(100));
	}




	var Rotator		=	function(el, args){
		
		/** Pointer to the Rotator instance being created. */
		var THIS			=	this,
	
	
		/** Internal values for our getter/setter methods. */
			_currentSlide	=	NaN,
			_autoplay		=	0,
			_autoplayTimer;
	
	
		/** Index of the currently visible slide. */
		Object.defineProperty(THIS, "currentSlide", {
			get:	function(){	return _currentSlide; },
			set:	function(i){
				var max	=	THIS.slides.children.length - 1;
	
					 if(i < 0)		i = THIS.wrap ? max : 0;
				else if(i > max)	i = THIS.wrap ? 0 : max;
	
				_currentSlide	=	i;
				THIS.update();
	
				/** If autoplaying, clear the last timer (if it was still running) and ready another automatic transition. */
				if(THIS.autoplay){
					clearTimeout(_autoplayTimer);
					_autoplayTimer = setTimeout(function(){ ++THIS.currentSlide; }, THIS.autoplay);
				}
			}
		});
	
	
		/** Number of milliseconds between automated transitions. */
		Object.defineProperty(THIS, "autoplay", {
			get:	function(){ return _autoplay; },
			set:	function(i){
	
				/** Stay positive */
				if(i < 0) i = 0;
	
				/** No change? Bail. */
				if(i == _autoplay) return;
	
				clearTimeout(_autoplayTimer);
				if(i) _autoplayTimer = setTimeout(function(){ ++THIS.currentSlide; }, i);
	
				_autoplay = i;
			}
		});
	
	
	
		/** Start assigning our arguments. */
		for(var i in args) THIS[i]	=	args[i];
	
	
		/** Tie a reference to the outer-most container defining our rotator. */
		THIS.el			=	el;
	
		/** Hook into its descendants. */
		THIS.navPrev	=	("string" === typeof THIS.navPrev)	? el.querySelector(THIS.navPrev)	:	THIS.navPrev;
		THIS.navNext	=	("string" === typeof THIS.navNext)	? el.querySelector(THIS.navNext)	:	THIS.navNext;
		THIS.slides		=	(("string" === typeof THIS.slides)	? el.querySelector(THIS.slides)		:	THIS.slides) || el;
	
	
	
		/** Good grief, IE8. Get it together. */
		if(!THIS.slides.children)
			Object.defineProperty(THIS.slides, "children", {
				get:	function(){
					for(var output = [], i = 0, l = this.childNodes.length; i < l; ++i)
						if(Node.ELEMENT_NODE === this.childNodes[i].nodeType)
							output.push(this.childNodes[i]);
					return output;
				}
			});
	
	
	
		/** Make DOM traversal easier. */
		if(!THIS.keepTextNodes)
			pruneTextNodes(THIS.slides);
	
	
	
		/** Event listeners */
		!THIS.navPrev || THIS.navPrev.addEventListener("click", function(e){ --THIS.currentSlide; });
		!THIS.navNext || THIS.navNext.addEventListener("click", function(e){ ++THIS.currentSlide; });
	
		document.addEventListener("visibilitychange", function(){
			var state	=	this.visibilityState;
			
			if(THIS.autoplay){
				/** Window's losing focus/visibility: don't bother running transitions. */
				if(state === "unloaded" || state === "hidden")
					clearTimeout(_autoplayTimer);
	
				/** Otherwise, we're gaining visibility, let's go. */
				else THIS.currentSlide	=	_currentSlide;
			}
		});
	
		THIS.currentSlide	=	0;
		return THIS;
	};


	/** Define the Rotator class's default properties/methods. */
	(function(a, b){ for(var i in b) a[i] = b[i]; }(Rotator.prototype, {
	
		/** Default DOM selectors. */
		navPrev:	".n.prev",
		navNext:	".n.next",
		slides:		"ul",
	
	
		/** Name of the CSS class applied to denote an active/displayed slide. */
		activeClass:	"active",
	
		/** Whether to wrap the slides list to the first or last item if setting .currentSlide out of bounds. */
		wrap:	true,
	
	
		/** Updates the active slide based on the .currentSlide property. */
		update:	function(){
			var	THIS		=	this,
				index		=	THIS.currentSlide,
				children	=	THIS.slides.children,
				length		=	children.length,
				i			=	0;
			for(; i < length; ++i)
				children[i].classList.toggle(THIS.activeClass, i === index);
		}
	}));


	/** IE8 has "issues" with using Object.defineProperty on native JavaScript objects. So we'll use a hack instead. */
	if(window.IS_IE8)
		Rotator	=	IE8PropertyPunch(Rotator);
	
	
	
	var rotators	=	doc.querySelectorAll(".rotator");
	rotators.forEach(function(o){
		new Rotator(o, {
			autoplay:	4000
		});
	});
}());