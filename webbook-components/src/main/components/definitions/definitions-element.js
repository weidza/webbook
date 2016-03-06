if(!xtag.tags['w-definitions']) {

    xtag.register('w-definitions', {
        accessors: {
            type: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = org.weidza.services.generateId("definitions");

                var options = {
                    id    : uid,
                    type : this.type,
                    xtag  : $(this)
                };

                window[uid]= new org.weidza.webBook.components.Definitions(options);
            }
        }
    });
}
