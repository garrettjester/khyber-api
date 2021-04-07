String.prototype.pick = function(min, max) {
  var n, chars = '';
  if (typeof max === 'undefined') { n = min } 
  else {
    n = min + Math.floor(Math.random() * (max - min + 1));
  }
  for (var i = 0; i < n; i++) {
      chars += this.charAt(Math.floor(Math.random() * this.length));
  }
  return chars;
};


String.prototype.shuffle = function() {
  var array = this.split('');
  var tmp, current, top = array.length;
  if (top) while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
  }
  return array.join('');
};



function temporaryPassword() {
  var specials = '!&*';
  var lowercase = 'abcdefghijklmnopqrstuvwxyz';
  var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numbers = '0123456789';
  var all = lowercase + uppercase + numbers;
  var password = '';
  password += lowercase.pick(1);
  password += uppercase.pick(1);
  password += numbers.pick(1);
  password += all.pick(4, 6);
  return password.shuffle();
}

module.exports = {temporaryPassword};