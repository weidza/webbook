// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Include
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Include = function (option) {
    this.options = {
        id: "",
        src: "",
        xtag: null
    };

    this._init(option);
    this._render();
};


org.weidza.webBook.components.Include.prototype._init = function (options) {
    org.weidza.asserts.notNull(options, "include option mustn't be null!");
    org.weidza.asserts.notNull(options.src, "include src mustn't be null!");
    org.weidza.asserts.notNull(options.xtag, "include xtag mustn't be null!");
    this.options = options;
};

org.weidza.webBook.components.Include.prototype._render = function () {
    this.options.xtag.container = $(this.options.xtag).append('<div></div>');
    if (org.weidza.check.isNotNull(this.options.id)) {
        this.options.xtag.container.attr('id', this.options.id);
    }
    this.options.xtag.container.load(this.options.src);
};