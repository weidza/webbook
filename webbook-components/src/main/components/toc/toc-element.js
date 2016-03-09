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
                var uid = org.wiedza.services.generateId("toc");

                var options = {
                    id       : uid,
                    levelMax : this.levelMax,
                    xtag     : jNode
                };

                window[uid]= new org.wiedza.webBook.components.Toc(options);
            }
        }
    });
}
