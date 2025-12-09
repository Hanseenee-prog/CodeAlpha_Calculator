export const formatResult = (resultValue) => {
    // Define the boundaries for switching to scientific notation
    const EXPONENTIAL_THRESHOLD = 1e12; // Numbers larger than 1 trillion
    const DECIMAL_THRESHOLD = 1e-10; // Numbers smaller than 0.0000000001
    const DECIMAL_PLACES = 10; // Number of decimal places to round to

    // Skip formatting for the result '0' or non-numbers
    if (typeof resultValue !== 'number' || isNaN(resultValue) || resultValue === 0) {
        return String(resultValue);
    }

    const absValue = Math.abs(resultValue);

    // Check for Scientific Notation (Exponential)
    if (absValue >= EXPONENTIAL_THRESHOLD || (absValue < DECIMAL_THRESHOLD && absValue !== 0)) {
        // Use toExponential(N) to show N digits after the decimal point
        return resultValue.toExponential(DECIMAL_PLACES).toString();
    } 

    // Standard Rounding (Rounded Down)
    else {
        // To round down, we use Math.floor on the scaled number
        const scale = Math.pow(10, DECIMAL_PLACES);
        
        // This rounds the number down to the specified decimal places
        let roundedValue = Math.floor(resultValue * scale) / scale; 
        
        // Convert to string and ensure it has necessary zeros/no trailing dot
        let rounded = roundedValue.toFixed(DECIMAL_PLACES);
        
        // Remove trailing zeros and the decimal point if it's an integer
        return rounded.replace(/\.?0+$/, '');
    }
};