// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Document
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Document =  {
    options : {
        id      : "",
        xtag    : null

    },

    init: function(options) {
        org.weidza.asserts.notNull(options, "bloc option mustn't be null!");
        this.options = options;
        this._render();
    },

    _render : function (){
        var children = org.weidza.rendering.extractXtagChildren(this.options.xtag);
        var compo = org.weidza.rendering.createNode('div','webbook-document');
            compo.append(children);

        // append to root ...........................
        this.options.xtag.append(compo);
    }
};
