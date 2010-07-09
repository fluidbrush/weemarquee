(function($) {
    
    $.fn.weemarquee = function(settings) {
        var config = {        
            interval: 20
        };
        
        if (settings) $.extend(config, settings);
                                                
        
        this.each(function() {              
            var ticker = $(this);    
            var containerwidth = ticker.parent().outerWidth();                                
            
            var totalwidth = 0, leftvalue = 0, recursivemarquee;
            ticker.children().each(function() {       
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
