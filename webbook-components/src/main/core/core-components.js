// *********************************************************************************************************************
// WEBBOOK COMPONENTS
// *********************************************************************************************************************
org.weidza.webBook = {};
org.weidza.webBook.components = {};

org.weidza.webBook._innerValues = {
    sections:[],
    sectionListener :[]
};

org.weidza.webBook.services= {

    getAllSections : function(){
        return org.weidza.webBook._innerValues.sections;
    },

    registerSectionListener : function(listener){
        org.weidza.webBook._innerValues.sectionListener.push(listener);
    },

    registerSection : function(node){
        org.weidza.asserts.notNull(node,"can't append null object to sections");
        org.weidza.webBook._innerValues.sections.push(node);

        var listenerSize =org.weidza.webBook._innerValues.sectionListener.length;
        for(var i=0; i<listenerSize;i++){
            org.weidza.webBook._innerValues.sectionListener[i].eventRegisterSection(node);
        }
    },

    findSection : function(uid){
        org.weidza.asserts.notNull(uid,"can't section with null uid parameter");
        var result = null;
        var size = org.weidza.webBook._innerValues.sections.length;
        for(var i=0;i<size;i++){
            var item = org.weidza.webBook._innerValues.sections[i];
            //TODO: remove second condition
            if(item.getFullId()===uid || item.getId()===uid ){
                result = item;
                break;
            }
        }
        return result;
    }

};