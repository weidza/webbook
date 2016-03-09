// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.wiedza.webBook.components.Section
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.wiedza.webBook.components.Section = function (options) {
    this._logger = org.wiedza.logger.factory("org.wiedza.webBook.components.Section");

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


org.wiedza.webBook.components.Section.prototype._init = function (options) {
    org.wiedza.asserts.notNull(options, "chapter option mustn't be null!");
    org.wiedza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.wiedza.asserts.notNull(options.id, "ID mustn't be null!");
    org.wiedza.asserts.notNull(options.title, "section title mustn't be null!");

    this.options.id = options.id;
    this.options.xtag = options.xtag;
    this.options.title = options.title;
    this.options.parent = options.parent;

    this.options.level = this._calcLevel();
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
    var titleGrp = org.wiedza.rendering.createNode('div', 'webbook-section-title', this.getFullId());

    var title = org.wiedza.rendering.createNode('h' + this.options.level);
    title.text(this.options.title);


    var anchor = org.wiedza.rendering.createNode('a', 'webbook-section-title-anchor');
    anchor.attr('href', "#" + this.getFullId());

    title.append(anchor);
    titleGrp.append(title);
    return titleGrp;
};

org.wiedza.webBook.components.Section.prototype._renderContent = function () {
    var children = org.wiedza.rendering.extractXtagChildren(this.options.xtag);
    var result = org.wiedza.rendering.createNode('div', 'webbook-section-content-children');
    result.html(children);
    return result;
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
