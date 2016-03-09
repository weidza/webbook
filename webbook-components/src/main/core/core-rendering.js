// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// RENDERING API
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

org.wiedza.rendering={
    _LOGGER :org.wiedza.logger.factory("org.wiedza.rendering"),

    createNode : function(nodeName, styleClass, id){
        org.wiedza.asserts.notNull(nodeName,"can't create node, node name is null!");

        var result = $('<'+nodeName+'></'+nodeName+'>');

        if(org.wiedza.check.notEmpty(id)){
            result.attr("id",id);
        }

        if(org.wiedza.check.notEmpty(styleClass)){
            result.attr("class",styleClass);
        }

        return result;
    },

    extractXtagChildren : function(node){
        org.wiedza.asserts.notNull(node,"can't extract Xtag children, node is null!");

        var result =  node.context.innerHTML;
        node.context.innerHTML ="";

        return result;

    },

    styleIfNotNull : function (node, styleClass){
        return org.wiedza.check.isNotNull(node)?styleClass:"";
    },

    styleIfNull : function (node, styleClass){
        return org.wiedza.check.isNull(node)?styleClass:"";
    },

    clearDiv : function(){
        var result = $("<div></div>");
            result.attr("class","webbook-clean");
        return result;
    }


};
