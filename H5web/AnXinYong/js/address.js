jQuery(function($){
	$("#content").on("click",function(e){
		var e = e || event,
			$tar = $(e.target);

		$("#content").find("img").attr("src","img/item.svg");

		if($tar.attr("class")=="address-box")
		{
			$tar.find(".checked").find("img").attr("src","img/confirm.svg");
		} else if($tar.parents(".address-box"))
		{
			$tar.parents(".address-box").find(".checked").find("img").attr("src","img/confirm.svg");
		}
	});
});