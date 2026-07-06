import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-tomorrow_night_eighties';
import 'ace-builds/src-noconflict/ext-language_tools';

const LANG_TO_ACE_MODE = {
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  Python: 'python',
  Bash: 'sh',
  Go: 'golang',
  Rust: 'rust',
  SQL: 'sql',
  CSS: 'css',
};

export default function CodeField({ language, value, onChange }) {
  const mode = LANG_TO_ACE_MODE[language] || 'text';

  return (
    <div className="av-code-field">
      <div className="av-code-field-head">
        <span>{language}</span>
      </div>
      <AceEditor
        mode={mode}
        theme="tomorrow_night_eighties"
        value={value}
        onChange={onChange}
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
        }}
        editorProps={{ $blockScrolling: true }}
        placeholder="Paste your code here..."
      />
    </div>
  );
}
