moo-Keyboard
===========

A multi-use Mootools virtual-keyboard.

It can display any layout you want, including alphabetical keyboards, pinpads, including *some* control-keys (now called custom-keys).

Keys can be specified in any order you like.

The keyboard layout is fully auto-resizable thanks to some CSS goodness.

* 0.1 : initial release

* 0.2 : added support for images as keyboard keys

* 0.3 : use CSS3 animation instead of JS animation for caret fx, if you want JS anim instead use tag 0.2 + added MooKeyboardDecorator.js + added fx.css + added 'shift' key

Tested with Mootools-Core 1.4.5 on Firefox-15.x and IE-10

[Demo](https://tinker.io/af1ff/13)

How to use
----------

Include mootools-core, than include moo-Keyboard.js in your document.
Since the caret fx is now CSS3 driven, include fx.css in your document HEAD.

moo-Keyboard.js accepts three arguments as options:

* container: the parent container where to inject the keyboard. This assumes the container contains two DIVs, one with class "keybPreview" (where the typed keys will be injected), one with class "keybKeys" (where the keyboard keys will be injected)

* wrap: how many keyboard keys to display on a row.

* maxChars: how many keystrokes we are allowing

* chars: an array containing the keyboard keys you want to use; in case of custom-keys, you must specify an object (see bellow). Keys can be specified in any order you like.

* onComplete: a callback function to run when the user hits the "send" custom-key.

Custom-keys must be specified as objects, containing at least:

* 'key', must be of the kind: 'space' | 'delete' | 'return' | 'send' | 'shift'

* 'legend', the name displayed in the keyboard key button

* 'class', an optional CSS class to apply to the keyboard key button

* 'img', link to a jpg/png/gif to be used as the keyboard key

Additionally, you can use MooKeyboardDecorator.js to automagically create the 3 required elements (preview, caret, key-holder)

Here are two examples:

	window.addEvent('domready', function() {

		// Create a virtual (azerty in this case) keyboard, including "delete", "space", "return" (newline), and "send" custom-keys.
		_k1 = new MooKeyboard({
				'container': 'k1', 
				'wrap': 10, 
				'chars': [
					'a','z','e','r','t','y','u','i','o','p','q','s','d','f','g','h','j','k','l','m','w','x','c','v','b','n',',','.','?','!', {'key': 'space', 'legend': 'Space', 'class': 'space'}, {'key': 'delete', 'legend': 'Delete', 'class': 'delete'}, {'key': 'return', 'class': 'return', 'legend': 'Return', 'class': 'return'}, {'key': 'send',  'legend': 'Send', 'class': 'send'}
				]
		});

		// Create a virtual pinpad, including "delete" and "send" custom-keys in an empty container (use Decorator to decorate the container)
		_k2 = new MooKeyboardDecorator({
			'container': 'k2',
			'wrap': 3,
			'maxChars': 4,
			'chars': [
				'1','2','3','4','5','6','7','8','9',{'key': 'delete', 'legend': 'Del'},'0', {'key': 'send', 'legend': 'Ok'}
			]
		});
	});

Screenshots
-----------

![Screenshot 1](https://raw.github.com/kelexel/moo-Keyboard/master/moo-Keyboard.png)