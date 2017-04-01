(function(window,undefined){

	var Uxwee = function(){

	};

	Uxwee.prototype.addSpace = function(space){
		
		var spaceArr = space.split('.'),
			namespace = this;

		for( var i = 0, space; space = spaceArr[i++]; ){
			if(!namespace[space]){
				namespace[space] = {};
				namespace = namespace[space];
			}
		}

		return namespace;
	};

	window.uxwee = new Uxwee();

})(window);