# Lexar Application

This is a **Lexar application** that allows users to drag and drop `.java` files for processing. The application automatically checks the syntax and performs all necessary steps related to lexar analysis, simplifying the workflow for developers working with Java files.

## Overview

The Lexar application provides a user-friendly interface where you can:

- Drag and drop any `.java` file for lexar analysis.
- Automatically check for syntax errors and potential issues in the code.
- Perform tokenization and analysis of Java source code, essential for lexar applications.

This tool is ideal for developers who need a quick and efficient way to analyze their Java files without manual configuration.

## Features

- **Drag-and-Drop Functionality**: Easily upload `.java` files by dragging them into the interface.
- **Automatic Syntax Checking**: The application parses Java files and checks for syntax correctness.
- **Lexar Analysis**: Performs all steps related to lexar analysis, including tokenization and lexical validation.
- **Error Reporting**: Displays detailed error reports if issues are found in the uploaded `.java` files.

## Installation and Usage

To run the Lexar application locally, follow these steps:

1. **Clone the repository**  
   Clone the repository to your local machine:
   ```bash
   git clone https://github.com/mdkvaofficial/lexar-application_using_vanilla_javascript.git
   ```

2. **Install dependencies**  
   Navigate to the project directory and install the required dependencies:
   ```bash
   npm install
   ```

3. **Run the development server**  
   After installing the dependencies, start the development server:
   ```bash
   npm run dev
   ```

4. **Use the application**  
   Open your browser and go to `http://localhost:5173` (or whichever port is specified) to use the Lexar application. You can now drag and drop `.java` files for analysis.

## How It Works

1. **Drag and Drop**: Users can drag a `.java` file onto the designated area in the application interface.
2. **Lexar Process**: The application begins analyzing the Java file for lexical structure and checks for any syntax errors.
3. **Tokenization**: The file is tokenized and processed according to the lexar rules, highlighting any issues found during the analysis.
4. **Error Display**: If errors are detected, they are displayed in a detailed, user-friendly format, allowing users to quickly identify and correct the issues.

## Technologies Used

- **HTML/CSS** - Used for the structure and styling of the interface.
- **JavaScript (ES6+)**
- **Sveltekit**


## Future Improvements

- Expand functionality to support additional programming languages.
- Integrate a more detailed error correction suggestion feature.
- Enhance the UI/UX with more visual feedback during file analysis.
- Add support for batch processing of multiple `.java` files at once.

## Contributing

Contributions are welcome! If you would like to improve the application or add new features, follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
