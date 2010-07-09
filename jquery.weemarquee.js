(function($) {
    
    $.fn.weemarquee = function(settings) {
        var config = {        
            interval: 20, 
            fade: true, 
            width: 400, 
            skin: 'wm-base'
        };
        
        if (settings) $.extend(config, settings);
                                                
        if(config.fade) {                       
          $(this).wrap("<div class='wm-fade " + config.skin + "'><div class='wm-mom'/></div>");  
          $(this).parent().prepend("<b/><i/>");
        } else {
          $(this).wrap("<div class='wm-mom "+ config.skin + "'/>");
        }
        
        $(this).removeClass("wm-mom").addClass("marquee").parent().css({width : config.width});
        
        this.each(function() {              
            var ticker = $(this);    
            var containerwidth = ticker.parent().outerWidth();                                
            var totalwidth = 0, leftvalue = 0, recursivemarquee;
            ticker.children().each(function() { 
                $(this).addClass("wm-el")                
                totalwidth += $(this).outerWidth(true);   
               
            });                                             
                                               
             
            if(totalwidth > containerwidth) {
              ticker.children().each(function() {
                  $(this).clone().appendTo(ticker);
              });   
              
              ticker.width(3*totalwidth);  
              
              recursivemarquee = function() {
                  leftvalue = parseInt(ticker.css('left'))? parseInt($(ticker).css('left')) : 0;
                  leftvalue = (leftvalue%totalwidth)-1;                                                                                     
                  ticker.css({ left: leftvalue});  

              };
                            
            } else {    

              ticker.css({left: containerwidth});
              recursivemarquee = function() {
                leftvalue = parseInt(ticker.css('left'));   
                ((leftvalue < 0) && (Math.abs(leftvalue) > totalwidth))? leftvalue = containerwidth: --leftvalue;
                ticker.css({ left: leftvalue});   
              };
            }
           
            var interval = setInterval( recursivemarquee, 30 );
        });      
        
        return this;
        
    };
    
})(jQuery);
