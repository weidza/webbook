if(!xtag.tags['w-document']) {

    xtag.register('w-document', {
        accessors: {
        },
        lifecycle: {
            inserted: function() {
                var uid = org.wiedza.services.generateId("document");

                var options = {
                    id:uid,
                    xtag : $(this)
                };

                window[uid]= new org.wiedza.webBook.components.Document(options);
            }
        }
    });
}
