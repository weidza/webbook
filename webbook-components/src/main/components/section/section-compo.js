// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.wiedza.webBook.components.Section
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.wiedza.webBook.components.Section = function (options) {
    this._logger = org.wiedza.logger.factory("org.wiedza.webBook.components.Section");

    this.options = {
        id: "",
        parent: null,
        parentId : null,
        title: "",
        xtag: null,
        level: 0
    };

    this._innerValues = {
        title    : null,
        children : []
    };

    this._init(options);
    this._render();
};


/*-----------------------------------------------------------------------
 * Private API
 -----------------------------------------------------------------------*/
org.wiedza.webBook.components.Section.prototype._init = function (options) {
    org.wiedza.asserts.notNull(options, "chapter option mustn't be null!");
    org.wiedza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.wiedza.asserts.notNull(options.id, "ID mustn't be null!");
    org.wiedza.asserts.notNull(options.title, "section title mustn't be null!");

    this.options = options;
    this._resolveParentProcess();
    this._calcLevelProcess();
};


org.wiedza.webBook.components.Section.prototype._calcLevel = function () {
    var elements = this.getFullId().split(":");
    result = elements.length+1;

    return result;
};


org.wiedza.webBook.components.Section.prototype._render = function () {
    var compo = org.wiedza.rendering.createNode('div', 'webbook-section', this.options.id);
    compo.append(this._renderTitle());
    compo.append(this._renderContent());
    this.options.xtag.append(compo);
};

org.wiedza.webBook.components.Section.prototype._renderTitle = function () {
    if(org.wiedza.check.isNull(this._innerValues.title )){
        this._innerValues.title = org.wiedza.rendering.createNode('div');
    }

    var grp= org.wiedza.rendering.createNode('div', 'webbook-section-title', this.getFullId());

    var title = org.wiedza.rendering.createNode('h' + this.options.level);
        title.attr('data-full-id',this.getFullId());
        title.text(this.options.title);



    var anchor = org.wiedza.rendering.createNode('a', 'webbook-section-title-anchor');
    anchor.attr('href', "#" + this.getFullId());

    title.append(anchor);
    grp.append(title);
    this._innerValues.title.append(grp);
    return this._innerValues.title;
};

org.wiedza.webBook.components.Section.prototype._renderContent = function () {
    var children = org.wiedza.rendering.extractXtagChildren(this.options.xtag);
    var result = org.wiedza.rendering.createNode('div', 'webbook-section-content-children');
    result.html(children);
    return result;
};


org.wiedza.webBook.components.Section.prototype._resolveParent= function () {
    if(org.wiedza.check.isNull(this.options.parent) && org.wiedza.check.isNotNull(this.options.parentId)){
        this._resolveParentProcess();
    }
    this._calcLevelProcess();
};



org.wiedza.webBook.components.Section.prototype._resolveParentProcess= function () {
    this.options.parent = org.wiedza.webBook.services.findSection(this.options.parentId);
    if(org.wiedza.check.isNotNull(this.options.parent)){
        this.options.parent.registerChildren(this);
    }
}

org.wiedza.webBook.components.Section.prototype._calcLevelProcess= function () {
    this.options.level = this._calcLevel();
}


/*-----------------------------------------------------------------------
 * Public API
 -----------------------------------------------------------------------*/
org.wiedza.webBook.components.Section.prototype.update = function () {
    this._resolveParent();
    this._innerValues.title.html("");
    this._renderTitle();
}

/*-----------------------------------------------------------------------
 * Getters
 -----------------------------------------------------------------------*/
org.wiedza.webBook.components.Section.prototype.hasParent= function () {
    return org.wiedza.check.isNull(this.options.parentId);
};

org.wiedza.webBook.components.Section.prototype.registerChildren= function (child) {
    this._innerValues.children.push(child);
};

org.wiedza.webBook.components.Section.prototype.hasChildren= function () {
  return this._innerValues.children.length>0;
};

org.wiedza.webBook.components.Section.prototype.getChildren= function () {
    return this._innerValues.children;
};
org.wiedza.webBook.components.Section.prototype.getLevel = function () {
    return this.options.level;
};


org.wiedza.webBook.components.Section.prototype.getId = function () {
    return this.options.id;
};

org.wiedza.webBook.components.Section.prototype.getFullId = function () {
    var result = null;

    if (org.wiedza.check.isNull(this.options.parent)) {
        result = this.options.id;
    } else {
        result = this.options.parent.getFullId() + ":" + this.options.id;
    }
    return result;
};

org.wiedza.webBook.components.Section.prototype.getTitle = function () {
    return this.options.title;
};
