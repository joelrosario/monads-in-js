process.mixin(GLOBAL, require('sys'), require('./monads'));

puts(domonad(maybe_m,
		[{a: function (s) { return 10; }},
		 {b: function (s) { return 21 + s.a; }},
		 {c: function (s) { return 1; }}],
		function (s) { return s.a + s.b + s.c; }));

puts(domonad(maybe_m,
		[{a: function (s) { return 10; }},
		 {b: function (s) { return null; }},
		 {c: function (s) { return 1; }}],
		function (s) { return s.a + s.b + s.c; }));

puts(domonad(sequence_m,
		[{a: function (s) { return [1,2,3]; }},
		 {b: function (s) { return [4,5,6]; }}],
		function (s) { return s.a + s.b; }));

maybe_sequence_m = maybe_t(sequence_m);

puts(domonad(maybe_sequence_m,
		[{a: function (s) { return [1,2,null]; }},
		 {b: function (s) { return [4,5,6]; }}],
		function (s) { return s.a + s.b; }));


