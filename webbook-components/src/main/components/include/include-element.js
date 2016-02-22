if(!xtag.tags['w-include']) {

    xtag.register('w-include', {
        accessors: {
            src: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var self= this.xtag;
                var uid = org.weidza.webBook.services.generateId("include");
                this.xtag.container = $(this).append('<div></div>');

                var options = {
                    id:uid,
                    src : this.src,
                    xtag : self
                };

                window[uid]= Object.create(org.weidza.webBook.components.Include);
                window[uid].init(options);
            }
        }
    });
}
