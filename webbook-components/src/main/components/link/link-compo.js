// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.wiedza.webBook.components.Link
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.wiedza.webBook.components.Link= function (options) {

    this.options = {
        id: "",
        title: "",
        src: "",
        xtag: null
    };

    this._innerValues = {
        isInternalLink : false,
        label : null
    };

    this._init(options);
    this._render();
};

// -----------------------------------------------------------------------------
// initialize
// -----------------------------------------------------------------------------
org.wiedza.webBook.components.Link.prototype._init = function (options) {
    org.wiedza.asserts.notNull(options, "Table option mustn't be null!");
    org.wiedza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.wiedza.asserts.notNull(options.id, "ID mustn't be null!");
    org.wiedza.asserts.notNull(options.src, "Source link mustn't be null!");

    this.options = options;
    this._innerValues.isInternalLink = this.options.src.substring(0,1)==="#";
    if(org.wiedza.check.isNotNull(this.options.title)){
        this._innerValues.label = this.options.title
    }else {
        this._innerValues.label = this.options.src;
    }
};


// -----------------------------------------------------------------------------
// render
// -----------------------------------------------------------------------------
org.wiedza.webBook.components.Link.prototype._render= function (options) {
    var compo = org.wiedza.rendering.createNode('a','webbook-link');
        compo.attr('href',this.options.src);

    if(!this._innerValues.isInternalLink){
        compo.attr('target','_blank');
    }

    var title = org.wiedza.rendering.createNode('span','webbook-link-title');
        title.text(this._innerValues.label);
    compo.append(title);



    this.options.xtag.append(compo);
};