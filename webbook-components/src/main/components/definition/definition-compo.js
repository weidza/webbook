// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Definition
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Definition= function (options) {

    this.options = {
        id: "",
        title: "",
        xtag: null
    };

    this._innerValues = {
        childrenContent : null
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
    this._innerValues.childrenContent= org.weidza.rendering.extractXtagChildren(this.options.xtag);
};


// -----------------------------------------------------------------------------
// render
// -----------------------------------------------------------------------------
org.weidza.webBook.components.Definition.prototype._render= function () {
    var compo = org.weidza.rendering.createNode('div','webbook-definition',this.options.id);
    compo.append(this._renderTitle());
    compo.append(this._renderContent());
    this.options.xtag.append(compo);
};

org.weidza.webBook.components.Definition.prototype._renderTitle= function () {
    var result = org.weidza.rendering.createNode('dt');
        result.html(this.options.title);
    return result;
};

org.weidza.webBook.components.Definition.prototype._renderContent= function () {
    var result = org.weidza.rendering.createNode('dd');
        result.html(this._innerValues.childrenContent);
    return result;
};