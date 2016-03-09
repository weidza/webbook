if(!xtag.tags['w-include']) {

    xtag.register('w-include', {
        accessors: {
            src: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = org.wiedza.services.generateId("include");

                var options = {
                    id:uid,
                    src : this.src,
                    xtag : $(this)
                };

                window[uid]= new org.wiedza.webBook.components.Include(options);
            }
        }
    });
}
