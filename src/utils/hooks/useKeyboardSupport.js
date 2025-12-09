import { useEffect } from "react"

let keyBuffer = '';

export const useKeyboardSupport = (handleAction, moveCursor) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            let actionType = null;
            let value = null;

            // Track 's' and 'q'
            if (e.key === 's' || e.key === 'q') {
                keyBuffer += e.key;
                keyBuffer = keyBuffer.slice(-2) // Always return last two characters

                // If 'sq' is pressed, input '√'
                if (keyBuffer === 'sq') {
                    e.preventDefault();
                    actionType = 'insert_text';
                    value = '√';
                    keyBuffer = ''; // Reset the keyBuffer
                }
            }

            // Check for backspace key to delete
            else if (e.key === 'Backspace') actionType = 'delete';
            
            // Check for enter key
            else if (e.key === 'Enter' || e.key === '=') actionType = 'calculate';

            // Check for arrow keys to move cursor
            else if (e.key === 'ArrowLeft') moveCursor('left');
            else if (e.key === 'ArrowRight') moveCursor('right');

            // Check for key 'escape' to clear
            else if (e.key === 'Escape') actionType = 'clear';

            // Check for key 'r' to reciprocal
            else if(e.key === 'r') actionType = 'reciprocal';

            // Check for key 'n' to negate
            else if(e.key === 'n') actionType = 'negate';

            // Check for number keys (0 - 9), operators, square root or decimal, etc
            else if (/[0-9.%√+\-*/\xa]/.test(e.key)) {
                actionType = 'insert_text';
                
                if (e.key === 'x') value = '*'; // If 'x' is pressed, input '*'
                else if (e.key === 'a') value = 'Ans'; // If 'a' is pressed, input 'Ans'
                else value = e.key;
            }
            else return;

            // Treat Tab and CapsLock as empty input
            if (e.key === 'Tab' || e.key === 'CapsLock') value = '';

            if (actionType) handleAction(actionType, value);
        }

        // Attach the listener
        document.addEventListener('keydown', handleKeyDown);
        
        // Cleanup function: remove the listener when the component unmounts to avoid waste of memory
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleAction, moveCursor])
}