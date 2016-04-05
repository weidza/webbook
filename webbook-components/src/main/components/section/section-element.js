if(!xtag.tags['w-section']) {

    xtag.register('w-section', {

        accessors: {
            title: {
                attribute: {}
            }
        },
        lifecycle: {
            inserted: function() {
                var jNode = $(this);

                org.wiedza.asserts.notNull(this.title,"Section title mustn't be null!");
                var uid = org.wiedza.services.normalizeId(this.title);
                var parentNode = org.wiedza.services.getParent('w-section',jNode);
                var currentParent = null;
                var currentParentId = null;

                if(org.wiedza.check.isNotNull(parentNode)){
                    var currentParentId = org.wiedza.services.normalizeId(parentNode.attributes['title'].value);
                    currentParent = org.wiedza.webBook.services.findSection(currentParentId);

                    if(org.wiedza.check.isNotNull(currentParent) && currentParent.getId()===uid){
                        throw "error parent is same node!";
                    }
                }

                var options = {
                    id       : uid,
                    title    : this.title,
                    parent   : currentParent,
                    parentId : currentParentId,
                    xtag     : jNode
                };

                var newSection = new org.wiedza.webBook.components.Section(options);

                org.wiedza.webBook.services.registerSection(newSection);

            }
        }
    });
}
