;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function CopybookBrush()
	{
		var keyword= "(PIC X)|(PIC 9)|(PIC S9)|(S9)|(V9)|(\\s+COMP(-3){0,1})|(VALUE)|((OCCURS\\s+[0-9]+)|(THRU))";
		this.regexList = [
          	{ regex: /[''][0-9-_a-z ]+[']/gi,	 css: 'value' },	     // values
            { regex: /(XMEFDATA|LNKDIS01)/g, 	 css: 'comments meta' }, // one line comments
			{ regex: /^\s*[*].*$/gm,		 	 css: 'comments' },		 // 
			{ regex: /^\s*[0-9]{2}/gm,		 	 css: 'color3' },		 // level
			{ regex: /REDEFINES[^.]*/gmi,		 css: 'functions' },	 // redefine
			{ regex: /[(][^)]*[)]/gi,		 	 css: 'variable' },	     // size
			{ regex: new RegExp(keyword,'gi'),   css: 'keyword' },		 // level
		];
	}

	CopybookBrush.prototype	= new SyntaxHighlighter.Highlighter();
	CopybookBrush.aliases	= ['copybook', 'cpy'];

	SyntaxHighlighter.brushes.Copybook = CopybookBrush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = CopybookBrush : null;
})();
