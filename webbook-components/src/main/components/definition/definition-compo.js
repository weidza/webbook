// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.wiedza.webBook.components.Definition
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.wiedza.webBook.components.Definition= function (options) {

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
org.wiedza.webBook.components.Definition.prototype._init = function (options) {
    org.wiedza.asserts.notNull(options, "Table option mustn't be null!");
    org.wiedza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.wiedza.asserts.notNull(options.id, "ID mustn't be null!");

    this.options = options;
    this._innerValues.childrenContent= org.wiedza.rendering.extractXtagChildren(this.options.xtag);
};


// -----------------------------------------------------------------------------
// render
// -----------------------------------------------------------------------------
org.wiedza.webBook.components.Definition.prototype._render= function () {
    var compo = org.wiedza.rendering.createNode('div','webbook-definition',this.options.id);
    compo.append(this._renderTitle());
    compo.append(this._renderContent());
    this.options.xtag.append(compo);
};

org.wiedza.webBook.components.Definition.prototype._renderTitle= function () {
    var result = org.wiedza.rendering.createNode('dt');
        result.html(this.options.title);
    return result;
};

org.wiedza.webBook.components.Definition.prototype._renderContent= function () {
    var result = org.wiedza.rendering.createNode('dd');
        result.html(this._innerValues.childrenContent);
    return result;
};