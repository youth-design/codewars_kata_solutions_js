const assemblerInterpreter = require('./index');

const tests = [
    [
        `
            ; My first program
            mov  a, 5
            inc  a
            call function
            msg  '(5+1)/2 = ', a    ; output message
            end
            
            function:
                div  a, 2
                ret
        `,
        '(5+1)/2 = 3',
    ],
    [
        `
            mov   a, 5
            mov   b, a
            mov   c, a
            call  proc_fact
            call  print
            end
            
            proc_fact:
                dec   b
                mul   c, b
                cmp   b, 1
                jne   proc_fact
                ret
            
            print:
                msg   a, '! = ', c ; output text
                ret
        `,
        '5! = 120',
    ],
    [
        `
            mov   a, 8            ; value
            mov   b, 0            ; next
            mov   c, 0            ; counter
            mov   d, 0            ; first
            mov   e, 1            ; second
            call  proc_fib
            call  print
            end
            
            proc_fib:
                cmp   c, 2
                jl    func_0
                mov   b, d
                add   b, e
                mov   d, e
                mov   e, b
                inc   c
                cmp   c, a
                jle   proc_fib
                ret
            
            func_0:
                mov   b, c
                inc   c
                jmp   proc_fib
            
            print:
                msg   'Term ', a, ' of Fibonacci series is: ', b        ; output text
                ret
        `,
        'Term 8 of Fibonacci series is: 21',
    ],
    [
        `
            mov   a, 11           ; value1
            mov   b, 3            ; value2
            call  mod_func
            msg   'mod(', a, ', ', b, ') = ', d        ; output
            end
            
            ; Mod function
            mod_func:
                mov   c, a        ; temp1
                div   c, b
                mul   c, b
                mov   d, a        ; temp2
                sub   d, c
                ret
        `,
        'mod(11, 3) = 2',
    ]
]


test("Assembler interpreter (part II)", () => {
    for(const [input, expected] of tests)
        expect(assemblerInterpreter(input)).toEqual(expected);
})