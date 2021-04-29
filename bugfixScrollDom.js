/**
 * 【Bugfix】iOS Safari で惰性スクロールがロックされてしまうのを回避する
 * https://www.simplesimplesdesign.com/web/markup/javascript/ios-safari-bugfix-smooth-scroll/
 *
 * 引数には、スクロール領域（position:fixed; overflow:auto; を指定している要素）を指定する
 * display:none; の状態で実行しても何も動作しないので注意
 *
 * @param {object} tgt* DOMで要素を特定指定 例) document.getElementsByClassName('js-ios-scroll')[0]
 */    
const bugfixScroll = (tgt) => {    
  
  let is_top = true,
      is_bottom = false,
      moving;
    
  /**
   * スクロール位置が上部、もしくは下部にあるとき1px移動する
   */
  const checkScroll = () => {
    let t = tgt.scrollTop,
        h = tgt.children[0].offsetHeight - tgt.offsetHeight;
    
    // MEMO: h の取得だが、本来は、margin上下とpadding上下とborder上下の値をケアする必要があるが、ここでは割愛
    // ただし、CSS側で、下記の2つのルールを採用すれば、このサンプルのように、JSでのケアの必要はない  
    // 1. tgt（.scroll）には、padding上下とborder上下を指定しない
    // 2. tgt.children[0]（.scroll-inner）には、margin上下を指定しない
    
    
    /**
     * 0.01秒最上部より上の位置にある場合、1px下に移動し、
     * 0.01秒最下部より下の位置にある場合、1px上に移動する
     */
    const setPos = (v) => {
      if (moving) clearTimeout(moving);
      moving = setTimeout(function(){
        tgt.scrollTop = v;
        if (v === 1) {
          is_top = false;
        } else {
          is_bottom = false;
        }
      }, 10);      
    }
    
    // 小数点は切り上げて、整数にする
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
  if (tgt.scrollTop === 0) {
    tgt.scrollTop = 1;      
  }  
  
  // tgt内をスクロールしている間、処理する
  tgt.addEventListener("scroll", checkScroll);
}