// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.wiedza.webBook.components.Include
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.wiedza.webBook.components.Include = function (option) {
    this.options = {
        id: "",
        src: "",
        xtag: null
    };

    this._init(option);
    this._render();
};


org.wiedza.webBook.components.Include.prototype._init = function (options) {
    org.wiedza.asserts.notNull(options, "include option mustn't be null!");
    org.wiedza.asserts.notNull(options.src, "include src mustn't be null!");
    org.wiedza.asserts.notNull(options.xtag, "include xtag mustn't be null!");
    this.options = options;
};

org.wiedza.webBook.components.Include.prototype._render = function () {
    this.options.xtag.container = $(this.options.xtag).append('<div></div>');
    if (org.wiedza.check.isNotNull(this.options.id)) {
        this.options.xtag.container.attr('id', this.options.id);
    }

    var self = this;
    $.ajax(this.options.src).done(function(data) {
        var scripts =  $(data).find("script");

        if(org.wiedza.check.isNotNull(scripts)){
            for(var i=0;i<scripts.length;i++){
                var script = scripts[i].innerText.trim();
                $.globalEval(script);
            }
        }

        self.options.xtag.container.html(data);
    });


};

//