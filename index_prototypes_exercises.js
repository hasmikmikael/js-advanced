// Exercise - Stopwatch using prototype
// it is very bad idea to use here Stopwatch with prototype
// because it brakes abstraction principal

function Stopwatch() {
    let startTime, endTime, running, duration = 0;
    
    Object.defineProperty(this, 'duration', {
        get: function() { return duration; },
        set: function(value) { duration = value; }
    });

    Object.defineProperty(this, 'startTime', {
        get: function() { return startTime; }
    });

    Object.defineProperty(this, 'endTime', {
        get: function() { return endTime; }
    });

    Object.defineProperty(this, 'running', {
        get: function() { return running; }
    });
}

Stopwatch.prototype.start = function() {
    if (this.running)
      throw new Error('Stopwatch has already started.');

    this.running = true;

    this.startTime = new Date();
  };

  Stopwatch.prototype.stop = function() {
      if (!this.running)
        throw new Error('Stopwatch is not started.');

      this.running = false;

      this.endTime = new Date();

      const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
      this.duration += seconds;
  };

  Stopwatch.prototype.reset = function() {
    this.startTime = null;
    this.endTime = null;
    this.running = false;
    this.duration = 0;
  };


const sw = new Stopwatch();
// sw.start()
// sw.stop()
// sw.duration
// sw.reset()

// we can change duration here which is very bad practice
sw.duration = 10;