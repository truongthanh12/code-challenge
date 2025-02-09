// I'll provide three unique implementations of the `sum_to_n` function in JavaScript. Each implementation will use a different approach to calculate the sum of integers from 1 to n.

// Implementation A: Using a for loop
var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
// `// Implementation B: Using the mathematical formula (n * (n + 1)) / 2
var sum_to_n_b = function (n) {
  return (n * (n + 1)) / 2;
};

// Implementation C: Using recursion
var sum_to_n_c = function (n) {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};

// Test the functions
console.log(sum_to_n_a(5)); // Expected output: 15
console.log(sum_to_n_b(5)); // Expected output: 15
console.log(sum_to_n_c(5)); // Expected output: 15
