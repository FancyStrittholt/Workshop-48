// Question 1  Determine the validity of an input string s, which consists solely of the characters (, ), {, }, [, and ]. You need to check the following conditions:

const input = '([][]){}';

class Stack {
  constructor() {
    this.array = [];
  }
  push(item) {
    this.array.push(item);
  }
  pop() {
    if (!this.isEmpty()) {
      return this.array.pop();
    } else {
      return null;
    }
  }
  peek() {
    return this.array[this.array.length - 1];
  }
  isEmpty() {
    return this.array.length == 0;
  }
}

const valid = determineValidity(input);
console.log(input, valid);

function determineValidity(input) {
  const map = { ')': '(', '}': '{', ']': '[' };

  let stack = new Stack();

  for (let i = 0; i < input.length; i++) {
    const isOpen = input[i] === '(' || input[i] === '{' || input[i] === '[';
    const matches = stack.peek() === map[input[i]];

    if (isOpen) {
      stack.push(input[i]);
    } else if (matches) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length ? false : true;
}

// Question 2  There are n people in a line waiting to purchase tickets, with the 0th person at the front and the (n - 1)th person at the back.

// You are given a 0-indexed integer array of tickets of length n, where tickets[I] represents the number of tickets that the ith person wishes to purchase.

// Each person purchases a ticket in exactly one second. A person can only purchase one ticket at a time and must return to the end of the line (which happens instantly) to purchase additional tickets. If a person has no more tickets to buy, he or she will leave the line.

// Return the time spent for the individual at position k (0-indexed) to finish buying tickets.

class Queue {
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }
  enqueue(item) {
    this.items[this.backIndex] = item;
    this.backIndex++;
    return item + ' inserted';
  }
  dequeue() {
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex++;
    return item;
  }
  peek() {
    return this.items[this.frontIndex];
  }
  get printQueue() {
    return this.items;
  }
  get size() {
    return this.backIndex - this.frontIndex;
  }
}

const tickets = [2, 3, 2];
const position = 2;

let time = 1;

determineTime(tickets, position);

function determineTime(tickets, position) {
  const queue = new Queue();
  for (const ticket of tickets) {
    queue.enqueue(ticket);
  }

  const interval = setInterval(function () {
    console.log(queue.printQueue);
    if (queue.size > 0) {
      console.log(position);
      if (position === 0 && queue.peek() === 1) {
        clearInterval(interval);
        console.log('time', time);
      } else if (position === 0) {
        position = queue.size;
      }

      if (queue.peek() === 1) {
        queue.dequeue();
      } else {
        queue.enqueue(queue.peek() - 1);
        queue.dequeue();
      }

      position--;
      time++;
    } else {
      clearInterval(interval);
      console.log('time', time);
    }
  }, 1000);
}

// Question 3
// You are given an array heights representing the heights of students in a class. The students are standing in a line, and their heights are listed in the order they appear from left to right. The school wants to arrange the students in a non-decreasing order by their heights. However, when they rearrange the students, a few may end up in different positions from their original positions.

// You need to write a function heightChecker(heights) that determines the minimum number of students who are not standing in the correct positions after the rearrangement. Implement the function heightChecker and return the minimum number of students who are not positioned correctly.
// [1, 1, 1, 2, 3, 4]

const heights = [1, 1, 4, 2, 1, 3];

function heightChecker(heights) {
  let heightsOrdered = heights.slice().sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== heightsOrdered[i]) {
      count++;
    }
  }
  return count;
}
console.log(heightChecker(heights));

// Question 4
// You are given a deck of integer arrays. There is a deck of cards with each card having a unique integer, and the integer on the ith card is deck[i].

// You can arrange the deck in any order; all cards in one deck are initially face-down (unrevealed).

// Repeat the following steps until all cards are revealed.

// Step 1: Take out the top card from the deck and reveal it.

// Step 2: If there are still cards in the deck, you should place the next top card at the bottom of the deck.

// Step 3: If any cards remain unseen, return to step 1. Otherwise, proceed to the end.

// Step 4: Return a deck order that reveals the cards in increasing order.

const deckRevealedIncreasing = function(deck) {
    deck.sort((a, b) => b - a)
    const res = [deck[0]]
    for (let i = 1; i < deck.length; i++) {
      const t = res.pop()
      res.unshift(deck[i], t)
    }
    return res
  }
  
  ;[
    [17,13,11,2,3,5,7],
  ].forEach((deck) => {
    console.log(deckRevealedIncreasing(deck))
  })

  // To be competely honest we worked together on this as a group.  Spent almost the entire day.  Didn't always get the same solution and I did a lot of google searching and video watching.  No way I would have came up with the solutions I did on my own. Or if I would have came up with a solution at all.
