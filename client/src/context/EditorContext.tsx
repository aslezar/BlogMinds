import { createContext, useContext, useState } from "react"
import EditorJS, { OutputData } from "@editorjs/editorjs"
import List from "@editorjs/list"
import ImageTool from "@editorjs/image"
import Embed from "@editorjs/embed"
import Alert from "editorjs-alert"
import CheckList from "@editorjs/checklist"
import Link from "@editorjs/link"
import Code from "@editorjs/code"
import Button from "editorjs-button"
import InlineCode from "@editorjs/inline-code"
import ColorPlugin from "editorjs-text-color-plugin"
import AlignmentBlockTune from "editorjs-text-alignment-blocktune"
import { uploadAssests } from "../api"
import Title from "title-editorjs"
import toast from "react-hot-toast"
const EditorContext = createContext<any>(null)

function EditorContextProvider(props: any) {
  // const editorInstanceRef = useRef<EditorJS | null>(null)
  const [editor, setEditor] = useState<EditorJS | null>(null)
  const initializeEditor = async (
    readOnly: boolean = false,
    data: OutputData | undefined = undefined,
  ) => {
    const editorjs = new EditorJS({
      holder: "editorjs",
      placeholder: "Start writing your blog here...",
      onReady: () => {
        setEditor(editorjs)
      },
      data: data,
      readOnly: readOnly,
      tools: {
        textAlignment: {
          class: AlignmentBlockTune,
          config: {
            default: "left",
            blocks: {
              header: "center",
            },
          },
        },
        title: {
          class: Title,
        },
        alert: {
          class: Alert,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+A",
          config: {
            types: [
              { label: "Info", value: "info" },
              { label: "Warning", value: "warning" },
              { label: "Danger", value: "danger" },
              { label: "Success", value: "success" },
            ],
            messagePlaceholder: "Enter your message",
          },
        },
        list: {
          class: List,
          tunes: ["textAlignment"],
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: CheckList,
          tunes: ["textAlignment"],
        },
        image: {
          class: ImageTool,
          config: {
            field: "assetFiles",
            types: "image/png, image/jpg, image/jpeg, image/webp",
            onError: (error: any) => {
              toast.error(error)
            },
            uploader: {
              uploadByFile: async (file: any) => {
                const formData = new FormData()
                formData.append("assetFiles", file)

                return uploadAssests(formData)
                  .then((res) => {
                    return {
                      success: 1,
                      file: {
                        url: res.data[0],
                      },
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                    return {
                      success: 0,
                    }
                  })
              },

              uploadByUrl: (_url: string) => {
                console.log(_url)
                return new Promise((resolve) => {
                  resolve({
                    success: 1,
                    file: {
                      url: _url,
                    },
                  })
                })
              },
            },
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              codepen: true,
            },
          },
        },
        link: Link,
        code: {
          class: Code,
          config: {
            placeholder: "Enter code here...",
          },
        },
        button: {
          class: Button,
          config: {
            placeholder: "Enter button text...",
            text: "Click me",
            link: "https://google.com",
            target: "_blank",
          },
        },
        Marker: {
          class: ColorPlugin,
          config: {
            defaultColor: "#9674d4",
            type: "color",
          },
        },
        inlineCode: {
          class: InlineCode,
        },
      },
    })
    //render data
    // editorInstanceRef.current = editor
    // await editor.isReady
    // setEditor(editor)
  }

  return (
    <EditorContext.Provider value={{ editor, initializeEditor }}>
      {props.children}
    </EditorContext.Provider>
  )
}
const useEditorContext = () => {
  return useContext(EditorContext)
}
export { EditorContext, EditorContextProvider, useEditorContext }
