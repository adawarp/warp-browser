function AnalogPad(mountPoint) {

  this.callback = null;
  this.stick = document.createElement('span');
  this.pad = document.createElement('div');

  this.stick.textContent = '●';
  this.stick.classList.add('stick');
  this.pad.classList.add('pad');

  this.pad.appendChild(this.stick);
  mountPoint.appendChild(this.pad);

  this.stickWidth = this.stick.clientWidth;
  this.stickHeight = this.stick.clientHeight;

  this.pad.onmouseleave = (e)=>{
    this.release();
    this.update(e);
  };

  this.pad.onmousedown = (e)=>{
    this.hold();
    this.update(e);
  };

  this.pad.onmousemove = (e)=>{
    this.update(e);
  };

  this.pad.onmouseup = (e)=>{
    this.release();
    this.update(e);
  };
  this.release();
}

AnalogPad.prototype = {
  setPos:function(position) {
    this.stick.style.left = position.x - this.stickWidth/2 + 'px';
    this.stick.style.top = position.y - this.stickHeight/2 + 'px';
    if (this.callback) {
      this.callback(position);
    }
  },

  hold:function() {
    this.isStickControlled = true;
  },

  update:function(e) {
    if (this.isStickControlled) {
      let position = this.getCoordinateFromMouseEvent(e);
      this.setPos(position);
    }
  },

  release:function() {
    this.isStickControlled = false;
    this.setPos({x:90, y:90});
  },

  getCoordinateFromMouseEvent:function(e) {
    let target = e.target;
    if (target !== this.pad) {
      target = e.target.parentNode;
    }
    return {
      x: e.clientX - target.offsetLeft + window.scrollX,
      y: e.clientY - target.offsetTop + window.scrollY
    };
  },

  subscribe: function(cb) {
    if (typeof cb !== 'function') {
      throw new Error('Cannot subscribe! :', cb);
    }
    this.callback = cb;
  }
};
