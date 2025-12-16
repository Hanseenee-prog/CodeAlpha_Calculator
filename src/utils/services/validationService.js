import { getCurrentNumberAfterCursor } from '../helpers/getCurrentNumberAfterCursor';

export const validateInput = (expression, cursorPosition, newText) => {
    const { currentNumber } = getCurrentNumberAfterCursor(expression, cursorPosition);

    const checks = {
        isNumber: /[0-9√]/.test(newText),
        isDecimal: newText === '.',
        isPercent: newText === '%',
        isFactorial: newText === '!',
        isOperator: /[+\-*/\x]/.test(newText),
        isFunc: /(tan|cos|sin|ln|log|√|∛|π|abs|(|)|ʸ√|Rand)/.test(newText),
        isBracket: /[()]/.test(newText),

        hasPercent: currentNumber.includes('%'),
        hasDecimal: currentNumber.includes('.'),
        hasErrorMsg: expression.includes('Error'),
        isEmpty: currentNumber === '' || currentNumber === '0',
        isZero: expression === '0',
    }

    const VALIDATION_RULES = {
        // Can't add percent twice
        blockNumberAfterPercent: checks.isNumber && checks.hasPercent,

        // Can't add decimal twice or after percent
        blockDecimal: checks.hasDecimal && (checks.hasPercent || checks.isDecimal),

        // Can't add start with % or add % to empty number
        blockPercentAtStart: checks.isPercent && checks.isEmpty,

        // Can't add start with % or add % to empty number
        blockDuplicatePercent: checks.isPercent && checks.hasPercent,

        // Can't add anything to error msg
        blockInputAfterErrorMsg: checks.hasErrorMsg && (checks.isNumber || checks.isDecimal || checks.isOperator || checks.isOperator)
    }

    // Check if any rule blocks the input
    const isBlocked = Object.values(VALIDATION_RULES).some(rule => rule);

    return { isBlocked, checks }
}