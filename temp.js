var sys = require('sys');
var a = [5, 6, 7, 8, 9];

function slice(a, start, len) {
	var b = [];

	for(n = start; n < start + len; n++)
	{
		b[n - start] = a[n];
	}

	return b;
}

sys.puts(slice(a, 1, 3));

