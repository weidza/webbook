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
                var uid = org.wiedza.services.getIdOrGeneratedId(this.id,"definition");

                var options = {
                    id    : uid,
                    title : this.title,
                    xtag  : $(this)
                };

                window[uid]= new org.wiedza.webBook.components.Definition(options);
            }
        }
    });
}
