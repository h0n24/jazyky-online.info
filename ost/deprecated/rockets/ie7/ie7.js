/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'rockets\'">' + entity + '</span>' + html;
	}
	var icons = {
		'iconmonstr-earth': '&#xe002;',
		'iconmonstr-iconmonstr-rocket-icon': '&#xe600;',
		'iconmonstr-iconmonstr-rocket-11-icon': '&#xe601;',
		'iconmonstr-iconmonstr-rocket-8-icon': '&#xe602;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/iconmonstr-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
