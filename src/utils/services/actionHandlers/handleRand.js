export const handleRandButton = (currentExpr) => {
    const randomNum = Math.random();
    return currentExpr + randomNum.toString();
}