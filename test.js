const merge = function (nums1, m, nums2, n) {
  let len1 = m - 1,
    len2 = n - 1,
    len = m + n - 1;
  while (len2 >= 0) {
    const res = nums1[len1] >= nums2[len2];
    // nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--];
    if (nums1[len1] >= nums2[len2]) {
      nums1[len] = nums1[len1];
      len--;
      len1--;
    } else {
      nums1[len] = nums2[len2];
      len--;
      len2--;
    }
  }
};
let nums1 = [9, 2, 3, 0, 0, 0],
  m = 3,
  nums2 = [1,1,1],
  n = 3;

merge(nums1, m, nums2, n);
console.log(nums1);
