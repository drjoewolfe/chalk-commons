var BSTNode = function(key, parent, left, right) {
    this.key = key;
    this.parent = parent;
    this.left = left;
    this.right = right;
}

var BST = function(key) {
    this.root = undefined;

    if(key != undefined) {
        this.insert(key);
    }
}

BST.prototype.search = function(key) {
    if(this.root != undefined) {
        return this.root.search(key);
    }

    return undefined;
}

BST.prototype.insert = function (key) {
    var node = new BSTNode(key);
    var parent = undefined;
    var runner = this.root;

    while (runner != undefined) {
        parent = runner;
        if (runner.key > key) {
            runner = runner.left;
        }
        else {
            runner = runner.right;
        }
    }
    
    node.parent = parent;
    if (parent == null) {
        this.root = node;
    }
    else if (parent.key > key) {
        parent.left = node;
    }
    else {
        parent.right = node;
    }
}

BST.prototype.remove = function(key) {
    var node = this.search(key);

    if (node == undefined) {
        return;
    }

    this.removeNode(node);
}

BST.prototype.removeNode = function(node) {
    if (node.left == undefined) {
        this.transplant(node, node.right);
    }
    else if (node.right == undefined) {
        this.transplant(node, node.left);
    }
    else {
        var min = node.right.minimum();
        if(min.parent != node) {
            this.transplant(min, min.right);
            min.right = node.right;
            min.right.parent = min;
        }

        this.transplant(node, min);
        min.left = node.left
        min.left.parent = min;
    }
}

BST.prototype.transplant = function(oldNode, newNode) {
    if(oldNode.parent == undefined) {
        this.root = newNode;
    }
    else if(oldNode == oldNode.parent.left) {
        oldNode.parent.left = newNode;
    }
    else {
        oldNode.parent.right = newNode;
    }

    if(newNode != undefined) {
        newNode.parent = oldNode.parent;
    }
}

BST.prototype.successor = function(key) {
    var node = this.search(key);
    if(node != undefined) {
        return node.successor();
    }
}

BST.prototype.predecessor = function(key) {
    var node = this.search(key);
    if(node != undefined) {
        return node.predecessor();
    }
}

BST.prototype.minimum = function() {
    if(this.root != undefined) {
        return this.root.minimum();
    }

    return undefined;
}

BST.prototype.maximum = function(key) {
    if(this.root != undefined) {
        return this.root.maximum();
    }

    return undefined;
}

BST.prototype.minHeight = function() {
     if(this.root != undefined) {
        return this.root.minHeight();
    }

    return undefined;
}

BST.prototype.maxHeight = function() {
     if(this.root != undefined) {
        return this.root.maxHeight();
    }

    return undefined;
}

BST.prototype.traversePreOrder = function(callback) {
    if(this.root != undefined) {
        this.root.traversePreOrder(callback);
    }
}

BST.prototype.traversePreOrderIterative = function(key) {
    throw new Error("Not Implemented");
}

BST.prototype.traverseInOrder = function(callback) {
    if(this.root != undefined) {
        this.root.traverseInOrder(callback);
    }
}

BST.prototype.traverseInOrderIterative = function(key) {
    throw new Error("Not Implemented");
}

BST.prototype.traversePostOrder = function(callback) {
    if(this.root != undefined) {
        this.root.traversePostOrder(callback);
    }
}

BST.prototype.traversePostOrderIterative = function(key) {
    throw new Error("Not Implemented");
}

BST.prototype.traverseLevelOrder = function(callback) {
    var queue = [];
    var node = this.root;
    while(node != undefined) {
        if(callback != undefined) {
            callback(node);
        }

        if(node.left != undefined) {
            queue.push(node.left);            
        }

        if(node.right != undefined) {
            queue.push(node.right);
        }

        node = queue.shift();
    }
}

BST.prototype.traverseLevelOrderBottomsUp = function(key) {
    throw new Error("Not Implemented");
}

BST.prototype.insertList = function () {
    var i = 0;
    while (i < arguments.length) {
        var key = arguments[i];
        this.insert(key);
        i++;
    }
}

BSTNode.prototype.search = function(key) {
    if (this.key == key) {
        return this;
    }
    else if ((this.key > key) && (this.left != undefined)) {
        return this.left.search(key);
    }
    else if ((this.key < key) && (this.right != undefined)) {
        return this.right.search(key);
    }

    return undefined;
}

BSTNode.prototype.successor = function() {
    if(this.right != undefined) {
        return this.right.minimum();
    }

    var node = this;
    var parent = this.parent;
    while(parent != undefined && node == node.parent.right) {
        node = parent;
        parent = parent.parent;
    }

    return parent;
}

BSTNode.prototype.predecessor = function() {
    if(this.left != undefined) {
        return this.left.maximum();
    }

    var node = this;
    var parent = this.parent;
    while(parent != undefined && node == node.parent.right) {
        node = parent;
        parent = parent.parent;
    }

    return parent;
}

BSTNode.prototype.minimum = function() {
    var node = this;
    while(node.left != undefined) {
        node = node.left;
    }

    return node;
}

BSTNode.prototype.maximum = function() {
    var node = this;
    while(node.right != undefined) {
        node = node.right;
    }

    return node;
}

BSTNode.prototype.minHeight = function() {
    var leftHeight = (this.left != undefined) ? this.left.minHeight() : 0;
    var rightHeight = (this.right != undefined) ? this.right.minHeight() : 0;

    return Math.min(leftHeight, rightHeight) + 1;
}

BSTNode.prototype.maxHeight = function() {
    var leftHeight = (this.left != undefined) ? this.left.maxHeight() : 0;
    var rightHeight = (this.right != undefined) ? this.right.maxHeight() : 0;

    return Math.max(leftHeight, rightHeight) + 1;
}

BSTNode.prototype.traversePreOrder = function(callback) {
    if(callback != undefined) {
        callback(this);
    }

    if (this.left != undefined) {
        this.left.traversePreOrder(callback);
    }

    if (this.right != undefined) {
        this.right.traversePreOrder(callback);
    }
}

BSTNode.prototype.traverseInOrder = function(callback) {
    if (this.left != undefined) {
        this.left.traverseInOrder(callback);
    }

    if(callback != undefined) {
        callback(this);
    }

    if (this.right != undefined) {
        this.right.traverseInOrder(callback);
    }
}

BSTNode.prototype.traversePostOrder = function(callback) {
    if (this.left != undefined) {
        this.left.traversePostOrder(callback);
    }

    if (this.right != undefined) {
        this.right.traversePostOrder(callback);
    }

    if(callback != undefined) {
        callback(this);
    }
}