// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Document
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Document = function (option) {
    this.options = {
        id: "",
        xtag: null

    };
    this._init(option);
    this._render();
};

org.weidza.webBook.components.Document.prototype._init = function (options) {
    org.weidza.asserts.notNull(options, "bloc option mustn't be null!");
    this.options = options;
};

org.weidza.webBook.components.Document.prototype._render = function () {
    var children = org.weidza.rendering.extractXtagChildren(this.options.xtag);
    var compo = org.weidza.rendering.createNode('div', 'webbook-document');
    compo.append(children);

    // append to root ...........................
    this.options.xtag.append(compo);
};
