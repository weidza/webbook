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

    getAllSections : function(){
        return org.wiedza.webBook._innerValues.sections;
    },

    registerSectionListener : function(listener){
        org.wiedza.webBook._innerValues.sectionListener.push(listener);
    },

    registerSection : function(node){
        org.wiedza.asserts.notNull(node,"can't append null object to sections");
        org.wiedza.webBook._innerValues.sections.push(node);

        var listenerSize =org.wiedza.webBook._innerValues.sectionListener.length;
        for(var i=0; i<listenerSize;i++){
            org.wiedza.webBook._innerValues.sectionListener[i].eventRegisterSection(node);
        }
    },

    findSection : function(uid){
        org.wiedza.asserts.notNull(uid,"can't section with null uid parameter");
        var result = null;
        var size = org.wiedza.webBook._innerValues.sections.length;
        for(var i=0;i<size;i++){
            var item = org.wiedza.webBook._innerValues.sections[i];
            //TODO: remove second condition
            if(item.getFullId()===uid || item.getId()===uid ){
                result = item;
                break;
            }
        }
        return result;
    }

};