
function add_ptr_keyword(instruction) {
    if (instruction.includes("ptr"))
        return instruction.replace(/ptr/g, " ptr ");
    for (keyword in ["byte", "word", "dword", "qword"])
        return instruction.replace(keyword, keyword + " ptr ");
    return instruction;
}

export function normalizeInstruction(instruction) {
    normilized = instruction.toLowerCase();
    normilized = add_ptr_keyword(normilized);
    normilized = normilized.trim();
    return normalized;
}


export function exctractInstruction(instruction) {
    normalized = normalizeInstruction(instruction);

}