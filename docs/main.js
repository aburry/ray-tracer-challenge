(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.aT.ai === region.bb.ai)
	{
		return 'on line ' + region.aT.ai;
	}
	return 'on lines ' + region.aT.ai + ' through ' + region.bb.ai;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bW,
		impl.b7,
		impl.b5,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		K: func(record.K),
		aU: record.aU,
		aR: record.aR
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.K;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.aU;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.aR) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bW,
		impl.b7,
		impl.b5,
		function(sendToApp, initialModel) {
			var view = impl.b8;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bW,
		impl.b7,
		impl.b5,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.aS && impl.aS(sendToApp)
			var view = impl.b8;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.bM);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.b6) && (_VirtualDom_doc.title = title = doc.b6);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.b0;
	var onUrlRequest = impl.b1;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		aS: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.bx === next.bx
							&& curr.bh === next.bh
							&& curr.bt.a === next.bt.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		bW: function(flags)
		{
			return A3(impl.bW, flags, _Browser_getUrl(), key);
		},
		b8: impl.b8,
		b7: impl.b7,
		b5: impl.b5
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { bU: 'hidden', bN: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { bU: 'mozHidden', bN: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { bU: 'msHidden', bN: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { bU: 'webkitHidden', bN: 'webkitvisibilitychange' }
		: { bU: 'hidden', bN: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		bD: _Browser_getScene(),
		bJ: {
			a1: _Browser_window.pageXOffset,
			a2: _Browser_window.pageYOffset,
			b9: _Browser_doc.documentElement.clientWidth,
			bT: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		b9: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		bT: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			bD: {
				b9: node.scrollWidth,
				bT: node.scrollHeight
			},
			bJ: {
				a1: node.scrollLeft,
				a2: node.scrollTop,
				b9: node.clientWidth,
				bT: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			bD: _Browser_getScene(),
			bJ: {
				a1: x,
				a2: y,
				b9: _Browser_doc.documentElement.clientWidth,
				bT: _Browser_doc.documentElement.clientHeight
			},
			bR: {
				a1: x + rect.left,
				a2: y + rect.top,
				b9: rect.width,
				bT: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $author$project$RayTracerChallenge$CSG = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var $author$project$RayTracerChallenge$Empty = {$: 3};
var $author$project$RayTracerChallenge$Group = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$RayTracerChallenge$Primitive = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$core$Basics$append = _Utils_append;
var $author$project$RayTracerDsl$applyTransform = F2(
	function (transform, assembly) {
		switch (assembly.$) {
			case 3:
				return $author$project$RayTracerChallenge$Empty;
			case 2:
				var transformList = assembly.a;
				var shape = assembly.b;
				return A2(
					$author$project$RayTracerChallenge$Primitive,
					_Utils_ap(
						transformList,
						_List_fromArray(
							[transform])),
					shape);
			case 1:
				var transformList = assembly.a;
				var op = assembly.b;
				var left = assembly.c;
				var right = assembly.d;
				return A4(
					$author$project$RayTracerChallenge$CSG,
					_Utils_ap(
						transformList,
						_List_fromArray(
							[transform])),
					op,
					left,
					right);
			default:
				var transformList = assembly.a;
				var list = assembly.b;
				return A2(
					$author$project$RayTracerChallenge$Group,
					_Utils_ap(
						transformList,
						_List_fromArray(
							[transform])),
					list);
		}
	});
var $author$project$Geometry$Matrix = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return {$: 0, a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j, k: k, l: l, m: m, n: n, o: o, p: p};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Geometry$matNewScale = F3(
	function (sx, sy, sz) {
		return $author$project$Geometry$Matrix(sx)(0)(0)(0)(0)(sy)(0)(0)(0)(0)(sz)(0)(0)(0)(0)(1);
	});
var $author$project$RayTracerDsl$scale = F3(
	function (x, y, z) {
		return $author$project$RayTracerDsl$applyTransform(
			A3($author$project$Geometry$matNewScale, x, y, z));
	});
var $author$project$Geometry$Sphere = {$: 1};
var $elm$core$Basics$True = 0;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $author$project$RayTracerChallenge$defaultMaterial = {
	r: 0.3,
	k: $elm$core$Basics$always(
		{j: 0.9, l: 0.9, n: 0.9}),
	s: 0.9,
	u: 0,
	C: 1,
	D: true,
	P: 200,
	E: 0.9,
	A: 0
};
var $author$project$Geometry$matNewIdentity = $author$project$Geometry$Matrix(1)(0)(0)(0)(0)(1)(0)(0)(0)(0)(1)(0)(0)(0)(0)(1);
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Geometry$Point = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $author$project$Geometry$pntAlongRay = F2(
	function (_v0, t) {
		var _v1 = _v0.a;
		var x = _v1.a;
		var y = _v1.b;
		var z = _v1.c;
		var _v2 = _v0.b;
		var dx = _v2.a;
		var dy = _v2.b;
		var dz = _v2.c;
		return A3($author$project$Geometry$Point, x + (t * dx), y + (t * dy), z + (t * dz));
	});
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $elm$core$Basics$sub = _Basics_sub;
var $author$project$Geometry$intersectCone = F2(
	function (config, ray) {
		var _v0 = ray.a;
		var x = _v0.a;
		var y = _v0.b;
		var z = _v0.c;
		var _v1 = ray.b;
		var dx = _v1.a;
		var dy = _v1.b;
		var dz = _v1.c;
		var sides = function () {
			var ts = function () {
				var _v5 = _Utils_Tuple3(((dx * dx) - (dy * dy)) + (dz * dz), (((2 * x) * dx) - ((2 * y) * dy)) + ((2 * z) * dz), ((x * x) - (y * y)) + (z * z));
				var a = _v5.a;
				var b = _v5.b;
				var c = _v5.c;
				var discriminant = (b * b) - ((4 * a) * c);
				return (0 < a) ? _List_fromArray(
					[
						((-b) - $elm$core$Basics$sqrt(discriminant)) / (2 * a),
						((-b) + $elm$core$Basics$sqrt(discriminant)) / (2 * a)
					]) : (((!a) && (!(!b))) ? _List_fromArray(
					[(-c) / (2 * b)]) : _List_Nil);
			}();
			var intersect = function (t) {
				var _v4 = A2($author$project$Geometry$pntAlongRay, ray, t);
				var iy = _v4.b;
				return ((_Utils_cmp(config.aa, iy) < 0) && (_Utils_cmp(iy, config._) < 0)) ? _List_fromArray(
					[t]) : _List_Nil;
			};
			return A2($elm$core$List$concatMap, intersect, ts);
		}();
		var _v2 = function () {
			var intersect = function (yend) {
				var t = (yend - y) / dy;
				var distanceSq = function () {
					var _v3 = A2($author$project$Geometry$pntAlongRay, ray, t);
					var ix = _v3.a;
					var iy = _v3.b;
					var iz = _v3.c;
					return _Utils_cmp((ix * ix) + (iz * iz), iy * iy) < 1;
				}();
				return distanceSq ? _List_fromArray(
					[t]) : _List_Nil;
			};
			return _Utils_Tuple2(
				intersect(config.aa),
				intersect(config._));
		}();
		var cap0 = _v2.a;
		var cap1 = _v2.b;
		return $elm$core$List$concat(
			config.a5 ? _List_fromArray(
				[sides, cap0, cap1]) : _List_fromArray(
				[sides]));
	});
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $author$project$Geometry$intersectCube = function (_v0) {
	var _v1 = _v0.a;
	var x = _v1.a;
	var y = _v1.b;
	var z = _v1.c;
	var _v2 = _v0.b;
	var dx = _v2.a;
	var dy = _v2.b;
	var dz = _v2.c;
	var pick = F2(
		function (_v4, _v5) {
			var a = _v4.a;
			var b = _v4.b;
			var c = _v5.a;
			var d = _v5.b;
			return _Utils_Tuple2(
				A2($elm$core$Basics$max, a, c),
				A2($elm$core$Basics$min, b, d));
		});
	var intersect = F2(
		function (v, dv) {
			return (0 <= dv) ? _Utils_Tuple2((-(v + 1)) / dv, (-(v - 1)) / dv) : _Utils_Tuple2((-(v - 1)) / dv, (-(v + 1)) / dv);
		});
	var _v3 = A2(
		pick,
		A2(intersect, z, dz),
		A2(
			pick,
			A2(intersect, y, dy),
			A2(intersect, x, dx)));
	var tmin = _v3.a;
	var tmax = _v3.b;
	return (_Utils_cmp(tmin, tmax) < 1) ? _List_fromArray(
		[tmin, tmax]) : _List_Nil;
};
var $author$project$Geometry$quadraticRoots = F3(
	function (a, b, c) {
		var d = $elm$core$Basics$sqrt((b * b) - ((4 * a) * c));
		return (0 < b) ? _Utils_Tuple2((2 * c) / ((-b) - d), ((-b) - d) / (2 * a)) : _Utils_Tuple2(((-b) + d) / (2 * a), (2 * c) / ((-b) + d));
	});
var $author$project$Geometry$intersectCylinder = F2(
	function (config, ray) {
		var _v0 = ray.a;
		var x = _v0.a;
		var y = _v0.b;
		var z = _v0.c;
		var _v1 = ray.b;
		var dx = _v1.a;
		var dy = _v1.b;
		var dz = _v1.c;
		var _v2 = function () {
			var _v3 = _Utils_Tuple3((dx * dx) + (dz * dz), ((2 * x) * dx) + ((2 * z) * dz), ((x * x) + (z * z)) - 1);
			var a = _v3.a;
			var b = _v3.b;
			var c = _v3.c;
			var _v4 = A3($author$project$Geometry$quadraticRoots, a, b, c);
			var r1 = _v4.a;
			var r2 = _v4.b;
			return _Utils_Tuple2(
				A2($elm$core$Basics$min, r1, r2),
				A2($elm$core$Basics$max, r1, r2));
		}();
		var tmin = _v2.a;
		var tmax = _v2.b;
		var _v5 = function () {
			var intersect = function (t) {
				var _v6 = A2($author$project$Geometry$pntAlongRay, ray, t);
				var iy = _v6.b;
				return ((_Utils_cmp(config.aa, iy) < 0) && (_Utils_cmp(iy, config._) < 0)) ? _List_fromArray(
					[t]) : _List_Nil;
			};
			return _Utils_Tuple2(
				intersect(tmin),
				intersect(tmax));
		}();
		var side0 = _v5.a;
		var side1 = _v5.b;
		var _v7 = function () {
			var intersect = function (yend) {
				var t = (yend - y) / dy;
				var distanceSq = function () {
					var _v8 = A2($author$project$Geometry$pntAlongRay, ray, t);
					var ix = _v8.a;
					var iz = _v8.c;
					return ((ix * ix) + (iz * iz)) <= 1;
				}();
				return distanceSq ? _List_fromArray(
					[t]) : _List_Nil;
			};
			return _Utils_Tuple2(
				intersect(config.aa),
				intersect(config._));
		}();
		var cap0 = _v7.a;
		var cap1 = _v7.b;
		return $elm$core$List$concat(
			config.a5 ? _List_fromArray(
				[side0, side1, cap0, cap1]) : _List_fromArray(
				[side0, side1]));
	});
var $author$project$Geometry$intersectPlane = function (_v0) {
	var _v1 = _v0.a;
	var y = _v1.b;
	var _v2 = _v0.b;
	var dy = _v2.b;
	return _List_fromArray(
		[(-y) / dy]);
};
var $author$project$Geometry$Vector = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $author$project$Geometry$vecBetweenPoints = F2(
	function (_v0, _v1) {
		var x0 = _v0.a;
		var y0 = _v0.b;
		var z0 = _v0.c;
		var x1 = _v1.a;
		var y1 = _v1.b;
		var z1 = _v1.c;
		return A3($author$project$Geometry$Vector, x1 - x0, y1 - y0, z1 - z0);
	});
var $author$project$Geometry$vecDot = F2(
	function (_v0, _v1) {
		var dx0 = _v0.a;
		var dy0 = _v0.b;
		var dz0 = _v0.c;
		var dx1 = _v1.a;
		var dy1 = _v1.b;
		var dz1 = _v1.c;
		return ((dx0 * dx1) + (dy0 * dy1)) + (dz0 * dz1);
	});
var $author$project$Geometry$intersectSphere = function (_v0) {
	var rpoint = _v0.a;
	var vector = _v0.b;
	var s = A2(
		$author$project$Geometry$vecBetweenPoints,
		A3($author$project$Geometry$Point, 0, 0, 0),
		rpoint);
	var _v1 = _Utils_Tuple3(
		A2($author$project$Geometry$vecDot, vector, vector),
		2 * A2($author$project$Geometry$vecDot, vector, s),
		A2($author$project$Geometry$vecDot, s, s) - 1);
	var a = _v1.a;
	var b = _v1.b;
	var c = _v1.c;
	var _v2 = A3($author$project$Geometry$quadraticRoots, a, b, c);
	var r1 = _v2.a;
	var r2 = _v2.b;
	return _List_fromArray(
		[
			A2($elm$core$Basics$min, r1, r2),
			A2($elm$core$Basics$max, r1, r2)
		]);
};
var $author$project$Geometry$vecCross = F2(
	function (_v0, _v1) {
		var dx0 = _v0.a;
		var dy0 = _v0.b;
		var dz0 = _v0.c;
		var dx1 = _v1.a;
		var dy1 = _v1.b;
		var dz1 = _v1.c;
		return A3($author$project$Geometry$Vector, (dy0 * dz1) - (dz0 * dy1), (dz0 * dx1) - (dx0 * dz1), (dx0 * dy1) - (dy0 * dx1));
	});
var $author$project$Geometry$intersectTriangle = F2(
	function (config, _v0) {
		var rpoint = _v0.a;
		var vector = _v0.b;
		var scalarTripleProduct = F3(
			function (v1, v2, v3) {
				return A2(
					$author$project$Geometry$vecDot,
					A2($author$project$Geometry$vecCross, v1, v2),
					v3);
			});
		var _v1 = _Utils_Tuple3(
			A2($author$project$Geometry$vecBetweenPoints, config.G, config.av),
			A2($author$project$Geometry$vecBetweenPoints, config.G, config.aw),
			A2($author$project$Geometry$vecBetweenPoints, config.G, rpoint));
		var e1 = _v1.a;
		var e2 = _v1.b;
		var e3 = _v1.c;
		var determinant = A3(scalarTripleProduct, vector, e2, e1);
		var _v2 = _Utils_Tuple3(
			A3(scalarTripleProduct, e3, e1, e2) / determinant,
			A3(scalarTripleProduct, vector, e2, e3) / determinant,
			A3(scalarTripleProduct, e3, e1, vector) / determinant);
		var t = _v2.a;
		var u = _v2.b;
		var v = _v2.c;
		return ((0 <= u) && ((u <= 1) && ((0 <= v) && (_Utils_cmp(v, 1 - u) < 1)))) ? _List_fromArray(
			[t]) : _List_Nil;
	});
var $author$project$Geometry$vectorConeNormalAt = F2(
	function (config, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var z = _v0.c;
		var sgn = function (n) {
			return (0 <= n) ? 1 : (-1);
		};
		var distanceSq = _Utils_cmp((x * x) + (z * z), y * y) < 1;
		return (distanceSq && (_Utils_cmp(config._, y) < 1)) ? A3($author$project$Geometry$Vector, 0, 1, 0) : ((distanceSq && (_Utils_cmp(y, config.aa) < 1)) ? A3($author$project$Geometry$Vector, 0, -1, 0) : A3(
			$author$project$Geometry$Vector,
			x,
			sgn(-y) * $elm$core$Basics$sqrt((x * x) + (z * z)),
			z));
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $author$project$Geometry$vectorCubeNormalAt = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	var z = _v0.c;
	return ((_Utils_cmp(
		$elm$core$Basics$abs(y),
		$elm$core$Basics$abs(x)) < 0) && (_Utils_cmp(
		$elm$core$Basics$abs(z),
		$elm$core$Basics$abs(x)) < 0)) ? A3($author$project$Geometry$Vector, 1, 0, 0) : ((_Utils_cmp(
		$elm$core$Basics$abs(z),
		$elm$core$Basics$abs(y)) < 0) ? A3($author$project$Geometry$Vector, 0, 1, 0) : A3($author$project$Geometry$Vector, 0, 0, 1));
};
var $author$project$Geometry$vectorCylinderNormalAt = F2(
	function (config, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var z = _v0.c;
		var epsilon = 1.0e-6;
		var distanceSq = ((x * x) + (z * z)) < 1;
		return (distanceSq && (_Utils_cmp(config._ - epsilon, y) < 1)) ? A3($author$project$Geometry$Vector, 0, 1, 0) : ((distanceSq && (_Utils_cmp(y, config.aa + epsilon) < 1)) ? A3($author$project$Geometry$Vector, 0, -1, 0) : A3($author$project$Geometry$Vector, x, 0, z));
	});
var $author$project$Geometry$vectorPlaneNormalAt = function (_v0) {
	return A3($author$project$Geometry$Vector, 0, 1, 0);
};
var $author$project$Geometry$vecLength = function (v) {
	return $elm$core$Basics$sqrt(
		A2($author$project$Geometry$vecDot, v, v));
};
var $author$project$Geometry$vecScaleBy = F2(
	function (s, _v0) {
		var dx = _v0.a;
		var dy = _v0.b;
		var dz = _v0.c;
		return A3($author$project$Geometry$Vector, s * dx, s * dy, s * dz);
	});
var $author$project$Geometry$vecSubtract = F2(
	function (_v0, _v1) {
		var dx0 = _v0.a;
		var dy0 = _v0.b;
		var dz0 = _v0.c;
		var dx1 = _v1.a;
		var dy1 = _v1.b;
		var dz1 = _v1.c;
		return A3($author$project$Geometry$Vector, dx0 - dx1, dy0 - dy1, dz0 - dz1);
	});
var $author$project$Geometry$vectorSmoothTriangleNormalAt = F2(
	function (config, rpoint) {
		var _v0 = _Utils_Tuple3(
			A2($author$project$Geometry$vecBetweenPoints, config.G, config.av),
			A2($author$project$Geometry$vecBetweenPoints, config.G, config.aw),
			A2($author$project$Geometry$vecBetweenPoints, config.G, rpoint));
		var e1 = _v0.a;
		var e2 = _v0.b;
		var e3 = _v0.c;
		var area = $author$project$Geometry$vecLength(
			A2($author$project$Geometry$vecCross, e1, e2));
		var _v1 = _Utils_Tuple2(
			$author$project$Geometry$vecLength(
				A2($author$project$Geometry$vecCross, e2, e3)) / area,
			$author$project$Geometry$vecLength(
				A2($author$project$Geometry$vecCross, e1, e3)) / area);
		var u = _v1.a;
		var v = _v1.b;
		return A2(
			$author$project$Geometry$vecSubtract,
			A2($author$project$Geometry$vecScaleBy, (1 - u) - v, config.bY),
			A2(
				$author$project$Geometry$vecSubtract,
				A2($author$project$Geometry$vecScaleBy, -v, config.b$),
				A2($author$project$Geometry$vecScaleBy, u, config.b_)));
	});
var $author$project$Geometry$vectorSphereNormalAt = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	var z = _v0.c;
	return A3($author$project$Geometry$Vector, x, y, z);
};
var $author$project$Geometry$vectorTriangleNormalAt = F2(
	function (config, _v0) {
		var e2 = A2($author$project$Geometry$vecBetweenPoints, config.G, config.aw);
		var e1 = A2($author$project$Geometry$vecBetweenPoints, config.G, config.av);
		return A2($author$project$Geometry$vecCross, e2, e1);
	});
var $author$project$Geometry$shpNewShape = function (shapeConfig) {
	var newObject = F2(
		function (normalFn, intersectFn) {
			return {a8: shapeConfig, bl: intersectFn, bp: normalFn};
		});
	switch (shapeConfig.$) {
		case 1:
			return A2(newObject, $author$project$Geometry$vectorSphereNormalAt, $author$project$Geometry$intersectSphere);
		case 0:
			return A2(newObject, $author$project$Geometry$vectorPlaneNormalAt, $author$project$Geometry$intersectPlane);
		case 2:
			return A2(newObject, $author$project$Geometry$vectorCubeNormalAt, $author$project$Geometry$intersectCube);
		case 3:
			var config = shapeConfig.a;
			return A2(
				newObject,
				$author$project$Geometry$vectorCylinderNormalAt(config),
				$author$project$Geometry$intersectCylinder(config));
		case 4:
			var config = shapeConfig.a;
			return A2(
				newObject,
				$author$project$Geometry$vectorConeNormalAt(config),
				$author$project$Geometry$intersectCone(config));
		case 5:
			var config = shapeConfig.a;
			return A2(
				newObject,
				$author$project$Geometry$vectorTriangleNormalAt(config),
				$author$project$Geometry$intersectTriangle(config));
		default:
			var config = shapeConfig.a;
			return A2(
				newObject,
				$author$project$Geometry$vectorSmoothTriangleNormalAt(config),
				$author$project$Geometry$intersectTriangle(config));
	}
};
var $author$project$RayTracerDsl$sphere = A4(
	$author$project$RayTracerDsl$scale,
	0.5,
	0.5,
	0.5,
	A2(
		$author$project$RayTracerChallenge$Primitive,
		_List_Nil,
		{
			S: $author$project$Geometry$shpNewShape($author$project$Geometry$Sphere),
			J: 0,
			m: $author$project$RayTracerChallenge$defaultMaterial,
			W: $author$project$Geometry$matNewIdentity
		}));
var $author$project$Main$basic = A4($author$project$RayTracerDsl$scale, 20, 20, 20, $author$project$RayTracerDsl$sphere);
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.f) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.h),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.h);
		} else {
			var treeLen = builder.f * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.i) : builder.i;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.f);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.h) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.h);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{i: nodeList, f: (len / $elm$core$Array$branchFactor) | 0, h: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Geometry$Cube = {$: 2};
var $author$project$RayTracerDsl$cube = A4(
	$author$project$RayTracerDsl$scale,
	0.5,
	0.5,
	0.5,
	A2(
		$author$project$RayTracerChallenge$Primitive,
		_List_Nil,
		{
			S: $author$project$Geometry$shpNewShape($author$project$Geometry$Cube),
			J: 0,
			m: $author$project$RayTracerChallenge$defaultMaterial,
			W: $author$project$Geometry$matNewIdentity
		}));
var $author$project$Geometry$Cylinder = function (a) {
	return {$: 3, a: a};
};
var $author$project$RayTracerDsl$cylinder = A4(
	$author$project$RayTracerDsl$scale,
	0.5,
	0.5,
	0.5,
	A2(
		$author$project$RayTracerChallenge$Primitive,
		_List_Nil,
		{
			S: $author$project$Geometry$shpNewShape(
				$author$project$Geometry$Cylinder(
					{a5: true, _: 1, aa: -1})),
			J: 0,
			m: $author$project$RayTracerChallenge$defaultMaterial,
			W: $author$project$Geometry$matNewIdentity
		}));
var $author$project$RayTracerDsl$group = $author$project$RayTracerChallenge$Group(_List_Nil);
var $author$project$RayTracerChallenge$applyMaterial = F2(
	function (material, assembly) {
		switch (assembly.$) {
			case 3:
				return $author$project$RayTracerChallenge$Empty;
			case 2:
				var transform = assembly.a;
				var shape = assembly.b;
				return A2(
					$author$project$RayTracerChallenge$Primitive,
					transform,
					_Utils_update(
						shape,
						{m: material}));
			case 1:
				var transform = assembly.a;
				var op = assembly.b;
				var left = assembly.c;
				var right = assembly.d;
				return A4(
					$author$project$RayTracerChallenge$CSG,
					transform,
					op,
					A2($author$project$RayTracerChallenge$applyMaterial, material, left),
					A2($author$project$RayTracerChallenge$applyMaterial, material, right));
			default:
				var transform = assembly.a;
				var list = assembly.b;
				return A2(
					$author$project$RayTracerChallenge$Group,
					transform,
					A2(
						$elm$core$List$map,
						$author$project$RayTracerChallenge$applyMaterial(material),
						list));
		}
	});
var $author$project$RayTracerDsl$material = $author$project$RayTracerChallenge$applyMaterial;
var $author$project$RayTracerChallenge$Difference = 2;
var $author$project$RayTracerDsl$subtract = F2(
	function (a1, a2) {
		return A4($author$project$RayTracerChallenge$CSG, _List_Nil, 2, a2, a1);
	});
var $author$project$Geometry$matNewTranslate = F3(
	function (x, y, z) {
		return $author$project$Geometry$Matrix(1)(0)(0)(x)(0)(1)(0)(y)(0)(0)(1)(z)(0)(0)(0)(1);
	});
var $author$project$RayTracerDsl$translate = F3(
	function (x, y, z) {
		return $author$project$RayTracerDsl$applyTransform(
			A3($author$project$Geometry$matNewTranslate, x, y, z));
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$RayTracerDsl$pairs = F2(
	function (xs, ys) {
		return A2(
			$elm$core$List$concatMap,
			function (fn) {
				return A2($elm$core$List$map, fn, ys);
			},
			A2($elm$core$List$map, $elm$core$Tuple$pair, xs));
	});
var $author$project$RayTracerDsl$triples = F3(
	function (xs, ys, zs) {
		return A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var x = _v0.a;
				var y = _v0.b;
				return A2(
					$elm$core$List$map,
					function (z) {
						return _Utils_Tuple3(x, y, z);
					},
					zs);
			},
			A2($author$project$RayTracerDsl$pairs, xs, ys));
	});
var $author$project$RayTracerChallenge$Union = 0;
var $author$project$RayTracerDsl$csgFromList = function (op) {
	return function (assembly) {
		if (!assembly.b) {
			return $author$project$RayTracerChallenge$Empty;
		} else {
			var x = assembly.a;
			var xs = assembly.b;
			return A3(
				$elm$core$List$foldl,
				A2($author$project$RayTracerChallenge$CSG, _List_Nil, op),
				x,
				xs);
		}
	};
};
var $author$project$RayTracerDsl$union = $author$project$RayTracerDsl$csgFromList(0);
var $author$project$Main$brick = A2(
	$author$project$RayTracerDsl$material,
	{
		r: 0.3,
		k: $elm$core$Basics$always(
			{j: 0.32, l: 0.3, n: 0.3}),
		s: 0.8,
		u: 0.6,
		C: 1.5,
		D: false,
		P: 100,
		E: 0.3,
		A: 0.8
	},
	A2(
		$author$project$RayTracerDsl$subtract,
		$author$project$RayTracerDsl$group(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var x = _v3.a;
					var y = _v3.b;
					var z = _v3.c;
					return A4(
						$author$project$RayTracerDsl$translate,
						x,
						y,
						z,
						A4($author$project$RayTracerDsl$scale, 2.6, 2, 2.6, $author$project$RayTracerDsl$cylinder));
				},
				A3(
					$author$project$RayTracerDsl$triples,
					_List_fromArray(
						[-12, -4, 4, 12]),
					_List_fromArray(
						[4.6]),
					_List_fromArray(
						[4, -4])))),
		$author$project$RayTracerDsl$union(
			_List_fromArray(
				[
					A2(
					$author$project$RayTracerDsl$subtract,
					A4(
						$author$project$RayTracerDsl$translate,
						0,
						-1,
						0,
						A4($author$project$RayTracerDsl$scale, 29.4, 9.6, 13.4, $author$project$RayTracerDsl$cube)),
					A4($author$project$RayTracerDsl$scale, 31.8, 9.6, 15.8, $author$project$RayTracerDsl$cube)),
					$author$project$RayTracerDsl$group(
					A2(
						$elm$core$List$map,
						function (_v0) {
							var x = _v0.a;
							var y = _v0.b;
							var z = _v0.c;
							return A4(
								$author$project$RayTracerDsl$translate,
								x,
								y,
								z,
								A4($author$project$RayTracerDsl$scale, 0.6, 8.6, 0.6, $author$project$RayTracerDsl$cube));
						},
						_Utils_ap(
							A3(
								$author$project$RayTracerDsl$triples,
								_List_fromArray(
									[-12, -4, 4, 12]),
								_List_fromArray(
									[-0.5]),
								_List_fromArray(
									[6.7, -6.7])),
							A3(
								$author$project$RayTracerDsl$triples,
								_List_fromArray(
									[-14.7, 14.7]),
								_List_fromArray(
									[-0.5]),
								_List_fromArray(
									[4, -4]))))),
					$author$project$RayTracerDsl$group(
					A2(
						$elm$core$List$map,
						function (_v1) {
							var x = _v1.a;
							var y = _v1.b;
							var z = _v1.c;
							return A4(
								$author$project$RayTracerDsl$translate,
								x,
								y,
								z,
								A2(
									$author$project$RayTracerDsl$subtract,
									A4($author$project$RayTracerDsl$scale, 4.8, 8.8, 4.8, $author$project$RayTracerDsl$cylinder),
									A4($author$project$RayTracerDsl$scale, 6.51, 8.6, 6.51, $author$project$RayTracerDsl$cylinder)));
						},
						A3(
							$author$project$RayTracerDsl$triples,
							_List_fromArray(
								[-8, 0, 8]),
							_List_fromArray(
								[-0.5]),
							_List_fromArray(
								[0])))),
					$author$project$RayTracerDsl$group(
					A2(
						$elm$core$List$map,
						function (_v2) {
							var x = _v2.a;
							var y = _v2.b;
							var z = _v2.c;
							return A4(
								$author$project$RayTracerDsl$translate,
								x,
								y,
								z,
								A4($author$project$RayTracerDsl$scale, 4.8, 2, 4.8, $author$project$RayTracerDsl$cylinder));
						},
						A3(
							$author$project$RayTracerDsl$triples,
							_List_fromArray(
								[-12, -4, 4, 12]),
							_List_fromArray(
								[5.6]),
							_List_fromArray(
								[4, -4]))))
				]))));
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$html$Html$canvas = _VirtualDom_node('canvas');
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$cmdRender = _Platform_outgoingPort(
	'cmdRender',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'elementId',
					$elm$json$Json$Encode$string($.ba)),
					_Utils_Tuple2(
					'image',
					function ($) {
						return $elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'data',
									$elm$json$Json$Encode$list(
										function ($) {
											var a = $.a;
											var b = $.b;
											var c = $.c;
											return A2(
												$elm$json$Json$Encode$list,
												$elm$core$Basics$identity,
												_List_fromArray(
													[
														$elm$json$Json$Encode$int(a),
														$elm$json$Json$Encode$int(b),
														$elm$json$Json$Encode$int(c)
													]));
										})($.bP)),
									_Utils_Tuple2(
									'height',
									$elm$json$Json$Encode$int($.bT)),
									_Utils_Tuple2(
									'width',
									$elm$json$Json$Encode$int($.b9))
								]));
					}($.bi))
				]));
	});
var $author$project$Geometry$matInvert = function (_v0) {
	var j11 = _v0.a;
	var j12 = _v0.b;
	var j13 = _v0.c;
	var j14 = _v0.d;
	var j21 = _v0.e;
	var j22 = _v0.f;
	var j23 = _v0.g;
	var j24 = _v0.h;
	var j31 = _v0.i;
	var j32 = _v0.j;
	var j33 = _v0.k;
	var j34 = _v0.l;
	var j41 = _v0.m;
	var j42 = _v0.n;
	var j43 = _v0.o;
	var j44 = _v0.p;
	var det22 = {ay: (j21 * j32) - (j22 * j31), az: (j21 * j33) - (j23 * j31), aA: (j21 * j34) - (j24 * j31), aB: (j21 * j42) - (j22 * j41), aC: (j21 * j43) - (j23 * j41), aD: (j21 * j44) - (j24 * j41), aE: (j22 * j33) - (j23 * j32), aF: (j22 * j34) - (j24 * j32), aG: (j22 * j43) - (j23 * j42), aH: (j22 * j44) - (j24 * j42), aI: (j23 * j34) - (j24 * j33), aJ: (j23 * j44) - (j24 * j43), ac: (j31 * j42) - (j32 * j41), ad: (j31 * j43) - (j33 * j41), ae: (j31 * j44) - (j34 * j41), af: (j32 * j43) - (j33 * j42), ag: (j32 * j44) - (j34 * j42), ah: (j33 * j44) - (j34 * j43)};
	var term = {aV: ((j22 * det22.ah) - (j23 * det22.ag)) + (j24 * det22.af), aW: ((j21 * det22.ah) - (j23 * det22.ae)) + (j24 * det22.ad), aX: ((j21 * det22.ag) - (j22 * det22.ae)) + (j24 * det22.ac), aY: ((j21 * det22.af) - (j22 * det22.ad)) + (j23 * det22.ac)};
	var determinant = (((j11 * term.aV) - (j12 * term.aW)) + (j13 * term.aX)) - (j14 * term.aY);
	return $author$project$Geometry$Matrix(term.aV / determinant)((((j12 * det22.ah) - (j13 * det22.ag)) + (j14 * det22.af)) / (-determinant))((((j12 * det22.aJ) - (j13 * det22.aH)) + (j14 * det22.aG)) / determinant)((((j12 * det22.aI) - (j13 * det22.aF)) + (j14 * det22.aE)) / (-determinant))(term.aW / (-determinant))((((j11 * det22.ah) - (j13 * det22.ae)) + (j14 * det22.ad)) / determinant)((((j11 * det22.aJ) - (j13 * det22.aD)) + (j14 * det22.aC)) / (-determinant))((((j11 * det22.aI) - (j13 * det22.aA)) + (j14 * det22.az)) / determinant)(term.aX / determinant)((((j11 * det22.ag) - (j12 * det22.ae)) + (j14 * det22.ac)) / (-determinant))((((j11 * det22.aH) - (j12 * det22.aD)) + (j14 * det22.aB)) / determinant)((((j11 * det22.aF) - (j12 * det22.aA)) + (j14 * det22.ay)) / (-determinant))(term.aY / (-determinant))((((j11 * det22.af) - (j12 * det22.ad)) + (j13 * det22.ac)) / determinant)((((j11 * det22.aG) - (j12 * det22.aC)) + (j13 * det22.aB)) / (-determinant))((((j11 * det22.aE) - (j12 * det22.az)) + (j13 * det22.ay)) / determinant);
};
var $author$project$Geometry$matProduct = F2(
	function (_v0, _v1) {
		var a11 = _v0.a;
		var a12 = _v0.b;
		var a13 = _v0.c;
		var a14 = _v0.d;
		var a21 = _v0.e;
		var a22 = _v0.f;
		var a23 = _v0.g;
		var a24 = _v0.h;
		var a31 = _v0.i;
		var a32 = _v0.j;
		var a33 = _v0.k;
		var a34 = _v0.l;
		var a41 = _v0.m;
		var a42 = _v0.n;
		var a43 = _v0.o;
		var a44 = _v0.p;
		var b11 = _v1.a;
		var b12 = _v1.b;
		var b13 = _v1.c;
		var b14 = _v1.d;
		var b21 = _v1.e;
		var b22 = _v1.f;
		var b23 = _v1.g;
		var b24 = _v1.h;
		var b31 = _v1.i;
		var b32 = _v1.j;
		var b33 = _v1.k;
		var b34 = _v1.l;
		var b41 = _v1.m;
		var b42 = _v1.n;
		var b43 = _v1.o;
		var b44 = _v1.p;
		return $author$project$Geometry$Matrix((((a14 * b41) + (a13 * b31)) + (a12 * b21)) + (a11 * b11))((((a14 * b42) + (a13 * b32)) + (a12 * b22)) + (a11 * b12))((((a14 * b43) + (a13 * b33)) + (a12 * b23)) + (a11 * b13))((((a14 * b44) + (a13 * b34)) + (a12 * b24)) + (a11 * b14))((((a24 * b41) + (a23 * b31)) + (a22 * b21)) + (a21 * b11))((((a24 * b42) + (a23 * b32)) + (a22 * b22)) + (a21 * b12))((((a24 * b43) + (a23 * b33)) + (a22 * b23)) + (a21 * b13))((((a24 * b44) + (a23 * b34)) + (a22 * b24)) + (a21 * b14))((((a34 * b41) + (a33 * b31)) + (a32 * b21)) + (a31 * b11))((((a34 * b42) + (a33 * b32)) + (a32 * b22)) + (a31 * b12))((((a34 * b43) + (a33 * b33)) + (a32 * b23)) + (a31 * b13))((((a34 * b44) + (a33 * b34)) + (a32 * b24)) + (a31 * b14))((((a44 * b41) + (a43 * b31)) + (a42 * b21)) + (a41 * b11))((((a44 * b42) + (a43 * b32)) + (a42 * b22)) + (a41 * b12))((((a44 * b43) + (a43 * b33)) + (a42 * b23)) + (a41 * b13))((((a44 * b44) + (a43 * b34)) + (a42 * b24)) + (a41 * b14));
	});
var $elm$core$Basics$tan = _Basics_tan;
var $author$project$Geometry$vecUnit = function (vector) {
	return A2(
		$author$project$Geometry$vecScaleBy,
		1 / $author$project$Geometry$vecLength(vector),
		vector);
};
var $author$project$RayTracerChallenge$newCamera = function (config) {
	var cameraViewTransform = F3(
		function (from, to, upApprox) {
			var orientation = F3(
				function (_v2, _v3, _v4) {
					var lx = _v2.a;
					var ly = _v2.b;
					var lz = _v2.c;
					var ux = _v3.a;
					var uy = _v3.b;
					var uz = _v3.c;
					var fx = _v4.a;
					var fy = _v4.b;
					var fz = _v4.c;
					return $author$project$Geometry$Matrix(lx)(ly)(lz)(0)(ux)(uy)(uz)(0)(-fx)(-fy)(-fz)(0)(0)(0)(0)(1);
				});
			var forward = $author$project$Geometry$vecUnit(
				A2($author$project$Geometry$vecBetweenPoints, from, to));
			var left = $author$project$Geometry$vecUnit(
				A2($author$project$Geometry$vecCross, forward, upApprox));
			var up = $author$project$Geometry$vecUnit(
				A2($author$project$Geometry$vecCross, left, forward));
			var _v1 = from;
			var fromx = _v1.a;
			var fromy = _v1.b;
			var fromz = _v1.c;
			return $author$project$Geometry$matInvert(
				A2(
					$author$project$Geometry$matProduct,
					A3(orientation, left, up, forward),
					A3($author$project$Geometry$matNewTranslate, -fromx, -fromy, -fromz)));
		});
	var cameraFOV = function (camera) {
		var halfView = $elm$core$Basics$tan(camera.aK / 2);
		var aspect = camera.aL / camera.aM;
		var _v0 = (1 <= aspect) ? _Utils_Tuple2(halfView, halfView / aspect) : _Utils_Tuple2(halfView * aspect, halfView);
		var halfWidth = _v0.a;
		var halfHeight = _v0.b;
		var offsetHeight = halfHeight - (halfWidth / camera.aL);
		var offsetWidth = halfWidth - (halfWidth / camera.aL);
		var pixelSize = 2 * (halfWidth / camera.aL);
		return _Utils_update(
			camera,
			{aq: offsetHeight, ar: offsetWidth, ak: pixelSize});
	};
	return cameraFOV(
		{
			aK: config.aK,
			aL: config.aL,
			aM: config.aM,
			aO: config.aO,
			aq: 0,
			ar: 0,
			ak: 0,
			a$: A3(cameraViewTransform, config.aZ, config.a_, config.a0)
		});
};
var $author$project$RayTracerDsl$camera = $author$project$RayTracerChallenge$newCamera;
var $elm$core$Basics$pi = _Basics_pi;
var $author$project$Geometry$Plane = {$: 0};
var $author$project$RayTracerDsl$plane = A2(
	$author$project$RayTracerChallenge$Primitive,
	_List_Nil,
	{
		S: $author$project$Geometry$shpNewShape($author$project$Geometry$Plane),
		J: 0,
		m: $author$project$RayTracerChallenge$defaultMaterial,
		W: $author$project$Geometry$matNewIdentity
	});
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$sin = _Basics_sin;
var $author$project$Geometry$matNewRotateX = function (radians) {
	return $author$project$Geometry$Matrix(1)(0)(0)(0)(0)(
		$elm$core$Basics$cos(radians))(
		-$elm$core$Basics$sin(radians))(0)(0)(
		$elm$core$Basics$sin(radians))(
		$elm$core$Basics$cos(radians))(0)(0)(0)(0)(1);
};
var $author$project$RayTracerDsl$rotateX = function (a) {
	return $author$project$RayTracerDsl$applyTransform(
		$author$project$Geometry$matNewRotateX(a));
};
var $author$project$Main$coverAssembly = function () {
	var white = {
		r: 0.1,
		k: $elm$core$Basics$always(
			{j: 1, l: 1, n: 1}),
		s: 0.7,
		u: 0.1,
		C: 1.5,
		D: true,
		P: 200,
		E: 0.0,
		A: 0
	};
	var _v0 = _Utils_Tuple3(
		_Utils_update(
			white,
			{
				k: $elm$core$Basics$always(
					{j: 0.914, l: 0.831, n: 0.537})
			}),
		_Utils_update(
			white,
			{
				k: $elm$core$Basics$always(
					{j: 0.388, l: 0.322, n: 0.941})
			}),
		_Utils_update(
			white,
			{
				k: $elm$core$Basics$always(
					{j: 0.55, l: 0.404, n: 0.373})
			}));
	var blue = _v0.a;
	var red = _v0.b;
	var purple = _v0.c;
	return A4(
		$author$project$RayTracerDsl$translate,
		1.25,
		-10.25,
		1.25,
		A4(
			$author$project$RayTracerDsl$scale,
			0.25,
			0.25,
			0.25,
			$author$project$RayTracerDsl$group(
				_List_fromArray(
					[
						A2(
						$author$project$RayTracerDsl$material,
						_Utils_update(
							white,
							{r: 1, s: 0, u: 0}),
						A4(
							$author$project$RayTracerDsl$translate,
							0,
							0,
							500,
							A2($author$project$RayTracerDsl$rotateX, $elm$core$Basics$pi / 2, $author$project$RayTracerDsl$plane))),
						A2(
						$author$project$RayTracerDsl$material,
						_Utils_update(
							purple,
							{r: 0, s: 0.2, u: 0.7, E: 1, A: 0.7}),
						A4(
							$author$project$RayTracerDsl$translate,
							2,
							34,
							2,
							A4($author$project$RayTracerDsl$scale, 14, 14, 14, $author$project$RayTracerDsl$sphere))),
						A2(
						$author$project$RayTracerDsl$material,
						white,
						$author$project$RayTracerDsl$group(
							_List_fromArray(
								[
									A4(
									$author$project$RayTracerDsl$translate,
									15,
									37,
									15,
									A4($author$project$RayTracerDsl$scale, 8, 8, 8, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									31,
									45,
									47,
									A4($author$project$RayTracerDsl$scale, 8, 8, 8, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									79,
									41,
									35,
									A4($author$project$RayTracerDsl$scale, 8, 8, 8, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									17,
									35,
									1,
									A4($author$project$RayTracerDsl$scale, 12, 12, 12, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									0,
									36,
									33,
									A4($author$project$RayTracerDsl$scale, 12, 12, 12, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									36,
									18,
									2,
									A4($author$project$RayTracerDsl$scale, 14, 14, 14, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									2,
									18,
									18,
									A4($author$project$RayTracerDsl$scale, 14, 14, 14, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									2,
									2,
									18,
									A4($author$project$RayTracerDsl$scale, 14, 14, 14, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									0,
									0,
									34,
									A4($author$project$RayTracerDsl$scale, 14, 14, 14, $author$project$RayTracerDsl$cube))
								]))),
						A2(
						$author$project$RayTracerDsl$material,
						blue,
						$author$project$RayTracerDsl$group(
							_List_fromArray(
								[
									A4(
									$author$project$RayTracerDsl$translate,
									36,
									40,
									0,
									A4($author$project$RayTracerDsl$scale, 14, 14, 14, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									18,
									38,
									32,
									A4($author$project$RayTracerDsl$scale, 14, 14, 14, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									0,
									14,
									3,
									A4($author$project$RayTracerDsl$scale, 14, 14, 14, $author$project$RayTracerDsl$cube))
								]))),
						A2(
						$author$project$RayTracerDsl$material,
						red,
						$author$project$RayTracerDsl$group(
							_List_fromArray(
								[
									A4(
									$author$project$RayTracerDsl$translate,
									41,
									43,
									31,
									A4($author$project$RayTracerDsl$scale, 12, 12, 12, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									18,
									18,
									2,
									A4($author$project$RayTracerDsl$scale, 14, 14, 14, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									2,
									34,
									18,
									A4($author$project$RayTracerDsl$scale, 14, 14, 14, $author$project$RayTracerDsl$cube))
								]))),
						A2(
						$author$project$RayTracerDsl$material,
						purple,
						$author$project$RayTracerDsl$group(
							_List_fromArray(
								[
									A4(
									$author$project$RayTracerDsl$translate,
									31,
									37,
									17,
									A4($author$project$RayTracerDsl$scale, 12, 12, 12, $author$project$RayTracerDsl$cube)),
									A4(
									$author$project$RayTracerDsl$translate,
									0,
									16,
									34,
									A4($author$project$RayTracerDsl$scale, 14, 14, 14, $author$project$RayTracerDsl$cube))
								])))
					]))));
}();
var $author$project$RayTracerChallenge$colourWhite = {j: 1, l: 1, n: 1};
var $author$project$RayTracerChallenge$newLight = function (point) {
	return {k: $author$project$RayTracerChallenge$colourWhite, b3: point};
};
var $author$project$RayTracerDsl$light = $author$project$RayTracerChallenge$newLight;
var $author$project$Geometry$pntNewPoint = F3(
	function (x, y, z) {
		return A3($author$project$Geometry$Point, x, y, z);
	});
var $author$project$RayTracerDsl$point = $author$project$Geometry$pntNewPoint;
var $author$project$Geometry$vecNewUnit = F3(
	function (dx, dy, dz) {
		return $author$project$Geometry$vecUnit(
			A3($author$project$Geometry$Vector, dx, dy, dz));
	});
var $author$project$RayTracerDsl$vector = $author$project$Geometry$vecNewUnit;
var $author$project$Main$cover = {
	au: $author$project$Main$coverAssembly,
	ax: $author$project$RayTracerDsl$camera(
		{
			aK: $elm$core$Basics$pi / 4,
			aL: 320,
			aM: 320,
			aO: 5,
			aZ: A3($author$project$RayTracerDsl$point, -6, 6, -10),
			a_: A3($author$project$RayTracerDsl$point, 6, 0, 6),
			a0: A3($author$project$RayTracerDsl$vector, -0.45, 1, 0)
		}),
	aN: _List_fromArray(
		[
			$author$project$RayTracerDsl$light(
			A3($author$project$RayTracerDsl$point, 50, 100, -50)),
			{
			k: {j: 0.2, l: 0.2, n: 0.2},
			b3: A3($author$project$RayTracerDsl$point, -400, 50, -10)
		}
		])
};
var $author$project$Main$csg = function () {
	var mat = {
		r: 0.3,
		k: $elm$core$Basics$always(
			{j: 0.5, l: 1, n: 1}),
		s: 0.8,
		u: 0,
		C: 1,
		D: false,
		P: 100,
		E: 0.3,
		A: 0
	};
	return A4(
		$author$project$RayTracerDsl$scale,
		30,
		30,
		30,
		A2(
			$author$project$RayTracerDsl$subtract,
			A2(
				$author$project$RayTracerDsl$material,
				_Utils_update(
					mat,
					{
						k: $elm$core$Basics$always(
							{j: 1, l: 1, n: 0.5})
					}),
				A4($author$project$RayTracerDsl$translate, 0.4, 0.4, -0.4, $author$project$RayTracerDsl$sphere)),
			A2($author$project$RayTracerDsl$material, mat, $author$project$RayTracerDsl$cube)));
}();
var $author$project$RayTracerDsl$primitive = function (config) {
	return A2(
		$author$project$RayTracerChallenge$Primitive,
		_List_Nil,
		{
			S: $author$project$Geometry$shpNewShape(config),
			J: 0,
			m: $author$project$RayTracerChallenge$defaultMaterial,
			W: $author$project$Geometry$matNewIdentity
		});
};
var $author$project$Geometry$matNewRotateZ = function (radians) {
	return $author$project$Geometry$Matrix(
		$elm$core$Basics$cos(radians))(
		-$elm$core$Basics$sin(radians))(0)(0)(
		$elm$core$Basics$sin(radians))(
		$elm$core$Basics$cos(radians))(0)(0)(0)(0)(1)(0)(0)(0)(0)(1);
};
var $author$project$RayTracerDsl$rotateZ = function (a) {
	return $author$project$RayTracerDsl$applyTransform(
		$author$project$Geometry$matNewRotateZ(a));
};
var $author$project$Main$csghex = function () {
	var oldmat = {
		r: 0.6,
		k: $elm$core$Basics$always(
			{j: 0.1, l: 0.1, n: 0.25}),
		s: 0.9,
		u: 0,
		C: 1,
		D: false,
		P: 300,
		E: 0.99,
		A: 0.999
	};
	return A2(
		$author$project$RayTracerDsl$material,
		{
			r: 0.2,
			k: $elm$core$Basics$always(
				{j: 0.5, l: 0.5, n: 0.9}),
			s: 0.8,
			u: 0.7,
			C: 1.3,
			D: false,
			P: 300,
			E: 0.8,
			A: 0.5
		},
		A4(
			$author$project$RayTracerDsl$scale,
			5,
			5,
			5,
			A2(
				$author$project$RayTracerDsl$rotateX,
				$elm$core$Basics$pi / 3,
				$author$project$RayTracerDsl$union(
					A2(
						$elm$core$List$map,
						function (i) {
							return A2(
								$author$project$RayTracerDsl$rotateZ,
								i,
								A4(
									$author$project$RayTracerDsl$translate,
									3.5,
									-2,
									0,
									$author$project$RayTracerDsl$union(
										_List_fromArray(
											[
												$author$project$RayTracerDsl$primitive(
												$author$project$Geometry$Cylinder(
													{a5: true, _: 4, aa: 0})),
												A4($author$project$RayTracerDsl$scale, 2, 2, 2, $author$project$RayTracerDsl$sphere)
											]))));
						},
						A2(
							$elm$core$List$map,
							function (i) {
								return (i * $elm$core$Basics$pi) / 3;
							},
							A2($elm$core$List$range, 0, 5)))))));
}();
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {bf: fragment, bh: host, br: path, bt: port_, bx: protocol, by: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$hex = A2(
	$author$project$RayTracerDsl$material,
	{
		r: 0.2,
		k: $elm$core$Basics$always(
			{j: 0.5, l: 0.5, n: 0.9}),
		s: 0.8,
		u: 0.7,
		C: 1.3,
		D: false,
		P: 300,
		E: 0.8,
		A: 0.5
	},
	A4(
		$author$project$RayTracerDsl$scale,
		5,
		5,
		5,
		A2(
			$author$project$RayTracerDsl$rotateX,
			$elm$core$Basics$pi / 3,
			$author$project$RayTracerDsl$group(
				A2(
					$elm$core$List$map,
					function (i) {
						return A2(
							$author$project$RayTracerDsl$rotateZ,
							i,
							A4(
								$author$project$RayTracerDsl$translate,
								3.5,
								-2,
								0,
								$author$project$RayTracerDsl$group(
									_List_fromArray(
										[
											A4($author$project$RayTracerDsl$scale, 2, 2, 2, $author$project$RayTracerDsl$sphere),
											$author$project$RayTracerDsl$primitive(
											$author$project$Geometry$Cylinder(
												{a5: false, _: 4, aa: 0}))
										]))));
					},
					A2(
						$elm$core$List$map,
						function (i) {
							return ($elm$core$Basics$pi / 3) * i;
						},
						A2($elm$core$List$range, 0, 5)))))));
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $author$project$Main$infobubble = function () {
	var mat = {
		r: 0.2,
		k: $elm$core$Basics$always(
			{j: 0.8, l: 0.7, n: 0.9}),
		s: 0.6,
		u: 0,
		C: 1,
		D: true,
		P: 300,
		E: 0,
		A: 0
	};
	var cylinder = $author$project$RayTracerDsl$primitive(
		$author$project$Geometry$Cylinder(
			{a5: true, _: 1, aa: 0}));
	return {
		au: $author$project$RayTracerDsl$group(
			_List_fromArray(
				[
					A2(
					$author$project$RayTracerDsl$material,
					_Utils_update(
						mat,
						{
							r: 0.5,
							k: $elm$core$Basics$always(
								{j: 1, l: 1, n: 1}),
							s: 1,
							u: 0.4
						}),
					A4($author$project$RayTracerDsl$translate, 0, -0.25, 0, $author$project$RayTracerDsl$plane)),
					A2(
					$author$project$RayTracerDsl$material,
					_Utils_update(
						mat,
						{
							r: 0,
							k: $elm$core$Basics$always(
								{j: 1, l: 0.5, n: 0.5}),
							s: 1,
							u: 0.1
						}),
					A4(
						$author$project$RayTracerDsl$translate,
						0,
						10,
						10,
						A4($author$project$RayTracerDsl$scale, 2, 2, 2, $author$project$RayTracerDsl$sphere))),
					A2(
					$author$project$RayTracerDsl$material,
					_Utils_update(
						mat,
						{
							r: 0.4,
							k: $elm$core$Basics$always(
								{j: 0.36, l: 0.3, n: 0.3}),
							s: 0.1,
							u: 0.2,
							C: 1.00025,
							D: false,
							A: 0.9
						}),
					A4(
						$author$project$RayTracerDsl$translate,
						0,
						2.5,
						0,
						A4($author$project$RayTracerDsl$scale, 8, 8, 8, $author$project$RayTracerDsl$sphere))),
					A2(
					$author$project$RayTracerDsl$material,
					mat,
					A4(
						$author$project$RayTracerDsl$scale,
						0.01,
						0.01,
						0.01,
						$author$project$RayTracerDsl$group(
							_List_fromArray(
								[
									A4(
									$author$project$RayTracerDsl$translate,
									0,
									500,
									0,
									A4($author$project$RayTracerDsl$scale, 100, 100, 100, $author$project$RayTracerDsl$sphere)),
									A4(
									$author$project$RayTracerDsl$translate,
									0,
									425,
									0,
									A4($author$project$RayTracerDsl$scale, 10, 25, 10, cylinder)),
									A4(
									$author$project$RayTracerDsl$translate,
									200,
									400,
									0,
									A2(
										$author$project$RayTracerDsl$rotateZ,
										$elm$core$Basics$pi / 2,
										A4($author$project$RayTracerDsl$scale, 10, 400, 10, cylinder))),
									A4(
									$author$project$RayTracerDsl$translate,
									0,
									250,
									0,
									A4($author$project$RayTracerDsl$scale, 120, 160, 80, $author$project$RayTracerDsl$sphere)),
									A4(
									$author$project$RayTracerDsl$translate,
									0,
									350,
									0,
									A4($author$project$RayTracerDsl$scale, 120, 160, 80, $author$project$RayTracerDsl$sphere)),
									A4(
									$author$project$RayTracerDsl$translate,
									160,
									-25,
									0,
									A4($author$project$RayTracerDsl$scale, 60, 30, 120, $author$project$RayTracerDsl$sphere)),
									A4(
									$author$project$RayTracerDsl$translate,
									200,
									400,
									0,
									A4($author$project$RayTracerDsl$scale, 50, 50, 20, $author$project$RayTracerDsl$sphere)),
									A4(
									$author$project$RayTracerDsl$translate,
									0,
									250,
									0,
									A2(
										$author$project$RayTracerDsl$rotateZ,
										(7 * $elm$core$Basics$pi) / 6,
										A4($author$project$RayTracerDsl$scale, 10, 300, 10, cylinder))),
									A4(
									$author$project$RayTracerDsl$scale,
									-1,
									1,
									1,
									A4(
										$author$project$RayTracerDsl$translate,
										160,
										-25,
										0,
										A4($author$project$RayTracerDsl$scale, 60, 30, 120, $author$project$RayTracerDsl$sphere))),
									A4(
									$author$project$RayTracerDsl$scale,
									-1,
									1,
									1,
									A4(
										$author$project$RayTracerDsl$translate,
										200,
										400,
										0,
										A4($author$project$RayTracerDsl$scale, 50, 50, 20, $author$project$RayTracerDsl$sphere))),
									A4(
									$author$project$RayTracerDsl$scale,
									-1,
									1,
									1,
									A4(
										$author$project$RayTracerDsl$translate,
										0,
										250,
										0,
										A2(
											$author$project$RayTracerDsl$rotateZ,
											(7 * $elm$core$Basics$pi) / 6,
											A4($author$project$RayTracerDsl$scale, 10, 300, 10, cylinder))))
								]))))
				])),
		ax: $author$project$RayTracerDsl$camera(
			{
				aK: $elm$core$Basics$pi / 15,
				aL: 160 * 2,
				aM: 160 * 2,
				aO: 3,
				aZ: A3($author$project$RayTracerDsl$point, 50, 5.5, -60),
				a_: A3($author$project$RayTracerDsl$point, 3, 4, 0),
				a0: A3($author$project$RayTracerDsl$vector, 0, 1, 0)
			}),
		aN: _List_fromArray(
			[
				$author$project$RayTracerDsl$light(
				A3($author$project$RayTracerDsl$point, -20, 30, -60))
			])
	};
}();
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Geometry$Cone = function (a) {
	return {$: 4, a: a};
};
var $author$project$RayTracerDsl$cone = A4(
	$author$project$RayTracerDsl$translate,
	0,
	0.5,
	0,
	A4(
		$author$project$RayTracerDsl$scale,
		0.5,
		1,
		0.5,
		A2(
			$author$project$RayTracerChallenge$Primitive,
			_List_Nil,
			{
				S: $author$project$Geometry$shpNewShape(
					$author$project$Geometry$Cone(
						{a5: true, _: 0, aa: -1})),
				J: 0,
				m: $author$project$RayTracerChallenge$defaultMaterial,
				W: $author$project$Geometry$matNewIdentity
			})));
var $author$project$Geometry$Triangle = function (a) {
	return {$: 5, a: a};
};
var $author$project$RayTracerDsl$triangle = A2(
	$author$project$RayTracerChallenge$Primitive,
	_List_Nil,
	{
		S: $author$project$Geometry$shpNewShape(
			$author$project$Geometry$Triangle(
				{
					G: A3($author$project$RayTracerDsl$point, 0, 0, 0),
					av: A3($author$project$RayTracerDsl$point, 1, 0, 0),
					aw: A3($author$project$RayTracerDsl$point, 0, 0, 1)
				})),
		J: 0,
		m: $author$project$RayTracerChallenge$defaultMaterial,
		W: $author$project$Geometry$matNewIdentity
	});
var $author$project$Main$primitives = A4(
	$author$project$RayTracerDsl$scale,
	10,
	10,
	10,
	$author$project$RayTracerDsl$group(
		_List_fromArray(
			[
				$author$project$RayTracerDsl$plane,
				A4($author$project$RayTracerDsl$translate, -1, 0.5, -1, $author$project$RayTracerDsl$cube),
				A4($author$project$RayTracerDsl$translate, 2, 0.5, -3.5, $author$project$RayTracerDsl$sphere),
				A4($author$project$RayTracerDsl$translate, 1, 0.5, 0, $author$project$RayTracerDsl$cylinder),
				A4($author$project$RayTracerDsl$translate, 3, 0.5, -1.5, $author$project$RayTracerDsl$cone),
				A4(
				$author$project$RayTracerDsl$translate,
				-3,
				1,
				2,
				A2($author$project$RayTracerDsl$rotateX, (-$elm$core$Basics$pi) / 4, $author$project$RayTracerDsl$triangle))
			])));
var $author$project$Geometry$pntTransform = F2(
	function (_v0, _v1) {
		var j11 = _v0.a;
		var j12 = _v0.b;
		var j13 = _v0.c;
		var j14 = _v0.d;
		var j21 = _v0.e;
		var j22 = _v0.f;
		var j23 = _v0.g;
		var j24 = _v0.h;
		var j31 = _v0.i;
		var j32 = _v0.j;
		var j33 = _v0.k;
		var j34 = _v0.l;
		var x = _v1.a;
		var y = _v1.b;
		var z = _v1.c;
		return A3($author$project$Geometry$Point, ((j14 + (j13 * z)) + (j12 * y)) + (j11 * x), ((j24 + (j23 * z)) + (j22 * y)) + (j21 * x), ((j34 + (j33 * z)) + (j32 * y)) + (j31 * x));
	});
var $author$project$Geometry$Ray = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Geometry$rayNewRay = F2(
	function (rpoint, vector) {
		return A2($author$project$Geometry$Ray, rpoint, vector);
	});
var $author$project$RayTracerChallenge$cameraRayForPixel = F2(
	function (camera, pixel) {
		var toWorldSpace = $author$project$Geometry$pntTransform(camera.a$);
		var target = toWorldSpace(
			A3($author$project$Geometry$pntNewPoint, camera.ar - (camera.ak * pixel.a1), camera.aq - (camera.ak * pixel.a2), -1));
		var origin = toWorldSpace(
			A3($author$project$Geometry$pntNewPoint, 0, 0, 0));
		return A2(
			$author$project$Geometry$rayNewRay,
			origin,
			$author$project$Geometry$vecUnit(
				A2($author$project$Geometry$vecBetweenPoints, origin, target)));
	});
var $author$project$RayTracerChallenge$colourBlack = {j: 0, l: 0, n: 0};
var $author$project$RayTracerChallenge$colourMul = F2(
	function (a, b) {
		return {j: a.j * b.j, l: a.l * b.l, n: a.n * b.n};
	});
var $author$project$RayTracerChallenge$colourScaleBy = F2(
	function (scale, colour) {
		return A2(
			$author$project$RayTracerChallenge$colourMul,
			{j: scale, l: scale, n: scale},
			colour);
	});
var $author$project$RayTracerChallenge$colourSum = F2(
	function (a, b) {
		return {j: a.j + b.j, l: a.l + b.l, n: a.n + b.n};
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $author$project$RayTracerChallenge$defaultHit = {
	I: A3($author$project$Geometry$vecNewUnit, 1, 0, 0),
	ap: false,
	L: 1,
	M: 1,
	p: A3($author$project$Geometry$vecNewUnit, 1, 0, 0),
	e: {
		S: $author$project$Geometry$shpNewShape($author$project$Geometry$Sphere),
		J: 0,
		m: $author$project$RayTracerChallenge$defaultMaterial,
		W: $author$project$Geometry$matNewIdentity
	},
	aj: A3($author$project$Geometry$pntNewPoint, 0, 0, 0),
	b3: A3($author$project$Geometry$pntNewPoint, 0, 0, 0),
	O: A2(
		$author$project$Geometry$rayNewRay,
		A3($author$project$Geometry$pntNewPoint, 0, 0, 0),
		A3($author$project$Geometry$vecNewUnit, 1, 0, 0)),
	as: A3($author$project$Geometry$vecNewUnit, 1, 0, 0),
	q: 0,
	at: A3($author$project$Geometry$pntNewPoint, 0, 0, 0)
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$RayTracerChallenge$refractionIndices = F2(
	function (intersections, hit) {
		var refractiveIndex = function (shapes) {
			return A2(
				$elm$core$Maybe$withDefault,
				1,
				A2(
					$elm$core$Maybe$map,
					A2(
						$elm$core$Basics$composeR,
						function ($) {
							return $.e;
						},
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.m;
							},
							function ($) {
								return $.C;
							})),
					$elm$core$List$head(shapes)));
		};
		var loop = F2(
			function (exiting, listIntersections) {
				loop:
				while (true) {
					if (listIntersections.b) {
						var intersection = listIntersections.a;
						var remainingIntersections = listIntersections.b;
						var entering = A2(
							$elm$core$List$any,
							A2(
								$elm$core$Basics$composeR,
								function ($) {
									return $.e;
								},
								A2(
									$elm$core$Basics$composeR,
									function ($) {
										return $.J;
									},
									$elm$core$Basics$eq(intersection.e.J))),
							exiting) ? A2(
							$elm$core$List$filter,
							A2(
								$elm$core$Basics$composeR,
								function ($) {
									return $.e;
								},
								A2(
									$elm$core$Basics$composeR,
									function ($) {
										return $.J;
									},
									$elm$core$Basics$neq(intersection.e.J))),
							exiting) : A2($elm$core$List$cons, intersection, exiting);
						if (_Utils_eq(intersection.q, hit.q)) {
							return _Utils_update(
								hit,
								{
									L: refractiveIndex(exiting),
									M: refractiveIndex(entering)
								});
						} else {
							var $temp$exiting = entering,
								$temp$listIntersections = remainingIntersections;
							exiting = $temp$exiting;
							listIntersections = $temp$listIntersections;
							continue loop;
						}
					} else {
						return hit;
					}
				}
			});
		return A2(loop, _List_Nil, intersections);
	});
var $author$project$Geometry$vecReflect = F2(
	function (normal, inbound) {
		return A2(
			$author$project$Geometry$vecSubtract,
			inbound,
			A2(
				$author$project$Geometry$vecScaleBy,
				2 * A2($author$project$Geometry$vecDot, inbound, normal),
				normal));
	});
var $author$project$Geometry$matTranspose = function (_v0) {
	var j11 = _v0.a;
	var j12 = _v0.b;
	var j13 = _v0.c;
	var j14 = _v0.d;
	var j21 = _v0.e;
	var j22 = _v0.f;
	var j23 = _v0.g;
	var j24 = _v0.h;
	var j31 = _v0.i;
	var j32 = _v0.j;
	var j33 = _v0.k;
	var j34 = _v0.l;
	var j41 = _v0.m;
	var j42 = _v0.n;
	var j43 = _v0.o;
	var j44 = _v0.p;
	return $author$project$Geometry$Matrix(j11)(j21)(j31)(j41)(j12)(j22)(j32)(j42)(j13)(j23)(j33)(j43)(j14)(j24)(j34)(j44);
};
var $author$project$Geometry$vecTransform = F2(
	function (_v0, _v1) {
		var j11 = _v0.a;
		var j12 = _v0.b;
		var j13 = _v0.c;
		var j21 = _v0.e;
		var j22 = _v0.f;
		var j23 = _v0.g;
		var j31 = _v0.i;
		var j32 = _v0.j;
		var j33 = _v0.k;
		var dx = _v1.a;
		var dy = _v1.b;
		var dz = _v1.c;
		return A3($author$project$Geometry$Vector, ((j13 * dz) + (j12 * dy)) + (j11 * dx), ((j23 * dz) + (j22 * dy)) + (j21 * dx), ((j33 * dz) + (j32 * dy)) + (j31 * dx));
	});
var $author$project$RayTracerChallenge$vectorNormalAt = F2(
	function (shape, point) {
		return $author$project$Geometry$vecUnit(
			A2(
				$author$project$Geometry$vecTransform,
				$author$project$Geometry$matTranspose(shape.W),
				shape.S.bp(
					A2($author$project$Geometry$pntTransform, shape.W, point))));
	});
var $author$project$RayTracerChallenge$hitFromIntersections = function (intersections) {
	var epsilon = 1.0e-6;
	return A2(
		$elm$core$Maybe$map,
		A2(
			$elm$core$Basics$composeR,
			function (intersect) {
				return _Utils_update(
					$author$project$RayTracerChallenge$defaultHit,
					{e: intersect.e, O: intersect.O, q: intersect.q});
			},
			A2(
				$elm$core$Basics$composeR,
				function (h) {
					return _Utils_update(
						h,
						{
							b3: A2($author$project$Geometry$pntAlongRay, h.O, h.q)
						});
				},
				A2(
					$elm$core$Basics$composeR,
					function (h) {
						var _v0 = h.O;
						var vector = _v0.b;
						return _Utils_update(
							h,
							{
								I: $author$project$Geometry$vecUnit(
									A2($author$project$Geometry$vecScaleBy, -1, vector))
							});
					},
					A2(
						$elm$core$Basics$composeR,
						function (h) {
							return _Utils_update(
								h,
								{
									p: A2($author$project$RayTracerChallenge$vectorNormalAt, h.e, h.b3)
								});
						},
						A2(
							$elm$core$Basics$composeR,
							function (h) {
								return _Utils_update(
									h,
									{
										ap: A2($author$project$Geometry$vecDot, h.p, h.I) <= 0
									});
							},
							A2(
								$elm$core$Basics$composeR,
								function (h) {
									return _Utils_update(
										h,
										{
											p: h.ap ? $author$project$Geometry$vecUnit(
												A2($author$project$Geometry$vecScaleBy, -1, h.p)) : h.p
										});
								},
								A2(
									$elm$core$Basics$composeR,
									function (h) {
										var _v1 = h.O;
										var vector = _v1.b;
										return _Utils_update(
											h,
											{
												as: A2($author$project$Geometry$vecReflect, h.p, vector)
											});
									},
									A2(
										$elm$core$Basics$composeR,
										function (h) {
											return _Utils_update(
												h,
												{
													aj: A2(
														$author$project$Geometry$pntAlongRay,
														A2($author$project$Geometry$rayNewRay, h.b3, h.p),
														epsilon)
												});
										},
										A2(
											$elm$core$Basics$composeR,
											function (h) {
												return _Utils_update(
													h,
													{
														at: A2(
															$author$project$Geometry$pntAlongRay,
															A2($author$project$Geometry$rayNewRay, h.b3, h.p),
															-epsilon)
													});
											},
											$author$project$RayTracerChallenge$refractionIndices(intersections)))))))))),
		$elm$core$List$head(
			A2(
				$elm$core$List$filter,
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.q;
					},
					$elm$core$Basics$le(0)),
				intersections)));
};
var $author$project$RayTracerChallenge$Intersection = F3(
	function (object, ray, t) {
		return {e: object, O: ray, q: t};
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$not = _Basics_not;
var $author$project$RayTracerChallenge$intersectCsg = F3(
	function (operand, leftIntersections, rightIntersections) {
		var csgOperator = F3(
			function (lhit, inl, inr) {
				switch (operand) {
					case 0:
						return (lhit && (!inr)) || ((!lhit) && (!inl));
					case 1:
						return (lhit && inr) || ((!lhit) && inl);
					default:
						return (lhit && (!inr)) || ((!lhit) && inl);
				}
			});
		var merge = F4(
			function (lt, rt, inl, inr) {
				var update = F3(
					function (intersection, include, rest) {
						return include ? A2($elm$core$List$cons, intersection, rest) : rest;
					});
				var _v0 = _Utils_Tuple2(lt, rt);
				if (!_v0.a.b) {
					if (!_v0.b.b) {
						return _List_Nil;
					} else {
						var _v2 = _v0.b;
						var r = _v2.a;
						var right = _v2.b;
						return A3(
							update,
							r,
							A3(csgOperator, false, inl, inr),
							A4(merge, _List_Nil, right, inl, !inr));
					}
				} else {
					if (!_v0.b.b) {
						var _v1 = _v0.a;
						var l = _v1.a;
						var left = _v1.b;
						return A3(
							update,
							l,
							A3(csgOperator, true, inl, inr),
							A4(merge, left, _List_Nil, !inl, inr));
					} else {
						var _v3 = _v0.a;
						var l = _v3.a;
						var left = _v3.b;
						var _v4 = _v0.b;
						var r = _v4.a;
						var right = _v4.b;
						return (_Utils_cmp(l.q, r.q) < 0) ? A3(
							update,
							l,
							A3(csgOperator, true, inl, inr),
							A4(
								merge,
								left,
								A2($elm$core$List$cons, r, right),
								!inl,
								inr)) : A3(
							update,
							r,
							A3(csgOperator, false, inl, inr),
							A4(
								merge,
								A2($elm$core$List$cons, l, left),
								right,
								inl,
								!inr));
					}
				}
			});
		return A4(merge, leftIntersections, rightIntersections, false, false);
	});
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $author$project$Geometry$rayTransform = F2(
	function (transform, _v0) {
		var rpoint = _v0.a;
		var vector = _v0.b;
		return A2(
			$author$project$Geometry$Ray,
			A2($author$project$Geometry$pntTransform, transform, rpoint),
			A2($author$project$Geometry$vecTransform, transform, vector));
	});
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$RayTracerChallenge$intersectAssembly = F2(
	function (assembly, ray) {
		var intersections = function () {
			switch (assembly.$) {
				case 3:
					return _List_Nil;
				case 2:
					var shape = assembly.b;
					return A2(
						$elm$core$List$map,
						A2($author$project$RayTracerChallenge$Intersection, shape, ray),
						shape.S.bl(
							A2($author$project$Geometry$rayTransform, shape.W, ray)));
				case 0:
					var list = assembly.b;
					return function (fn) {
						return A2($elm$core$List$concatMap, fn, list);
					}(
						F2(
							function (r, i) {
								return A2($author$project$RayTracerChallenge$intersectAssembly, i, r);
							})(ray));
				default:
					var op = assembly.b;
					var left = assembly.c;
					var right = assembly.d;
					return A3(
						$author$project$RayTracerChallenge$intersectCsg,
						op,
						A2($author$project$RayTracerChallenge$intersectAssembly, left, ray),
						A2($author$project$RayTracerChallenge$intersectAssembly, right, ray));
			}
		}();
		return A2(
			$elm$core$List$sortBy,
			function ($) {
				return $.q;
			},
			A2(
				$elm$core$List$filter,
				A2(
					$elm$core$Basics$composeL,
					A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$Basics$isInfinite),
					function ($) {
						return $.q;
					}),
				A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$Basics$isNaN),
						function ($) {
							return $.q;
						}),
					intersections)));
	});
var $elm$core$Basics$pow = _Basics_pow;
var $author$project$RayTracerChallenge$phongLighting = F2(
	function (hit, light) {
		var lightv = $author$project$Geometry$vecUnit(
			A2($author$project$Geometry$vecBetweenPoints, hit.b3, light.b3));
		var reflectDotEye = A2(
			$author$project$Geometry$vecDot,
			A2(
				$author$project$Geometry$vecReflect,
				hit.p,
				A2($author$project$Geometry$vecScaleBy, -1, lightv)),
			hit.I);
		var specular = A2(
			$author$project$RayTracerChallenge$colourScaleBy,
			hit.e.m.E * A2($elm$core$Basics$pow, reflectDotEye, hit.e.m.P),
			A2($author$project$RayTracerChallenge$colourMul, light.k, $author$project$RayTracerChallenge$colourWhite));
		var lightDotNormal = A2($author$project$Geometry$vecDot, lightv, hit.p);
		var diffuse = A2(
			$author$project$RayTracerChallenge$colourScaleBy,
			hit.e.m.s * lightDotNormal,
			A2(
				$author$project$RayTracerChallenge$colourMul,
				light.k,
				hit.e.m.k(hit.b3)));
		var ambient = A2(
			$author$project$RayTracerChallenge$colourScaleBy,
			hit.e.m.r,
			A2(
				$author$project$RayTracerChallenge$colourMul,
				light.k,
				hit.e.m.k(hit.b3)));
		return _Utils_Tuple3(
			ambient,
			(lightDotNormal <= 0) ? $author$project$RayTracerChallenge$colourBlack : diffuse,
			((lightDotNormal <= 0) || (reflectDotEye <= 0)) ? $author$project$RayTracerChallenge$colourBlack : specular);
	});
var $author$project$RayTracerChallenge$pointInShadow = F3(
	function (world, point, light) {
		var vec = A2($author$project$Geometry$vecBetweenPoints, light.b3, point);
		return A2(
			$elm$core$Maybe$withDefault,
			false,
			A2(
				$elm$core$Maybe$map,
				function (hit) {
					return _Utils_cmp(
						hit.q,
						$author$project$Geometry$vecLength(vec)) < 0;
				},
				$author$project$RayTracerChallenge$hitFromIntersections(
					A2(
						$elm$core$List$filter,
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.e;
							},
							A2(
								$elm$core$Basics$composeR,
								function ($) {
									return $.m;
								},
								function ($) {
									return $.D;
								})),
						A2(
							$author$project$RayTracerChallenge$intersectAssembly,
							world,
							A2(
								$author$project$Geometry$rayNewRay,
								light.b3,
								$author$project$Geometry$vecUnit(vec)))))));
	});
var $author$project$RayTracerChallenge$refractedRay = function (hit) {
	var ratio = hit.L / hit.M;
	var cos_i = A2($author$project$Geometry$vecDot, hit.I, hit.p);
	var sin2_t = A2($elm$core$Basics$pow, ratio, 2) * (1 - A2($elm$core$Basics$pow, cos_i, 2));
	var cos_t = $elm$core$Basics$sqrt(1 - sin2_t);
	var direction = $author$project$Geometry$vecUnit(
		A2(
			$author$project$Geometry$vecSubtract,
			A2($author$project$Geometry$vecScaleBy, (ratio * cos_i) - cos_t, hit.p),
			A2($author$project$Geometry$vecScaleBy, ratio, hit.I)));
	return A2($author$project$Geometry$rayNewRay, hit.at, direction);
};
var $author$project$RayTracerChallenge$schlickReflectance = function (hit) {
	var r0 = A2($elm$core$Basics$pow, (hit.L - hit.M) / (hit.L + hit.M), 2);
	var eyeDotNormal = A2($author$project$Geometry$vecDot, hit.I, hit.p);
	var cos = (_Utils_cmp(hit.L, hit.M) < 1) ? eyeDotNormal : $elm$core$Basics$sqrt(
		1 - (A2($elm$core$Basics$pow, hit.L / hit.M, 2) * (1 - A2($elm$core$Basics$pow, eyeDotNormal, 2))));
	var reflectance = r0 + ((1 - r0) * A2($elm$core$Basics$pow, 1 - cos, 5));
	return $elm$core$Basics$isNaN(reflectance) ? 1 : reflectance;
};
var $author$project$RayTracerChallenge$colourAtRay = F4(
	function (world, lights, rayNo, ray) {
		var colourAtHit = function (hit) {
			var refractedColour = A2(
				$author$project$RayTracerChallenge$colourScaleBy,
				hit.e.m.A,
				A4(
					$author$project$RayTracerChallenge$colourAtRay,
					world,
					lights,
					rayNo - 1,
					$author$project$RayTracerChallenge$refractedRay(hit)));
			var reflectedColour = A2(
				$author$project$RayTracerChallenge$colourScaleBy,
				hit.e.m.u,
				A4(
					$author$project$RayTracerChallenge$colourAtRay,
					world,
					lights,
					rayNo - 1,
					A2($author$project$Geometry$rayNewRay, hit.aj, hit.as)));
			var phongColour = function (light) {
				var _v0 = A2($author$project$RayTracerChallenge$phongLighting, hit, light);
				var ambient = _v0.a;
				var diffuse = _v0.b;
				var specular = _v0.c;
				return A3($author$project$RayTracerChallenge$pointInShadow, world, hit.aj, light) ? ambient : A2(
					$author$project$RayTracerChallenge$colourSum,
					specular,
					A2($author$project$RayTracerChallenge$colourSum, diffuse, ambient));
			};
			var forLights = function (fn) {
				return A3(
					$elm$core$List$foldl,
					$author$project$RayTracerChallenge$colourSum,
					$author$project$RayTracerChallenge$colourBlack,
					A2($elm$core$List$map, fn, lights));
			};
			if ((0 < hit.e.m.u) && (0 < hit.e.m.A)) {
				var reflectance = $author$project$RayTracerChallenge$schlickReflectance(hit);
				return A2(
					$author$project$RayTracerChallenge$colourSum,
					A2($author$project$RayTracerChallenge$colourScaleBy, 1 - reflectance, refractedColour),
					A2(
						$author$project$RayTracerChallenge$colourSum,
						A2($author$project$RayTracerChallenge$colourScaleBy, reflectance, reflectedColour),
						forLights(phongColour)));
			} else {
				return A2(
					$author$project$RayTracerChallenge$colourSum,
					refractedColour,
					A2(
						$author$project$RayTracerChallenge$colourSum,
						reflectedColour,
						forLights(phongColour)));
			}
		};
		return (0 < rayNo) ? A2(
			$elm$core$Maybe$withDefault,
			$author$project$RayTracerChallenge$colourBlack,
			A2(
				$elm$core$Maybe$map,
				colourAtHit,
				$author$project$RayTracerChallenge$hitFromIntersections(
					A2($author$project$RayTracerChallenge$intersectAssembly, world, ray)))) : $author$project$RayTracerChallenge$colourBlack;
	});
var $author$project$Geometry$matListProduct = A2($elm$core$List$foldl, $author$project$Geometry$matProduct, $author$project$Geometry$matNewIdentity);
var $author$project$RayTracerChallenge$compileAssembly = function (assembly) {
	var simplify = function (ass) {
		_v0$4:
		while (true) {
			_v0$11:
			while (true) {
				switch (ass.$) {
					case 0:
						if (!ass.b.b) {
							return $author$project$RayTracerChallenge$Empty;
						} else {
							if (!ass.b.b.b) {
								switch (ass.b.a.$) {
									case 0:
										var transform2 = ass.a;
										var _v1 = ass.b;
										var _v2 = _v1.a;
										var transform1 = _v2.a;
										var list = _v2.b;
										return A2(
											$author$project$RayTracerChallenge$Group,
											_Utils_ap(transform1, transform2),
											list);
									case 2:
										var transform2 = ass.a;
										var _v3 = ass.b;
										var _v4 = _v3.a;
										var transform1 = _v4.a;
										var shape = _v4.b;
										return A2(
											$author$project$RayTracerChallenge$Primitive,
											_Utils_ap(transform1, transform2),
											shape);
									case 1:
										var transform2 = ass.a;
										var _v5 = ass.b;
										var _v6 = _v5.a;
										var transform1 = _v6.a;
										var op = _v6.b;
										var l = _v6.c;
										var r = _v6.d;
										return A4(
											$author$project$RayTracerChallenge$CSG,
											_Utils_ap(transform1, transform2),
											op,
											l,
											r);
									default:
										break _v0$4;
								}
							} else {
								break _v0$4;
							}
						}
					case 1:
						switch (ass.b) {
							case 0:
								if (ass.d.$ === 3) {
									var transform = ass.a;
									var _v7 = ass.b;
									var l = ass.c;
									var _v8 = ass.d;
									return A2(
										$author$project$RayTracerChallenge$Group,
										transform,
										_List_fromArray(
											[l]));
								} else {
									if (ass.c.$ === 3) {
										var transform = ass.a;
										var _v9 = ass.b;
										var _v10 = ass.c;
										var r = ass.d;
										return A2(
											$author$project$RayTracerChallenge$Group,
											transform,
											_List_fromArray(
												[r]));
									} else {
										break _v0$11;
									}
								}
							case 1:
								if (ass.d.$ === 3) {
									var _v11 = ass.b;
									var _v12 = ass.d;
									return $author$project$RayTracerChallenge$Empty;
								} else {
									if (ass.c.$ === 3) {
										var _v13 = ass.b;
										var _v14 = ass.c;
										return $author$project$RayTracerChallenge$Empty;
									} else {
										break _v0$11;
									}
								}
							default:
								if (ass.d.$ === 3) {
									var transform = ass.a;
									var _v15 = ass.b;
									var l = ass.c;
									var _v16 = ass.d;
									return A2(
										$author$project$RayTracerChallenge$Group,
										transform,
										_List_fromArray(
											[l]));
								} else {
									if (ass.c.$ === 3) {
										var _v17 = ass.b;
										var _v18 = ass.c;
										return $author$project$RayTracerChallenge$Empty;
									} else {
										break _v0$11;
									}
								}
						}
					case 2:
						var transform = ass.a;
						var shape = ass.b;
						return A2($author$project$RayTracerChallenge$Primitive, transform, shape);
					default:
						return $author$project$RayTracerChallenge$Empty;
				}
			}
			var transform = ass.a;
			var op = ass.b;
			var l = ass.c;
			var r = ass.d;
			return A4(
				$author$project$RayTracerChallenge$CSG,
				transform,
				op,
				simplify(l),
				simplify(r));
		}
		var transform = ass.a;
		var list = ass.b;
		var l = A2(
			$elm$core$List$filter,
			$elm$core$Basics$neq($author$project$RayTracerChallenge$Empty),
			A2($elm$core$List$map, simplify, list));
		return A2($author$project$RayTracerChallenge$Group, transform, l);
	};
	var memoize = F2(
		function (second, ass) {
			switch (ass.$) {
				case 3:
					return $author$project$RayTracerChallenge$Empty;
				case 2:
					var transform = ass.a;
					var shape = ass.b;
					return A2(
						$author$project$RayTracerChallenge$Primitive,
						transform,
						_Utils_update(
							shape,
							{
								W: $author$project$Geometry$matInvert(
									$author$project$Geometry$matListProduct(
										_Utils_ap(transform, second)))
							}));
				case 1:
					var transform = ass.a;
					var op = ass.b;
					var l = ass.c;
					var r = ass.d;
					return A4(
						$author$project$RayTracerChallenge$CSG,
						transform,
						op,
						A2(
							memoize,
							_Utils_ap(transform, second),
							l),
						A2(
							memoize,
							_Utils_ap(transform, second),
							r));
				default:
					var transform = ass.a;
					var list = ass.b;
					return A2(
						$author$project$RayTracerChallenge$Group,
						transform,
						A2(
							$elm$core$List$map,
							memoize(
								_Utils_ap(transform, second)),
							list));
			}
		});
	var label = function (ass) {
		var assemblyAssignIds = F2(
			function (nextId, assembly2) {
				var setId = F2(
					function (asss, _v26) {
						var w = _v26.a;
						var a = _v26.b;
						return function (_v25) {
							var ww = _v25.a;
							var aa = _v25.b;
							return _Utils_Tuple2(
								ww,
								A2($elm$core$List$cons, aa, a));
						}(
							A2(assemblyAssignIds, w, asss));
					});
				switch (assembly2.$) {
					case 2:
						var t = assembly2.a;
						var shape = assembly2.b;
						return _Utils_Tuple2(
							nextId + 1,
							A2(
								$author$project$RayTracerChallenge$Primitive,
								t,
								_Utils_update(
									shape,
									{J: nextId})));
					case 0:
						var transform = assembly2.a;
						var list = assembly2.b;
						return function (_v21) {
							var w = _v21.a;
							var a = _v21.b;
							return _Utils_Tuple2(
								w,
								A2($author$project$RayTracerChallenge$Group, transform, a));
						}(
							A3(
								$elm$core$List$foldr,
								setId,
								_Utils_Tuple2(nextId, _List_Nil),
								list));
					case 1:
						var t = assembly2.a;
						var op = assembly2.b;
						var left = assembly2.c;
						var right = assembly2.d;
						return function (_v22) {
							var w = _v22.a;
							var a = _v22.b;
							if ((a.b && a.b.b) && (!a.b.b.b)) {
								var l = a.a;
								var _v24 = a.b;
								var r = _v24.a;
								return _Utils_Tuple2(
									w,
									A4($author$project$RayTracerChallenge$CSG, t, op, l, r));
							} else {
								return _Utils_Tuple2(nextId, $author$project$RayTracerChallenge$Empty);
							}
						}(
							A3(
								$elm$core$List$foldr,
								setId,
								_Utils_Tuple2(nextId, _List_Nil),
								_List_fromArray(
									[left, right])));
					default:
						return _Utils_Tuple2(nextId, $author$project$RayTracerChallenge$Empty);
				}
			});
		var _v27 = A2(assemblyAssignIds, 1, ass);
		var numberedAssembly = _v27.b;
		return numberedAssembly;
	};
	return label(
		A2(
			memoize,
			_List_Nil,
			simplify(
				simplify(
					simplify(
						simplify(
							simplify(
								simplify(
									simplify(
										simplify(
											simplify(
												simplify(
													simplify(assembly)))))))))))));
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$RayTracerChallenge$imageRender = function (_v0) {
	var assembly = _v0.au;
	var lights = _v0.aN;
	var camera = _v0.ax;
	var pixelAtIndex = function (index) {
		return {
			a1: A2($elm$core$Basics$modBy, camera.aM, index),
			a2: (index / camera.aM) | 0
		};
	};
	var colourAtIndex = function (index) {
		return A4(
			$author$project$RayTracerChallenge$colourAtRay,
			$author$project$RayTracerChallenge$compileAssembly(assembly),
			lights,
			camera.aO,
			A2(
				$author$project$RayTracerChallenge$cameraRayForPixel,
				camera,
				pixelAtIndex(index)));
	};
	return {
		bP: A2($elm$core$Array$initialize, camera.aM * camera.aL, colourAtIndex),
		bT: camera.aL,
		b9: camera.aM
	};
};
var $author$project$RayTracerDsl$render = $author$project$RayTracerChallenge$imageRender;
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Geometry$SmoothTriangle = function (a) {
	return {$: 6, a: a};
};
var $author$project$RayTracerChallenge$defaultTriangle = function () {
	var config = {
		G: A3($author$project$Geometry$pntNewPoint, 0, 0, 0),
		av: A3($author$project$Geometry$pntNewPoint, 1, 0, 0),
		aw: A3($author$project$Geometry$pntNewPoint, 0, 1, 0)
	};
	return {
		S: $author$project$Geometry$shpNewShape(
			$author$project$Geometry$Triangle(config)),
		J: 0,
		m: $author$project$RayTracerChallenge$defaultMaterial,
		W: $author$project$Geometry$matNewIdentity
	};
}();
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{i: nodeList, f: nodeListSize, h: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $author$project$Geometry$vecNewVector = F3(
	function (dx, dy, dz) {
		return A3($author$project$Geometry$Vector, dx, dy, dz);
	});
var $author$project$RayTracerChallenge$objToAssembly = function (objList) {
	var vertexToPoint = function (obj) {
		if (((((!obj.$) && obj.a.b) && obj.a.b.b) && obj.a.b.b.b) && (!obj.a.b.b.b.b)) {
			var _v27 = obj.a;
			var x = _v27.a;
			var _v28 = _v27.b;
			var y = _v28.a;
			var _v29 = _v28.b;
			var z = _v29.a;
			return $elm$core$Maybe$Just(
				A3($author$project$Geometry$pntNewPoint, x, y, z));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var vertices = $elm$core$Array$fromList(
		A2(
			$elm$core$List$map,
			$elm$core$Maybe$withDefault(
				A3($author$project$Geometry$pntNewPoint, 0, 0, 0)),
			A2(
				$elm$core$List$filter,
				$elm$core$Basics$neq($elm$core$Maybe$Nothing),
				A2($elm$core$List$map, vertexToPoint, objList))));
	var vertexNormalToVector = function (obj) {
		if (((((obj.$ === 1) && obj.a.b) && obj.a.b.b) && obj.a.b.b.b) && (!obj.a.b.b.b.b)) {
			var _v23 = obj.a;
			var dx = _v23.a;
			var _v24 = _v23.b;
			var dy = _v24.a;
			var _v25 = _v24.b;
			var dz = _v25.a;
			return $elm$core$Maybe$Just(
				A3($author$project$Geometry$vecNewVector, dx, dy, dz));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var vertexNormals = $elm$core$Array$fromList(
		A2(
			$elm$core$List$map,
			$elm$core$Maybe$withDefault(
				A3($author$project$Geometry$vecNewUnit, 0, 1, 0)),
			A2(
				$elm$core$List$filter,
				$elm$core$Basics$neq($elm$core$Maybe$Nothing),
				A2($elm$core$List$map, vertexNormalToVector, objList))));
	var faceToTriangle = function (obj) {
		var triangle = function (config) {
			return $elm$core$Maybe$Just(
				A2(
					$author$project$RayTracerChallenge$Primitive,
					_List_Nil,
					_Utils_update(
						$author$project$RayTracerChallenge$defaultTriangle,
						{
							S: $author$project$Geometry$shpNewShape(
								$author$project$Geometry$Triangle(config))
						})));
		};
		var smoothTriangle = function (config) {
			return $elm$core$Maybe$Just(
				A2(
					$author$project$RayTracerChallenge$Primitive,
					_List_Nil,
					_Utils_update(
						$author$project$RayTracerChallenge$defaultTriangle,
						{
							S: $author$project$Geometry$shpNewShape(
								$author$project$Geometry$SmoothTriangle(config))
						})));
		};
		var faceVertex = function (x) {
			_v18$3:
			while (true) {
				if (x.b && (!x.a.$)) {
					if (x.b.b) {
						if (x.b.b.b) {
							if ((!x.b.b.a.$) && (!x.b.b.b.b)) {
								var a = x.a.a;
								var _v19 = x.b;
								var _v20 = _v19.b;
								var c = _v20.a.a;
								return _Utils_Tuple2(
									A2($elm$core$Array$get, a - 1, vertices),
									A2($elm$core$Array$get, c - 1, vertexNormals));
							} else {
								break _v18$3;
							}
						} else {
							var a = x.a.a;
							var _v21 = x.b;
							return _Utils_Tuple2(
								A2($elm$core$Array$get, a - 1, vertices),
								$elm$core$Maybe$Nothing);
						}
					} else {
						var a = x.a.a;
						return _Utils_Tuple2(
							A2($elm$core$Array$get, a - 1, vertices),
							$elm$core$Maybe$Nothing);
					}
				} else {
					break _v18$3;
				}
			}
			return _Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing);
		};
		var faceToShape = function (x) {
			var makeTri = function (lst) {
				_v4$2:
				while (true) {
					if (lst.b && (!lst.a.a.$)) {
						if (lst.a.b.$ === 1) {
							if ((((((lst.b.b && (!lst.b.a.a.$)) && (lst.b.a.b.$ === 1)) && lst.b.b.b) && (!lst.b.b.a.a.$)) && (lst.b.b.a.b.$ === 1)) && (!lst.b.b.b.b)) {
								var _v5 = lst.a;
								var p1 = _v5.a.a;
								var _v6 = _v5.b;
								var _v7 = lst.b;
								var _v8 = _v7.a;
								var p2 = _v8.a.a;
								var _v9 = _v8.b;
								var _v10 = _v7.b;
								var _v11 = _v10.a;
								var p3 = _v11.a.a;
								var _v12 = _v11.b;
								return triangle(
									{G: p1, av: p2, aw: p3});
							} else {
								break _v4$2;
							}
						} else {
							if ((((((lst.b.b && (!lst.b.a.a.$)) && (!lst.b.a.b.$)) && lst.b.b.b) && (!lst.b.b.a.a.$)) && (!lst.b.b.a.b.$)) && (!lst.b.b.b.b)) {
								var _v13 = lst.a;
								var p1 = _v13.a.a;
								var v1 = _v13.b.a;
								var _v14 = lst.b;
								var _v15 = _v14.a;
								var p2 = _v15.a.a;
								var v2 = _v15.b.a;
								var _v16 = _v14.b;
								var _v17 = _v16.a;
								var p3 = _v17.a.a;
								var v3 = _v17.b.a;
								return smoothTriangle(
									{G: p1, av: p2, aw: p3, bY: v1, b_: v2, b$: v3});
							} else {
								break _v4$2;
							}
						}
					} else {
						break _v4$2;
					}
				}
				return $elm$core$Maybe$Nothing;
			};
			var makeAllTri = function (lst) {
				if ((lst.b && lst.b.b) && lst.b.b.b) {
					var a = lst.a;
					var _v2 = lst.b;
					var b = _v2.a;
					var _v3 = _v2.b;
					var c = _v3.a;
					var rest = _v3.b;
					return A2(
						$elm$core$Maybe$map,
						function (s) {
							return A2(
								$elm$core$List$cons,
								s,
								A2(
									$elm$core$Maybe$withDefault,
									_List_Nil,
									makeAllTri(
										A2(
											$elm$core$List$cons,
											a,
											A2($elm$core$List$cons, c, rest)))));
						},
						makeTri(
							_List_fromArray(
								[a, b, c])));
				} else {
					return $elm$core$Maybe$Nothing;
				}
			};
			return A2(
				$elm$core$Maybe$map,
				$author$project$RayTracerChallenge$Group(_List_Nil),
				makeAllTri(
					A2($elm$core$List$map, faceVertex, x)));
		};
		if (obj.$ === 2) {
			var lst = obj.a;
			return faceToShape(lst);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	return A2(
		$author$project$RayTracerChallenge$Group,
		_List_Nil,
		A2(
			$elm$core$List$map,
			$elm$core$Maybe$withDefault(
				A2($author$project$RayTracerChallenge$Primitive, _List_Nil, $author$project$RayTracerChallenge$defaultTriangle)),
			A2(
				$elm$core$List$filter,
				$elm$core$Basics$neq($elm$core$Maybe$Nothing),
				A2($elm$core$List$map, faceToTriangle, objList))));
};
var $elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var $author$project$ObjParser$Face = function (a) {
	return {$: 2, a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var $author$project$ObjParser$Vertex = function (a) {
	return {$: 0, a: a};
};
var $author$project$ObjParser$VertexNormal = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$UnexpectedChar = {$: 11};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {a7: col, bO: contextStack, bu: problem, bC: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.bC, s.a7, x, s.c));
	});
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.b, s.a);
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{a7: 1, c: s.c, d: s.d, b: s.b + 1, bC: s.bC + 1, a: s.a}) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{a7: s.a7 + 1, c: s.c, d: s.d, b: newOffset, bC: s.bC, a: s.a}));
		};
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$parser$Parser$Advanced$chompUntilEndOr = function (str) {
	return function (s) {
		var _v0 = A5(_Parser_findSubString, str, s.b, s.bC, s.a7, s.a);
		var newOffset = _v0.a;
		var newRow = _v0.b;
		var newCol = _v0.c;
		var adjustedOffset = (newOffset < 0) ? $elm$core$String$length(s.a) : newOffset;
		return A3(
			$elm$parser$Parser$Advanced$Good,
			_Utils_cmp(s.b, adjustedOffset) < 0,
			0,
			{a7: newCol, c: s.c, d: s.d, b: adjustedOffset, bC: newRow, a: s.a});
	};
};
var $elm$parser$Parser$chompUntilEndOr = $elm$parser$Parser$Advanced$chompUntilEndOr;
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.a);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.b, offset) < 0,
					0,
					{a7: col, c: s0.c, d: s0.d, b: offset, bC: row, a: s0.a});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.b, s.bC, s.a7, s);
	};
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.a),
			s.b) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0;
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$ExpectingInt = {$: 1};
var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var $elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {a7: s.a7 + (newOffset - s.b), c: s.c, d: s.d, b: newOffset, bC: s.bC, a: s.a};
	});
var $elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var $elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var $elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3($elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2($elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var $elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3($elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			$elm$parser$Parser$Advanced$consumeExp,
			A2($elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2($elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var $elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _v0, s) {
		var endOffset = _v0.a;
		var n = _v0.b;
		if (handler.$ === 1) {
			var x = handler.a;
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.b, startOffset) < 0,
				A2($elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2($elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$core$String$toFloat = _String_toFloat;
var $elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2($elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.a);
		if (floatOffset < 0) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A4($elm$parser$Parser$Advanced$fromInfo, s.bC, s.a7 - (floatOffset + s.b), invalid, s.c));
		} else {
			if (_Utils_eq(s.b, floatOffset)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5($elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.b, intPair, s);
				} else {
					if (floatSettings.$ === 1) {
						var x = floatSettings.a;
						return A2(
							$elm$parser$Parser$Advanced$Bad,
							true,
							A2($elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _v1 = $elm$core$String$toFloat(
							A3($elm$core$String$slice, s.b, floatOffset, s.a));
						if (_v1.$ === 1) {
							return A2(
								$elm$parser$Parser$Advanced$Bad,
								true,
								A2($elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _v1.a;
							return A3(
								$elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2($elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$number = function (c) {
	return function (s) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 48, s.b, s.a)) {
			var zeroOffset = s.b + 1;
			var baseOffset = zeroOffset + 1;
			return A3($elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.a) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.bX,
				c.bg,
				baseOffset,
				A2($elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.a),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.a) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.bX,
				c.bq,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.a),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.a) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.bX,
				c.a4,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.a),
				s) : A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.bX,
				c.bd,
				c.bk,
				c.be,
				_Utils_Tuple2(zeroOffset, 0),
				s)));
		} else {
			return A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.bX,
				c.bd,
				c.bk,
				c.be,
				A3($elm$parser$Parser$Advanced$consumeBase, 10, s.b, s.a),
				s);
		}
	};
};
var $elm$parser$Parser$Advanced$int = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				a4: $elm$core$Result$Err(invalid),
				bd: expecting,
				be: $elm$core$Result$Err(invalid),
				bg: $elm$core$Result$Err(invalid),
				bk: $elm$core$Result$Ok($elm$core$Basics$identity),
				bX: invalid,
				bq: $elm$core$Result$Err(invalid)
			});
	});
var $elm$parser$Parser$int = A2($elm$parser$Parser$Advanced$int, $elm$parser$Parser$ExpectingInt, $elm$parser$Parser$ExpectingInt);
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 9, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$keyword = function (_v0) {
	var kwd = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(kwd);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, kwd, s.b, s.bC, s.a7, s.a);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return (_Utils_eq(newOffset, -1) || (0 <= A3(
			$elm$parser$Parser$Advanced$isSubChar,
			function (c) {
				return $elm$core$Char$isAlphaNum(c) || (c === '_');
			},
			newOffset,
			s.a))) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{a7: newCol, c: s.c, d: s.d, b: newOffset, bC: newRow, a: s.a});
	};
};
var $elm$parser$Parser$keyword = function (kwd) {
	return $elm$parser$Parser$Advanced$keyword(
		A2(
			$elm$parser$Parser$Advanced$Token,
			kwd,
			$elm$parser$Parser$ExpectingKeyword(kwd)));
};
var $elm$parser$Parser$Advanced$spaces = $elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return (c === ' ') || ((c === '\n') || (c === '\r'));
	});
var $elm$parser$Parser$spaces = $elm$parser$Parser$Advanced$spaces;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.b, s.bC, s.a7, s.a);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{a7: newCol, c: s.c, d: s.d, b: newOffset, bC: newRow, a: s.a});
	};
};
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $author$project$ObjParser$parseFace = F2(
	function (ctor, tag) {
		var vertices = A2(
			$elm$parser$Parser$loop,
			_List_Nil,
			function (lst) {
				return $elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							$elm$parser$Parser$map,
							function (v) {
								return $elm$parser$Parser$Loop(
									A2(
										$elm$core$List$cons,
										$elm$core$Maybe$Just(v),
										lst));
							},
							$elm$parser$Parser$int),
							A2(
							$elm$parser$Parser$map,
							$elm$core$Basics$always(
								$elm$parser$Parser$Loop(
									A2($elm$core$List$cons, $elm$core$Maybe$Nothing, lst))),
							$elm$parser$Parser$token('//')),
							A2(
							$elm$parser$Parser$map,
							$elm$core$Basics$always(
								$elm$parser$Parser$Loop(lst)),
							$elm$parser$Parser$token('/')),
							A2(
							$elm$parser$Parser$map,
							$elm$core$Basics$always(
								$elm$parser$Parser$Done(
									$elm$core$List$reverse(lst))),
							$elm$parser$Parser$succeed(0))
						]));
			});
		var faces = A2(
			$elm$parser$Parser$loop,
			_List_Nil,
			function (lst) {
				return $elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							$elm$parser$Parser$map,
							$elm$core$Basics$always(
								$elm$parser$Parser$Loop(lst)),
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$chompIf(
									$elm$core$Basics$eq(' ')),
								$elm$parser$Parser$chompWhile(
									$elm$core$Basics$eq(' ')))),
							A2(
							$elm$parser$Parser$map,
							$elm$core$Basics$always(
								$elm$parser$Parser$Done(
									$elm$core$List$reverse(lst))),
							$elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										$elm$parser$Parser$end,
										$elm$parser$Parser$token('\n')
									]))),
							A2(
							$elm$parser$Parser$map,
							function (v) {
								return $elm$parser$Parser$Loop(
									A2($elm$core$List$cons, v, lst));
							},
							vertices)
						]));
			});
		return A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(ctor),
					$elm$parser$Parser$keyword(tag)),
				$elm$parser$Parser$spaces),
			faces);
	});
var $elm$parser$Parser$ExpectingFloat = {$: 5};
var $elm$parser$Parser$Advanced$float = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				a4: $elm$core$Result$Err(invalid),
				bd: expecting,
				be: $elm$core$Result$Ok($elm$core$Basics$identity),
				bg: $elm$core$Result$Err(invalid),
				bk: $elm$core$Result$Ok($elm$core$Basics$toFloat),
				bX: invalid,
				bq: $elm$core$Result$Err(invalid)
			});
	});
var $elm$parser$Parser$float = A2($elm$parser$Parser$Advanced$float, $elm$parser$Parser$ExpectingFloat, $elm$parser$Parser$ExpectingFloat);
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $author$project$ObjParser$parseFloats = F2(
	function (ctor, tag) {
		var negfloat = $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($elm$core$Basics$negate),
						$elm$parser$Parser$symbol('-')),
					$elm$parser$Parser$float),
					$elm$parser$Parser$float
				]));
		var floats = A2(
			$elm$parser$Parser$loop,
			_List_Nil,
			function (lst) {
				return $elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							$elm$parser$Parser$map,
							$elm$core$Basics$always(
								$elm$parser$Parser$Loop(lst)),
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$chompIf(
									$elm$core$Basics$eq(' ')),
								$elm$parser$Parser$chompWhile(
									$elm$core$Basics$eq(' ')))),
							A2(
							$elm$parser$Parser$map,
							function (v) {
								return $elm$parser$Parser$Loop(
									A2($elm$core$List$cons, v, lst));
							},
							negfloat),
							A2(
							$elm$parser$Parser$map,
							$elm$core$Basics$always(
								$elm$parser$Parser$Done(
									$elm$core$List$reverse(lst))),
							$elm$parser$Parser$succeed(0))
						]));
			});
		return A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(ctor),
				$elm$parser$Parser$keyword(tag)),
			floats);
	});
var $author$project$ObjParser$parseObj = function () {
	var junk = $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$chompIf(
					$elm$core$Basics$eq(' ')),
				$elm$parser$Parser$chompWhile(
					$elm$core$Basics$eq(' '))),
				$elm$parser$Parser$token('\n'),
				$elm$parser$Parser$chompUntilEndOr('\n')
			]));
	var lines = A2(
		$elm$parser$Parser$loop,
		_List_Nil,
		function (lst) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$map,
						$elm$core$Basics$always(
							$elm$parser$Parser$Done(
								$elm$core$List$reverse(lst))),
						$elm$parser$Parser$end),
						A2(
						$elm$parser$Parser$map,
						function (v) {
							return $elm$parser$Parser$Loop(
								A2($elm$core$List$cons, v, lst));
						},
						A2($author$project$ObjParser$parseFloats, $author$project$ObjParser$Vertex, 'v')),
						A2(
						$elm$parser$Parser$map,
						function (v) {
							return $elm$parser$Parser$Loop(
								A2($elm$core$List$cons, v, lst));
						},
						A2($author$project$ObjParser$parseFloats, $author$project$ObjParser$VertexNormal, 'vn')),
						A2(
						$elm$parser$Parser$map,
						function (v) {
							return $elm$parser$Parser$Loop(
								A2($elm$core$List$cons, v, lst));
						},
						A2($author$project$ObjParser$parseFace, $author$project$ObjParser$Face, 'f')),
						A2(
						$elm$parser$Parser$map,
						$elm$core$Basics$always(
							$elm$parser$Parser$Loop(lst)),
						junk)
					]));
		});
	return lines;
}();
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {a7: col, bu: problem, bC: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.bC, p.a7, p.bu);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{a7: 1, c: _List_Nil, d: 1, b: 0, bC: 1, a: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $author$project$ObjParser$parse = $elm$parser$Parser$run($author$project$ObjParser$parseObj);
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$RayTracerChallenge$objParse = A2(
	$elm$core$Basics$composeR,
	$author$project$ObjParser$parse,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$Result$withDefault(_List_Nil),
		$author$project$RayTracerChallenge$objToAssembly));
var $author$project$RayTracerDsl$objParse = $author$project$RayTracerChallenge$objParse;
var $author$project$Main$objTeapot = '\n    #\n    # object Teapot001\n    #\n\n    v  7.0000 0.0000 12.0000\n    v  4.9700 -4.9700 12.0000\n    v  4.9811 -4.9811 12.4922\n    v  7.0156 0.0000 12.4922\n    v  5.3250 -5.3250 12.0000\n    v  7.5000 0.0000 12.0000\n    v  0.0000 -7.0000 12.0000\n    v  0.0000 -7.0156 12.4922\n    v  0.0000 -7.5000 12.0000\n    v  -5.1387 -4.9700 12.0000\n    v  -5.0022 -4.9811 12.4922\n    v  -5.3250 -5.3250 12.0000\n    v  -7.0000 0.0000 12.0000\n    v  -7.0156 0.0000 12.4922\n    v  -7.5000 0.0000 12.0000\n    v  -4.9700 4.9700 12.0000\n    v  -4.9811 4.9811 12.4922\n    v  -5.3250 5.3250 12.0000\n    v  0.0000 7.0000 12.0000\n    v  0.0000 7.0156 12.4922\n    v  0.0000 7.5000 12.0000\n    v  4.9700 4.9700 12.0000\n    v  4.9811 4.9811 12.4922\n    v  5.3250 5.3250 12.0000\n    v  6.5453 -6.5453 8.1094\n    v  9.2188 0.0000 8.1094\n    v  7.1000 -7.1000 4.5000\n    v  10.0000 0.0000 4.5000\n    v  0.0000 -9.2188 8.1094\n    v  0.0000 -10.0000 4.5000\n    v  -6.5453 -6.5453 8.1094\n    v  -7.1000 -7.1000 4.5000\n    v  -9.2188 0.0000 8.1094\n    v  -10.0000 0.0000 4.5000\n    v  -6.5453 6.5453 8.1094\n    v  -7.1000 7.1000 4.5000\n    v  0.0000 9.2188 8.1094\n    v  0.0000 10.0000 4.5000\n    v  6.5453 6.5453 8.1094\n    v  7.1000 7.1000 4.5000\n    v  6.2125 -6.2125 1.9219\n    v  8.7500 0.0000 1.9219\n    v  5.3250 -5.3250 0.7500\n    v  7.5000 0.0000 0.7500\n    v  0.0000 -8.7500 1.9219\n    v  0.0000 -7.5000 0.7500\n    v  -6.2125 -6.2125 1.9219\n    v  -5.3250 -5.3250 0.7500\n    v  -8.7500 0.0000 1.9219\n    v  -7.5000 0.0000 0.7500\n    v  -6.2125 6.2125 1.9219\n    v  -5.3250 5.3250 0.7500\n    v  0.0000 8.7500 1.9219\n    v  0.0000 7.5000 0.7500\n    v  6.2125 6.2125 1.9219\n    v  5.3250 5.3250 0.7500\n    v  4.5595 -4.5595 0.2344\n    v  6.4219 0.0000 0.2344\n    v  0.0000 0.0000 0.0000\n    v  0.0000 -6.4219 0.2344\n    v  -4.5595 -4.5595 0.2344\n    v  -6.4219 0.0000 0.2344\n    v  -4.5595 4.5595 0.2344\n    v  0.0000 6.4219 0.2344\n    v  4.5595 4.5595 0.2344\n    v  -8.0000 0.0000 10.1250\n    v  -7.7500 -1.1250 10.6875\n    v  -12.5938 -1.1250 10.4766\n    v  -12.0625 0.0000 9.9844\n    v  -14.2500 -1.1250 9.0000\n    v  -13.5000 0.0000 9.0000\n    v  -7.5000 0.0000 11.2500\n    v  -13.1250 0.0000 10.9688\n    v  -15.0000 0.0000 9.0000\n    v  -7.7500 1.1250 10.6875\n    v  -12.5938 1.1250 10.4766\n    v  -14.2500 1.1250 9.0000\n    v  -13.1719 -1.1250 6.2695\n    v  -12.6875 0.0000 6.7500\n    v  -9.7500 -1.1250 3.7500\n    v  -13.6563 0.0000 5.7891\n    v  -9.5000 0.0000 3.0000\n    v  -13.1719 1.1250 6.2695\n    v  -9.7500 1.1250 3.7500\n    v  8.5000 0.0000 7.1250\n    v  8.5000 -2.4750 5.0625\n    v  12.6875 -1.7062 8.1094\n    v  11.9375 0.0000 9.0000\n    v  15.0000 -0.9375 12.0000\n    v  13.5000 0.0000 12.0000\n    v  8.5000 0.0000 3.0000\n    v  13.4375 0.0000 7.2187\n    v  16.5000 0.0000 12.0000\n    v  8.5000 2.4750 5.0625\n    v  12.6875 1.7062 8.1094\n    v  15.0000 0.9375 12.0000\n    v  15.6328 -0.7500 12.3340\n    v  14.1250 0.0000 12.2813\n    v  15.0000 -0.5625 12.0000\n    v  14.0000 0.0000 12.0000\n    v  17.1406 0.0000 12.3867\n    v  16.0000 0.0000 12.0000\n    v  15.6328 0.7500 12.3340\n    v  15.0000 0.5625 12.0000\n    v  1.1552 -1.1552 14.9063\n    v  1.6250 0.0000 14.9063\n    v  0.0000 0.0000 15.7500\n    v  0.7100 -0.7100 13.5000\n    v  1.0000 0.0000 13.5000\n    v  0.0000 -1.6250 14.9063\n    v  0.0000 -1.0000 13.5000\n    v  -1.1552 -1.1552 14.9063\n    v  -0.7100 -0.7100 13.5000\n    v  -1.6250 0.0000 14.9063\n    v  -1.0000 0.0000 13.5000\n    v  -1.1552 1.1552 14.9063\n    v  -0.7100 0.7100 13.5000\n    v  0.0000 1.6250 14.9063\n    v  0.0000 1.0000 13.5000\n    v  1.1552 1.1552 14.9063\n    v  0.7100 0.7100 13.5000\n    v  2.9288 -2.9288 12.7500\n    v  4.1250 0.0000 12.7500\n    v  4.6150 -4.6150 12.0000\n    v  6.5000 0.0000 12.0000\n    v  0.0000 -4.1250 12.7500\n    v  0.0000 -6.5000 12.0000\n    v  -2.9288 -2.9288 12.7500\n    v  -4.6150 -4.6150 12.0000\n    v  -4.1250 0.0000 12.7500\n    v  -6.5000 0.0000 12.0000\n    v  -2.9288 2.9288 12.7500\n    v  -4.6150 4.6150 12.0000\n    v  0.0000 4.1250 12.7500\n    v  0.0000 6.5000 12.0000\n    v  2.9288 2.9288 12.7500\n    v  4.6150 4.6150 12.0000\n    # 137 vertices\n\n    vn -0.9995 -0.0000 0.0317\n    vn -0.7067 0.7067 0.0319\n    vn -0.0966 0.0966 0.9906\n    vn -0.1416 0.0000 0.9899\n    vn 0.5936 -0.5936 0.5435\n    vn 0.8400 0.0000 0.5425\n    vn -0.0010 0.9996 0.0283\n    vn -0.0008 0.1421 0.9899\n    vn 0.0000 -0.8400 0.5425\n    vn 0.7268 0.6636 -0.1773\n    vn 0.0816 0.2165 0.9729\n    vn -0.5949 -0.5971 0.5381\n    vn 0.9994 -0.0148 0.0317\n    vn 0.1496 -0.0134 0.9886\n    vn -0.8403 0.0004 0.5422\n    vn 0.7067 -0.7067 0.0319\n    vn 0.0966 -0.0966 0.9906\n    vn -0.5936 0.5936 0.5435\n    vn 0.0000 -0.9995 0.0317\n    vn -0.0000 -0.1416 0.9899\n    vn -0.0000 0.8400 0.5425\n    vn -0.7067 -0.7067 0.0319\n    vn -0.0966 -0.0966 0.9906\n    vn 0.5936 0.5936 0.5435\n    vn 0.6738 -0.6738 0.3034\n    vn 0.9532 -0.0000 0.3025\n    vn 0.7028 -0.7028 -0.1107\n    vn 0.9939 -0.0000 -0.1105\n    vn -0.0000 -0.9532 0.3025\n    vn -0.0000 -0.9939 -0.1105\n    vn -0.6738 -0.6738 0.3034\n    vn -0.7028 -0.7028 -0.1107\n    vn -0.9532 0.0000 0.3025\n    vn -0.9939 0.0000 -0.1105\n    vn -0.6738 0.6738 0.3034\n    vn -0.7028 0.7028 -0.1107\n    vn 0.0000 0.9532 0.3025\n    vn 0.0000 0.9939 -0.1105\n    vn 0.6738 0.6738 0.3034\n    vn 0.7028 0.7028 -0.1107\n    vn 0.5792 -0.5792 -0.5735\n    vn 0.8198 0.0000 -0.5726\n    vn 0.4157 -0.4157 -0.8089\n    vn 0.5888 -0.0000 -0.8083\n    vn 0.0000 -0.8198 -0.5726\n    vn -0.0000 -0.5888 -0.8083\n    vn -0.5792 -0.5792 -0.5735\n    vn -0.4157 -0.4157 -0.8089\n    vn -0.8198 -0.0000 -0.5726\n    vn -0.5888 0.0000 -0.8083\n    vn -0.5792 0.5792 -0.5735\n    vn -0.4157 0.4157 -0.8089\n    vn -0.0000 0.8198 -0.5726\n    vn 0.0000 0.5888 -0.8083\n    vn 0.5792 0.5792 -0.5735\n    vn 0.4157 0.4157 -0.8089\n    vn 0.2016 -0.2016 -0.9585\n    vn 0.2850 -0.0000 -0.9585\n    vn 0.0000 -0.0000 -1.0000\n    vn -0.0000 -0.2850 -0.9585\n    vn -0.2016 -0.2016 -0.9585\n    vn -0.2850 0.0000 -0.9585\n    vn -0.2016 0.2016 -0.9585\n    vn 0.0000 0.2850 -0.9585\n    vn 0.2016 0.2016 -0.9585\n    vn 0.0384 0.0031 -0.9993\n    vn -0.0182 -0.9619 0.2727\n    vn -0.0190 -0.9786 0.2047\n    vn 0.2817 0.0145 -0.9594\n    vn -0.2938 -0.9475 0.1264\n    vn 0.9324 0.0422 -0.3590\n    vn -0.0473 -0.0015 0.9989\n    vn -0.4420 -0.0127 0.8969\n    vn -0.9859 -0.0106 0.1669\n    vn -0.0177 0.9631 0.2685\n    vn -0.0097 0.9839 0.1786\n    vn -0.2735 0.9565 0.1013\n    vn -0.1217 -0.9875 -0.0998\n    vn 0.8176 0.0138 0.5756\n    vn -0.3352 -0.7946 -0.5061\n    vn 0.6216 0.0294 0.7828\n    vn -0.7747 -0.0079 -0.6322\n    vn -0.5711 -0.0076 -0.8208\n    vn -0.1055 0.9904 -0.0889\n    vn -0.3009 0.8200 -0.4869\n    vn -0.4862 0.0074 0.8738\n    vn 0.3271 -0.9145 -0.2382\n    vn 0.1595 -0.9869 0.0246\n    vn -0.6970 -0.0236 0.7167\n    vn -0.0062 -0.9245 0.3812\n    vn -0.7234 -0.0562 0.6881\n    vn 0.6538 0.0025 -0.7567\n    vn 0.7677 0.0173 -0.6406\n    vn 0.6465 0.0447 -0.7616\n    vn 0.3456 0.9087 -0.2343\n    vn 0.1845 0.9828 0.0081\n    vn 0.0506 0.9476 0.3154\n    vn 0.2319 -0.5821 0.7793\n    vn 0.0415 -0.0704 0.9967\n    vn 0.3158 0.9477 -0.0454\n    vn 0.9011 -0.0135 -0.4334\n    vn 0.9533 0.0371 0.2997\n    vn -0.3219 0.0032 0.9468\n    vn 0.3655 0.5783 0.7294\n    vn 0.3394 -0.9333 -0.1174\n    vn 0.6774 -0.6773 0.2871\n    vn 0.9576 -0.0001 0.2882\n    vn 0.0000 0.0000 1.0000\n    vn 0.5955 -0.5952 0.5396\n    vn 0.8436 -0.0002 0.5370\n    vn -0.0001 -0.9576 0.2882\n    vn -0.0002 -0.8436 0.5370\n    vn -0.6773 -0.6774 0.2871\n    vn -0.5952 -0.5955 0.5396\n    vn -0.9576 0.0001 0.2882\n    vn -0.8436 0.0002 0.5370\n    vn -0.6774 0.6773 0.2871\n    vn -0.5955 0.5952 0.5396\n    vn 0.0001 0.9576 0.2882\n    vn 0.0002 0.8436 0.5370\n    vn 0.6773 0.6774 0.2871\n    vn 0.5952 0.5955 0.5396\n    vn 0.1942 -0.1942 0.9616\n    vn 0.2754 0.0000 0.9613\n    vn 0.2121 -0.2121 0.9539\n    vn 0.3011 0.0000 0.9536\n    vn 0.0000 -0.2754 0.9613\n    vn 0.0000 -0.3011 0.9536\n    vn -0.1942 -0.1942 0.9616\n    vn -0.2121 -0.2121 0.9539\n    vn -0.2754 -0.0000 0.9613\n    vn -0.3011 -0.0000 0.9536\n    vn -0.1942 0.1942 0.9616\n    vn -0.2121 0.2121 0.9539\n    vn -0.0000 0.2754 0.9613\n    vn -0.0000 0.3011 0.9536\n    vn 0.1942 0.1942 0.9616\n    vn 0.2121 0.2121 0.9539\n    # 138 vertex normals\n\n    g Teapot001\n    f 1/1/1 2/2/2 3/3/3 4/4/4\n    f 4/4/4 3/3/3 5/5/5 6/6/6\n    f 2/2/2 7/7/7 8/8/8 3/3/3\n    f 3/3/3 8/8/8 9/9/9 5/5/5\n    f 7/7/7 10/10/10 11/11/11 8/8/8\n    f 8/8/8 11/11/11 12/12/12 9/9/9\n    f 10/10/10 13/13/13 14/14/14 11/11/11\n    f 11/11/11 14/14/14 15/15/15 12/12/12\n    f 13/1/13 16/2/16 17/3/17 14/4/14\n    f 14/4/14 17/3/17 18/5/18 15/6/15\n    f 16/2/16 19/7/19 20/8/20 17/3/17\n    f 17/3/17 20/8/20 21/9/21 18/5/18\n    f 19/7/19 22/10/22 23/11/23 20/8/20\n    f 20/8/20 23/11/23 24/12/24 21/9/21\n    f 22/10/22 1/13/1 4/14/4 23/11/23\n    f 23/11/23 4/14/4 6/15/6 24/12/24\n    f 6/6/6 5/5/5 25/16/25 26/17/26\n    f 26/17/26 25/16/25 27/18/27 28/19/28\n    f 5/5/5 9/9/9 29/20/29 25/16/25\n    f 25/16/25 29/20/29 30/21/30 27/18/27\n    f 9/9/9 12/12/12 31/22/31 29/20/29\n    f 29/20/29 31/22/31 32/23/32 30/21/30\n    f 12/12/12 15/15/15 33/24/33 31/22/31\n    f 31/22/31 33/24/33 34/25/34 32/23/32\n    f 15/6/15 18/5/18 35/16/35 33/17/33\n    f 33/17/33 35/16/35 36/18/36 34/19/34\n    f 18/5/18 21/9/21 37/20/37 35/16/35\n    f 35/16/35 37/20/37 38/21/38 36/18/36\n    f 21/9/21 24/12/24 39/22/39 37/20/37\n    f 37/20/37 39/22/39 40/23/40 38/21/38\n    f 24/12/24 6/15/6 26/24/26 39/22/39\n    f 39/22/39 26/24/26 28/25/28 40/23/40\n    f 28/19/28 27/18/27 41/26/41 42/27/42\n    f 42/27/42 41/26/41 43/28/43 44/29/44\n    f 27/18/27 30/21/30 45/30/45 41/26/41\n    f 41/26/41 45/30/45 46/31/46 43/28/43\n    f 30/21/30 32/23/32 47/32/47 45/30/45\n    f 45/30/45 47/32/47 48/33/48 46/31/46\n    f 32/23/32 34/25/34 49/34/49 47/32/47\n    f 47/32/47 49/34/49 50/35/50 48/33/48\n    f 34/19/34 36/18/36 51/26/51 49/27/49\n    f 49/27/49 51/26/51 52/28/52 50/29/50\n    f 36/18/36 38/21/38 53/30/53 51/26/51\n    f 51/26/51 53/30/53 54/31/54 52/28/52\n    f 38/21/38 40/23/40 55/32/55 53/30/53\n    f 53/30/53 55/32/55 56/33/56 54/31/54\n    f 40/23/40 28/25/28 42/34/42 55/32/55\n    f 55/32/55 42/34/42 44/35/44 56/33/56\n    f 44/29/44 43/28/43 57/36/57 58/37/58\n    f 58/37/58 57/36/57 59/38/59\n    f 43/28/43 46/31/46 60/39/60 57/36/57\n    f 57/36/57 60/39/60 59/40/59\n    f 46/31/46 48/33/48 61/41/61 60/39/60\n    f 60/39/60 61/41/61 59/42/59\n    f 48/33/48 50/35/50 62/43/62 61/41/61\n    f 61/41/61 62/43/62 59/44/59\n    f 50/29/50 52/28/52 63/36/63 62/37/62\n    f 62/37/62 63/36/63 59/38/59\n    f 52/28/52 54/31/54 64/39/64 63/36/63\n    f 63/36/63 64/39/64 59/40/59\n    f 54/31/54 56/33/56 65/41/65 64/39/64\n    f 64/39/64 65/41/65 59/42/59\n    f 56/33/56 44/35/44 58/43/58 65/41/65\n    f 65/41/65 58/43/58 59/44/59\n    f 66/21/66 67/45/67 68/46/68 69/47/69\n    f 69/47/69 68/46/68 70/48/70 71/49/71\n    f 67/45/67 72/23/72 73/50/73 68/46/68\n    f 68/46/68 73/50/73 74/51/74 70/48/70\n    f 72/23/72 75/52/75 76/53/76 73/50/73\n    f 73/50/73 76/53/76 77/54/77 74/51/74\n    f 75/52/75 66/25/66 69/55/69 76/53/76\n    f 76/53/76 69/55/69 71/56/71 77/54/77\n    f 71/49/71 70/48/70 78/57/78 79/58/79\n    f 79/58/79 78/57/78 80/59/80 34/40/81\n    f 70/48/70 74/51/74 81/60/82 78/57/78\n    f 78/57/78 81/60/82 82/42/83 80/59/80\n    f 74/51/74 77/54/77 83/61/84 81/60/82\n    f 81/60/82 83/61/84 84/62/85 82/42/83\n    f 77/54/77 71/56/71 79/63/79 83/61/84\n    f 83/61/84 79/63/79 34/44/81 84/62/85\n    f 85/42/86 86/59/87 87/64/88 88/65/89\n    f 88/65/89 87/64/88 89/66/90 90/67/91\n    f 86/59/87 91/40/92 92/68/93 87/64/88\n    f 87/64/88 92/68/93 93/69/94 89/66/90\n    f 91/44/92 94/62/95 95/70/96 92/71/93\n    f 92/71/93 95/70/96 96/72/97 93/73/94\n    f 94/62/95 85/42/86 88/65/89 95/70/96\n    f 95/70/96 88/65/89 90/67/91 96/72/97\n    f 90/67/91 89/66/90 97/74/98 98/75/99\n    f 98/75/99 97/74/98 99/45/100 100/23/101\n    f 89/66/90 93/69/94 101/76/102 97/74/98\n    f 97/74/98 101/76/102 102/21/103 99/45/100\n    f 93/73/94 96/72/97 103/77/104 101/78/102\n    f 101/78/102 103/77/104 104/52/105 102/25/103\n    f 96/72/97 90/67/91 98/75/99 103/77/104\n    f 103/77/104 98/75/99 100/23/101 104/52/105\n    f 105/48/106 106/49/107 107/21/108\n    f 106/49/107 105/48/106 108/59/109 109/40/110\n    f 110/51/111 105/48/106 107/45/108\n    f 105/48/106 110/51/111 111/42/112 108/59/109\n    f 112/54/113 110/51/111 107/23/108\n    f 110/51/111 112/54/113 113/62/114 111/42/112\n    f 114/56/115 112/54/113 107/52/108\n    f 112/54/113 114/56/115 115/44/116 113/62/114\n    f 116/48/117 114/49/115 107/21/108\n    f 114/49/115 116/48/117 117/59/118 115/40/116\n    f 118/51/119 116/48/117 107/45/108\n    f 116/48/117 118/51/119 119/42/120 117/59/118\n    f 120/54/121 118/51/119 107/23/108\n    f 118/51/119 120/54/121 121/62/122 119/42/120\n    f 106/56/107 120/54/121 107/52/108\n    f 120/54/121 106/56/107 109/44/110 121/62/122\n    f 109/21/110 108/45/109 122/48/123 123/49/124\n    f 123/49/124 122/48/123 124/59/125 125/40/126\n    f 108/45/109 111/23/112 126/51/127 122/48/123\n    f 122/48/123 126/51/127 127/42/128 124/59/125\n    f 111/23/112 113/52/114 128/54/129 126/51/127\n    f 126/51/127 128/54/129 129/62/130 127/42/128\n    f 113/52/114 115/25/116 130/56/131 128/54/129\n    f 128/54/129 130/56/131 131/44/132 129/62/130\n    f 115/21/116 117/45/118 132/48/133 130/49/131\n    f 130/49/131 132/48/133 133/59/134 131/40/132\n    f 117/45/118 119/23/120 134/51/135 132/48/133\n    f 132/48/133 134/51/135 135/42/136 133/59/134\n    f 119/23/120 121/52/122 136/54/137 134/51/135\n    f 134/51/135 136/54/137 137/62/138 135/42/136\n    f 121/52/122 109/25/110 123/56/124 136/54/137\n    f 136/54/137 123/56/124 125/44/126 137/62/138\n    # 112 polygons - 16 triangles\n    ';
var $author$project$Geometry$matNewRotateY = function (radians) {
	return $author$project$Geometry$Matrix(
		$elm$core$Basics$cos(radians))(0)(
		$elm$core$Basics$sin(radians))(0)(0)(1)(0)(0)(
		-$elm$core$Basics$sin(radians))(0)(
		$elm$core$Basics$cos(radians))(0)(0)(0)(0)(1);
};
var $author$project$RayTracerDsl$rotateY = function (a) {
	return $author$project$RayTracerDsl$applyTransform(
		$author$project$Geometry$matNewRotateY(a));
};
var $author$project$Main$teapot = A2(
	$author$project$RayTracerDsl$material,
	{
		r: 0.3,
		k: $elm$core$Basics$always(
			{j: 0.5, l: 1, n: 1}),
		s: 0.8,
		u: 0.1,
		C: 1.5,
		D: true,
		P: 100,
		E: 0.3,
		A: 0
	},
	A4(
		$author$project$RayTracerDsl$translate,
		0,
		-12,
		0,
		A4(
			$author$project$RayTracerDsl$scale,
			1.5,
			1.5,
			1.5,
			A2(
				$author$project$RayTracerDsl$rotateY,
				((-5) * $elm$core$Basics$pi) / 16,
				A2(
					$author$project$RayTracerDsl$rotateX,
					(-$elm$core$Basics$pi) / 2,
					$author$project$RayTracerDsl$objParse($author$project$Main$objTeapot))))));
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $elm$core$Elm$JsArray$map = _JsArray_map;
var $elm$core$Array$map = F2(
	function (func, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = function (node) {
			if (!node.$) {
				var subTree = node.a;
				return $elm$core$Array$SubTree(
					A2($elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return $elm$core$Array$Leaf(
					A2($elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2($elm$core$Elm$JsArray$map, helper, tree),
			A2($elm$core$Elm$JsArray$map, func, tail));
	});
var $elm$core$Basics$round = _Basics_round;
var $author$project$RayTracerChallenge$imageToBitmap = function (image) {
	var colourToTuple = function (_v0) {
		var red = _v0.n;
		var green = _v0.l;
		var blue = _v0.j;
		var convert = A2(
			$elm$core$Basics$composeR,
			A2($elm$core$Basics$clamp, 0, 1),
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Basics$mul(255),
				$elm$core$Basics$round));
		return _Utils_Tuple3(
			convert(red),
			convert(green),
			convert(blue));
	};
	return {
		bP: $elm$core$Array$toList(
			A2($elm$core$Array$map, colourToTuple, image.bP)),
		bT: image.bT,
		b9: image.b9
	};
};
var $author$project$RayTracerDsl$toBitmap = $author$project$RayTracerChallenge$imageToBitmap;
var $author$project$Main$viewer = function (assembly) {
	return {
		au: assembly,
		ax: $author$project$RayTracerDsl$camera(
			{
				aK: $elm$core$Basics$pi / 5,
				aL: 320,
				aM: 320,
				aO: 6,
				aZ: A3($author$project$RayTracerDsl$point, 50, 20, -60),
				a_: A3($author$project$RayTracerDsl$point, 0, 0, 0),
				a0: A3($author$project$RayTracerDsl$vector, 0, 1, 0)
			}),
		aN: _List_fromArray(
			[
				$author$project$RayTracerDsl$light(
				A3($author$project$RayTracerDsl$point, -25, 25, -60))
			])
	};
};
var $author$project$Main$main = function () {
	var view = F2(
		function (id, example) {
			return $author$project$Main$cmdRender(
				{
					ba: id,
					bi: $author$project$RayTracerDsl$toBitmap(
						$author$project$RayTracerDsl$render(example))
				});
		});
	var canvas = function (id) {
		return A2(
			$elm$html$Html$canvas,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id(id),
					A2($elm$html$Html$Attributes$style, 'border', '1px solid black')
				]),
			_List_Nil);
	};
	return $elm$browser$Browser$element(
		{
			bW: function (_v0) {
				return _Utils_Tuple2(
					0,
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(
								view,
								'canvas0',
								$author$project$Main$viewer($author$project$Main$basic)),
								A2(
								view,
								'canvas1',
								$author$project$Main$viewer($author$project$Main$brick)),
								A2(
								view,
								'canvas2',
								$author$project$Main$viewer($author$project$Main$teapot)),
								A2(
								view,
								'canvas3',
								$author$project$Main$viewer($author$project$Main$csg)),
								A2(
								view,
								'canvas4',
								$author$project$Main$viewer($author$project$Main$hex)),
								A2(
								view,
								'canvas5',
								$author$project$Main$viewer($author$project$Main$csghex)),
								A2(view, 'canvas6', $author$project$Main$cover),
								A2(view, 'canvas7', $author$project$Main$infobubble),
								A2(
								view,
								'canvas8',
								$author$project$Main$viewer($author$project$Main$primitives))
							])));
			},
			b5: function (_v1) {
				return $elm$core$Platform$Sub$none;
			},
			b7: F2(
				function (_v2, _v3) {
					return _Utils_Tuple2(0, $elm$core$Platform$Cmd$none);
				}),
			b8: function (_v4) {
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					A2(
						$elm$core$List$map,
						canvas,
						_List_fromArray(
							['canvas0', 'canvas1', 'canvas2', 'canvas3', 'canvas4', 'canvas5', 'canvas6', 'canvas7', 'canvas8'])));
			}
		});
}();
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));
