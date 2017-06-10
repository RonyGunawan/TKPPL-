(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/**
 * Namespace
 */
var Game      = Game      || {};
var Keyboard  = Keyboard  || {}; 
var Component = Component || {};

/**
 * Keyboard Map
 */
Keyboard.Keymap = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

/**
 * Keyboard Events
 */
Keyboard.ControllerEvents = function() {
  
  // Setts
  var self      = this;
  this.pressKey = null;
  this.keymap   = Keyboard.Keymap;
  
  // Keydown Event
  document.onkeydown = function(event) {
    self.pressKey = event.which;
  };
  
  // Get Key
  this.getKey = function() {
    return this.keymap[this.pressKey];
  };
};

/**
 * Game Component Stage
 */
Component.Stage = function(canvas, conf) {  
  
  // Sets
  this.keyEvent  = new Keyboard.ControllerEvents();
  this.width     = canvas.width;
  this.height    = canvas.height;
  this.length    = [];
  this.food      = {};
  this.score     = 0;
  this.direction = 'right';
  this.conf      = {
    cw   : 10,
    size : 5,
    fps  : 1000
  };
  
  // Merge Conf
  if (typeof conf == 'object') {
    for (var key in conf) {
      if (conf.hasOwnProperty(key)) {
        this.conf[key] = conf[key];
      }
    }
  }
  
};

/**
 * Game Component Snake
 */
Component.Snake = function(canvas, conf) {
  
  // Game Stage
  this.stage = new Component.Stage(canvas, conf);
  
  // Init Snake
  this.initSnake = function() {
    
    // Itaration in Snake Conf Size
    for (var i = 0; i < this.stage.conf.size; i++) {
      
      // Add Snake Cells
      this.stage.length.push({x: i, y:0});
		}
	};
  
  // Call init Snake
  this.initSnake();
  
  // Init Food  
  this.initFood = function() {
		
    // Add food on stage
    this.stage.food = {
			x: Math.round(Math.random() * (this.stage.width - this.stage.conf.cw) / this.stage.conf.cw), 
			y: Math.round(Math.random() * (this.stage.height - this.stage.conf.cw) / this.stage.conf.cw), 
		};
	};
  
  // Init Food
  this.initFood();
  
  // Restart Stage
  this.restart = function() {
    this.stage.length            = [];
    this.stage.food              = {};
    this.stage.score             = 0;
    this.stage.direction         = 'right';
    this.stage.keyEvent.pressKey = null;
    this.initSnake();
    this.initFood();
  };
};

/**
 * Game Draw
 */
Game.Draw = function(context, snake) {
  
  // Draw Stage
  this.drawStage = function() {
    
    // Check Keypress And Set Stage direction
    var keyPress = snake.stage.keyEvent.getKey(); 
    if (typeof(keyPress) != 'undefined') {
      snake.stage.direction = keyPress;
    }
    
    // Draw White Stage
		context.fillStyle = "white";
		context.fillRect(0, 0, snake.stage.width, snake.stage.height);
		
    // Snake Position
    var nx = snake.stage.length[0].x;
		var ny = snake.stage.length[0].y;
		
    // Add position by stage direction
    switch (snake.stage.direction) {
      case 'right':
        nx++;
        break;
      case 'left':
        nx--;
        break;
      case 'up':
        ny--;
        break;
      case 'down':
        ny++;
        break;
    }
    
    // Check Collision
    if (this.collision(nx, ny) == true) {
      snake.restart();
      return;
    }
    
    // Logic of Snake food
    if (nx == snake.stage.food.x && ny == snake.stage.food.y) {
      var tail = {x: nx, y: ny};
      snake.stage.score++;
      snake.initFood();
    } else {
      var tail = snake.stage.length.pop();
      tail.x   = nx;
      tail.y   = ny;	
    }
    snake.stage.length.unshift(tail);
    
    // Draw Snake
    for (var i = 0; i < snake.stage.length.length; i++) {
      var cell = snake.stage.length[i];
      this.drawCell(cell.x, cell.y);
    }
    
    // Draw Food
    this.drawCell(snake.stage.food.x, snake.stage.food.y);
    
    // Draw Score
    context.fillText('Score: ' + snake.stage.score, 5, (snake.stage.height - 5));
  };
  
  // Draw Cell
  this.drawCell = function(x, y) {
    context.fillStyle = 'rgb(170, 170, 170)';
    context.beginPath();
    context.arc((x * snake.stage.conf.cw + 6), (y * snake.stage.conf.cw + 6), 4, 0, 2*Math.PI, false);    
    context.fill();
  };
  
  // Check Collision with walls
  this.collision = function(nx, ny) {  
    if (nx == -1 || nx == (snake.stage.width / snake.stage.conf.cw) || ny == -1 || ny == (snake.stage.height / snake.stage.conf.cw)) {
      return true;
    }
    return false;    
	}
};


/**
 * Game Snake
 */
Game.Snake = function(elementId, conf) {
  
  // Sets
  var canvas   = document.getElementById(elementId);
  var context  = canvas.getContext("2d");
  var snake    = new Component.Snake(canvas, conf);
  var gameDraw = new Game.Draw(context, snake);
  
  // Game Interval
  setInterval(function() {gameDraw.drawStage();}, snake.stage.conf.fps);
};


/**
 * Window Load
 */
window.onload = function() {
  var snake = new Game.Snake('stage', {fps: 100, size: 4});
};


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxwcmVzZW50YXNpXFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJEOi9wcmVzZW50YXNpL3NyYy9zY3JpcHRzL2Zha2VfZjRiYzQyNjIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG4vKipcclxuICogTmFtZXNwYWNlXHJcbiAqL1xyXG52YXIgR2FtZSAgICAgID0gR2FtZSAgICAgIHx8IHt9O1xyXG52YXIgS2V5Ym9hcmQgID0gS2V5Ym9hcmQgIHx8IHt9OyBcclxudmFyIENvbXBvbmVudCA9IENvbXBvbmVudCB8fCB7fTtcclxuXHJcbi8qKlxyXG4gKiBLZXlib2FyZCBNYXBcclxuICovXHJcbktleWJvYXJkLktleW1hcCA9IHtcclxuICAzNzogJ2xlZnQnLFxyXG4gIDM4OiAndXAnLFxyXG4gIDM5OiAncmlnaHQnLFxyXG4gIDQwOiAnZG93bidcclxufTtcclxuXHJcbi8qKlxyXG4gKiBLZXlib2FyZCBFdmVudHNcclxuICovXHJcbktleWJvYXJkLkNvbnRyb2xsZXJFdmVudHMgPSBmdW5jdGlvbigpIHtcclxuICBcclxuICAvLyBTZXR0c1xyXG4gIHZhciBzZWxmICAgICAgPSB0aGlzO1xyXG4gIHRoaXMucHJlc3NLZXkgPSBudWxsO1xyXG4gIHRoaXMua2V5bWFwICAgPSBLZXlib2FyZC5LZXltYXA7XHJcbiAgXHJcbiAgLy8gS2V5ZG93biBFdmVudFxyXG4gIGRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBzZWxmLnByZXNzS2V5ID0gZXZlbnQud2hpY2g7XHJcbiAgfTtcclxuICBcclxuICAvLyBHZXQgS2V5XHJcbiAgdGhpcy5nZXRLZXkgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmtleW1hcFt0aGlzLnByZXNzS2V5XTtcclxuICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdhbWUgQ29tcG9uZW50IFN0YWdlXHJcbiAqL1xyXG5Db21wb25lbnQuU3RhZ2UgPSBmdW5jdGlvbihjYW52YXMsIGNvbmYpIHsgIFxyXG4gIFxyXG4gIC8vIFNldHNcclxuICB0aGlzLmtleUV2ZW50ICA9IG5ldyBLZXlib2FyZC5Db250cm9sbGVyRXZlbnRzKCk7XHJcbiAgdGhpcy53aWR0aCAgICAgPSBjYW52YXMud2lkdGg7XHJcbiAgdGhpcy5oZWlnaHQgICAgPSBjYW52YXMuaGVpZ2h0O1xyXG4gIHRoaXMubGVuZ3RoICAgID0gW107XHJcbiAgdGhpcy5mb29kICAgICAgPSB7fTtcclxuICB0aGlzLnNjb3JlICAgICA9IDA7XHJcbiAgdGhpcy5kaXJlY3Rpb24gPSAncmlnaHQnO1xyXG4gIHRoaXMuY29uZiAgICAgID0ge1xyXG4gICAgY3cgICA6IDEwLFxyXG4gICAgc2l6ZSA6IDUsXHJcbiAgICBmcHMgIDogMTAwMFxyXG4gIH07XHJcbiAgXHJcbiAgLy8gTWVyZ2UgQ29uZlxyXG4gIGlmICh0eXBlb2YgY29uZiA9PSAnb2JqZWN0Jykge1xyXG4gICAgZm9yICh2YXIga2V5IGluIGNvbmYpIHtcclxuICAgICAgaWYgKGNvbmYuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIHRoaXMuY29uZltrZXldID0gY29uZltrZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdhbWUgQ29tcG9uZW50IFNuYWtlXHJcbiAqL1xyXG5Db21wb25lbnQuU25ha2UgPSBmdW5jdGlvbihjYW52YXMsIGNvbmYpIHtcclxuICBcclxuICAvLyBHYW1lIFN0YWdlXHJcbiAgdGhpcy5zdGFnZSA9IG5ldyBDb21wb25lbnQuU3RhZ2UoY2FudmFzLCBjb25mKTtcclxuICBcclxuICAvLyBJbml0IFNuYWtlXHJcbiAgdGhpcy5pbml0U25ha2UgPSBmdW5jdGlvbigpIHtcclxuICAgIFxyXG4gICAgLy8gSXRhcmF0aW9uIGluIFNuYWtlIENvbmYgU2l6ZVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YWdlLmNvbmYuc2l6ZTsgaSsrKSB7XHJcbiAgICAgIFxyXG4gICAgICAvLyBBZGQgU25ha2UgQ2VsbHNcclxuICAgICAgdGhpcy5zdGFnZS5sZW5ndGgucHVzaCh7eDogaSwgeTowfSk7XHJcblx0XHR9XHJcblx0fTtcclxuICBcclxuICAvLyBDYWxsIGluaXQgU25ha2VcclxuICB0aGlzLmluaXRTbmFrZSgpO1xyXG4gIFxyXG4gIC8vIEluaXQgRm9vZCAgXHJcbiAgdGhpcy5pbml0Rm9vZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHJcbiAgICAvLyBBZGQgZm9vZCBvbiBzdGFnZVxyXG4gICAgdGhpcy5zdGFnZS5mb29kID0ge1xyXG5cdFx0XHR4OiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAodGhpcy5zdGFnZS53aWR0aCAtIHRoaXMuc3RhZ2UuY29uZi5jdykgLyB0aGlzLnN0YWdlLmNvbmYuY3cpLCBcclxuXHRcdFx0eTogTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKHRoaXMuc3RhZ2UuaGVpZ2h0IC0gdGhpcy5zdGFnZS5jb25mLmN3KSAvIHRoaXMuc3RhZ2UuY29uZi5jdyksIFxyXG5cdFx0fTtcclxuXHR9O1xyXG4gIFxyXG4gIC8vIEluaXQgRm9vZFxyXG4gIHRoaXMuaW5pdEZvb2QoKTtcclxuICBcclxuICAvLyBSZXN0YXJ0IFN0YWdlXHJcbiAgdGhpcy5yZXN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnN0YWdlLmxlbmd0aCAgICAgICAgICAgID0gW107XHJcbiAgICB0aGlzLnN0YWdlLmZvb2QgICAgICAgICAgICAgID0ge307XHJcbiAgICB0aGlzLnN0YWdlLnNjb3JlICAgICAgICAgICAgID0gMDtcclxuICAgIHRoaXMuc3RhZ2UuZGlyZWN0aW9uICAgICAgICAgPSAncmlnaHQnO1xyXG4gICAgdGhpcy5zdGFnZS5rZXlFdmVudC5wcmVzc0tleSA9IG51bGw7XHJcbiAgICB0aGlzLmluaXRTbmFrZSgpO1xyXG4gICAgdGhpcy5pbml0Rm9vZCgpO1xyXG4gIH07XHJcbn07XHJcblxyXG4vKipcclxuICogR2FtZSBEcmF3XHJcbiAqL1xyXG5HYW1lLkRyYXcgPSBmdW5jdGlvbihjb250ZXh0LCBzbmFrZSkge1xyXG4gIFxyXG4gIC8vIERyYXcgU3RhZ2VcclxuICB0aGlzLmRyYXdTdGFnZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgXHJcbiAgICAvLyBDaGVjayBLZXlwcmVzcyBBbmQgU2V0IFN0YWdlIGRpcmVjdGlvblxyXG4gICAgdmFyIGtleVByZXNzID0gc25ha2Uuc3RhZ2Uua2V5RXZlbnQuZ2V0S2V5KCk7IFxyXG4gICAgaWYgKHR5cGVvZihrZXlQcmVzcykgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgc25ha2Uuc3RhZ2UuZGlyZWN0aW9uID0ga2V5UHJlc3M7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIERyYXcgV2hpdGUgU3RhZ2VcclxuXHRcdGNvbnRleHQuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG5cdFx0Y29udGV4dC5maWxsUmVjdCgwLCAwLCBzbmFrZS5zdGFnZS53aWR0aCwgc25ha2Uuc3RhZ2UuaGVpZ2h0KTtcclxuXHRcdFxyXG4gICAgLy8gU25ha2UgUG9zaXRpb25cclxuICAgIHZhciBueCA9IHNuYWtlLnN0YWdlLmxlbmd0aFswXS54O1xyXG5cdFx0dmFyIG55ID0gc25ha2Uuc3RhZ2UubGVuZ3RoWzBdLnk7XHJcblx0XHRcclxuICAgIC8vIEFkZCBwb3NpdGlvbiBieSBzdGFnZSBkaXJlY3Rpb25cclxuICAgIHN3aXRjaCAoc25ha2Uuc3RhZ2UuZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcclxuICAgICAgICBueCsrO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICBueC0tO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd1cCc6XHJcbiAgICAgICAgbnktLTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZG93bic6XHJcbiAgICAgICAgbnkrKztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gQ2hlY2sgQ29sbGlzaW9uXHJcbiAgICBpZiAodGhpcy5jb2xsaXNpb24obngsIG55KSA9PSB0cnVlKSB7XHJcbiAgICAgIHNuYWtlLnJlc3RhcnQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBMb2dpYyBvZiBTbmFrZSBmb29kXHJcbiAgICBpZiAobnggPT0gc25ha2Uuc3RhZ2UuZm9vZC54ICYmIG55ID09IHNuYWtlLnN0YWdlLmZvb2QueSkge1xyXG4gICAgICB2YXIgdGFpbCA9IHt4OiBueCwgeTogbnl9O1xyXG4gICAgICBzbmFrZS5zdGFnZS5zY29yZSsrO1xyXG4gICAgICBzbmFrZS5pbml0Rm9vZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIHRhaWwgPSBzbmFrZS5zdGFnZS5sZW5ndGgucG9wKCk7XHJcbiAgICAgIHRhaWwueCAgID0gbng7XHJcbiAgICAgIHRhaWwueSAgID0gbnk7XHRcclxuICAgIH1cclxuICAgIHNuYWtlLnN0YWdlLmxlbmd0aC51bnNoaWZ0KHRhaWwpO1xyXG4gICAgXHJcbiAgICAvLyBEcmF3IFNuYWtlXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNuYWtlLnN0YWdlLmxlbmd0aC5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgY2VsbCA9IHNuYWtlLnN0YWdlLmxlbmd0aFtpXTtcclxuICAgICAgdGhpcy5kcmF3Q2VsbChjZWxsLngsIGNlbGwueSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIERyYXcgRm9vZFxyXG4gICAgdGhpcy5kcmF3Q2VsbChzbmFrZS5zdGFnZS5mb29kLngsIHNuYWtlLnN0YWdlLmZvb2QueSk7XHJcbiAgICBcclxuICAgIC8vIERyYXcgU2NvcmVcclxuICAgIGNvbnRleHQuZmlsbFRleHQoJ1Njb3JlOiAnICsgc25ha2Uuc3RhZ2Uuc2NvcmUsIDUsIChzbmFrZS5zdGFnZS5oZWlnaHQgLSA1KSk7XHJcbiAgfTtcclxuICBcclxuICAvLyBEcmF3IENlbGxcclxuICB0aGlzLmRyYXdDZWxsID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAncmdiKDE3MCwgMTcwLCAxNzApJztcclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICBjb250ZXh0LmFyYygoeCAqIHNuYWtlLnN0YWdlLmNvbmYuY3cgKyA2KSwgKHkgKiBzbmFrZS5zdGFnZS5jb25mLmN3ICsgNiksIDQsIDAsIDIqTWF0aC5QSSwgZmFsc2UpOyAgICBcclxuICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gIH07XHJcbiAgXHJcbiAgLy8gQ2hlY2sgQ29sbGlzaW9uIHdpdGggd2FsbHNcclxuICB0aGlzLmNvbGxpc2lvbiA9IGZ1bmN0aW9uKG54LCBueSkgeyAgXHJcbiAgICBpZiAobnggPT0gLTEgfHwgbnggPT0gKHNuYWtlLnN0YWdlLndpZHRoIC8gc25ha2Uuc3RhZ2UuY29uZi5jdykgfHwgbnkgPT0gLTEgfHwgbnkgPT0gKHNuYWtlLnN0YWdlLmhlaWdodCAvIHNuYWtlLnN0YWdlLmNvbmYuY3cpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlOyAgICBcclxuXHR9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEdhbWUgU25ha2VcclxuICovXHJcbkdhbWUuU25ha2UgPSBmdW5jdGlvbihlbGVtZW50SWQsIGNvbmYpIHtcclxuICBcclxuICAvLyBTZXRzXHJcbiAgdmFyIGNhbnZhcyAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcclxuICB2YXIgY29udGV4dCAgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gIHZhciBzbmFrZSAgICA9IG5ldyBDb21wb25lbnQuU25ha2UoY2FudmFzLCBjb25mKTtcclxuICB2YXIgZ2FtZURyYXcgPSBuZXcgR2FtZS5EcmF3KGNvbnRleHQsIHNuYWtlKTtcclxuICBcclxuICAvLyBHYW1lIEludGVydmFsXHJcbiAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7Z2FtZURyYXcuZHJhd1N0YWdlKCk7fSwgc25ha2Uuc3RhZ2UuY29uZi5mcHMpO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBXaW5kb3cgTG9hZFxyXG4gKi9cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBzbmFrZSA9IG5ldyBHYW1lLlNuYWtlKCdzdGFnZScsIHtmcHM6IDEwMCwgc2l6ZTogNH0pO1xyXG59O1xyXG5cclxuIl19
