// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Section
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Section =  function(options) {
    this._logger = org.weidza.logger.factory("org.weidza.webBook.components.Section");

    this.options = {
        id: "",
        parent: null,
        title: "",
        xtag: null,
        level:0
    };

    this._init(options);
    this._render();
};


org.weidza.webBook.components.Section.prototype._init = function(options) {

        org.weidza.asserts.notNull(options, "chapter option mustn't be null!");
        org.weidza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
        org.weidza.asserts.notNull(options.id, "ID mustn't be null!");
        org.weidza.asserts.notNull(options.title, "section title mustn't be null!");

        this.options.id     = options.id;
        this.options.xtag   = options.xtag;
        this.options.title  = options.title;
        this.options.parent = options.parent;

        this.options.level = this._calcLevel();
};



org.weidza.webBook.components.Section.prototype._calcLevel =function (){
        var result = 1;
        if(org.weidza.check.notEmpty(this.options.parent)){
            var elements = this.options.parent.split(":");
            result = elements.length;
        }
        return result;
};

org.weidza.webBook.components.Section.prototype._render = function (){
        var children = org.weidza.rendering.extractXtagChildren(this.options.xtag);


        var compo = org.weidza.rendering.createNode('div','webbook-section',this.options.id);

        // title .................................
        var titleGrp = org.weidza.rendering.createNode('div','webbook-section-title');

        var title = org.weidza.rendering.createNode('h'+this.options.level);
            title.text(this.options.title + "("+this.getFullId()+")");

        titleGrp.append(title);
        compo.append(titleGrp);

        // content .................................

        var childrenContent= org.weidza.rendering.createNode('div','webbook-section-content-children');
            childrenContent.html(children);

        compo.append(childrenContent);

        // append to root ...........................
        this.options.xtag.append(compo);
};

org.weidza.webBook.components.Section.prototype.getLevel = function(){
    return this.options.level;
};


org.weidza.webBook.components.Section.prototype.getId = function(){
      return this.options.id;
};

org.weidza.webBook.components.Section.prototype.getFullId = function(){
        var result = null;
        if(org.weidza.check.isNull(this.options.parent)){
            result = this.options.id;
        }else{
            result = this.options.parent.getFullId() + ":" + this.options.id;
        }
        return result;
};

