// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ASSERTS API
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.asserts= {
    _LOGGER :org.weidza.logger.factory("org.weidza.asserts"),

    notNull: function (value, message) {
        if (value === undefined || value === null) {
            org.weidza.asserts._LOGGER.error(message);
            throw  message;
        }
    },
    isFalse : function (condition, message){
        if(condition){
            org.weidza.asserts._LOGGER.error(message);
            throw  message;
        }
    },
    isTrue : function (condition, message){
        if(!condition){
            org.weidza.asserts._LOGGER.error(message);
            throw  message;
        }
    }
};
