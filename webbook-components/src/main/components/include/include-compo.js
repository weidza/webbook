// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Include
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Include =  {
    options : {
        id  : "",
        src : "",
        xtag: null
    },

    init: function(options) {
        org.weidza.webBook.asserts.notNull(options, "include option mustn't be null!");
        org.weidza.webBook.asserts.notNull(options.id, "include id mustn't be null!");
        org.weidza.webBook.asserts.notNull(options.src, "include src mustn't be null!");
        org.weidza.webBook.asserts.notNull(options.xtag, "include xtag mustn't be null!");

        this.options = options;

        if(org.weidza.webBook.check.isNotNull(this.options.src)){
            this.options.xtag.container.load(this.options.src);
        }
    }
};