import {mergeSort} from './mergeSort.js';
import {removeDup} from './removeDup.js';

let arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 300];
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
let arr3 = [1, 2, 3, 4, 5, 6, 7, 8];

// prints binary search tree in the console
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

let testTree = new Tree(arr2);
testTree.buildTree();
prettyPrint(testTree.returnNode());
// let nodetest = testTree.find(5);
// console.log(nodetest);
// testTree.insert(15);
// testTree.delete(1);
// testTree.log();
// testTree.levelOrder(print);
// testTree.inOrder(print);
// testTree.preOrder(print);
// testTree.postOrder(print);
console.log(testTree.height(testTree.returnNode()));

function Node(value, left, right) {
    this.value = value,
    this.left = left;
    this.right = right;
}

function Tree(arr) {
    let arrSort = mergeSort(arr); // sorts given arr
    arrSort = removeDup(arrSort); // removes duplicats from given arr

    let tree = {
        root:{
        }
    };

    this.returnNode = () => {
        return tree.root;
    }
    // takes arr and turns it into a blanced binary tree
    // returns level-0 root node
    this.buildTree = () => {
        recurBuildTree(arrSort);
        console.log(tree);
        return tree.root;
    }

    function recurBuildTree(arr, count = 0) {
        // console.log(`arr = ${arr}`);
        let midIndex = Math.round((arr.length - 1) / 2);
        // console.log(`midIndex is ${midIndex}`);
        let midNum = arr[midIndex];
        // console.log(`midNum is ${midNum}`);
        let leftArr = arr.slice(0, midIndex);
        // console.log(`leftArr = ${leftArr}`);
        let rightArr = arr.slice(midIndex + 1);
        // console.log(`rightArr = ${rightArr}`);
        if (leftArr.length == 1 && rightArr.length == 1) {
            // console.log('leftArr.length == 1 && rightArr.length ==1');
            return new Node(midNum, recurBuildTree(leftArr, 1), recurBuildTree(rightArr, 1));
        } else if (leftArr.length == 0 && rightArr.length == 0) {
            // console.log('leftArr.length == 0 && rightArr.length == 0');
            return new Node(midNum, null, null);
        } else if (rightArr.length == 0) {
            // console.log('rightArr.length == 0');
            return new Node(midNum, recurBuildTree(leftArr, 1), null);
        } else if (leftArr.length == 0) {
            // console.log('leftArr.length == 0');
            return new Node(midNum, null, recurBuildTree(rightArr, 1));
        } else if (count == 0) {
            // console.log(tree.root);
            // console.log('root == "{}"');
            tree.root = new Node(midNum, recurBuildTree(leftArr, 1), recurBuildTree(rightArr, 1));
        } else {
            // console.log('else');
            return new Node(midNum, recurBuildTree(leftArr, 1), recurBuildTree(rightArr, 1));
        }
    }

    // insert a new node into the tree, always becomes a leaf in the tree, doesn't change the initial layout of the tree
    this.insert = (value) => {
        insertNode(value, tree.root);
    }

    function insertNode (value, tree) {
        console.log(tree);
        if (value > tree.value) { // go right subtree
            if (tree.right == null) { // null means bottom of tree
                tree.right = new Node(value, null, null);
                // console.log('right');
                // console.log(tree);
            } else {
                let pointer = tree.right;
                // console.log('right');
                return insertNode(value, pointer);
            }
        } else { // value < pointer go left subtree
            if (tree.left == null) { // null means bottom of tree
                tree.left = new Node(value, null, null);
                // console.log('left');
                // console.log(tree);
            } else {
                let pointer = tree.left;
                // console.log('left');
                return insertNode(value, pointer);
            }
        }
    }

    // delete node with given value
    this.delete = (value) => {
        deleteNode(value, tree.root);
    }

    function deleteNode(value, tree) {
        if (value == tree.value) { // value is found at root
            let nodeBefore = tree.right;
            let nextBiggest = tree.right.left;
            let extraChild = false;
            while (nextBiggest.left != null) {
                nodeBefore = nextBiggest;
                nextBiggest = nextBiggest.left;
                console.log(nextBiggest);
                extraChild = true;
            }
            if (extraChild == true) {
                nodeBefore.left = null; // delete the leaf from left subtree of right subtree
            } else {
                nodeBefore.right = null;
            }
            tree.value = nextBiggest.value;
        } else if (value > tree.value) { // go right subtree
            if (value == tree.right.value) {
                if (tree.right.left == null && tree.right.right == null) {
                    tree.right = null; // case 1: node has no children
                } else if (tree.right.left != null && tree.right.right == null) {
                    let childNode = tree.right.left;
                    tree.right = childNode; // case 2: node has 1 child
                } else if (tree.right.left == null && tree.right.right != null) {
                    let childNode = tree.right.right; // case 2: node has 1 child
                    tree.right = childNode;
                } else { // case 3: node has 2 child
                    // go right subtree
                    // then go left subtree of right subtree until no children
                    let nodeBefore = tree.right;
                    let nextBiggest = tree.right.right;
                    let extraChild = false;
                    while (nextBiggest.left != null) {
                        nodeBefore = nextBiggest;
                        nextBiggest = nextBiggest.left;
                        console.log(nextBiggest);
                        extraChild = true;
                    }
                    if (extraChild == true) {
                        nodeBefore.left = null; // delete the leaf from left subtree of right subtree
                    } else {
                        nodeBefore.right = null;
                    }
                    tree.right.value = nextBiggest.value;
                }
            } else {
                return deleteNode(value, tree.right);
            }
        } else if (value < tree.value) { // go left subtree
            if (value == tree.left.value) {
                if (tree.left.left == null && tree.left.right == null) {
                    tree.left = null; // case 1: node has no children
                } else if (tree.left.left != null && tree.left.right == null) {
                    let childNode = tree.left.left;
                    tree.left = childNode; // case 2: node has 1 child
                } else if (tree.left.left == null && tree.left.right != null) {
                    let childNode = tree.left.right; // case 2: node has 1 child
                    tree.right = childNode;
                } else { // case 3: node has 2 children
                    // go right subtree
                    // then go left subtree of right subtree until no children
                    // find the one node that is just bigger than the removed node
                    let nodeBefore = tree.left;
                    let nextBiggest = tree.left.right;
                    let extraChild = false;
                    while (nextBiggest.left != null) {
                        nodeBefore = nextBiggest;
                        nextBiggest = nextBiggest.left;
                        console.log(nextBiggest);
                        extraChild = true;
                    }
                    if (extraChild == true) {
                        nodeBefore.left = null; // delete the leaf from left subtree of right subtree
                    } else {
                        nodeBefore.right = null;
                    }
                    tree.left.value = nextBiggest.value;
                }
            } else {
                return deleteNode(value, tree.left);
            }
        }
    }

    //finds node with given value
    this.find = (value) => {
        return findNode(value, tree.root);
    }

    function findNode(value, tree) {
        if (value == tree.value) {
            console.log(tree);
            // return new Node(tree.value, tree.left, tree.right);
            return tree;
        } else if (value > tree.value) {
            if (tree.right != null) {
                return findNode(value, tree.right);
            } else {
                return 'Node does not exist';
            }
        } else if (value < tree.value) {
            if (tree.left != null) {
                return findNode(value, tree.left);
            } else {
                return 'Node does not exist';
            }
        }
    }

    // traverses the tree in breadth-first level order and provide each node to provided function
    this.levelOrder = (func) => {
        func(traverseRecur([tree.root]));
    }

    // using recursion to print level order binary search tree
    function traverseRecur(queue) {
        if (queue.length == 0) {
            console.log('ran');
            return [];
        }
        if (queue[0].left != null) {
            queue.push(queue[0].left);
        }
        if (queue[0].right != null) {
            queue.push(queue[0].right);
        }
        let dequeue = queue.shift();
        return [dequeue.value].concat(traverseRecur(queue));
    }

    // using iteration to print level order binary search tree
    function traverseIt(tree) {
        let queue = [];
        let arr = [];
        if (tree.value == null) {
            return null;
        } else {
            queue.push(tree); // add the root node to queue
        }
        while (queue.length != 0) {
            if (queue[0].left != null) {
                queue.push(queue[0].left); // add left child of node to queue if it exists
            }
            if (queue[0].right != null) {
                queue.push(queue[0].right); // add right child of node to queue if it exists
            }
            let dequeue = queue.shift();
            arr.push(dequeue.value);
        }
        return arr;
    }

    // returns nodes In Order (smallest to biggest)
    // algorithm:
    // initilization) visit left most node of left subtree
    // 1) visit parent of left most node
    // 2) if parent of left most node has right child, visit right child
    // 3) visit parent of current node
    // 4) vist left most node of right subtree
    // 5) repeat
    // 6) repeat for both left subtree and right subtree
    this.inOrder = (func) => {
        func(recurInOrder(tree.root));
    }

    // using recursion to find in order traversal
    function recurInOrder(tree) {
        if (tree.left != null && tree.right != null) {
            return [].concat(recurInOrder(tree.left),[tree.value],recurInOrder(tree.right));
        } else if (tree.left != null && tree.right == null) {
            return [tree.left.value, tree.value];
        } else if (tree.left == null && tree.right != null) {
            return [tree.right.value, tree.value];
        } else {
            return tree.value;
        }
    }

    // 1) visit root
    // 2) traverse left sub tree
    // 2) traverse right sub tree
    this.preOrder = (func) => {
        func(recurPreOrder(tree.root));
    }

    function recurPreOrder(tree) {
        if (tree.left != null && tree.right != null) {
            return [tree.value].concat(recurPreOrder(tree.left), recurPreOrder(tree.right));
        } else if (tree.left != null) {
            return [tree.value, tree.left.value];
        } else if (tree.right != null) {
            return [tree.value, tree.right.value];
        } else {
            return tree.value;
        }
    }

    // recursively return post order traversal of binary tree
    this.postOrder = (func) => {
        func(recurPostOrder(tree.root));
    }

    function recurPostOrder(tree) {
        if (tree.left != null && tree.right != null) {
            return [].concat(recurPostOrder(tree.left), recurPostOrder(tree.right), tree.value);
        } else if (tree.left != null) {
            return [tree.left.value, tree.value];
        } else if (tree.right != null) {
            return [tree.right.value, tree.value];
        } else {
            return tree.value;
        }
    }

    this.height = (node) => {
        if (node.left != null && node.right != null) {
            if (this.height(node.left) > this.height(node.right)) {
                return 1 + this.height(node.left);
            } else {
                return 1 + this.height(node.right);
            }
        } else if (node.left != null) {
            return 1 + this.height(node.left);
        } else if (node.right != null) {
            return 1 + this.height(node.right);
        } else {
            return 0;
        }
    }

    this.log = () => {
        console.log('arrSort = ')
        console.log(arrSort);
        console.log('tree = ');
        console.log(tree);
    }
}

function print(node) {
    console.log(node);
}
