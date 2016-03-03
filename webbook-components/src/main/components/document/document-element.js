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

                window[uid]= new org.weidza.webBook.components.Document(options);
            }
        }
    });
}
