/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function (arr, k) {
    let missingNumberArray = [];
    for (let i = 1; missingNumberArray.length < k; i++) {
        if (!arr.includes(i)) {
            missingNumberArray.push(i);
        }
    }
    return missingNumberArray[k - 1];

};
console.log(findKthPositive([2, 3, 4, 7, 11], 5));


