var c = document.getElementById('canv');
var $ = c.getContext('2d');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;

var tile = (function() {
  tile.prototype.rects = null;
  tile.prototype.divved = false;

  function tile(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  tile.prototype.div = function() {
    this.t = [];
    if (this.w > this.h) {
      this.t[0] = new tile(this.x, this.y, this.w / 2, this.h);
      this.t[1] = new tile(this.x + this.w / 2, this.y, this.w / 2, this.h);
    } else {
      this.t[0] = new tile(this.x, this.y, this.w, this.h / 2);
      this.t[1] = new tile(this.x, this.y + this.h / 2, this.w, this.h / 2);
    }
    return this.divved = true;
  };
  return tile;
})();



var draw = function() {
  
  var j, k, l, t, tiles, lay;
  t = new tile(0, 0, w, h);
  tiles = [t];
  for( k = 1; k <= 40; ++k) {
    j = Math.random() * tiles.length | 0;
    t = tiles[j];
    t.div();
    tiles.splice(j, 1, t.t[0], t.t[1]);
  }
  lay = [];
  for (l in tiles) {
    t = tiles[l];
    $.beginPath();
    $.rect(t.x, t.y, t.w, t.h);
    $.fillStyle = 'hsla(' + Math.floor(280 * Math.random()) + ', 40%, 50%, 1)';
    $.closePath();
    lay.push($.fill());
    
  }
  return lay;
};
window.addEventListener('resize',function(){
 c.width = window.innerWidth;
 c.height = window.innerHeight;
  draw();
}, false)

window.requestAnimationFrame(draw);
window.addEventListener('mousedown', draw, false);
window.addEventListener('touchstart', function(e){
  draw();
  e.preventDefault();
}, false);
