/**
 * 【Bugfix】iOS Safari で惰性スクロールがロックされてしまうのを回避する
 * https://www.simplesimplesdesign.com/web/markup/javascript/ios-safari-bugfix-smooth-scroll/
 *
 * 引数には、スクロール領域（position:fixed; overflow:auto; を指定している要素）を指定する
 * display:none; の状態で実行しても何も動作しないので注意
 *
 * @param {object} tgt* jQueryでの要素指定 例) $(".js-ios-scroll")
 */
const bugfixScroll = (tgt) => {  
  let is_top = true,
      is_bottom = false,
      moving;
  
  /**
   * スクロール位置が上部、もしくは下部にあるとき1px移動する
   */
  const checkScroll = () => {
    let t = tgt.scrollTop(),
        h = $("> :first-child", tgt).outerHeight(true) - tgt.height();

    /**
     * 0.01秒最上部より上の位置にある場合、1px下に移動し、
     * 0.01秒最下部より下の位置にある場合、1px上に移動する
     */
    const setPos = (v) => {
      if (moving) clearTimeout(moving);
      moving = setTimeout(function(){
        tgt.scrollTop(v);
        if (v === 1) {
          is_top = false;
        } else {
          is_bottom = false;
        }
      }, 10);      
    }
          
    h = Math.ceil(h);
    
    // スクロール位置が惰性で最上部より上の位置にあるか判別する
    if (t < 0) {
      is_top = true;
    } else if (is_top){
      setPos(1);
    }
        
    // スクロール位置が惰性で最下部より下の位置にあるか判別する
    if (t > h) {
      is_bottom = true;      
    } else if (is_bottom) {
      setPos(t - 1);
    }    
  }
  
  // ページ上部にあるときは、1px下に移動する
  if (tgt.scrollTop() == 0) {
    tgt.scrollTop(1);      
  }  
    
  // tgt内をスクロールしている間、処理する
  tgt.on("scroll", checkScroll);
}  