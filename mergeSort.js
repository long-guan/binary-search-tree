export function mergeSort(arr) {
    // merge
    if (arr.length == 1) {
        return arr;
    }

    // split array into 2
    if (arr.length >= 2) {
        let left = arr.slice(0, (arr.length / 2));
        let right = arr.slice(arr.length / 2, arr.length);
        // console.log(left);
        // console.log(right);
        let merge = mergeArray(mergeSort(left), mergeSort(right));
        // console.log(merge);
        return merge;
    }
}

// merge 2 sorted arrays
function mergeArray(arr1, arr2) {
    let arr3 = [];
    while(arr1.length > 0 || arr2.length > 0) {
        if (arr1.length > 0 && arr2.length > 0) {
            if (arr1[0] > arr2[0]) {
                arr3.push(arr2.shift());
            } else {
                arr3.push(arr1.shift())
            }
        } else {
            while(arr1.length > 0) {
                arr3.push(arr1.shift());
            }
            while (arr2.length > 0) {
                arr3.push(arr2.shift());
            }
        }
    }
    return arr3;
}

// module.exports = {
//     mergeSort
// }
