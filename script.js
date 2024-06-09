function processFile() {
    const fileInput = document.getElementById("fileInput");
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
    const file = fileInput.files[0];
    if (file) {
        const fileName = file.name;
        const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
        if (fileExtension.toLowerCase() === "java") {
            const reader = new FileReader();
            reader.onload = function (e) {
                const code = e.target.result;
                const result = tokenize(removeComments(code));
                result.tokens.forEach((token) => {
                    outputDiv.innerHTML += `Token: ${token[0]}\t\tLexeme: ${token[1]}\n`;
                });
                result.errorLines.forEach((lineNumber) => {
                    outputDiv.innerHTML += `<div class="error-line">Error in line ${lineNumber}</div>`;
                });
            };
            reader.readAsText(file);
        } else {
            alert("File Must Have .java Extension");
        }
    }
}
function removeComments(code) {
    code = code.replace(/\/\/.*?$/gm, "");
    code = code.replace(/\/\*[\s\S]*?\*\//g, "");
    return code;
}
function tokenize(code) {
    const reservedWords = [
        "import",
        "java",
        "util",
        "Scanner",
        "public",
        "class",
        "static",
        "void",
        "Strings",
        "args",
        "System",
        "in",
        "println",
        "out",
        "int",
        "nextInt",
        "float",
        "nextFloat",
        "boolean",
        "case",
        "break",
        "switch",
        "class",
        "const",
        "default",
        "do",
        "for",
        "while",
        "double",
        "if",
        "else",
        "extends",
        "choice",
        "scanner",
        "close",
    ];
    const assignmentOperator = ["="]
    const unaryOperators = ["++", "--", "!"];
    const arithmeticOperators = ["+", "-", "*", "/", "%"];
    const relationalOperators = ["<", "<=", ">", ">=", "==", "!="];
    const conditionalOperators = ["&&", "||"];
    const symbols = ["(", ")", "{",
        "}",
        "[",
        "]",
        ".",
        ",",
        ";",
        ":",
        "'",
        '"',
    ];
    const identifier = /^[a-zA-Z_$][a-zA-Z0-9_$@]*$/;
    const integer = /^-?\d+$/;
    const realNumber = /^-?\d+(\.\d+)?$/;
    const characterLiteral = /^\'[^\']\'$/;
    const stringLiteral = /^\"[^\"]*\"/;
    const tokens = [];
    const errorLines = [];
    const lines = code.split("\n");
    let lineNumber = 1;
    for (const line of lines) {
        const lexemes =
            line.match(
                /\".*?\"|\'.*?\'|[A-Za-z_$][A-Za-z0-9_$@]*|[-+]?\d*\.\d+|[-+]?\d+|>=|<=|==|!=|&&|\|\||[=!+\-*/%<>&|()\[\]{}.,;:@]|\/\*[\s\S]*?\*\/|\/\/.*?$/g
            ) || [];
        let hasError = false;
        for (const lexeme of lexemes) {
            if (lexeme === "\n") {
                lineNumber++;
            } else if (reservedWords.includes(lexeme)) {
                tokens.push(["Reserved Word", lexeme, lineNumber]);
            } else if (assignmentOperator.includes(lexeme)) {
                tokens.push(["Assignment Operator", lexeme, lineNumber]);
            } else if (unaryOperators.includes(lexeme)) {
                tokens.push(["Unary Operator", lexeme, lineNumber]);
            } else if (arithmeticOperators.includes(lexeme)) {
                tokens.push(["Arithmetic Operator", lexeme, lineNumber]);
            } else if (relationalOperators.includes(lexeme)) {
                tokens.push(["Relational Operator", lexeme, lineNumber]);
            } else if (conditionalOperators.includes(lexeme)) {
                tokens.push(["Conditional Operator", lexeme, lineNumber]);
            } else if (symbols.includes(lexeme)) {
                tokens.push(["Symbol", lexeme, lineNumber]);
            } else if (identifier.test(lexeme)) {
                tokens.push(["Identifier", lexeme, lineNumber]);
            } else if (integer.test(lexeme)) {
                tokens.push(["Integer", lexeme, lineNumber]);
            } else if (realNumber.test(lexeme)) {
                tokens.push(["Real Number", lexeme, lineNumber]);
            } else if (characterLiteral.test(lexeme)) {
                tokens.push(["Character Literal", lexeme, lineNumber]);
            } else if (stringLiteral.test(lexeme)) {
                tokens.push(["String Literal", lexeme, lineNumber]);
            } else {
                tokens.push(["Invalid Lexeme", lexeme, lineNumber]);
                hasError = true;
            }
        }
        if (hasError) {
            errorLines.push(lineNumber);
        }
    }
    return { tokens, errorLines };
}