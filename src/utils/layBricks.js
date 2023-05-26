export default function layBricks(arr, colCount = 3) {
  const masonry = [];
  for (let i = 1; i <= colCount; i += 1) {
    masonry.push([]);
  }

  arr.forEach((n, i, a) => {
    if (i % colCount === 0) {
      masonry[0].push(n);

      for (let j = 1; j < colCount; j += 1) {
        if (a[i + j]) {
          masonry[j].push(a[i + j]);
        }
      }
    }
  });

  return masonry;
}

// const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// goal: get array to
// [0, 3, 6, 9, 12]
// [1, 4, 7, 10]
// [2, 5, 8, 11]

// const masonry = layBricks(array, 5);
// console.table(masonry);
