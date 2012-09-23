/*
---
description: Mootools Keyboard.

license: GPL

authors:
- Rudolph Sand

requires: 
- core/1.4.5

provides: [Keyboard]

version: 0.1

...
*/

var Keyboard = new Class({
	Implements: [Options, Events],
	options: {
		container: false,
		attributes: {},
		chars: [],
		wrap: 10,
		onComplete: function() { console.log(this._phrase.join("")); }
	},
	_phrase: [],
	_bound: function() {},
	_fxCarret: false,
	_container: false,
	_caret: false,
	_keys: false,
	initialize: function(options)
	{
		this.setOptions(options);
		this._container = document.id(this.options.container);
		if (!this._container) return;
		this._caret = this._container.getElement('.keybCaret');
		if (!this._caret) return;
		this._keys = this._container.getElement('.keybKeys');
		this._draw()._attachEvents()._setFx();

	},
	_draw: function() {
		var c = 0;
		var mw = this._container.getSize().x.toInt();
		Array.each(this.options.chars, function(char) {
			if (typeOf(char) != 'object')
				new Element('a', {'html': char}).inject(this._keys).setStyle('width', Math.round(100/this.options.wrap)+'%');
			else {
				var a = new Element('a', {'html': char.legend, 'class': char.class, 'rel': char.key}).inject(this._keys);
				if (char.width) a.setStyle('width', char.width);
				else if (!char.class) a.setStyle('width', Math.round(100/this.options.wrap)+'%');
			}
			c++; if (c == this.options.wrap) { new Element('br').inject(this._keys); c = 0; }
		}, this);
		return this;
	},
	_attachEvents: function() {
		this._bound._keyPress = this._keyPress.bind(this);
		this._container.addEvent('click:relay(a)', this._bound._keyPress)
		this._caretFx.periodical(500, this);
		return this;
	},
	_setFx: function() {
		this._fxCarret = new Fx.Morph(this._caret, {'duration': 200});
		return this;
	},
	_caretFx: function() {
		if (this._caret.getStyle('opacity') == 0)
			this._fxCarret.start({'opacity': [0, 1]});
		else
			this._fxCarret.start({'opacity': [1, 0]});
	},
	_keyPress: function(e, el) {
		e.stop();
		if (el.get('rel') && el.get('rel') == 'send')
			return this.fireEvent('complete');
		else if (el.get('rel') && el.get('rel') == 'delete') {
			if (this._phrase.length < 1) return;
			this._phrase.pop();
			this._caret.getPrevious().destroy();
		} else {
			if (el.get('rel') && el.get('rel') == 'return') {
				this._phrase.push("\n");
				new Element('br').inject(this._caret, 'before');
				return;
			}
			var str =  el.get('rel') && el.get('rel') == 'space' ? ' ' : el.get('html');
			this._phrase.push(str);
			new Element('span', {'html': str.replace(' ', '&nbsp;')}).inject(this._caret, 'before');
		}
	},
	_render: function(phrase) {
		var str = phrase.join('');
		this._b.set('html', str.replace(' ', '&nbsp;'));
	}
});


window.addEvent('domready', function() {
	_k1 = new Keyboard({'container': 'k1', 'wrap': 10, 'chars': ['a','z','e','r','t','y','u','i','o','p','q','s','d','f','g','h','j','k','l','m','w','x','c','v','b','n',',','.','?','!', {'key': 'space', 'legend': 'Space', 'class': 'space'}, {'key': 'delete', 'legend': 'Delete', 'class': 'delete'}, {'key': 'return', 'class': 'return', 'legend': 'Return', 'class': 'return'}, {'key': 'send',  'legend': 'Send', 'class': 'send'}]});
	_k2 = new Keyboard({'container': 'k2', 'wrap': 3, 'chars': ['1','2','3','4','5','6','7','8','9',{'key': 'delete', 'legend': 'Del'},'0', {'key': 'send', 'legend': 'Ok'}]});
});