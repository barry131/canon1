var _self;
var hdsj={
	scrolls :{
		startX:0,
		startY:0, 
		scrX:0,
		scrY:0,
		ids:0,
		leng:null,
	},
	aetH:function(obj,obj1){
		$('.'+obj).height($(window).height());   

		$('.'+obj1).each(function(i,v){
			$('.'+obj1).eq(i).css('height',$(window).height());
		})
	},
	touchSatrtFunc:function(evt){
		//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
		var touch = evt.touches[0]; //获取第一个触点  
		var x = Number(touch.pageX); //页面触点X坐标  
		var y = Number(touch.pageY); //页面触点Y坐标  
		//记录触点初始位置  
		_self.scrolls.startX =x;  
		_self.scrolls.startY =y;   
	},
	touchMoveFunc:function(evt){
		evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
		//evt.stopPropagation();//阻止事件冒泡
		var touch = evt.touches[0]; //获取第一个触点  
		var x = Number(touch.pageX); //页面触点X坐标  
		var y = Number(touch.pageY); //页面触点Y坐标

		_self.scrolls.scrX=x - _self.scrolls.startX;
		_self.scrolls.scrY=y - _self.scrolls.startY;
		//判断滑动方向  
		if(_self.scrolls.scrY > 30 && _self.scrolls.ids == 0){
			_self.scrolls.scrY=0;
		}else if(_self.scrolls.scrY < 30 && _self.scrolls.leng-1==_self.scrolls.ids){
			_self.scrolls.scrY=0;
		}			
		$(this)[0].style.webkitTransition='none';
		$(this)[0].style.webkitTransform = 'translate3d(0, '+ (_self.scrolls.scrY + _self.scrolls.ids*(-$(this).height()/_self.scrolls.leng)) +'px, 0)'; 
	},
	touchEndFunc:function(){
		//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等  
		//evt.stopPropagation();//阻止事件冒泡
		if(_self.scrolls.scrY<-30){
			if(_self.scrolls.leng-1==_self.scrolls.ids){
				_self.scrolls.ids=_self.scrolls.leng-1;
			}else{
				_self.scrolls.ids++;
			}
		}else if(_self.scrolls.scrY>30){
			if(_self.scrolls.ids==0){
				_self.scrolls.ids=0
			}else{
				_self.scrolls.ids--;
			}
		}	
		$(this)[0].style.webkitTransform = 'translate3d(0, '+ (_self.scrolls.ids*(-$(this).height()/_self.scrolls.leng)) +'px, 0)'
		$(this)[0].style.webkitTransition = '-webkit-transform 0.4s ease-out'
		// _self.tarnform();
		if(_self.scrolls.scrY<-30 || _self.scrolls.scrY>30){
			_self.iswie(_self.scrolls.ids);
		}
		_self.scrolls.scrY=0;		
	}, 
	iswie:function(idx){
		var $article = $('.slide article');
		var $article = $('.slide article').eq(idx).find("[tag-name]");
		var leng = $article.length;
		//去掉动画
		for(var i=0; i<leng;i++){
			var _tag = $article.eq(i).attr('tag-name');
			$article.eq(i).removeClass("animated "+ _tag);
		}
		//添加动画
		setTimeout(function(){
			for(var i = 0; i < leng; i++){
				var _tag = $article.eq(i).attr('tag-name');
				var _delay = $article.eq(i).attr("tag-delay");

				if(_delay){
					delayAni($article.eq(i), Number(_delay), _tag);
				}else{
					$article.eq(i).addClass("animated "+ _tag);
				}
			}
		},500);
		//控制什么时候添加动画
		function delayAni(obj, time, tag){
			setTimeout(function(){
				obj.addClass("animated "+ tag);
			}, time)
		}
	 },
	 aClick:function(){
	 	$('.btns').click(function(){
	 		_self.scrolls.ids = 4;
	 		$('.slide')[0].style.webkitTransition='none';
	 		$('.slide')[0].style.webkitTransform = 'translate3d(0, '+ (_self.scrolls.ids*(-$('.slide').height()/_self.scrolls.leng)) +'px, 0)';
	 		_self.iswie(_self.scrolls.ids);
	 	})
	 },
	init:function(){
		_self = this;
		//设置article 高度
		_self.scrolls.leng = $('article').length;
		_self.aetH('slide_show','slide article');  
		//首页初始动画
		_self.iswie(0);
		//点击首页跳转到页面
		_self.aClick();
		//滑动事件
		$('.slide')[0].addEventListener('touchstart', _self.touchSatrtFunc, false);  
		$('.slide')[0].addEventListener('touchmove', _self.touchMoveFunc, false);  
		$('.slide')[0].addEventListener('touchend', _self.touchEndFunc, false);
	}
};
$(function(){
	hdsj.init();
});		