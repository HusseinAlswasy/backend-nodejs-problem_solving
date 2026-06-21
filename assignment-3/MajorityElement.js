var majorityElement = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        let count = nums.filter(num => num === nums[i]).length;

        if (count > nums.length / 2) {
            return nums[i];
        }
    }
};

console.log(majorityElement([3, 2, 3]));
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));