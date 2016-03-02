var LOGGER = org.weidza.logger.factory("w-section");
if(!xtag.tags['w-section']) {

    xtag.register('w-section', {

        accessors: {
            title: {
                attribute: {}
            },
            level: {
                attribute: {}
            }
        },
        lifecycle: {
            created: function(){

            },
            inserted: function() {
                LOGGER.info('insert :'+this.title);
                var jNode = $(this);
                var uid = org.weidza.services.normalizeId(this.title);

                var parent = org.weidza.services.getParent('w-section',jNode);
                var currentParent = null;
                if(parent !==null){
                    currentParent= org.weidza.services.normalizeId(parent.attributes["title"].value);
                }


                var options = {
                    id    : uid,
                    title : this.title,
                    parent : currentParent,
                    xtag  : jNode
                };


                window[uid]= Object.create(org.weidza.webBook.components.Section);
                window[uid].init(options);
                console.log(currentParent+":"+uid);

            }
        }
    });
}
