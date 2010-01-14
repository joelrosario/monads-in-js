function apply_monad(monad, monad_bindings, real_bindings, fn) {
	if(monad_bindings.length == 0)
		return monad.to_monadic_value(fn(real_bindings));

	var monad_binding = monad_bindings[0];

	for(var key in monad_binding) {
		return monad.bind(
			(monad_binding[key])(real_bindings),
			function (val) {
				real_bindings[key] = val;

				return apply_monad(monad,
					monad_bindings.slice(1),
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

function new_object_based_on(obj) {
	var derived_object = function () {};
	derived_object.prototype = obj;
	return new derived_object();
}

exports.maybe_t = function (monad) {
	var new_monad = new_object_based_on(monad);
	
	var zero = monad.zero ? monad.zero : function () { return monad.to_monadic_value(null); };

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
	bind: function (vals, f) {
		return [].concat.apply(vals.map(
			function (val) {
				return f(val);
			}));
	},

	to_monadic_value: function (v) {
		return [v];
	}
};

