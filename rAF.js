(function(){
	/**
	* @description requestAnimationFrame封装，支持开始，结束，以及添加事件
	*/
	var rAF = {};
	var _getRequestAnimation = window.requestAnimationFrame || 
           					  	window.msRequestAnimationFrame ||
           						window.webkitRequestAnimationFrame ||
           						window.mozRequestAnimationFrame || 
           						function(code){
            						return setTimeout(code, 1000/60);
        						};
    var _cancleRequestAnimation = window.cancelAnimationFrame || 
           					  	window.msCancelAnimationFrame ||
           						window.webkitCancelAnimationFrame ||
           						window.mozCancelAnimationFrame || 
           						clearTimeout;
    var isRunning = false,
    	requestId,
    	_frameRenders = {};

    function loop(){
    	for(var key in _frameRenders){
    		var _f = _frameRenders[key];
    		if(_f.length){
    			for(var i = 0,len =_f.length;i<len;i++){
    				var _ff = _f[i];
    				_ff.code.call(_ff.context || this);
    			}
    		}
    	}
    	requestId = _getRequestAnimation(loop);
    };
    rAF = {
    	add : function(name,frame,context){
    		!_frameRenders[name] && (_frameRenders[name] = []);
    		_frameRenders[name].push({code:frame,context:context});
    		return this;
    	},
    	remove:function(name){
    		if(!name){
    			_frameRenders = {};
    			return;
    		}
    		if(!_frameRenders[name]){
    			return;
    		}
    		delete _frameRenders[name];
    	},
    	start:function(){
    		if(isRunning){
    			return;
    		}
    		requestId = loop();
    		isRunning = true;
    	},
    	stop:function(){
    		if(!isRunning){
    			return;
    		}
    		_cancleRequestAnimation(requestId);
    		requestId = null;
    		isRunning = false;
    	},
    	toggle:function(){
    		isRunning ? rAF.stop() : rAF.start();
    	}
    };

    if(typeof define !== 'undefined'){
		define([],function(){
			return rAF;
		});
	}else if(typeof exports !== 'undefined'){
		exports.rAF = rAF;
	}else{
		window.rAF = rAF;
	}


})();