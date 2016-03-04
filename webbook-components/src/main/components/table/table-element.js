if(!xtag.tags['w-table']) {

    xtag.register('w-table', {
        accessors: {
            title: {
                attribute: {}
            },
            headers: {
                attribute: {}
            },
        },
        lifecycle: {
            inserted: function() {
                var uid = org.weidza.services.generateId("table");

                var options = {
                    id    : uid,
                    title : this.title,
                    headers : this.headers,
                    xtag  : $(this)
                };

                window[uid]= new org.weidza.webBook.components.Table(options);
            }
        }
    });
}
