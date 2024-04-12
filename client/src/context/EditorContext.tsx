import { createContext, useRef } from "react"
import EditorJS from "@editorjs/editorjs"
import Paragraph from "@editorjs/paragraph"
import Header from "@editorjs/header"
import List from "@editorjs/list"
import ImageTool from "@editorjs/image"
import Embed from "@editorjs/embed"
import Alert from "editorjs-alert"
import CheckList from "@editorjs/checklist"
import Link from "@editorjs/link"
import Table from "editorjs-table"
import Code from "@editorjs/code"
import Button from "editorjs-button"
import InlineCode from "@editorjs/inline-code"
import ColorPlugin from "editorjs-text-color-plugin"
import AlignmentBlockTune from "editorjs-text-alignment-blocktune"

export const EditorContext = createContext<any>(null)

export function EditorContextProvider(props: any) {
  const editorInstanceRef = useRef<EditorJS | null>(null)
  const initializeEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: "Start writing your blog here...",
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
        paragraph: {
          class: Paragraph as any,
          tunes: ["textAlignment"],
        },
        header: {
          class: Header,
          inlineToolbar: true,
          tunes: ["textAlignment"],
          config: {
            placeholder: " Heading here..",
            levels: [1, 2, 3, 4, 5],
            defaultLevel: 1,
          },
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
            endpoints: {
              // byFile: "http://localhost:3000/uploadFile",
              // byUrl: "http://localhost:3000/fetchUrl",
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

        table: {
          class: Table,
        },
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
            defaultColor: "#FFBF00",
            type: "marker",
          },
        },
        inlineCode: {
          class: InlineCode,
        },
        Color: {
          class: ColorPlugin,
          config: {
            colorCollections: [
              "#EC7878",
              "#9C27B0",
              "#673AB7",
              "#3F51B5",
              "#0070FF",
              "#03A9F4",
              "#00BCD4",
              "#4CAF50",
              "#8BC34A",
              "#CDDC39",
              "#FFF",
            ],
            defaultColor: "#FF1300",
            customPicker: true,
          },
        },
      },
      onChange: async () => {
        const data = await editor.save()
        console.log(data)
      },
    })
    editorInstanceRef.current = editor
  }

  return (
    <EditorContext.Provider value={{ editorInstanceRef, initializeEditor }}>
      {props.children}
    </EditorContext.Provider>
  )
}
