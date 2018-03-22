/*
* author: pace zhong
* date: 2015-06-15
* desc: accordion componet for you.jd.com
* dependencies: jQuery 1.6+
*/
var accordion = {
	init: function(options){
		var that=this;
		var W = $('.accordion-slider').width();
		var w = W * 0.7;
		var v = W * 0.2;
		var h = W * 0.3;
		var width = $('.accordion-slider').width($(window).width());
		var sliderHeight = $('.accordion-slider').height(h);
		
		$('.accordion-slider-item img:eq(0)').width(W * 1.06);
		$('.accordion-slider-item img:eq(1)').width(W * 0.89);
		$('.accordion-slider-item img:eq(2)').width(W * 0.98);
		$('.accordion-slider-item img:eq(3)').width(W * 0.87);		
		$('.accordion-slider-item img').height(W * 0.38);
		
		/*На малых экранах*/
		if (W <= 750 && W > 500) {
			var h = W * 0.5;
			var w = W * 0.8;
			$('.accordion-slider').height(h);
			$('.accordion-slider-item img').height(W * 0.58);
			$('.accordion-slider-item img:eq(0)').width(W * 1.56);
			$('.accordion-slider-item img:eq(1)').width(W * 1.0);
			$('.accordion-slider-item img:eq(2)').width(W * 1.28);
			$('.accordion-slider-item img:eq(3)').width(W * 1.05);	
		}
		else if (W <= 500) {
			var h = W * 0.6;
			var w = W * 0.9;
			$('.accordion-slider').height(h);
			$('.accordion-slider-item img').height(W * 0.65);
			$('.accordion-slider-item img:eq(0)').width(W * 1.76);
			$('.accordion-slider-item img:eq(1)').width(W * 1.20);
			$('.accordion-slider-item img:eq(2)').width(W * 1.68);
			$('.accordion-slider-item img:eq(3)').width(W * 1.30);	
						
		}

		options = $.extend(true,{
			expandWidth: w,
			itemWidth: v,
			itemHeight: h,
			extpand: 0,
			autoPlay: true,
			delay: 3000,
			animateTime: 800,
			borderWidth: 1,
			autoPlay: true,
			deviator: 30,
			bounce:"50px"
		},options);
		that.initDom(options);
		if(options.autoPlay){
			that.autoPlay(options);
		}
		that.event(options);
		
		/*Положение текста относительно активного слайда*/
		/*var mh = sliderHeight / 10;	
		$(.skew-block).css('margin-top',mh).css('margin-left',w*0.2);*/
	},
	event: function(options){
		var that=this,
				$items=$("#"+options.id).find(".accordion-slider-item");
		$items.on("mouseover",function(){
			if(options.autoPlay){
				that.clearAnimate();
			}
			that.active(options,$(this));
		});
		$items.on("mouseout",function(){
			if(options.autoPlay){
				that.autoPlay(options);
			}
		});
	},
	clearAnimate: function(){
		if(this.delay){
			clearTimeout(this.delay);
		}
	},
	autoPlay: function(options){
		var that=this;
		that.clearAnimate();
		that.delay=setTimeout(function(){
			$next=$("#"+options.id).find(".active").next();
			if($next.length==0) {
				$next=$("#"+options.id).find(".accordion-slider-item:eq(0)");
			}
			that.active(options,$next);
			that.autoPlay(options);
		},options.delay);
	},
	active: function(options,$current){
		if($current && $current.hasClass('active')) return;

		var $items=$("#"+options.id).find(".accordion-slider-item"),
				beforeIndex=$items.filter(".active").index(),
				currentIndex=$current.index(),
				itemWidth=options.itemWidth,
				expandWidth=options.expandWidth;

		$items.removeClass("active").removeClass("hide-mask");
		$items.each(function(i,elem){
			var $item=$(elem),
					$next=$current.next().length==0 ? $($items[1]) : $current.next(),
					pos_left=(i==0 ? 50 : i*itemWidth+itemWidth*0.19);
					pos_left=(i>1 ? i*itemWidth-itemWidth*0.38 : i*itemWidth);
					if(i==3){pos_left=i*itemWidth-itemWidth*0.57}
					/*if($('.accordion-slider').width() <= 500) {
						pos_left=(i==0 ? itemWidth : i*itemWidth+itemWidth*0.01);
						pos_left=(i>1 ? i*itemWidth-itemWidth*0.28 : i*itemWidth);
						if(i==3){pos_left=i*itemWidth-itemWidth*0.37}
					}*/
			
			if(i>currentIndex){
				pos_left+=expandWidth-itemWidth+options.borderWidth;
			}

			if(i==currentIndex+1){
				var deviator=options.deviator;
			}else {
				var deviator=0;
			}
			if(i==currentIndex){
				$item.addClass('active').stop(true).animate({
					"left": pos_left
				},options.animateTime,function(){
					$item.addClass("hide-mask")
				});
			}else{
				if(deviator==0){
					$item.stop(true).animate({
						"left": pos_left
					},options.animateTime);
				}else{
					if(beforeIndex>currentIndex){
						$item.stop(true).animate({
							"left": pos_left
						},options.animateTime);
					}else {
						$item.stop(true).animate({
							"left": parseInt($item.css("left"),10)-deviator
						},250,function(){
							$item.stop(true).animate({
								"left": pos_left
							},options.animateTime);
						});
					}
				}
			}
		});
	},
	isRestart:function($current,$active,$items){
		return $active.index()===$items.length-1 && $current.index()===0
	},
	initDom: function(options){
		var that=this,
				$items=$("#"+options.id).find(".accordion-slider-item");

		$items.each(function(i,elem){
			$item=$(elem);
			$item.css({"z-index":i+1,"width": options.expandWidth+"px"});
			$item.append('<div class="accordion-slider-mask"></div>');
		})
		that.active(options,$items.eq(options.extpand));
	}
}
