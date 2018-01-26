const { Board, Leds } = require('johnny-five');
const board = new Board();

board.on('ready', function () {

  const ledPins = [2, 3, 4, 5, 6, 7, 8, 9];
  const leds = new Leds(ledPins);

  function oneAfterAnother() {
    let delay = 1;
    board.counter = 0;

    for(let i = 0; i < leds.length; i++) {
      board.wait(delay, function () {
        console.log(this.counter + ' on');
        leds[this.counter].on();
      });

      board.wait(delay + 200, function () {
        console.log(this.counter + ' off');
        leds[this.counter].off();
        this.counter = (this.counter + 1) % leds.length;
      });

      delay += 500;
    }
  }

  // leds.on()

  // execute after a time, like setTimeOut
  // board.wait(1000, leds.off.bind(leds));

  oneAfterAnother();
  // repeat every 4500 ms, like setInterval
  board.loop(4500, oneAfterAnother);

});
