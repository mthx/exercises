function mergeSort(a) {
  if (a.length < 2) {
    return a;
  }
  var midpoint = Math.floor(a.length / 2);
  var left = mergeSort(a.slice(0, midpoint));
  var right = mergeSort(a.slice(midpoint, a.length));
  return mergeSortedLists(left, right);
}


function mergeSortedLists(left, right) {
  var result = [];
  var l = 0;
  var r = 0;
  while (l < left.length || r < right.length) {
    if (left[l] <= right[r]) {
      result.push(left[l++]);
    }
    else {
      result.push(right[r++]);
    }
    // Bail out if we've run out of left or right
    if (l == left.length) {
      Array.prototype.push.apply(result, right.slice(r));
      break;
    }
    if (r == right.length) {
      Array.prototype.push.apply(result, left.slice(l));
      break;
    }
  }
  return result;
}

module.exports = mergeSort;
