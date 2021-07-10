export function sortByDistance(a,b) {
    if (a.distance < b.distance)
       return -1;
    if (a.distance > b.distance)
      return 1;
    return 0;
  }