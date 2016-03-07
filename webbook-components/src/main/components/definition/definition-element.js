if(!xtag.tags['w-definitions']) {

    xtag.register('w-definition', {
        accessors: {
            id: {
                attribute: {}
            },
            title: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = org.weidza.services.getIdOrGeneratedId(this.id,"definition");

                var options = {
                    id    : uid,
                    title : this.title,
                    xtag  : $(this)
                };

                window[uid]= new org.weidza.webBook.components.Definition(options);
            }
        }
    });
}
