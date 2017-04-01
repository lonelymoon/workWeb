(function(window,undefined){

	var Uxwe = function(){

	};

	Uxwe.prototype.addSpace = function(space){
		
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

	window.uxwe = new Uxwe();

})(window);