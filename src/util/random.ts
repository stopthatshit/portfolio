export function getRandomItem(arr: readonly any[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}
