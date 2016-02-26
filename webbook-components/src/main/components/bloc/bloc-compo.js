// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// org.weidza.webBook.components.Include
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.components.Bloc =  {
    options : {
        title  : "",
        level : "",
        xtag: null
    },

    init: function(options) {
        org.weidza.webBook.asserts.notNull(options, "bloc option mustn't be null!");
        this.options = options;

        this._render();
    },

    _render : function (){
        //TODO : implement ....
    }
};