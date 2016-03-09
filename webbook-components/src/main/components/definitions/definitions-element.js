if(!xtag.tags['w-definitions']) {

    xtag.register('w-definitions', {
        accessors: {
            id: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = org.wiedza.services.getIdOrGeneratedId(this.id,"definitions");

                var options = {
                    id    : uid,
                    xtag  : $(this)
                };

                window[uid]= new org.wiedza.webBook.components.Definitions(options);
            }
        }
    });
}
