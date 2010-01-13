var sys = require('sys');
var monads = require('./monads');

sys.puts(monads._(monads.maybe_m,
		[{a: function (s) { return 10; }},
		 {b: function (s) { return 21 + s.a; }},
		 {c: function (s) { return 1; }}],
		function (s) { return s.a + s.b + s.c; }));

sys.puts(monads._(monads.maybe_m,
		[{a: function (s) { return 10; }},
		 {b: function (s) { return null; }},
		 {c: function (s) { return 1; }}],
		function (s) { return s.a + s.b + s.c; }));

sys.puts(monads._(monads.sequence_m,
		[{a: function (s) { return [1,2,3]; }},
		 {b: function (s) { return [4,5,6]; }}],
		function (s) { return s.a + s.b; }));

maybe_sequence_m = monads.maybe_t(monads.sequence_m);

sys.puts(monads._(maybe_sequence_m,
		[{a: function (s) { return [1,2,null]; }},
		 {b: function (s) { return [4,5,6]; }}],
		function (s) { return s.a + s.b; }));


