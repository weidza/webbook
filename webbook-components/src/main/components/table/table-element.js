if(!xtag.tags['w-table']) {

    xtag.register('w-table', {
        accessors: {
            id: {
                attribute: {}
            },
            title: {
                attribute: {}
            },
            caption: {
                attribute: {}
            },
            columns: {
                attribute: {}
            },
            column_classes: {
                attribute: {}
            },
            loader: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var uid = null;
                if(org.weidza.check.isNull(this.id)){
                    uid = org.weidza.services.generateId("table");
                }else{
                    uid = this.id;
                }

                var options = {
                    id            : uid,
                    title         : this.title,
                    caption       : this.caption,
                    columns       : this.columns,
                    loader        : this.loader,
                    columnClasses : this.column_classes,
                    xtag          : $(this)
                };

                window[uid]= new org.weidza.webBook.components.Table(options);
            }
        }
    });
}
