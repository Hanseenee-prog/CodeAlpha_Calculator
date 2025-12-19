export const formatExpressionLive = (expr, settings) => {
    if (!settings?.separators) return expr.replace(/,/g, '');

    // Remove existing commas
    const cleanExpr = expr.replace(/,/g, '');

    // Regex to match sequences of digits (strings), ignore decimals for now
    return cleanExpr.replace(/\d+(\.\d*)?/g, (match) => {
        if (match.includes('.')) {
            const [integer, decimal] = match.split('.');
            return integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + decimal;
        }
        return match.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
};
