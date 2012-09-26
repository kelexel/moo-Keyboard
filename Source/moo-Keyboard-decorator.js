/*
---
description: Mootools Keyboard Decorator.

license: GPL

authors:
- Rudolph Sand

requires: 
- core/1.4.5

provides: [MooKeyboardDecorator]

version: 0.2

...
*/
var MooKeyboardDecorator = new Class({
	Implements: Options,
	options: {},
	_keyboard: false,
	initialize: function(options) {
		this.setOptions(options);
		this._container = document.id(this.options.container);
		if (!this._container) return false;
		this.draw();
	},
	draw: function() {
		var p = new Element('div', {'class': 'keybPreview'}).inject(this._container);
		new Element('div', {'class': 'keybCaret blink'}).inject(p);
		new Element('div', {'class': 'keybKeys'}).inject(this._container);
		this._keyboard = new MooKeyboard(this.options);
		return this._layout;
	},
	setLayout: function(layout) {
		this._keyboard.setLayout(layout);
	}
});