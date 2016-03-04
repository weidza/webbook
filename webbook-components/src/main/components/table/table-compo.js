// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Table
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Table =  function(options) {
    this.options = {
        id: "",
        title: "",

        xtag: null

    };

    this._init(options);
    this._render();
};

org.weidza.webBook.components.Bloc.prototype._init = function(options) {
        org.weidza.asserts.notNull(options, "bloc option mustn't be null!");
        org.weidza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
        org.weidza.asserts.notNull(options.id, "ID mustn't be null!");
        this.options    = options;
};


org.weidza.webBook.components.Bloc.prototype._render = function() {

}
