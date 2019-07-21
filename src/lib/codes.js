

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

export const rm_16bit = {
    "bx si": "000", "bx di": "001",
    "bp si": "010", "bp di": "011",
    "si": "100", "di": "101",
    "bp": "110", "bx": "111",
}

export const rm_32bit = {
    eax: "000", ecx: "001", edx: "010", ebx: "011",
    esp: "100", ebp: "101",
    esi: "110", edi: "111",
}


export const scale = {
    1: "00", 2: "01", 4: "10", 8: "11"
}

