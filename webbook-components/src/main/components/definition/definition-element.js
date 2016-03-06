if(!xtag.tags['w-definition']) {

    xtag.register('w-definition', {
        accessors: {
            type: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = org.weidza.services.generateId("definition");

                var options = {
                    id    : uid,
                    type : this.type,
                    xtag  : $(this)
                };

                window[uid]= new org.weidza.webBook.components.Definition(options);
            }
        }
    });
}
