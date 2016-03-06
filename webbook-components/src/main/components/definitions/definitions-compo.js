// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Definitions
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Definitions= function (options) {

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
org.weidza.webBook.components.Definitions.prototype._init = function (options) {
    org.weidza.asserts.notNull(options, "Table option mustn't be null!");
    org.weidza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.weidza.asserts.notNull(options.id, "ID mustn't be null!");

    this.options = options;
};


// -----------------------------------------------------------------------------
// render
// -----------------------------------------------------------------------------
org.weidza.webBook.components.Definitions.prototype._render= function (options) {

};