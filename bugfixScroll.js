const bugfixScroll = (tgt) => {  
  let is_top = true,
      is_bottom = false,
      moving;
  
  if (tgt.scrollTop() === 0) {
    tgt.scrollTop(1);      
  }  
  
  const checkScroll = () => {
    let t = tgt.scrollTop(),
        h = $("> :first-child", tgt).outerHeight(true) - tgt.height();
    
    h = Math.ceil(h);
    
    if (t < 0) {
      is_top = true;
    } else if (is_top){
      
      if (moving) clearTimeout(moving);
      moving = setTimeout(function(){
        tgt.scrollTop(1);
        is_top = false;        
      }, 10);
    }
        
    if (t > h) {
      is_bottom = true;      
    } else if (is_bottom) {
      
      if (moving) clearTimeout(moving);
      moving = setTimeout(function(){
        tgt.scrollTop(t - 1);
        is_bottom = false;      
      }, 10);      
    }    
  }
  
  tgt.on("scroll", checkScroll);
}