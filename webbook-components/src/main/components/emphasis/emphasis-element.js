if(!xtag.tags['w-em']) {

    xtag.register('w-em', {
        accessors: {
            id: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = org.wiedza.services.getIdOrGeneratedId(this.id,"emphasis");

                var options = {
                    id    : uid,
                    xtag  : $(this)
                };

                window[uid]= new org.wiedza.webBook.components.Emphasis(options);
            }
        }
    });
}
