// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// CHECK API
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.webBook.check = {
    /**
     * Allow to check if value is null
     * @param value
     * @returns true if value is null
     */
    isNull: function (value) {
        return (value === undefined || value === null);
    },
    /**
     * Allow to check if value isn't null
     * @param value
     * @returns true if value isn't null
     */
    isNotNull: function (value) {
        return !org.weidza.webBook.check.isNull(value);
    },


    notEmpty: function (value) {
        return value !== undefined && value !== null && value.length > 0;
    },

    indexOf : function(value, list, functionEquals){
        var result = -1;
        if(org.weidza.webBook.check.isNotNull(list)){
            var useFunction = org.weidza.webBook.check.isNotNull(functionEquals);
            for(var i=list.length-1; i>=0;i--){

                var same = useFunction ? functionEquals(list[i],value) :list[i]===value;
                if(same){
                    result = i;
                    break;
                }
            }
        }
        return result;
    },

    contains : function(value, list, functionEquals){
        return org.weidza.webBook.check.indexOf(value, list,functionEquals) != -1;
    }
};