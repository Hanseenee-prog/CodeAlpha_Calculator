export const formatResult = (resultValue, settings = { precision: 10, separators: true }) => {
    const EXPONENTIAL_THRESHOLD = 1e12;
    const DECIMAL_THRESHOLD = 1e-10;

    // Guard clauses
    if (typeof resultValue !== 'number' || isNaN(resultValue)) {
        return String(resultValue);
    }

    // Handle very small floating-point noise
    if (Math.abs(resultValue) < DECIMAL_THRESHOLD && resultValue !== 0) {
        return resultValue.toExponential(settings.precision);
    }

    const absValue = Math.abs(resultValue);

    // Use Scientific notation for massive numbers
    if (absValue >= EXPONENTIAL_THRESHOLD) {
        return resultValue.toExponential(settings.precision);
    }

    // Intl.NumberFormat handles both precision and thousands separators (commas)
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: settings.precision,
        useGrouping: settings.separators, // Controls the thousands separator (e.g., 1,000)
    }).format(resultValue);
};