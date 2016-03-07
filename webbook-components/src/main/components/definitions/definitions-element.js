if(!xtag.tags['w-definitions']) {

    xtag.register('w-definitions', {
        accessors: {
            id: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = org.weidza.services.getIdOrGeneratedId(this.id,"definitions");

                var options = {
                    id    : uid,
                    xtag  : $(this)
                };

                window[uid]= new org.weidza.webBook.components.Definitions(options);
            }
        }
    });
}
