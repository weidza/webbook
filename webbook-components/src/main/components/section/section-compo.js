// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Section
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Section = function (options) {
    this._logger = org.weidza.logger.factory("org.weidza.webBook.components.Section");

    this.options = {
        id: "",
        parent: null,
        title: "",
        xtag: null,
        level: 0
    };

    this._init(options);
    this._render();
};


org.weidza.webBook.components.Section.prototype._init = function (options) {
    org.weidza.asserts.notNull(options, "chapter option mustn't be null!");
    org.weidza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.weidza.asserts.notNull(options.id, "ID mustn't be null!");
    org.weidza.asserts.notNull(options.title, "section title mustn't be null!");

    this.options.id = options.id;
    this.options.xtag = options.xtag;
    this.options.title = options.title;
    this.options.parent = options.parent;

    this.options.level = this._calcLevel();
};


org.weidza.webBook.components.Section.prototype._calcLevel = function () {
    var elements = this.getFullId().split(":");
    result = elements.length+1;

    return result;
};


org.weidza.webBook.components.Section.prototype._render = function () {
    var compo = org.weidza.rendering.createNode('div', 'webbook-section', this.options.id);
    compo.append(this._renderTitle());
    compo.append(this._renderContent());
    this.options.xtag.append(compo);
};

org.weidza.webBook.components.Section.prototype._renderTitle = function () {
    var titleGrp = org.weidza.rendering.createNode('div', 'webbook-section-title', this.getFullId());

    var title = org.weidza.rendering.createNode('h' + this.options.level);
    title.text(this.options.title);


    var anchor = org.weidza.rendering.createNode('a', 'webbook-section-title-anchor');
    anchor.attr('href', "#" + this.getFullId());

    title.append(anchor);
    titleGrp.append(title);
    return titleGrp;
};

org.weidza.webBook.components.Section.prototype._renderContent = function () {
    var children = org.weidza.rendering.extractXtagChildren(this.options.xtag);
    var result = org.weidza.rendering.createNode('div', 'webbook-section-content-children');
    result.html(children);
    return result;
};


org.weidza.webBook.components.Section.prototype.getLevel = function () {
    return this.options.level;
};


org.weidza.webBook.components.Section.prototype.getId = function () {
    return this.options.id;
};

org.weidza.webBook.components.Section.prototype.getFullId = function () {
    var result = null;
    if (org.weidza.check.isNull(this.options.parent)) {
        result = this.options.id;
    } else {
        result = this.options.parent.getFullId() + ":" + this.options.id;
    }
    return result;
};

org.weidza.webBook.components.Section.prototype.getTitle = function () {
    return this.options.title;
};
