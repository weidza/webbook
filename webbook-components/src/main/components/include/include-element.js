if(!xtag.tags['w-include']) {

    xtag.register('w-include', {
        accessors: {
            src: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = org.weidza.services.generateId("include");

                var options = {
                    id:uid,
                    src : this.src,
                    xtag : $(this)
                };

                window[uid]= Object.create(org.weidza.webBook.components.Include);
                window[uid].init(options);
            }
        }
    });
}
