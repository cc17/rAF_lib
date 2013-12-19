
	/***监听页面性能 start**/
	// var stats = new Stats();
	// stats.setMode(0); // 0: fps, 1: ms

	// var total = 0;

	// // Align top-left
	// stats.domElement.style.position = 'absolute';
	// stats.domElement.style.left = '0px';
	// stats.domElement.style.top = '0px';
	// document.body.appendChild( stats.domElement );
	/***监听页面性能 end**/
	var logger = (function(){
		var area;
		return function(val){
			if(!window.console){
				if(!document.getElementById('J-logger')){
					area = document.createElement('textarea');
					area.id = 'J-logger';
					area.style.cssText = 'position:absolute;top:80px;left:0;width:800px;height:500px;';
					document.body.appendChild(area);		
				}
				area.value += val;
				return;
			}
			console.log(val);
		};
	})();

	var count = 0;
	function Test1() {
		//stats.begin();
		count++;
		logger('test1 ');
		//stats.end();
	};
	function Test2() {
		logger('test2 ');
	};

	//handle
	var start = function(){
		rAF.start();
	};
	var stop = function(){
		rAF.stop();
	};
	var toggle = function(){
		rAF.toggle();
	};
	var addTest1 = function(){
		rAF.add('test1', Test1);
	};
	var addTest2 = function(){
		rAF.add('test2', Test2);
	};
	var removeTest1 = function(){
		rAF.remove('test1');
	};
	var removeTest2 = function(){
		rAF.remove('test2');
	};
	var removeAll = function(){
		rAF.remove();
		rAF.stop();
	};