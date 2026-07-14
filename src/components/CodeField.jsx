import { useRef } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-swift';
import 'ace-builds/src-noconflict/mode-kotlin';
import 'ace-builds/src-noconflict/mode-dart';
import 'ace-builds/src-noconflict/mode-lua';
import 'ace-builds/src-noconflict/mode-r';
import 'ace-builds/src-noconflict/mode-scala';
import 'ace-builds/src-noconflict/mode-elixir';
import 'ace-builds/src-noconflict/mode-clojure';
import 'ace-builds/src-noconflict/mode-graphqlschema';
import 'ace-builds/src-noconflict/mode-dockerfile';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/snippets/typescript';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/snippets/python';
import 'ace-builds/src-noconflict/snippets/sh';
import 'ace-builds/src-noconflict/snippets/golang';
import 'ace-builds/src-noconflict/snippets/rust';
import 'ace-builds/src-noconflict/snippets/sql';
import 'ace-builds/src-noconflict/snippets/css';
import 'ace-builds/src-noconflict/snippets/html';
import 'ace-builds/src-noconflict/snippets/json';
import 'ace-builds/src-noconflict/snippets/markdown';
import 'ace-builds/src-noconflict/snippets/yaml';
import 'ace-builds/src-noconflict/snippets/java';
import 'ace-builds/src-noconflict/snippets/c_cpp';
import 'ace-builds/src-noconflict/snippets/csharp';
import 'ace-builds/src-noconflict/snippets/php';
import 'ace-builds/src-noconflict/snippets/ruby';
import 'ace-builds/src-noconflict/snippets/swift';
import 'ace-builds/src-noconflict/snippets/kotlin';
import 'ace-builds/src-noconflict/snippets/dart';
import 'ace-builds/src-noconflict/snippets/lua';
import 'ace-builds/src-noconflict/snippets/r';
import 'ace-builds/src-noconflict/snippets/scala';
import 'ace-builds/src-noconflict/snippets/elixir';
import 'ace-builds/src-noconflict/snippets/clojure';
import 'ace-builds/src-noconflict/snippets/graphqlschema';
import 'ace-builds/src-noconflict/snippets/dockerfile';

const LANG_TO_ACE_MODE = {
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  Python: 'python',
  Bash: 'sh',
  Shell: 'sh',
  Go: 'golang',
  Rust: 'rust',
  SQL: 'sql',
  CSS: 'css',
  HTML: 'html',
  JSON: 'json',
  Markdown: 'markdown',
  YAML: 'yaml',
  Java: 'java',
  C: 'c_cpp',
  'C++': 'c_cpp',
  'C#': 'csharp',
  PHP: 'php',
  Ruby: 'ruby',
  Swift: 'swift',
  Kotlin: 'kotlin',
  Dart: 'dart',
  Lua: 'lua',
  R: 'r',
  Scala: 'scala',
  Elixir: 'elixir',
  Clojure: 'clojure',
  GraphQL: 'graphqlschema',
  Dockerfile: 'dockerfile',
};

const AUTO_PAIRS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '"': '"',
  "'": "'",
  '`': '`',
};

const CLOSING_PAIRS = new Set(Object.values(AUTO_PAIRS));

function createRange(editor, startRow, startColumn, endRow, endColumn) {
  const Range = editor.getSelectionRange().constructor;
  return new Range(startRow, startColumn, endRow, endColumn);
}

function isSingleCharacterChange(delta) {
  return delta.lines?.length === 1 && delta.lines[0].length === 1;
}

function prepareEditor(editor) {
  editor.setBehavioursEnabled(true);
  editor.setWrapBehavioursEnabled(true);
}

export default function CodeField({ language, value, onChange }) {
  const editorRef = useRef(null);
  const pairingRef = useRef(false);
  const mode = LANG_TO_ACE_MODE[language] || 'text';

  const handleLoad = (editor) => {
    editorRef.current = editor;
    prepareEditor(editor);
  };

  const applyAutoPair = (delta) => {
    const editor = editorRef.current;

    if (!editor || pairingRef.current || !isSingleCharacterChange(delta)) {
      return false;
    }

    const session = editor.session;
    const typedChar = delta.lines[0];

    if (delta.action === 'insert') {
      const cursor = delta.end;
      const line = session.getLine(cursor.row);
      const closingChar = AUTO_PAIRS[typedChar];

      if (closingChar && line[cursor.column] !== closingChar) {
        pairingRef.current = true;
        session.insert(cursor, closingChar);
        editor.moveCursorTo(cursor.row, cursor.column);
        pairingRef.current = false;
        return true;
      }

      if (CLOSING_PAIRS.has(typedChar) && line[cursor.column] === typedChar) {
        pairingRef.current = true;
        session.remove(
          createRange(
            editor,
            delta.start.row,
            delta.start.column,
            delta.end.row,
            delta.end.column
          )
        );
        editor.moveCursorTo(delta.start.row, delta.start.column + 1);
        pairingRef.current = false;
        return true;
      }
    }

    if (delta.action === 'remove' && AUTO_PAIRS[typedChar]) {
      const cursor = delta.start;
      const line = session.getLine(cursor.row);
      const closingChar = AUTO_PAIRS[typedChar];

      if (line[cursor.column] !== closingChar) {
        return false;
      }

      pairingRef.current = true;
      session.remove(
        createRange(editor, cursor.row, cursor.column, cursor.row, cursor.column + 1)
      );
      editor.moveCursorTo(cursor.row, cursor.column);
      pairingRef.current = false;
      return true;
    }

    return false;
  };

  const handleChange = (nextValue, delta) => {
    if (!pairingRef.current && applyAutoPair(delta)) {
      onChange(editorRef.current?.getValue() ?? nextValue);
      return;
    }

    onChange(nextValue);
  };

  return (
    <div className="av-code-field">
      <div className="av-code-field-head">
        <span>{language}</span>
      </div>
      <AceEditor
        mode={mode}
        theme="tomorrow_night_eighties"
        value={value}
        onChange={handleChange}
        onLoad={handleLoad}
        name="snippet-code-editor"
        width="100%"
        height="260px"
        fontSize={12.5}
        showPrintMargin={false}
        setOptions={{
          useWorker: false,
          tabSize: 2,
          showLineNumbers: true,
          highlightActiveLine: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          behavioursEnabled: true,
          wrapBehavioursEnabled: true,
        }}
        editorProps={{ $blockScrolling: true }}
        placeholder="Paste your code here..."
      />
    </div>
  );
}
