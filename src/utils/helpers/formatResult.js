export const formatResult = (resultValue) => {
    const EXPONENTIAL_THRESHOLD = 1e12;
    const DECIMAL_THRESHOLD = 1e-10;
    const DECIMAL_PLACES = 10;

    // Guard clauses
    if (typeof resultValue !== 'number' || isNaN(resultValue)) {
        return String(resultValue);
    }

    // Kill very small floating-point noise
    if (Math.abs(resultValue) < DECIMAL_THRESHOLD) {
        return '0';
    }

    const absValue = Math.abs(resultValue);

    // Scientific notation
    if (absValue >= EXPONENTIAL_THRESHOLD || absValue < DECIMAL_THRESHOLD) {
        return Number(resultValue.toExponential(DECIMAL_PLACES)).toString();
    }

    const rounded = Number(resultValue.toFixed(DECIMAL_PLACES));

    // Remove trailing zeros
    return rounded.toString();
};
