export const standardButtons = [
  // Row 1 - Memory functions 
  { label: 'MC', type: 'memory-clear', style: 'memory' }, 
  { label: 'MR', type: 'memory-recall', style: 'memory' }, 
  { label: 'M+', type: 'memory-add', style: 'memory' }, 
  { label: 'M-', type: 'memory-subtract', style: 'memory' }, 
  { label: 'MS', type: 'memory-store', style: 'memory' }, 

  // Row 2 - Clear and special functions 
  { label: 'C', type: 'clear', style: 'clear' }, 
  { label: 'DEL', type: 'DEL', style: 'clear' }, 
  { label: '←', type: 'move_left', style: 'function' }, 
  { label: '→', type: 'move_right', style: 'function' }, 
  { label: '±', type: 'negate', style: 'function' }, 
  { label: '√', type: 'sqrt', style: 'function' }, 
  
  // Row 3 
  { label: '7', value: '7', type: 'number', style: 'number' }, 
  { label: '8', value: '8', type: 'number', style: 'number' }, 
  { label: '9', value: '9', type: 'number', style: 'number' }, 
  { label: '÷', value: '/', type: 'operator', style: 'operator' }, 
  { label: '%', type: 'percent', style: 'function' }, 
  
  // Row 4 
  { label: '4', value: '4', type: 'number', style: 'number' }, 
  { label: '5', value: '5', type: 'number', style: 'number' }, 
  { label: '6', value: '6', type: 'number', style: 'number' }, 
  { label: '×', value: '*', type: 'operator', style: 'operator' }, 
  { label: '1/x', type: 'reciprocal', style: 'function' }, 
  
  // Row 5 
  { label: '1', value: '1', type: 'number', style: 'number' }, 
  { label: '2', value: '2', type: 'number', style: 'number' }, 
  { label: '3', value: '3', type: 'number', style: 'number' }, 
  { label: '-', value: '-', type: 'operator', style: 'operator'}, 
  { label: '+', value: '+', type: 'operator', style: 'operator' },
  
  // Row 6 
  { label: '0', value: '0', type: 'number', style: 'number', span: 'col-span-2' }, 
  { label: '.', value: '.', type: 'decimal', style: 'number' }, 
  { label: 'Ans', type: 'answer', style: 'answer' }, 
  { label: '=', type: 'equals', style: 'equals' }, 
]; 

export const scientificButtons = [
  // Row 1 - Mode toggles and brackets 
  { label: '2nd', type: 'secondary', style: 'mode' }, 
  { label: 'deg', type: 'angle-mode', style: 'mode' }, 
  { label: 'rad', type: 'angle-mode', style: 'mode' }, 
  { label: '(', value: '(', type: 'bracket', style: 'function' }, 
  { label: ')', value: ')', type: 'bracket', style: 'function' }, 
  
  // Row 2 - Trigonometric functions 
  { label: 'sin', type: 'function', func: 'sin', style: 'scientific' }, 
  { label: 'cos', type: 'function', func: 'cos', style: 'scientific' }, 
  { label: 'tan', type: 'function', func: 'tan', style: 'scientific' }, 
  { label: 'ln', type: 'function', func: 'ln', style: 'scientific' }, 
  { label: 'log', type: 'function', func: 'log', style: 'scientific' }, 
    
  // Row 3 - Power functions 
  { label: 'x²', type: 'function', func: 'square', style: 'scientific' }, 
  { label: 'x³', type: 'function', func: 'cube', style: 'scientific' }, 
  { label: 'xʸ', value: '^', type: 'operator', style: 'scientific' }, 
  { label: 'eˣ', type: 'function', func: 'exp', style: 'scientific' }, 
  { label: '10ˣ', type: 'function', func: 'pow10', style: 'scientific' },

  // Row 4 - Roots and constants 
  { label: '√', type: 'function', func: 'sqrt', style: 'scientific' }, 
  { label: '∛', type: 'function', func: 'cbrt', style: 'scientific' }, 
  { label: 'ʸ√x', type: 'function', func: 'nthroot', style: 'scientific' }, 
  { label: '|x|', type: 'function', func: 'abs', style: 'scientific' }, 
  { label: 'π', value: Math.PI.toString(), type: 'constant', style: 'scientific' }, 
    
  // Row 5 - Memory functions 
  { label: 'MC', type: 'memory-clear', style: 'memory' }, 
  { label: 'MR', type: 'memory-recall', style: 'memory' }, 
  { label: 'M+', type: 'memory-add', style: 'memory' }, 
  { label: 'M-', type: 'memory-subtract', style: 'memory' }, 
  { label: 'MS', type: 'memory-store', style: 'memory' }, 
  
  // Row 6 
  { label: '7', value: '7', type: 'number', style: 'number' }, 
  { label: '8', value: '8', type: 'number', style: 'number' }, 
  { label: '9', value: '9', type: 'number', style: 'number' }, 
  { label: '÷', value: '/', type: 'operator', style: 'operator' }, 
  { label: '%', type: 'percent', style: 'function' }, 
  
  // Row 7 
  { label: '4', value: '4', type: 'number', style: 'number' }, 
  { label: '5', value: '5', type: 'number', style: 'number' }, 
  { label: '6', value: '6', type: 'number', style: 'number' }, 
  { label: '×', value: '*', type: 'operator', style: 'operator' }, 
  { label: 'n!', type: 'function', func: 'factorial', style: 'scientific' }, 
  
  // Row 8 
  { label: '1', value: '1', type: 'number', style: 'number' }, 
  { label: '2', value: '2', type: 'number', style: 'number' }, 
  { label: '3', value: '3', type: 'number', style: 'number' }, 
  { label: '-', value: '-', type: 'operator', style: 'operator' }, 
  { label: '=', type: 'equals', style: 'equals' }, 
  
  // Row 9
  { label: 'C', type: 'clear', style: 'clear' }, 
  { label: '0', value: '0', type: 'number', style: 'number' }, 
  { label: '.', value: '.', type: 'decimal', style: 'number' }, 
  { label: '+', value: '+', type: 'operator', style: 'operator' }, 
  { label: '=', type: 'equals', style: 'equals' },
];

export const programmerButtons = [
  // Row 1 - Number base selection 
  { label: 'HEX', type: 'base', value: 16, style: 'base' }, 
  { label: 'DEC', type: 'base', value: 10, style: 'base' }, 
  { label: 'OCT', type: 'base', value: 8, style: 'base' }, 
  { label: 'BIN', type: 'base', value: 2, style: 'base' }, 
  { label: 'QWORD', type: 'size', style: 'mode' }, 
  
  // Row 2 - Bitwise operators
  { label: 'AND', type: 'bitwise', value: '&', style: 'bitwise' }, 
  { label: 'OR', type: 'bitwise', value: '|', style: 'bitwise' }, 
  { label: 'XOR', type: 'bitwise', value: '^', style: 'bitwise' }, 
  { label: 'NOT', type: 'bitwise', value: '~', style: 'bitwise' }, 
  { label: '<<', type: 'shift', value: '<<', style: 'bitwise' }, 
  
  // Row 3 - More operators 
  { label: '>>', type: 'shift', value: '>>', style: 'bitwise' }, 
  { label: 'MOD', type: 'operator', value: '%', style: 'operator' }, 
  { label: '÷', value: '/', type: 'operator', style: 'operator' }, 
  { label: '×', value: '*', type: 'operator', style: 'operator' }, 
  { label: '-', value: '-', type: 'operator', style: 'operator' }, 
  
  // Row 4 - Hex letters A-C 
  { label: 'A', value: 'A', type: 'hex', style: 'hex' }, 
  { label: 'B', value: 'B', type: 'hex', style: 'hex' }, 
  { label: 'C', value: 'C', type: 'hex', style: 'hex' }, 
  { label: '(', value: '(', type: 'bracket', style: 'function' }, 
  { label: ')', value: ')', type: 'bracket', style: 'function' }, 
      
  // Row 5 - Hex letters D-F 
  { label: 'D', value: 'D', type: 'hex', style: 'hex' }, 
  { label: 'E', value: 'E', type: 'hex', style: 'hex' }, 
  { label: 'F', value: 'F', type: 'hex', style: 'hex' }, 
  { label: 'DEL', type: 'clear-entry', style: 'clear' }, 
  { label: 'C', type: 'clear', style: 'clear' }, 
          
  // Row 6 
  { label: '7', value: '7', type: 'number', style: 'number' }, 
  { label: '8', value: '8', type: 'number', style: 'number' }, 
  { label: '9', value: '9', type: 'number', style: 'number' }, 
  { label: '+', value: '+', type: 'operator', style: 'operator' }, 
  { label: '=', type: 'equals', style: 'equals' }, 
  
  // Row 7 
  { label: '4', value: '4', type: 'number', style: 'number' }, 
  { label: '5', value: '5', type: 'number', style: 'number' }, 
  { label: '6', value: '6', type: 'number', style: 'number' }, 
  { label: '←', type: 'backspace', style: 'function' }, 
  { label: 'MS', type: 'memory-store', style: 'memory' }, 

  // Row 8 
  { label: '1', value: '1', type: 'number', style: 'number' }, 
  { label: '2', value: '2', type: 'number', style: 'number' }, 
  { label: '3', value: '3', type: 'number', style: 'number' }, 
  { label: '±', type: 'negate', style: 'function' }, 
  { label: 'MR', type: 'memory-recall', style: 'memory' }, 
  
  // Row 9 
  { label: '0', value: '0', type: 'number', style: 'number', span: 'col-span-2' }, 
  { label: '.', value: '.', type: 'decimal', style: 'number' }, 
  { label: '%', type: 'percent', style: 'function' }, 
  { label: '=', type: 'equals', style: 'equals' },
];
