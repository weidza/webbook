// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ASSERTS API
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.asserts= {
    _LOGGER :org.weidza.logger.factory("org.weidza.asserts"),

    notNull: function (value, message) {
        if (value === undefined || value === null) {
            this._LOGGER.error(message);
            throw  message;
        }
    },
    isFalse : function (condition, message){
        if(condition){
            this._LOGGER.error(message);
            throw  message;
        }
    },
    isTrue : function (condition, message){
        if(!condition){
            this._LOGGER.error(message);
            throw  message;
        }
    },
    isString : function (value){
        this.notNull(value,"can't verify object type with null object!");


        var isString = ((typeof value) === 'string') || (value instanceof String);

        if(!isString ){
            var message = "value isn't String value ("+(typeof value)+")";
            this._LOGGER.error(message);
            throw  message;
        }

    }
};
