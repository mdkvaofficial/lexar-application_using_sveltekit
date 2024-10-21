<script>
  let file = null;
  let output = "";
  let errorLines = [];

  // Handles file selection
  function handleFileChange(e) {
    file = e.target.files[0];
  }

  // Processes the uploaded file
  function processFile() {
    output = "";
    errorLines = [];

    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.slice(
        ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
      );

      if (fileExtension.toLowerCase() === "java") {
        const reader = new FileReader();

        reader.onload = function (e) {
          const code = e.target.result;
          const result = tokenize(removeComments(code));

          // Reset the output and errorLines reactively
          output = result.tokens
            .map((token) => `Token: ${token[0]} \t\t Lexeme: ${token[1]}`)
            .join("\n");
          errorLines = [...result.errorLines]; // Reassign to trigger reactivity
        };

        reader.readAsText(file);
      } else {
        alert("File must have a .java extension");
      }
    }
  }

  // Removes comments from the Java code
  function removeComments(code) {
    code = code.replace(/\/\/.*?$/gm, ""); // Remove single-line comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, ""); // Remove multi-line comments
    return code;
  }

  // Tokenizes the Java code
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

    // Regular expressions for different token types
    const assignmentOperator = ["="];
    const unaryOperators = ["++", "--", "!"];
    const arithmeticOperators = ["+", "-", "*", "/", "%"];
    const relationalOperators = ["<", "<=", ">", ">=", "==", "!="];
    const conditionalOperators = ["&&", "||"];
    const symbols = [
      "(",
      ")",
      "{",
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
    const stringLiteral = /^\"[^\"]*\"$/; // Match string enclosed in double quotes

    const tokens = [];
    const errorLines = [];

    const lines = code.split("\n");

    lines.forEach((line, index) => {
      const words = line.trim().split(/\s+/); // Split line into words

      words.forEach((word) => {
        if (reservedWords.includes(word)) {
          tokens.push(["Reserved Word", word]);
        } else if (integer.test(word)) {
          tokens.push(["Integer", word]);
        } else if (realNumber.test(word)) {
          tokens.push(["Real Number", word]);
        } else if (characterLiteral.test(word)) {
          tokens.push(["Character Literal", word]);
        } else if (stringLiteral.test(word)) {
          tokens.push(["String Literal", word]);
        } else if (identifier.test(word)) {
          tokens.push(["Identifier", word]);
        } else if (assignmentOperator.test(word)) {
          tokens.push(["Assignment Operator", word]);
        } else if (unaryOperators.test(word)) {
          tokens.push(["Unary Operator", word]);
        } else if (arithmeticOperators.test(word)) {
          tokens.push(["Arithmetic Operator", word]);
        } else if (relationalOperators.test(word)) {
          tokens.push(["Relational Operator", word]);
        } else if (symbols.test(word)) {
          tokens.push(["Symbol", word]);
        } else if (conditionalOperators.test(word)) {
          tokens.push(["Conditional Operator", word]);
        } else {
          // Handle unknown symbols or errors
          errorLines.push(index + 1); // Add 1 to make line numbers 1-based
        }
      });
    });

    return { tokens, errorLines };
  }
</script>

<main>
  <div id="container">
    <div class="upload-section">
      <input
        type="file"
        accept=".java"
        class="input-button"
        on:change={handleFileChange}
      />
      <p>(File must be a .java file)</p>

      <button class="scan-button" on:click={processFile}>Scan</button>
    </div>

    <div id="output">
      <pre>{output}</pre>
    </div>

    {#if errorLines.length > 0}
      <div id="errors">
        <p><strong>Errors:</strong></p>
        <ul>
          {#each errorLines as line}
            <li>Error in line {line}</li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    background-color: #f0f0f0;
    align-items: center;
    font-family: Arial, sans-serif;
  }

  #container {
    background-color: white;
    padding: 20px;
    text-align: center;
  }

  .scan-button {
    position: relative;
    left: 10px;
    border-color: black;
  }

  .scan-button:hover {
    background-color: red;
  }

  .input-button {
    position: relative;
    left: 90px;
    border-color: black;
  }

  p {
    text-align: center;
    margin-bottom: 40px;
  }

  #output {
    width: 100%;
    height: 200px;
    margin-top: 10px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
    white-space: pre-wrap;
  }

  #errors {
    color: red;
  }
</style>
