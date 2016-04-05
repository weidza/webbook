// *********************************************************************************************************************
// WEBBOOK COMPONENTS
// *********************************************************************************************************************
org.wiedza.webBook = {};
org.wiedza.webBook.components = {};

org.wiedza.webBook._innerValues = {
    sections:[],
    sectionListener :[]
};

org.wiedza.webBook.services= {
    _looger : org.wiedza.logger.factory('org.wiedza.webBook.services'),

    getAllSections : function(){
        return org.wiedza.webBook._innerValues.sections;
    },

    registerSectionListener : function(listener){
        org.wiedza.webBook._innerValues.sectionListener.push(listener);
    },

    registerSection : function(node){
        org.wiedza.asserts.notNull(node,"can't append null object to sections");

        var contains = org.wiedza.check.contains(node,org.wiedza.webBook._innerValues.sections,function(ref,value){
            return ref.getId()===value.getId();
        });

        if(contains){
            this._looger.warn("section node already exists : "+node.options.id);
        }else{
            org.wiedza.webBook._innerValues.sections.push(node);
            org.wiedza.webBook.services.updateSection();
        }
        org.wiedza.webBook.services.invokeSectionListeners();
    },

    updateSection : function(){
        for(var i=0; i< org.wiedza.webBook._innerValues.sections.length; i++){
            org.wiedza.webBook._innerValues.sections[i].update();
        }
    },
    invokeSectionListeners : function(){
        var listenerSize =org.wiedza.webBook._innerValues.sectionListener.length;
        for(var i=0; i<listenerSize;i++){
            org.wiedza.webBook._innerValues.sectionListener[i].eventRegisterSection();
        }
    },

    findSection : function(uid){
        var result = null;
        if(org.wiedza.check.isNotNull(uid)){
            var size = org.wiedza.webBook._innerValues.sections.length;
            for(var i=0;i<size;i++){
                var item = org.wiedza.webBook._innerValues.sections[i];
                //TODO: remove second condition
                if(item.getFullId()===uid || item.getId()===uid ){
                    result = item;
                    break;
                }
            }
        }

        return result;
    }

};