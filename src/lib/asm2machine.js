
import parser from './parser';
import { register_op_32bit, scale, instructions } from './codes';

export function dec2hex_reverse(disp) {
    let tmp = disp.toString(16);
    if (tmp.length <= 2) {
        return tmp.length == 2 ? tmp : "0" + tmp;
    }
    while (tmp.length <= 8)
        tmp = "0" + tmp;
    const zz = tmp.slice(0, 2),
        yy = tmp.slice(2, 4),
        xx = tmp.slice(4, 6),
        ww = tmp.slice(6, 8);
    return ww + xx + yy + zz;
}

export function res2string(result) {
    const { Prefix, OpCode, D, W, MOD, Reg, RM, Scale, Index, Base, Displacement } = result;
    let tmp = Prefix + OpCode + D + W + MOD + Reg + RM + Scale + Index + Base;
    let res = parseInt(tmp, 2).toString(16) + Displacement;
    if (res.length % 2)
        res = "0" + res;
    return (res.match(/.{1,2}/g).join(", "))
}

export function asm2machine(instruction) {
    let parsed_instruction = parser.parse(instruction);
    console.log(parsed_instruction);
    console.log(JSON.stringify(parsed_instruction));
    let result = {
        Prefix: "",
        OpCode: "", D: "", W: "",
        MOD: "", Reg: "", RM: "",
        Scale: "", Index: "", Base: "",
        Displacement: "",
        Data: ""
    }

    result.OpCode = instructions[parsed_instruction.name];

    let operand1 = parsed_instruction.operands[0],
        operand2 = parsed_instruction.operands[1];
    if (operand1.tag === "Cast" && operand2.tag === "Cast" && operand2.value.tag === "Mem")
        throw Error("too many memory references!");
    else if (operand1.tag === "Cast" && operand2.tag === "Cast") {
        //Todo
    }

    result.D = operand2.tag === "Cast" ? "1" : "0";
    result.W = operand1.size === 32 || operand2.size === 32 ? "1" : "0";

    let rm_field = result.D === "0" ? operand1 : operand2,
        reg = result.D === "0" ? operand2 : operand1;

    if (rm_field.tag === "Reg") {
        result.MOD = "11";
        result.Reg = register_op_32bit[reg.name];
        result.RM = register_op_32bit[rm_field.name];
    }
    else if (rm_field.value.tag === "Number") {
        result.MOD = rm_field.value.index.index == null ? "00" : "10";
        result.RM = rm_field.value.index.index == null ? "101" : "100";
        result.Reg = register_op_32bit[reg.name];
        if (rm_field.value.index.index != null) {
            result.Scale = scale[rm_field.value.index.index.multiplier];
            result.Index = register_op_32bit[rm_field.value.index.index.register.name];
            result.Base = "101";
        }
        result.Displacement = dec2hex_reverse(rm_field.value.value)
    }
    else {
        let rm_reg = rm_field.value.baseRegister,
            disp = rm_field.value.index.constant;
        if (disp == null)
            result.MOD = "00";
        else {
            result.MOD = disp.value < 256 ? "01" : "10";
            result.Displacement = dec2hex_reverse(disp.value);
        }

        if (rm_field.value.index.index != null) {
            result.RM = "100";
            result.Scale = scale[rm_field.value.index.index.multiplier];
            result.Index = register_op_32bit[rm_field.value.index.index.register.name];
            result.Base = register_op_32bit[rm_reg.name];

        }
        else {
            result.RM = register_op_32bit[rm_reg.name];
        }
        result.Reg = register_op_32bit[reg.name];
    }

    return result;
}

/*


mov edi, [ebx]
{"tag":"Instruction","type":"Memory","name":"mov","operands":[
    {"tag":"Reg","name":"edi","size":32},
    {"tag":"Cast","size":0,
        "value":{"tag":"Mem",
            "baseRegister":{"tag":"Reg","name":"ebx","size":32},"index":{"index":null,"constant":null}}}]}


mov eax, [esi + 123]
{"tag":"Instruction","type":"Memory","name":"mov","operands":[
    {"tag":"Reg","name":"eax","size":32},
    {"tag":"Cast","size":0,
        "value":{"tag":"Mem",
            "baseRegister":{"tag":"Reg","name":"esi","size":32},
            "index":{"index":null,"constant":{"tag":"Number","value":123,"size":4}}}}]}


mov eax, [ebx + esi*4]
{"tag":"Instruction","type":"Memory","name":"mov","operands":[
    {"tag":"Reg","name":"eax","size":32},
    {"tag":"Cast","size":0,
        "value":{"tag":"Mem",
            "baseRegister":{"tag":"Reg","name":"ebx","size":32},
            "index":{
                "index":{
                    "register":{"tag":"Reg","name":"esi","size":32},
                    "multiplier":4},"constant":null}}}]}

{"tag":"Instruction","type":"Memory","name":"mov","operands":[
    {"tag":"Cast","size":0,
        "value":{
            "tag":"Mem",
            "baseRegister":{"tag":"Reg","name":"eax","size":32},"index":{"index":null,"constant":null}}},
    {"tag":"Cast","size":0,
        "value":{
            "tag":"Number",
            "value":16,"size":4}}]}
*/
