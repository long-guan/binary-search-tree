import {mergeSort} from './mergeSort.js';
import {removeDup} from './removeDup.js';

let arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 300];

let testTree = new Tree(arr1);
testTree.log();
testTree.buildTree();


function Node(value, left, right) {
    this.value = value,
    this.left = left;
    this.right = right;
}

function Tree(arr) {
    let arrSort = mergeSort(arr); // sorts given arr
    arrSort = removeDup(arrSort); // removes duplicats from given arr

    let tree = {};

    // takes arr and turns it into a blanced binary tree
    // returns level-0 root node
    this.buildTree = () => {
        recurBuildTree(arrSort);
    }

    function recurBuildTree(arr) {
        console.log(`arr = ${arr}`);
        let midIndex = Math.round((arr.length - 1) / 2);
        console.log(`midIndex is ${midIndex}`);
        let midNum = arr[midIndex];
        console.log(`midNum is ${midNum}`);
        let leftArr = arr.slice(0, midIndex);
        console.log(`leftArr = ${leftArr}`);
        let rightArr = arr.slice(midIndex + 1);
        console.log(`rightArr = ${rightArr}`);
        if (leftArr.length == 1 && rightArr.length == 1) {
            tree = new Node(midNum, leftArr[0], rightArr[0]);
        } else if (rightArr.length == 0) {
            tree = new Node(midNum, recurBuildTree(leftArr), null);
        } else if (leftArr.length == 0) {
            tree = new Node(midNum, null, recurBuildTree(rightArr));
        } else {
            tree = new Node(midNum, recurBuildTree(leftArr), recurBuildTree(rightArr));
        }
    }

    this.insert = (value) => {
        // insert node
    }

    this.delete = () => {

    }

    this.find = (value) => {
        // accepts value and returns node with given value
    }

    this.log = () => {
        console.log('arrSort = ')
        console.log(arrSort);
    }
}

// prints binary search tree in the console
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
