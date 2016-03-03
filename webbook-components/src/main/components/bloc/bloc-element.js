if(!xtag.tags['w-bloc']) {

    xtag.register('w-bloc', {
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
                var uid = org.weidza.services.generateId("bloc");

                var options = {
                    id    : uid,
                    title : this.title,
                    level : this.level,
                    xtag  : $(this)
                };

                window[uid]= new org.weidza.webBook.components.Bloc(options);
            }
        }
    });
}
