import  { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header'; 

const DEFAULT_INITIAL_DATA =  {
      "time": new Date().getTime(),
      "blocks": [
        {
          "type": "header",
          "data": {
            "text": "This is my awesome editor!",
            "levels": [1,3,5],


          }
        },
      ]
  }

const EditorComponent = () => {
  const ejInstance = useRef<EditorJS | null >();

    const initEditor = () => {
       const editor = new EditorJS({
          holder: 'editorjs',
          onReady: () => {  
            ejInstance.current = editor;
          },
          autofocus: true,
          data: DEFAULT_INITIAL_DATA,
          onChange: async () => {
            let content = await editor.saver.save();

            console.log(content);
          },
          tools: { 
            header: Header, 
            // 

          },
        });
      };

      // This will run only once
  useEffect(() => {
    if (ejInstance?.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

    return  <><div id='editorjs'></div></>;
}

export default EditorComponent;