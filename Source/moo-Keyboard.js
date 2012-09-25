/*
---
description: Mootools Keyboard.

license: GPL

authors:
- Rudolph Sand

requires: 
- core/1.4.5

provides: [Keyboard]

version: 0.2

...
*/

var MooKeyboard = new Class({
	Implements: [Options, Events],
	options: {
		container: false,
		attributes: {},
		chars: [],
		wrap: 10,
		maxChars: 100,
		onComplete: function() { console.log(this._phrase.join("")); }
	},
	_phrase: [],
	_bound: {},
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
		this._draw()._attachEvents();

	},
	_draw: function() {
		var c = 0;
		var mw = this._container.getSize().x.toInt();
		Array.each(this.options.chars, function(char) {
			if (typeOf(char) != 'object')
				new Element('a', {'html': char}).inject(this._keys).setStyle('width', Math.round(100/this.options.wrap)+'%');
			else {
				if (char.legend)
					var a = new Element('a', {'html': char.legend, 'rel': char.key}).inject(this._keys);
				else if (char.img) {
					var a = new Element('a', {'rel': char.key}).inject(this._keys);
					new Element('img', {'alt': '', 'src': char.img}).inject(a);
				}
				if (char.width) a.setStyle('width', char.width);
				else if (!char.class) a.setStyle('width', Math.round(100/this.options.wrap)+'%');
				else if (char.class) a.addClass(char.class);
			}
			c++; if (c == this.options.wrap) { new Element('br').inject(this._keys); c = 0; }
		}, this);
		return this;
	},
	_attachEvents: function() {
		this._bound._keyPress = this._keyPress.bind(this);
		this._container.addEvent('click:relay(a)', this._bound._keyPress)
		return this;
	},
	_keyPress: function(e, el) {
		e.stop();
		if (el.get('rel') && el.get('rel') == 'send')
			return this.fireEvent('complete');
		else if (el.get('rel') && el.get('rel') == 'shift') {
			if (this._keys.getStyle('text-transform') == 'uppercase')
				this._keys.setStyle('text-transform', 'lowercase');
			else
				this._keys.setStyle('text-transform', 'uppercase');
			return;
		}
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
			if (this._phrase.length +1 > this.options.maxKeys) return;
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


