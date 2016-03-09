// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.wiedza.webBook.components.Definitions
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.wiedza.webBook.components.Definitions= function (options) {

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
org.wiedza.webBook.components.Definitions.prototype._init = function (options) {
    org.wiedza.asserts.notNull(options, "Table option mustn't be null!");
    org.wiedza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.wiedza.asserts.notNull(options.id, "ID mustn't be null!");

    this.options = options;
};


// -----------------------------------------------------------------------------
// render
// -----------------------------------------------------------------------------
org.wiedza.webBook.components.Definitions.prototype._render= function (options) {
    var children = org.wiedza.rendering.extractXtagChildren(this.options.xtag);
    var compo = org.wiedza.rendering.createNode('dl','webbook-definitions');
        compo.html(children);
    this.options.xtag.append(compo);
};