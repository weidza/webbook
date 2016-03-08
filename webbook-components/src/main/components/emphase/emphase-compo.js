// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Definitions
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Emphase= function (options) {
    this.options = {
        id: "",
        xtag: null
    };

    this._init(options);
    this._render();
};

// -----------------------------------------------------------------------------
// initialize
// -----------------------------------------------------------------------------
org.weidza.webBook.components.Emphase.prototype._init = function (options) {
    org.weidza.asserts.notNull(options, "Table option mustn't be null!");
    org.weidza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.weidza.asserts.notNull(options.id, "ID mustn't be null!");
    this.options = options;
};


// -----------------------------------------------------------------------------
// render
// -----------------------------------------------------------------------------
org.weidza.webBook.components.Emphase.prototype._render= function (options) {
    var children = org.weidza.rendering.extractXtagChildren(this.options.xtag);
    var compo = org.weidza.rendering.createNode('span','webbook-emphase',this.options.id);
        compo.html(children);
    this.options.xtag.append(compo);
};