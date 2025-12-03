import React, { useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import "../../css/editableLabels.css"
// Extensiones
import StarterKit from '@tiptap/starter-kit'
import {TextStyle,FontSize} from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'

// Iconos
import { 
  FaBold, FaItalic, FaStrikethrough, 
  FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaUndo, FaRedo
} from 'react-icons/fa'

import 'tippy.js/dist/tippy.css'

export default function EditableTitle({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      FontSize,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  return (
    <div className="w-full">
      
      {/* 🌟 BubbleMenu REAL — solo aparece cuando seleccionas texto */}
      <BubbleMenu 
        editor={editor}
        options={{
         getReferenceClientRect: () => {
      // devuelve un rectángulo ficticio en el centro del editor
      const editorEl = editor.view.dom
      const { left, top, width } = editorEl.getBoundingClientRect()
      return {
        width: 0,
        height: 0,
        top: top + 20, // ajusta vertical
        left: left + width / 2, // centro horizontal
        right: left + width / 2,
        bottom: top + 20,
      }
    },
        }}
         
      >
        <div className="bg-white dark:bg-zinc-800 px-3 py-2 rounded-xl border shadow flex gap-2">
          
          {/* UNDO */}
          <button onClick={() => editor.chain().focus().undo().run()} className="p-2 hover:bg-gray-100 rounded-md">
            <FaUndo />
          </button>

          {/* REDO */}
          <button onClick={() => editor.chain().focus().redo().run()} className="p-2 hover:bg-gray-100 rounded-md">
            <FaRedo />
          </button>

          {/* Bold */}
          <button onClick={() => editor.chain().focus().toggleBold().run()} className="p-2 hover:bg-gray-100 rounded-md">
            <FaBold />
          </button>

          {/* Italic */}
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className="p-2 hover:bg-gray-100 rounded-md">
            <FaItalic />
          </button>

          {/* Strike */}
          <button onClick={() => editor.chain().focus().toggleStrike().run()} className="p-2 hover:bg-gray-100 rounded-md">
            <FaStrikethrough />
          </button>

          {/* Color */}
          <input
            type="color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="w-6 h-6 border rounded"
          />

          {/* Font Size */}
          <select
            onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
            className="border rounded-md px-2 py-1"
          >
            <option value="14px">14</option>
            <option value="18px">18</option>
            <option value="24px">24</option>
            <option value="32px">32</option>
          </select>

          {/* Align */}
          <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className="p-2 hover:bg-gray-100 rounded-md">
            <FaAlignLeft />
          </button>

          <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="p-2 hover:bg-gray-100 rounded-md">
            <FaAlignCenter />
          </button>

          <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className="p-2 hover:bg-gray-100 rounded-md">
            <FaAlignRight />
          </button>

        </div>
      </BubbleMenu>

      {/* Editor */}
      <div className="mt-2">
        <EditorContent editor={editor} className="
      w-full
      border-2 
      border-transparent
      rounded-md
      focus:outline-none
      focus:border-green-400
    "/>
      </div>

    </div>
  )
}
