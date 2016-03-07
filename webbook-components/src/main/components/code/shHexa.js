;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function CicsHexa()
	{
		this.regexList = [
                  { regex: /([[]\s+[0-9]+.{3}[0-9]+\s+[\]])/g, 	css: 'comments offset' },
      		      { regex: /((\s+04)|(\s+40))/gm,	 			css: 'preprocessor empty-chars' },
		];
	}

	CicsHexa.prototype	= new SyntaxHighlighter.Highlighter();
	CicsHexa.aliases	= ['hexa'];

	SyntaxHighlighter.brushes.CicsHexa = CicsHexa;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = CicsHexa : null;
})();
