// *********************************************************************************************************************
// WEBBOOK COMPONENTS
// *********************************************************************************************************************
org.weidza.webBook = {};
org.weidza.webBook.components = {};

org.weidza.webBook._innerValues = {
    sections:[]
};

org.weidza.webBook.services= {

    getAllSections : function(){
        return org.weidza.webBook._innerValues.sections;
    },

    registerSection : function(node){
        org.weidza.asserts.notNull(node,"can't append null object to sections");
        org.weidza.webBook._innerValues.sections.push(node);
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