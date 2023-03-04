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
        let middle = findMidNum(arrSort);
        console.log(`middle is ${middle}`);
    }

    function findMidNum(arr) {
        let midIndex = Math.round((arr.length - 1) / 2);
        return arr[midIndex];
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
