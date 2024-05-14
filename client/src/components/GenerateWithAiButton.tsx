import type {
  API,
  InlineTool,
  InlineToolConstructorOptions,
} from "@editorjs/editorjs"
import { getAICompletion } from "../api"
import toast from "react-hot-toast"

interface TemplateInlineToolConfig {
  buttonHTML?: string
}

interface TemplateInlineToolConstructorOptions
  extends InlineToolConstructorOptions {
  config?: TemplateInlineToolConfig
}

class GenerateWithAiButton implements InlineTool {
  static isSurroundEnabled: boolean = false

  static get isInline() {
    return true
  }

  static get title() {
    return "Generate with AI"
  }

  #api: API
  #config!: TemplateInlineToolConfig

  constructor({ api, config }: TemplateInlineToolConstructorOptions) {
    this.#api = api

    // Filter undefined and empty object.
    // See also: https://github.com/codex-team/editor.js/issues/1432
    if (config) {
      this.#config = config
    }
  }

  get shortcut() {
    return "CMD+I"
  }

  checkState() {
    return false
  }

  render() {
    const button = document.createElement("button")

    button.classList.add(this.#api.styles.inlineToolButton)
    button.type = "button"

    button.innerHTML = this.#config.buttonHTML ?? `button-text`

    return button
  }

  surround() {
    if (GenerateWithAiButton.isSurroundEnabled) {
      return
    }

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const selectedText = selection.toString()
    if (!selectedText) return

    GenerateWithAiButton.isSurroundEnabled = true

    toast.loading("Generating with AI", { id: "generate-with-ai-editor" })
    getAICompletion(selectedText)
      .then((response) => {
        const range = selection.getRangeAt(0)
        range.deleteContents()
        range.insertNode(document.createTextNode(response.data))

        toast.success("Generated with AI", { id: "generate-with-ai-editor" })
      })
      .catch(() => {
        toast.dismiss("generate-with-ai-editor")
      })
      .finally(() => {
        GenerateWithAiButton.isSurroundEnabled = false
      })
  }
}

export { GenerateWithAiButton }
export type { TemplateInlineToolConfig }
