if(!xtag.tags['w-list']) {

    xtag.register('w-list', {
        accessors: {
            id: {
                attribute: {}
            },
            type: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = null;
                if(org.weidza.check.isNull(this.id)){
                    uid=org.weidza.services.generateId("list");
                }else{
                    uid = this.id;
                }


                var options = {
                    id    : uid,
                    type : this.type,
                    xtag  : $(this)
                };

                window[uid]= new org.weidza.webBook.components.List(options);
            }
        }
    });
}
