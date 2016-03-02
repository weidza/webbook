// *********************************************************************************************************************
// WEBBOOK COMPONENTS
// *********************************************************************************************************************
org.weidza.webBook = {};
org.weidza.webBook.components = {};

org.weidza.webBook._innerValues = {
    currentSection:null
};
org.weidza.webBook.services = {

    getCurrentSection : function(){
        return org.weidza.webBook._innerValues.currentSection;
    },

    setCurrentSection: function(value){
        org.weidza.webBook._innerValues.currentSection = value;
    },

    appendCurrentSection : function(value){
        org.weidza.asserts.notNull(value,"can't append null to section path");
        org.weidza.asserts.isString(value);

        var currentPath = this.getCurrentSection();

        if(org.weidza.check.isNull(currentPath)){
            currentPath = value;
        }else{
            currentPath = currentPath + ":"+value;
        }

        this.setCurrentSection(currentPath);
    }



};