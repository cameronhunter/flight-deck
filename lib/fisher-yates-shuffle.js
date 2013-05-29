define([], function() {

  return function() {
    this.shuffle = function(items) {
      var clone = items.slice(0);
      var i = clone.length;
      if (i === 0) { return []; }
      while (--i) {
         var j = Math.floor(random() * (i + 1));
         var tempi = clone[i];
         var tempj = clone[j];
         clone[i] = tempj;
         clone[j] = tempi;
      }
      return clone;
    };
  }

});