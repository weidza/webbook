// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Section
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Section =  {
    options : {
        id      : "",
        parent  : "",
        title   : "",
        xtag    : null
    },

    init: function(options) {

        org.weidza.asserts.notNull(options, "chapter option mustn't be null!");
        org.weidza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
        org.weidza.asserts.notNull(options.id, "ID mustn't be null!");
        org.weidza.asserts.notNull(options.title, "section title mustn't be null!");

        this.options.id     = options.id;
        this.options.xtag   = options.xtag;
        this.options.title  = options.title;
        this.options.parent = options.parent;
        this._render();
    },

    _calcLevel :function (){
        var result = 1;
        if(org.weidza.check.notEmpty(this.options.parent)){
            var elements = this.options.parent.split(":");
            result = elements.length;
        }
        return result;
    },

    _render : function (){
        var children = org.weidza.rendering.extractXtagChildren(this.options.xtag);


        var compo = org.weidza.rendering.createNode('div','webbook-section',this.options.id);

        // title .................................
        var titleGrp = org.weidza.rendering.createNode('div','webbook-section-title');
        var level = this._calcLevel();
        var title = org.weidza.rendering.createNode('h'+level);
            title.text(this.options.title + "("+this.options.parent+")");

        titleGrp.append(title);
        compo.append(titleGrp);

        // content .................................

        var childrenContent= org.weidza.rendering.createNode('div','webbook-section-content-children');
            childrenContent.html(children);

        compo.append(childrenContent);

        // append to root ...........................
        this.options.xtag.append(compo);
    }
};
