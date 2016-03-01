if(!xtag.tags['w-section']) {

    xtag.register('w-section', {
        accessors: {
            title: {
                attribute: {}
            },
            level: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = org.weidza.services.normalizeId(this.title);

                var options = {
                    id    : uid,
                    title : this.title,
                    xtag  : $(this)
                };

                window[uid]= Object.create(org.weidza.webBook.components.Section);
                window[uid].init(options);
            }
        }
    });
}
