// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Definition
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Definition= function (options) {

    this.options = {
        id: "",
        title: "",
        xtag: null
    };


    this._init(options);
    this._render();
};

// -----------------------------------------------------------------------------
// initialize
// -----------------------------------------------------------------------------
org.weidza.webBook.components.Definition.prototype._init = function (options) {
    org.weidza.asserts.notNull(options, "Table option mustn't be null!");
    org.weidza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.weidza.asserts.notNull(options.id, "ID mustn't be null!");

    this.options = options;
};


// -----------------------------------------------------------------------------
// render
// -----------------------------------------------------------------------------
org.weidza.webBook.components.Definition.prototype._render= function (options) {

};