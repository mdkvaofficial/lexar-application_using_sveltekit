<script>
  let isDarkMode;
  function ToggleMode() {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }

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
        ((fileName.lastIndexOf(".") - 1) >>> 0) + 2,
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
          errorLines = [...result.errorLines]; // Trigger reactivity by assigning a new array
        };

        reader.readAsText(file);
      } else {
        alert("File must have a .java extension");
      }
    } else {
      alert("No file selected. Please upload a .java file.");
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
      "String",
      "args",
      "System",
      "out",
      "println",
      "int",
      "float",
      "boolean",
      "switch",
      "case",
      "break",
      "default",
      "do",
      "for",
      "while",
      "if",
      "else",
    ];

    const assignmentOperators = ["="];
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

    const identifierPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
    const integerPattern = /^-?\d+$/;
    const realNumberPattern = /^-?\d+(\.\d+)?$/;
    const characterLiteralPattern = /^\'[^\']\'$/;
    const stringLiteralPattern = /^\"[^\"]*\"$/; // Match string enclosed in double quotes

    const tokens = [];
    const errorLines = [];

    const lines = code.split("\n");

    lines.forEach((line, index) => {
      const words = line.trim().split(/\s+/); // Split line into words

      words.forEach((word) => {
        if (reservedWords.includes(word)) {
          tokens.push(["Reserved Word", word]);
        } else if (assignmentOperators.includes(word)) {
          tokens.push(["Assignment Operator", word]);
        } else if (arithmeticOperators.includes(word)) {
          tokens.push(["Arithmetic Operator", word]);
        } else if (relationalOperators.includes(word)) {
          tokens.push(["Relational Operator", word]);
        } else if (conditionalOperators.includes(word)) {
          tokens.push(["Conditional Operator", word]);
        } else if (symbols.includes(word)) {
          tokens.push(["Symbol", word]);
        } else if (integerPattern.test(word)) {
          tokens.push(["Integer", word]);
        } else if (realNumberPattern.test(word)) {
          tokens.push(["Real Number", word]);
        } else if (stringLiteralPattern.test(word)) {
          tokens.push(["String Literal", word]);
        } else if (characterLiteralPattern.test(word)) {
          tokens.push(["Character Literal", word]);
        } else if (identifierPattern.test(word)) {
          tokens.push(["Identifier", word]);
        } else {
          errorLines.push(index + 1); // Capture the line number of the error
        }
      });
    });

    return { tokens, errorLines };
  }
</script>

<nav>
  <button on:click={ToggleMode}
    >{isDarkMode ? "Light-Mode" : "Dark-Mode"}</button
  >
</nav>
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
    <div class="error-line">
      {#if errorLines.length > 0}
        {#each errorLines as lineNumber}
          <div class="error-line">Error in line {lineNumber}</div>
        {/each}
      {/if}
    </div>
  </div>
</main>

<style>
  :global(body.dark-mode) {
    background-color: black;
    color: white;
  }
  :global(main.dark-mode) {
    align-items: center;
    font-family: Arial, sans-serif;
  }
  #container {
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
    height: 400px;
    margin-top: 10px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
    white-space: pre-wrap;
  }

  .error-line {
    color: red;
  }
</style>
