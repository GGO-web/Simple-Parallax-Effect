'use strict';

// First versions
/*
const parallaxBox = document.querySelector('.parallax-box'),
   parallaxBoxItems = document.querySelectorAll('.parallax-box__item');

const parallaxBoxItemCount = parallaxBoxItems.length;
const parallaxBoxItemPositions = [];

function getDistance(x1, y1, x2, y2) {
   const distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
   return distance;
}

// get position of parallax elements
parallaxBoxItems.forEach((parallaxBoxItem) => {
   const rect = parallaxBoxItem.getBoundingClientRect();
   const halfWidth = parallaxBoxItem.width / 2;
   const halfHeight = parallaxBoxItem.height / 2;
   parallaxBoxItemPositions.push(
      {
         parallaxBoxItem,
         position: {
            x: rect.left + halfWidth,
            y: rect.top + halfHeight
         }
      }
   )
});

// area on which parallax works event
parallaxBox.addEventListener('mousemove', function(event) {
   const x1 = event.clientX;
   const y1 = event.clientY;
   for (let index = 0; index < parallaxBoxItemCount; ++index) {
      const x2 = parallaxBoxItemPositions[index].position.x;
      const y2 = parallaxBoxItemPositions[index].position.y;

      const dist = getDistance(x2, y2, x1, y1);

      const addNumber = Math.pow(dist, 1 / 2);
      const addDist = (dist + addNumber) / addNumber - 1;

      // change the sign of the variables: 'moveX' and 'moveY' to make them move to the mouse
      const moveX = (x1 - x2) / addDist;
      const moveY = (y1 - y2) / addDist;

      const parallaxElement = parallaxBoxItemPositions[index].parallaxBoxItem;
      parallaxElement.style.transform = `translate(${moveX}%, ${moveY}%)`;
   }
});
*/

// Second versions
const parallaxBox = document.querySelector('.parallax-box');

// get distance between mouse and parallax item
const getDistance = (x1, y1, x2, y2) => {
   const distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
   return distance;
}
// get position of parallax item
const getPosition = (parallaxBoxItem) => {
   const rect = parallaxBoxItem.getBoundingClientRect();

   const halfWidth = parallaxBoxItem.width / 2;
   const halfHeight = parallaxBoxItem.height / 2;

   // get the position of the center of the parallaxItem  
   const position = {
      x: rect.left + halfWidth,
      y: rect.top + halfHeight
   };

   return position;
};
// get direction of parallax item
const getDirection = (direction) => {
   let directionSign;
   if (direction == 'to mouse')
      directionSign = 1;
   else if (direction == 'out mouse')
      directionSign = -1;

   return directionSign;
};
// main parallax function
const parallax = (parallaxBoxItemSelector, direction, sensitivity) => {
   const parallaxBoxItem = document.querySelector(parallaxBoxItemSelector);
   const directionSign = getDirection(direction);

   // area on which parallax works event
   parallaxBox.addEventListener('mousemove', function (event) {
      // get positon of mouse
      const x1 = event.clientX;
      const y1 = event.clientY;

      // get position of parallax item
      const position = getPosition(parallaxBoxItem);
      const x2 = position.x;
      const y2 = position.y;

      // get distance between mouse and parallax item
      const dist = getDistance(x2, y2, x1, y1);

      const addNumber = Math.max(Math.pow(dist, 1 / 2), Math.pow(dist, 1 / 2) * sensitivity / 4);
      const addDist = (dist + addNumber) / addNumber - 1;

      // count the movement of the parallax item along the (X and Y) axis
      const moveX = directionSign * (x1 - x2) / addDist;
      const moveY = directionSign * (y1 - y2) / addDist;

      parallaxBoxItem.style.transform = `translate(${moveX}%, ${moveY}%)`;
   });
};

// parallax call
parallax('.orange', 'out mouse', 5);
parallax('.apple', 'to mouse', 7);
parallax('.pineapple', 'to mouse', 4);
parallax('.lemon', 'out mouse', 8);
parallax('.mango', 'out mouse', 6);