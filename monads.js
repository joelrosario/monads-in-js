function slice(a, start, len) {
        var b = [];

        for(var n = start; n < start + len; n++)
        {
                b[n - start] = a[n];
        }

        return b;
}

function apply_monad(monad, monad_bindings, real_bindings, fn) {
	if(monad_bindings.length == 0)
	{
		return monad.to_monadic_value(fn(real_bindings));
	}

	var monad_binding = monad_bindings[0];

	for(var key in monad_binding) {
		return monad.bind((monad_binding[key])(real_bindings),
			function (val) {
				real_bindings[key] = val;

				return apply_monad(monad,
					slice(monad_bindings, 1, monad_bindings.length - 1),
					real_bindings,
					fn);
			});
	}
}

exports.domonad = function (monad, bindings, fn) {
	return apply_monad(monad, bindings, {}, fn);
}

exports.maybe_m = {
	bind: function (v, f) {
		if (v != null)
			return f(v);
		else
			return this.to_monadic_value(null);
	},

	to_monadic_value: function (v) {
		return v;
	}
};

exports.maybe_t = function (monad) {
	var new_monad = {};

	for(var key in monad) {
		new_monad[key] = monad[key];
	};

	var zero = function () { return monad.to_monadic_value(null); }

	if (monad.zero)
		zero = monad.zero;

	new_monad['bind'] = function (v, f) {
		return monad.bind(v, function (val) {
						if(val == null)
							return zero();

						return f(val);
					});
	}

	return new_monad;
}

exports.sequence_m = {
	add: function (arr1, arr2) {
		var arr3 = [];

		for(var n = 0; n < arr1.length; n++)
		{
			arr3[n] = arr1[n];
		}

		for(; n < arr1.length + arr2.length; n++)
		{
			arr3[n] = arr2[n - arr1.length];
		}

		return arr3;
	},

	bind: function (vals, f) {
		var total = [];

		for (var i in vals) {
			total = this.add(total, f(vals[i]));
		}

		return total;
	},

	to_monadic_value: function (v) {
		return [v];
	}
};

