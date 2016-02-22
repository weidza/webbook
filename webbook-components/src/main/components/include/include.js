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
        this.options = options;

        if(org.weidza.webBook.check.isNotNull(this.options.src)){
            this.options.xtag.container.load(this.options.src);
        }
    }
};