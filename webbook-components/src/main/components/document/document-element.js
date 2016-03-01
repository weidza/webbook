if(!xtag.tags['w-document']) {

    xtag.register('w-document', {
        accessors: {
        },
        lifecycle: {
            inserted: function() {
                var uid = org.weidza.services.generateId("document");

                var options = {
                    id:uid,
                    xtag : $(this)
                };

                window[uid]= Object.create(org.weidza.webBook.components.Document);
                window[uid].init(options);
            }
        }
    });
}
