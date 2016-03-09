// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.wiedza.webBook.components.Document
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.wiedza.webBook.components.Document = function (option) {
    this.options = {
        id: "",
        xtag: null

    };
    this._init(option);
    this._render();
};

org.wiedza.webBook.components.Document.prototype._init = function (options) {
    org.wiedza.asserts.notNull(options, "bloc option mustn't be null!");
    this.options = options;
};

org.wiedza.webBook.components.Document.prototype._render = function () {
    var children = org.wiedza.rendering.extractXtagChildren(this.options.xtag);
    var compo = org.wiedza.rendering.createNode('div', 'webbook-document');
    compo.append(children);

    // append to root ...........................
    this.options.xtag.append(compo);
};
