// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// RENDERING API
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

org.weidza.rendering={
    _LOGGER :org.weidza.logger.factory("org.weidza.rendering"),

    createNode : function(nodeName, styleClass, id){
        org.weidza.asserts.notNull(nodeName,"can't create node, node name is null!");

        var result = $('<'+nodeName+'></'+nodeName+'>');

        if(org.weidza.check.notEmpty(id)){
            result.attr("id",id);
        }

        if(org.weidza.check.notEmpty(styleClass)){
            result.attr("class",styleClass);
        }

        return result;
    },

    extractXtagChildren : function(node){
        org.weidza.asserts.notNull(node,"can't extract Xtag children, node is null!");

        var result =  node.context.innerHTML;
        node.context.innerHTML ="";

        return result;

    },

    styleIfNotNull : function (node, styleClass){
        return org.weidza.check.isNotNull(node)?styleClass:"";
    },

    styleIfNull : function (node, styleClass){
        return org.weidza.check.isNull(node)?styleClass:"";
    },

    clearDiv : function(){
        var result = $("<div></div>");
            result.attr("class","webbook-clean");
        return result;
    }


};
