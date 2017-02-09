/*
*	评论表情渲染JS
*	@author:	小毛(微博：BUPT朱小毛)
*	@data:		2013年2月17日
*	@version:	1.0
*	@rely:		jQuery
*/
jQuery(function($){
	/*
	*		参数说明
	*		baseUrl:	【字符串】表情路径的基地址
	*		pace:		【数字】表情弹出层淡入淡出的速度
	*		dir:		【数组】保存表情包文件夹名字
	*		text:		【二维数组】保存表情包title文字
	*		num:		【数组】保存表情包表情个数
	*		isExist:	【数组】保存表情是否加载过,对于加载过的表情包不重复请求。
	*/
	var swiper;
	var evHandle = "ontouchstart" in document?"tap":"click";
	var rl_exp = {
		baseUrl:	'',
		pace:		200,
		dir:		['mr','gnl','lxh','bzmh'],
		text:[			/*表情包title文字，自己补充*/
			[
			'em1_1','em1_2','em1_3','em1_4','em1_5','em1_6','em1_7','em1_8','em1_9','em1_10',
			'em1_11','em1_12','em1_13','em1_14','em1_15','em1_16','em1_17','em1_18','em1_19','em1_20',
			'em1_21','em1_22','em1_23','em1_24','em1_25','em1_26','em1_27','em1_28','em1_29','em1_30',
			'em1_31','em1_32','em1_33','em1_34','em1_35','em1_36','em1_37','em1_38','em1_39','em1_40',
			'em1_41','em1_42','em1_43','em1_44','em1_45','em1_46','em1_47','em1_48','em1_49','em1_50',
			'em1_51','em1_52','em1_53','em1_54','em1_55','em1_56','em1_57','em1_58','em1_59','em1_60',
			'em1_61','em1_62','em1_63','em1_64','em1_65','em1_66','em1_67','em1_68','em1_69','em1_70',
			'em1_71','em1_72','em1_73','em1_74','em1_75','em1_76','em1_77','em1_78','em1_79','em1_80',
			'em1_81','em1_82','em1_83','em1_84'
			],
			[
			'em2_1','em2_2','em2_3','em2_4','em2_5','em2_6','em2_7','em2_8','em2_9','em2_10',
			'em2_11','em2_12','em2_13','em2_14','em2_15','em2_16','em2_17','em2_18','em2_19','em2_20',
			'em2_21','em2_22','em2_23','em2_24','em2_25','em2_26','em2_27','em2_28','em2_29','em2_30',
			'em2_31','em2_32','em2_33','em2_34','em2_35','em2_36','em2_37','em2_38','em2_39','em2_40',
			'em2_41','em2_42','em2_43','em2_44','em2_45','em2_46'
			],
			[
			'em3_1','em3_2','em3_3','em3_4','em3_5','em3_6','em3_7','em3_8','em3_9','em3_10',
			'em3_11','em3_12','em3_13','em3_14','em3_15','em3_16','em3_17','em3_18','em3_19','em3_20',
			'em3_21','em3_22','em3_23','em3_24','em3_25','em3_26','em3_27','em3_28','em3_29','em3_30',
			'em3_31','em3_32','em3_33','em3_34','em3_35','em3_36','em3_37','em3_38','em3_39','em3_40',
			'em3_41','em3_42','em3_43','em3_44','em3_45','em3_46','em3_47','em3_48','em3_49','em3_50',
			'em3_51','em3_52','em3_53','em3_54','em3_55','em3_56','em3_57','em3_58','em3_59','em3_60',
			'em3_61','em3_62','em3_63','em3_64','em3_65','em3_66','em3_67','em3_68','em3_69','em3_70',
			'em3_71','em3_72','em3_73','em3_74','em3_75','em3_76','em3_77','em3_78','em3_79','em3_80',
			'em3_81','em3_82'
			],
			[
			'em4_1','em4_2','em4_3','em4_4','em4_5','em4_6','em4_7','em4_8','em4_9','em4_10',
			'em4_11','em4_12','em4_13','em4_14','em4_15','em4_16','em4_17','em4_18','em4_19','em4_20',
			'em4_21','em4_22','em4_23','em4_24','em4_25','em4_26','em4_27','em4_28','em4_29','em4_30',
			'em4_31','em4_32','em4_33','em4_34','em4_35','em4_36','em4_37','em4_38','em4_39','em4_40',
			'em4_41','em4_42','em4_43','em4_44','em4_45','em4_46','em4_47','em4_48','em4_49','em4_50',
			'em4_51','em4_52','em4_53','em4_54','em4_55','em4_56','em4_57','em4_58','em4_59','em4_60',
			'em4_61','em4_62','em4_63','em4_64','em4_65','em4_66','em4_67','em4_68','em4_69'
			]
		],
		num:		[84,46,82,69],
		isExist:	[0,0,0,0],
		bindEv:	function(i){
			$(".rl_exp_main").off(evHandle,'add').eq(i).on(evHandle,function add(e){
				e = e || event;
				$this = $(e.target);
				if($this[0].tagName == "DIV")
				$(".rl_exp_main").off(evHandle,'add').eq(i).on(evHandle,'add');
				if(swiper.animating)
				return;
				var $tar = $this[0].tagName =="IMG"?$this.parent('li'):$this;
				rl_exp.insertText(document.getElementById('input_content'),'['+$tar.find('img').attr('title')+']');
				//$('#rl_bq').fadeOut(rl_exp.pace);
				e.stopPropagation();
				e.preventDefault();
			});
		},
		/*加载表情包函数*/
		loadImg:function(i){
			var node = $("#rl_bq .rl_exp_main").eq(i);
			var domStr = '';
			var em_size = 30,
				$box_height = $('#rl_bq').height()-$('.rl_exp_tab').outerHeight(),
				$box_width = $('#rl_bq').width();

			var col_count =Math.floor($box_width/em_size),  //求列
				row_count =Math.floor($box_height/em_size); //求行

			var index = 0, //循环起点
				page_count = Math.ceil(rl_exp.num[i]/(col_count*row_count)); //页数
				domStr += '<div class="swiper-wrapper">';
				for (var k = 0; k < page_count; k++) {
					var num = (k+1)*col_count*row_count;
					var page_num_count = num>=rl_exp.num[i]?rl_exp.num[i]:num;
					domStr += '<div id="page_'+(k+1)+'" class="swiper-slide">'
					for(var j = index; j<page_num_count;j++){
						 domStr += 	'<li class="rl_exp_item">' + 
										'<img src="' + rl_exp.baseUrl + 'img/' + rl_exp.dir[i] + '/' + j + '.gif" alt="' + rl_exp.text[i][j] + 
										'" title="' + rl_exp.text[i][j] + '" />' +
									'</li>';
						index++;
					}
					domStr += '</div>';
				};
				domStr += '</div>';
				$(domStr).appendTo(node);

			rl_exp.isExist[i] = 1;
			rl_exp.bindEv(i);
		},
		/*在textarea里光标后面插入文字*/
		insertText:function(obj,str){
			//obj.focus();
			if (document.selection) {
				var sel = document.selection.createRange();
				sel.text = str;
			} else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
				var startPos = obj.selectionStart,
					endPos = obj.selectionEnd,
					cursorPos = startPos,
					tmpStr = obj.value;
				obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
				cursorPos += str.length;
				obj.selectionStart = obj.selectionEnd = cursorPos;
			} else {
				obj.value += str;
			}
			obj.blur();
		},
		init:function(){
			$("#rl_bq > ul.rl_exp_tab > li > a").each(function(i){
				$(this).on(evHandle,function(){
					if( $(this).hasClass('selected') )
						return;
					if( rl_exp.isExist[i] == 0 ){
						rl_exp.loadImg(i);
					}
					$("#rl_bq > ul.rl_exp_tab > li > a.selected").removeClass('selected');
					$(this).addClass('selected');
					$('#rl_bq .rl_selected').removeClass('rl_selected').hide();
					$('#rl_bq .rl_exp_main').eq(i).addClass('rl_selected').show();

					swiper = null;
					swiper = new Swiper('.rl_selected',{
						slidesPerView: 1,
						spaceBetween: 0,
						preloadImages: false,
						lazyLoading: false,
					});
				});
			});
			/*绑定表情弹出按钮响应，初始化弹出默认表情。*/
			$(".emotion").on(evHandle,function(){
				if( rl_exp.isExist[0] == 0 ){
					rl_exp.loadImg(0);
				}
				var w = $(this).position();
				$('#rl_bq').fadeIn(400,function(){
					swiper = new Swiper('.rl_selected',{
						slidesPerView: 1,
						spaceBetween: 0,
						preloadImages: false,
						lazyLoading: false,
					});
				});	
			});
			/*绑定关闭按钮*/
			$('#rl_bq a.close').on(evHandle,function(){
				$('#rl_bq').fadeOut(rl_exp.pace);
			});
			/*绑定document点击事件，对target不在rl_bq弹出框上时执行rl_bq淡出，并阻止target在弹出按钮的响应。*/
			$(document).on(evHandle,function(e){
				var target = $(e.target);
				if( target.closest("#rl_exp_btn").length == 1 )
					return;
				if( target.closest("#rl_bq").length == 0 && target.closest(".function_area").length==0){
					$('#rl_bq').fadeOut(rl_exp.pace);
				}
			});
		}
	};
	rl_exp.init();	//调用初始化函数。
});