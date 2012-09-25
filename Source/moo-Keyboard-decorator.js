var MooKeyboardDecorator = new Class({
	Implements: Options,
	options: {},
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
		return new MooKeyboard(this.options);
	}
});