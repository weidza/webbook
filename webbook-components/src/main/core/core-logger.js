// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// LOGGER API
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

org.weidza.logger={
    levels:{
        trace : {level :1,title : "TRACE"},
        debug : {level :2,title : "DEBUG"},
        info  : {level :3,title : "INFO "},
        warn  : {level :4,title : "WARN "},
        error : {level :5,title : "ERROR"},
        fatal : {level :6,title : "FATAL"}
    },
    rootLevel : null,

    _Logger : {
        option : {
            name : null
        },
        init: function(name){
            this.option.name = name;
        },

        trace : function(message, values){
            org.weidza.logger._processAppender(org.weidza.logger.levels.trace,this.option.name,message, values);
        },
        debug : function(message, values){
            org.weidza.logger._processAppender(org.weidza.logger.levels.debug,this.option.name,message, values);
        },
        info  : function(message, values){
            org.weidza.logger._processAppender(org.weidza.logger.levels.info,this.option.name,message, values);
        },
        warn  : function(message, values){
            org.weidza.logger._processAppender(org.weidza.logger.levels.warn,this.option.name,message, values);
        },
        error : function(message, values){
            org.weidza.logger._processAppender(org.weidza.logger.levels.error,this.option.name,message, values);
        },
        fatal : function(message, values){
            org.weidza.logger._processAppender(org.weidza.logger.levels.fatal,this.option.name,message, values);
        }

    } ,

    _createTimestamp : function(){
        var date = new Date();
        var result = [];
        result.push(date.getFullYear());
        result.push('-');
        result.push(date.getMonth());
        result.push('-');
        result.push(date.getDay());
        result.push(':');
        result.push(date.getHours());
        result.push(':');
        result.push(date.getMinutes());
        result.push(':');
        result.push(date.getSeconds());
        result.push(':');
        result.push(date.getMilliseconds());
        return result.join("");
    },

    _formatMessage : function(message,values){
        var formatted = message;
        for (var i = 0; i < values.length; i++) {
            var regexp = new RegExp('\\{'+i+'\\}', 'gi');
            formatted = formatted.replace(regexp, values[i]);
        }
        return formatted;
    },

    _processAppender : function (level,loggerName,message,values){
        if(level.level>=this.rootLevel.level){
            var time = this._createTimestamp();
            var messageFormated = null;
            if(values ===undefined||values===null){
                messageFormated =message;
            }else{
                messageFormated = this._formatMessage(message,values);
            }

            for(var i= 0;i<this._appenders.length;i++){
                this._appenders[i].log(time,level,loggerName,messageFormated);
            }
        }
    },

    _DefaultAppender : {
        log: function (time,level,loggerName,message){
            var buffer = [];
            buffer.push(time);
            buffer.push(" [");
            buffer.push(level.title);
            buffer.push("] ");
            buffer.push(loggerName);
            buffer.push(" : ");
            buffer.push(message);

            console.log(buffer.join(""));
        }
    },

    _registredLogger: {},
    _appenders : [],

    _findRegistredIndex : function(loggerName){
        var result= -1;
        var keys =Object.keys(this._registredLogger);

        for(var i=keys.length-1;i>=0;i--){
            if(keys[i]===loggerName){
                result=i;
            }
        }
        return result;
    },

    _createDefaultAppenders: function(){
        if(this.rootLevel===undefined||this.rootLevel===null){
            this.rootLevel= this.levels.info;
        }
        if(this._appenders.length===0){

            this._appenders.push(Object.create(org.weidza.logger._DefaultAppender));
        }
    },

    factory : function(loggerName) {
        var result = null;
        if (loggerName === undefined || loggerName === null) {
            throw  "Logger name mustn't be null!";
        }
        if(this._findRegistredIndex(loggerName)===-1){
            this._registredLogger[loggerName]= Object.create(org.weidza.logger._Logger);
            this._registredLogger[loggerName].init(loggerName);
            result = this._registredLogger[loggerName];

            this._createDefaultAppenders();
        }else{
            throw  'Logger "'+loggerName+'" already exists!';
        }
        return result;
    }

};
