if(!xtag.tags['w-link']) {

    xtag.register('w-link', {
        accessors: {
            id: {
                attribute: {}
            },
            title: {
                attribute: {}
            },
            src: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = org.wiedza.services.getIdOrGeneratedId(this.id,"link");

                var options = {
                    id    : uid,
                    title : this.title,
                    src   : this.src,
                    xtag  : $(this)
                };

                window[uid]= new org.wiedza.webBook.components.Link(options);
            }
        }
    });
}
