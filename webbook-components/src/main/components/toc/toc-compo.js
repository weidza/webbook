// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.wiedza.webBook.components.Toc
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.wiedza.webBook.components.Toc = function (options) {
    this.logger = org.wiedza.logger.factory("org.wiedza.webBook.components.Toc");
    this.options = {
        id: "",
        xtag: null,
        levelMax: 0
    };
    this._innerValues = {
        compo : null
    };

    this._init(options);
    this._render();
};


org.wiedza.webBook.components.Toc.prototype._init = function (options) {
    org.wiedza.asserts.notNull(options, "Toc option mustn't be null!");
    org.wiedza.asserts.notNull(options.xtag, "XTag node mustn't be null!");
    org.wiedza.asserts.notNull(options.id, "ID mustn't be null!");


    this.options.id = options.id;
    this.options.xtag = options.xtag;

    if (org.wiedza.check.isNotNull(options.levelMax)) {
        this.options.levelMax = options.levelMax;

        if (this.options.levelMax < 1) {
            this.options.levelMax = 1;
        }
    } else {
        this.options.levelMax = 4;
    }
    org.wiedza.webBook.services.registerSectionListener(this);

};

org.wiedza.webBook.components.Toc.prototype.eventRegisterSection = function(section){
    this._renderContent();
};


org.wiedza.webBook.components.Toc.prototype._render = function () {
    this._innerValues.compo = org.wiedza.rendering.createNode('div', 'webbook-toc', this.options.id);
    this._renderContent();
    this.options.xtag.append(this._innerValues.compo);
};

org.wiedza.webBook.components.Toc.prototype._renderContent = function () {
    this._innerValues.compo.html("");

    var sections =org.wiedza.webBook.services.getAllSections();
    var nbSections = sections.length;
    for(var i = 0 ; i<nbSections; i++){
        var item = sections[i];

        if(item.getLevel()<=this.options.levelMax){
            this._renderSection(item);
        }
    }
};

org.wiedza.webBook.components.Toc.prototype._renderSection = function (section) {
    var level = section.getLevel();
    if(level >10){
        level =10;
    }
    var result = org.wiedza.rendering.createNode('div', ['webbook-toc-section', "level_"+level].join(" "));

    var link = org.wiedza.rendering.createNode('a');
        link.attr('href',"#"+section.getFullId());
        link.text(section.getTitle());

    result.append(link);

    this._innerValues.compo.append(result);
}