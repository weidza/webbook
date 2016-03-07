// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Code
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Code= function (options) {

    this.options = {
        id: "",
        title: "",
        type: "",
        highlight: "",
        src: "",
        xtag: null
    };

    this._innerValues = {
        childrenContent:null
    };

    this._init(options);

    if(org.weidza.check.isNull(this.options.src)){
        this._render();
    }

};

// -----------------------------------------------------------------------------
// initialize
// -----------------------------------------------------------------------------
org.weidza.webBook.components.Code.prototype._init = function (options) {
    org.weidza.asserts.notNull(options, "Table option mustn't be null!");
    org.weidza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.weidza.asserts.notNull(options.id, "ID mustn't be null!");

    this.options = options;
    this._innerValues.childrenContent= org.weidza.rendering.extractXtagChildren(this.options.xtag);
    if(org.weidza.check.isNotNull(this.options.src)){
        this._loadFromExternal();
    }
};

org.weidza.webBook.components.Code.prototype._loadFromExternal= function () {
    var self = this;
    var node = org.weidza.rendering.createNode('div');
        node.load(this.options.src, function(){
            self._innerValues.childrenContent=  node.html();
            self._render();
        });
}
// -----------------------------------------------------------------------------
// render
// -----------------------------------------------------------------------------
org.weidza.webBook.components.Code.prototype._render= function () {
    var compo = org.weidza.rendering.createNode('div','webbook-code',this.options.id);

    if(org.weidza.check.isNotNull(this.options.title)){
        compo.append(this._renderTitle());
    }

    compo.append(this._renderContent());

    this.options.xtag.append(compo);
    SyntaxHighlighter.highlight();
};


org.weidza.webBook.components.Code.prototype._renderTitle= function () {
    var result = org.weidza.rendering.createNode('div','webbook-code-title');
        result.html(this.options.title);
    return result;
};

org.weidza.webBook.components.Code.prototype._renderContent= function () {
    var result = org.weidza.rendering.createNode('div','webbook-code-content');

    var highlight = "";
    if(org.weidza.check.isNotNull(this.options.highlight)){
        highlight = "; highlight:"+this.options.highlight;
    }

    var styles = [
            'brush:',
            this.options.type,
            "; toolbar:false;",
            "  gutter:true;",
            "  html-script:false;",
            "  smart-tabs:true;",
            "tab-size:4",
            highlight
    ].join(" ");

    var content = org.weidza.rendering.createNode('pre',styles );
        content.html(this._innerValues.childrenContent);

    result.append(content);
    return result;
};


