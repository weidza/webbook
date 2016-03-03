if(!xtag.tags['w-toc']) {

    xtag.register('w-toc', {

        accessors: {
            levelMax: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var jNode = $(this);
                var uid = org.weidza.services.generateId("toc");

                var options = {
                    id       : uid,
                    levelMax : this.levelMax,
                    xtag     : jNode
                };

                window[uid]= new org.weidza.webBook.components.Toc(options);
            }
        }
    });
}
