export function checkIntersection(element1: Element, element2: Element) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  const rect1Top = rect1.y;
  const rect1Right = rect1.x + rect1.width;
  const rect1Bottom = rect1.y + rect1.height;
  const rect1Left = rect1.x;

  const rect2Top = rect2.y;
  const rect2Right = rect2.x + rect2.width;
  const rect2Bottom = rect2.y + rect2.height;
  const rect2Left = rect2.x;

  const topIntersect = rect1Top < rect2Bottom;
  const rightIntersect = rect1Right > rect2Left;
  const bottomIntersect = rect1Bottom > rect2Top;
  const leftIntersect = rect1Left < rect2Right;

  let intersectCount = 0;

  topIntersect && intersectCount++;
  rightIntersect && intersectCount++;
  bottomIntersect && intersectCount++;
  leftIntersect && intersectCount++;

  if (intersectCount === 4) {
    return true;
  } else {
    return false;
  }
}
