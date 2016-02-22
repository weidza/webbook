// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// CORE SERVICE
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.services = {

    generateId : function (componentName){
        var index = org.weidza.webBook._innerValues.componentsIds[componentName];

        if(index===undefined ||index===null){
            index =0;
        }
        index ++;
        org.weidza.webBook._innerValues.componentsIds[componentName] =index;
        return componentName+"_"+index;
    },

    normalizeId : function (value){
        TAB_00C0 =  "AAAAAAACEEEEIIIIDNOOOOO*OUUUUYIs" +
                    "aaaaaaaceeeeiiii?nooooo/ouuuuy?y" +
                    "AaAaAaCcCcCcCcDdDdEeEeEeEeEeGgGg" +
                    "GgGgHhHhIiIiIiIiIiJjJjKkkLlLlLlL" +
                    "lLlNnNnNnnNnOoOoOoOoRrRrRrSsSsSs" +
                    "SsTtTtTtUuUuUuUuUuUuWwYyYZzZzZzF";
        var result = value.split('');
        for (var i = 0; i < result.length; i++) {
            var c = value.charCodeAt(i);
            if (c >= 0x00c0 && c <= 0x017f) {
                result[i] = String.fromCharCode(TAB_00C0.charCodeAt(c - 0x00c0));
            } else if (c > 127) {
                result[i] = '_';
            }
        }

        return  result.join('').replace(/\W/g, '_');
    }

};

