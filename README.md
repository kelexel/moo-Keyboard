moo-Keyboard
===========

A multi-use Mootools virtual-keyboard.

It can display any layout you want, including alphabetical keyboards, pinpads, including *some* control-keys.

Keys can be specified in any order you like.

The keyboard layout is fully auto-resizable thanks to some CSS goodness.

* 0.1 : initial release

* 0.2 : added support for images as keyboard keys

Tested with Mootools-Core 1.4.5

[Demo](https://tinker.io/af1ff/4)

How to use
----------

Include mootools-core, than include moo-Keyboard.js in your document HEAD

moo-Keyboard.js accepts three arguments as options:

* container: the parent container where to inject the keyboard. This assumes the container contains two DIVs, one with class "keybPreview" (where the typed keys will be injected), one with class "keybKeys" (where the keyboard keys will be injected)

* wrap: how many keyboard keys to display on a row.

* maxChars: how many keystrokes we are allowing

* chars: an array containing the keyboard keys you want to use; in case of control-keys, you must specify an object (see bellow). Keys can be specified in any order you like.

* onComplete: a callback function to run when the user hits the "send" control-key.

Control-keys must be specified as objects, containing at least:

* 'key', must be of the kind: 'space' | 'delete' | 'return' | 'send'

* 'legend', the name displayed in the keyboard key button

* 'class', an optional CSS class to apply to the keyboard key button

* 'img', link to a jpg/png/gif to be used as the keyboard key

Here are two examples:

	window.addEvent('domready', function() {

		// Create a virtual (azerty in this case) keyboard, including "delete", "space", "return" (newline), and "send" control-keys.
		_k1 = new Keyboard({
				'container': 'k1', 
				'wrap': 10, 
				'chars': [
					'a','z','e','r','t','y','u','i','o','p','q','s','d','f','g','h','j','k','l','m','w','x','c','v','b','n',',','.','?','!', {'key': 'space', 'legend': 'Space', 'class': 'space'}, {'key': 'delete', 'legend': 'Delete', 'class': 'delete'}, {'key': 'return', 'class': 'return', 'legend': 'Return', 'class': 'return'}, {'key': 'send',  'legend': 'Send', 'class': 'send'}
				]
		});

		// Create a virtual pinpad, including "delete" and "send" control-keys
		_k2 = new Keyboard({
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