if(!xtag.tags['w-em']) {

    xtag.register('w-em', {
        accessors: {
            id: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = org.weidza.services.getIdOrGeneratedId(this.id,"emphase");

                var options = {
                    id    : uid,
                    xtag  : $(this)
                };

                window[uid]= new org.weidza.webBook.components.Emphase(options);
            }
        }
    });
}
