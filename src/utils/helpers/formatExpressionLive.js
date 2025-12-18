export const formatExpressionLive = (expr, settings) => {
    if (!settings?.separators) return expr.replace(/,/g, '');

    // Remove existing commas to re-calculate them
    const cleanExpr = expr.replace(/,/g, '');

    // Regex to find continuous sequences of digits (optionally including a decimal)
    // Matches numbers but avoids operators and function names
    return cleanExpr.replace(/\d+(\.\d*)?/g, (match) => {
        if (match.includes('.')) {
            const [integer, decimal] = match.split('.');
            // Only format the integer part
            return Number(integer).toLocaleString('en-US') + '.' + decimal;
        }
        return Number(match).toLocaleString('en-US');
    });
};