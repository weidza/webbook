// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ASSERTS API
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
org.weidza.asserts= {
    notNull: function (value, message) {
        if (value === undefined || value === null) {
            throw  message;
        }
    },
    isFalse : function (condition, message){
        if(condition){
            throw  message;
        }
    },
    isTrue : function (condition, message){
        if(!condition){
            throw  message;
        }
    }
};
