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

                org.wiedza.asserts.notNull(this.title,"Section title mustn't be null!");
                var uid = null;
                if(org.wiedza.check.isNull(this.id)){
                    uid = org.wiedza.services.normalizeId(this.title);
                }else{
                    uid = this.id;
                }

                var parentNode = org.wiedza.services.getParent('w-section',jNode);
                var currentParent = null;

                if(org.wiedza.check.isNotNull(parentNode)){
                    var parentId = org.wiedza.services.normalizeId(parentNode.attributes['title'].value);
                    currentParent = org.wiedza.webBook.services.findSection(parentId);
                    org.wiedza.asserts.notNull(currentParent, "error parent section isn't present in registred sections ("+parentId+")");
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

                var newSection = new org.wiedza.webBook.components.Section(options);

                org.wiedza.webBook.services.registerSection(newSection);
            }
        }
    });
}
