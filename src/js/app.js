
// function isSumPossible(a, n) {

// 	var res = 0;
//   a.find((elem, index) => {
//     for (var i = index + 1; i < a.length; i++) {
//   		if (elem + a[i] === n) {
//   			res = 1;
//   			return true;
//   		}
//     }
//   });

//    return res;
// }

var arr = [3,8,15,33,10,23,7,9,12];
var z = 3;
var n = 46;
var flag = 1;


var marker = z-1,
		len = arr.length,
		res = 0;

var sliceElems = function() {
	var slicedElems = arr.slice(0, marker);
	return slicedElems;
};

var flattenReduce = function(slicedElems) {
	var slicedSum = slicedElems.reduce((a, b) => a + b);
	return slicedSum;
};

arr.find((elem, index) => {
  for (var i = marker; i < len; i++) {
		if (flattenReduce(sliceElems()) + arr[i] === n) {
			res = 1;
			return true;
		}
  }
  if(flag === 0) {
  	arr.push(arr.shift(0));
  	flag = 1;
  } else {
  	arr.splice(-1,0,arr.shift(0));
  	flag = 0;
  }
});

console.log("hello you");


// slice and reduce first z-1 elements to a sum
// add sum to each other element in array
// shift off first element and push to end
// repeat

// create a loop function to individually slice out z-2 elements
// concat elements into one array and reduce to sum
// throw sum into previous function and value indicating where function will begin
// when complete, check array length - z to slice index and increment accordingly
// repeat
