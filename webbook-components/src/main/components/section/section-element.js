if(!xtag.tags['w-section']) {

    xtag.register('w-section', {

        accessors: {
            id: {
                attribute: {}
            },
            title: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var jNode = $(this);

                org.weidza.asserts.notNull(this.title,"Section title mustn't be null!");
                var uid = null;
                if(org.weidza.check.isNull(this.id)){
                    uid = org.weidza.services.normalizeId(this.title);
                }else{
                    uid = this.id;
                }

                var parentNode = org.weidza.services.getParent('w-section',jNode);
                var currentParent = null;

                if(org.weidza.check.isNotNull(parentNode)){
                    var parentId = org.weidza.services.normalizeId(parentNode.attributes['title'].value);
                    currentParent = org.weidza.webBook.services.findSection(parentId);
                    org.weidza.asserts.notNull(currentParent, "error parent section isn't present in registred sections ("+parentId+")");
                    if(currentParent.getId()===uid){
                        throw "error parent is same node!";
                    }
                }

                var options = {
                    id    : uid,
                    title : this.title,
                    parent : currentParent,
                    xtag  : jNode
                };

                var newSection = new org.weidza.webBook.components.Section(options);

                org.weidza.webBook.services.registerSection(newSection);
            }
        }
    });
}
