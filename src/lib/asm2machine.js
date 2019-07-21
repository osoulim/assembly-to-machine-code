
import parser from './parser';
import { register_op_32bit, rm_16bit, rm_32bit, scale } from './codes';

/* 
mov al, bl
{"tag":"Instruction","type":"Memory","name":"mov","operands":[
    {"tag":"Reg","name":"al","size":8},
    {"tag":"Reg","name":"bl","size":8}]}

mov ecx, eax
{"tag":"Instruction","type":"Memory","name":"mov","operands":[
    {"tag":"Reg","name":"ecx","size":32},
    {"tag":"Reg","name":"eax","size":32}]}

mov edx, [123]
{"tag":"Instruction","type":"Memory","name":"mov","operands":[
    {"tag":"Reg","name":"edx","size":32},
    {"tag":"Cast","size":0,
        "value":{"tag":"Number",
            "value":123,"deref":true, "index":{"index":null,"constant":null}}}]}

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

mov eax, [123 + esi*4]
{"tag":"Instruction","type":"Memory","name":"mov","operands":[
    {"tag":"Reg","name":"eax","size":32},
    {"tag":"Cast","size":0,
        "value":{"tag":"Number","value":123,"deref":true,
            "index":{
                "index":{
                    "register":{"tag":"Reg","name":"esi","size":32},
                    "multiplier":4},"constant":null}}}]}

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
    let operand1 = parsed_instruction.operands[0],
        operand2 = parsed_instruction.operands[1];
    if (operand1.tag === "Cast" && operand2.tag === "Cast" && operand2.value.tag === "Mem")
        throw Error("too many memory references!");
    else if (operand1.tag === "Cast" && operand2.tag === "Cast") {

    }

    result.D = operand2.tag === "Cast" ? "1" : "0";
    result.W = operand1.size === 32 || operand2.size === 32 ? "1" : "0";

    let rm_field = result.D === "0" ? operand1 : operand2,
        reg = result.D === "0" ? operand2 : operand1;

    if (rm_field.tag === "Reg") {
        result.MOD = "11";
        result.Reg = register_op_32bit[reg.name];
        result.RM = register_op_32bit[rm_field.name];
        // TODO 
    }
    else if (rm_field.value.tag === "Number") {
        result.MOD = "00";
        result.RM = rm_field.value.index.index == null ? "101" : "100";
        // TODO 
    }
    else {
        let rm_reg = rm_field.value.baseRegister.name,
            disp = rm_field.value.constant;
        if (disp == null)
            result.MOD = "00";
        else
            result.MOD = disp < 256 ? "01" : "10";
        // TODO
    }

    console.log(result);
}

