import $ from 'jquery';

console.log('We\'re good to go!');
$('body').prepend('<p>May the source be with you!</p>');

var name = 'Yogurt';

// admittedly this is a rather stupid example for ES6 syntax
$('#button').click(e => new Greeter(`Huh, clicked at ${name}'s button you have!`).greet(e));

class Greeter {

  constructor(message) {
    this.message = message;
  }

  greet(e) {
    if (e) e.preventDefault();
    console.log(this.message);
  }
};
