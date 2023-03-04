export function removeDup(arr) {
    let noDupArr = [];
    for (let i = 0; i <= arr.length - 1; i++) {
        if (arr[i] != noDupArr[noDupArr.length - 1]) {
            noDupArr.push(arr[i]);
        }
    }
    return noDupArr;
}
