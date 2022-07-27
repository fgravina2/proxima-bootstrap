		var galleryPanel = ".gallery-resize";		
		var tabPanel = ".tab";		
		
		function tabElement(){
			if ($(tabPanel)){
				$(tabPanel).each(function(item){
					var _tab = $(this);
					if (!_tab.parents('div.sandbox').length) {
						var tabList = _tab.children(".tab-label");
						tabList.on('click', function(item){
							_tab.children(".tab-label,.tab-panel").removeClass('active');
							$(this).addClass('active');
							$(this).parent().children("#" + $(this).attr('tab')).addClass('active');
						});
						_tab.children(".tab-label")[0].click();
					}
				});
			}
		}
		
		// initialize the Tab System
		tabElement();
		
		function galleryResize(){
			if ($(galleryPanel)){
				$(galleryPanel).each(function(item){
					var divLine = 1;
					var maxLines = 999;
					var heightSize = 125;
					var _gallery = $(this);					
					var _galleryImg = _gallery.find(".gallery-item img");
					
					var panelWidth = _gallery.width();
					var galleryHeight = 0;
					
					if (_galleryImg){
						
						var attr = _gallery.attr('totalh');
						if (typeof attr !== typeof undefined && attr !== false) {							
							_galleryImg.each(function(item){
								$(this).height($(this).attr('origh'));
							});							
						} else {
							// first time running this looping
							_galleryImg.each(function(item){
								
								var attr = _gallery.attr('imgheight');
								if (typeof attr !== typeof undefined && attr !== false) {
									 heightSize = parseInt(attr);
								}
								
								$(this).height(heightSize);
								galleryHeight += $(this).height();
								$(this).attr('origh', $(this).height());
								$(this).attr('origw', $(this).width());
							});							
							_gallery.attr('totalh', galleryHeight);							
						}
						
						var widthTest = 0;
						$(".line-1").removeClass("line-1");
						_galleryImg.each(function(item){
							$(this).height($(this).attr('origh'));
						 });
						 
						 var attr = _gallery.attr('maxlines');
						 if (typeof attr !== typeof undefined && attr !== false) {
							 maxLines = parseInt(attr);
						 }
						 
						 var counter = 1;
						 
						_galleryImg.each(function(index, item){							
							widthTest += parseInt($(this).attr('origw'));
							var is_last_item = (index == (_galleryImg.length - 1));
							
							if (panelWidth < widthTest || is_last_item){
								var totalLineWidth = 0;
								_gallery.find(".line-" + divLine).each(function(item){
									totalLineWidth += $(this).width();
								});
								if (is_last_item){ var multiply = 1;							
									} else { var multiply = panelWidth / totalLineWidth; }
								
								var originHeight = _gallery.find(".line-" + divLine).attr('origh');
								var newheight = multiply * originHeight - (Math.floor(heightSize / 20) + 1);
								
								if (counter > maxLines) {
									_gallery.find(".line-" + divLine).parent().parent().hide();
									_gallery.find(".line-" + divLine).removeClass("line-" + divLine);
								} else {
									_gallery.find(".line-" + divLine).parent().parent().show();
									_gallery.find(".line-" + divLine).height(newheight).width('initial')
									.removeClass("line-" + divLine);
								}
								
								if (is_last_item){
									$(this).parent().parent().hide();
								}
								
								widthTest = $(this).width();
								counter++;
							}
							$(this).addClass("line-" + divLine);
						});
					}
				});
			}
		}
		
		// initialize the Gallery System, only once the entire site is loaded
		// It uses the temp variable "doit" for timeout.
		var doit;
		$(window).on("load", function(){			
			galleryResize();			
			$( window ).resize(function() {
				clearTimeout(doit);
				galleryResize();
				doit = setTimeout(galleryResize, 10);
			});
		});