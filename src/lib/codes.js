
export const register_8bit = [
    "al", "ah",
    "bl", "bh",
    "cl", "ch",
    "dl", "dh",
    "spl", "bpl", "sil", "dil",
    "r8b", "r9b", "r10b", "r11b", "r12b", "r13b", "r14b", "r15b"
]

export const register_16bit = [
    "ax", "bx", "cx", "dx",
    "cs", "ds", "ss", "es", "fs", "gs",
    "sp", "bp",
    "si", "si",
    "ip",
    "r8w", "r9w", "r10w", "r11w", "r12w", "r13w", "r14w", "r15w"
]

export const register_32bit = [
    "eax", "ebx", "ecx", "edx",
    "esp", "ebp",
    "esi", "edi",
    "eip",
    "r8d", "r9d", "r10d", "r11d", "r12d", "r13d", "r14d", "r15d",
]

export const register_64bit = [
    "rax", "rbx", "rcx", "rdx",
    "rsp", "rbp",
    "rsi", "rdi",
    "rip",
    "r8", "r9", "r10", "r11", "r12", "r13", "r14", "r15",
]

export const register_op_32bit = {
    al: "000", cl: "001", dl: "010", bl: "011",
    ah: "100", ch: "101", dh: "110", bh: "111",
    ax: "000", cx: "001", dx: "010", bx: "011",
    eax: "000", ecx: "001", edx: "010", ebx: "011",
    sp: "100", bp: "101",
    esp: "100", ebp: "101",
    si: "110", di: "111",
    esi: "110", edi: "111"
}

export const register_op_64bit = {
    rax: "000", eax: "000", ax: "000", al: "000",
    rcx: "001", ecx: "001", cx: "001", cl: "001",
    rdx: "010", edx: "010", dx: "010", dl: "010",
    rbx: "011", ebx: "011", bx: "011", bl: "011",
    rsp: "100", esp: "100", sp: "100", ah: "100",
    rbp: "101", ebp: "101", bp: "101", ch: "101",
    rsi: "110", esi: "110", si: "110", dh: "110",
    rdi: "111", edi: "111", di: "111", bh: "111",
    r8: "000", r8d: "000", r8w: "000", r8b: "000",
    r9: "001", r9d: "001", r9w: "001", r9b: "001",
    r10: "010", r10d: "010", r10w: "010", r10b: "010",
    r11: "011", r11d: "011", r11w: "011", r11b: "011",
    r12: "100", r12d: "100", r12w: "100", r12b: "100",
    r13: "101", r13d: "101", r13w: "101", r13b: "101",
    r14: "110", r14d: "110", r14w: "110", r14b: "110",
    r15: "111", r15d: "111", r15w: "111", r15b: "111",
}

export const rm_16bit = {
    "bx si": "000", "bx di": "001",
    "bp si": "010", "bp di": "011",
    "si": "100", "di": "101",
    "bp": "110", "bx": "111",
}

export const rm_32bit = {
    eax: "000", ecx: "001", edx: "010", ebx: "011",
    ebp: "101",
    esi: "110", edi: "111",
}

export const rm_32bit_base = {
    eax: "000", ecx: "001", edx: "010", ebx: "011",
    esp: "100", ebp: "101",
    esi: "110", edi: "111",
}

export const rm_32bit_64bit = {
    eax: "000", ecx: "001", edx: "010", ebx: "011",
    ebp: "101",
    esi: "110", edi: "111",
    r8d: "000", r9d: "001", r10d: "010", r11d: "011", r12d: "100", r13d: "101", r14d: "110", r15d: "111",
}

export const rm_32bit_64bit_base = {
    eax: "000", ecx: "001", edx: "010", ebx: "011",
    esp: "100", ebp: "101",
    esi: "110", edi: "111",
    r8d: "000", r9d: "001", r10d: "010", r11d: "011", r12d: "100", r13d: "101", r14d: "110", r15d: "111",
}

export const rm_64bit_64bit = {
    rax: "000", rcx: "001", rdx: "010", rbx: "011",
    rbp: "101",
    rsi: "110", rdi: "111",
    r8: "000", r9: "001", r10: "010", r11: "011", r12: "100", r13: "101", r14: "110", r15: "111",
}

export const rm_64bit_64bit_base = {
    rax: "000", rcx: "001", rdx: "010", rbx: "011",
    rsp: "000", rbp: "101",
    rsi: "110", rdi: "111",
    r8: "000", r9: "001", r10: "010", r11: "011", r12: "100", r13: "101", r14: "110", r15: "111",
}

export const rex_b = [
    "r8d", "r8",
    "r9d", "r9",
    "r10d", "r10",
    "r11d", "r11",
    "r12d", "r12",
    "r13d", "r13",
    "r14d", "r14",
    "r15d", "r15",
]

export const rex_r = {
    r8: "000", r8d: "000", r8w: "000", r8b: "000",
    r9: "001", r9d: "001", r9w: "001", r9b: "001",
    r10: "010", r10d: "010", r10w: "010", r10b: "010",
    r11: "011", r11d: "011", r11w: "011", r11b: "011",
    r12: "100", r12d: "100", r12w: "100", r12b: "100",
    r13: "101", r13d: "101", r13w: "101", r13b: "101",
    r14: "110", r14d: "110", r14w: "110", r14b: "110",
    r15: "111", r15d: "111", r15w: "111", r15b: "111",
}

export const scale = {
    1: "00", 2: "01", 4: "10", 8: "11"
}

export const bit_length = register => {
    if (register_8bit.includes(register))
        return "8bit";
    if (register_16bit.includes(register))
        return "16bit";
    if (register_32bit.includes(register))
        return "32bit";
    if (register_64bit.includes(register))
        return "64bit";
    throw Error(`invalid $register`);
}

