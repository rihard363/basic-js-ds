const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor(){
    this.origin = null;
    this.end = null;
    this.length = 0;
  }

  getUnderlyingList() {
    return this.origin
  }

  enqueue(value) {
    let newNode = new ListNode(value)
     if (!this.origin) {
        this.origin = newNode;
    }
    
    if (this.end) {
        this.end.next = newNode;
    }
     this.end = newNode;
     return this.origin
  }

  dequeue() {
    if (!this.origin) {
      return;
    }
    let currentNode = this.origin;
    if (this.origin === this.end) {
      this.end = null;
    }
    this.origin = this.origin.next;

    return currentNode.value
  }

}


module.exports = {
  Queue
};
