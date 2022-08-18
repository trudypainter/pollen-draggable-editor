import {
  BubbleMenu,
  // Content,
  EditorContent,
  Extension,
  useEditor,
  Content,
} from "@tiptap/react";
import Dropcursor from "@tiptap/extension-dropcursor";
import Highlight from "@tiptap/extension-highlight";
import Paragraph from "@tiptap/extension-paragraph";

// import FloatingMenu from "@tiptap/extension-floating-menu";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
// import getSuggestionItems from "./suggestion/items";
// import renderItems from "./suggestion/renderItems";
import { Plugin } from "prosemirror-state";

import Document from "@tiptap/extension-document";
import { DBlock } from "./dBlock";
// import "./Tiptap.css";

import {
  IconBold,
  IconCode,
  IconHighlight,
  IconItalic,
  IconStrikethrough,
  IconUnderline,
} from "@tabler/icons";

// doc (
//   dBlock(
//     block(paragraph|heading|blockquote)
//   )
//   dBlock(
//     block(paragraph|heading|blockquote)
//   )
//   dBlock(
//     block(paragraph|heading|blockquote)
//   )
// )

import { DraggableItems } from "./plugins/DraggableItems";
import { Placeholder } from "./plugins/Placeholder";
import { SlashCommands } from "./plugins/SlashCommands";
import { TrailingNode } from "./plugins/TrailingNode";

const CustomDocument = Document.extend({
  content: "dBlock+",
});

const rteClass =
  "prose !bg-transparent dark:prose-invert max-w-[calc(100%+2rem)] focus:outline-none -ml-8 pb-4 pt-2 " +
  "prose-pre:!bg-gray-900 prose-pre:border dark:prose-pre:border-gray-800 dark:prose-code:bg-gray-900 dark:prose-code:border-gray-700 dark:prose-code:text-gray-400 prose-code:bg-gray-100 dark:bg-gray-800 prose-code:font-medium prose-code:font-mono prose-code:rounded-lg prose-code:px-1.5 prose-code:py-0.5 prose-code:border prose-code:text-gray-500 " +
  "prose-blockquote:border-l-2 prose-blockquote:pl-4 prose-blockquote:text-gray-400 prose-blockquote:not-italic " +
  "prose-headings:leading-tight prose-headings:tracking-tight prose-h1:text-2xl prose-h1:font-bold prose-h1:font-bold";

const topLevelElements = [
  "paragraph",
  "heading",
  "blockquote",
  "orderedList",
  "bulletList",
  "codeBlock",
];

interface RichTextEditorProps {
  // draft?: InferQueryOutput<"drafts.byId">;
  draft?: {
    content: string;
  };
}

//

export const Tiptap: React.FC<RichTextEditorProps> = () => {
  const editor = useEditor({
    extensions: [
      Underline,
      Highlight.configure({ multicolor: true }),
      StarterKit.configure({
        dropcursor: false,
        // paragraph: false,
        // heading: false,
        // blockquote: false,
        // bulletList: false,
        // orderedList: false,
        // horizontalRule: false,
        // codeBlock: false,
      }),
      Placeholder.configure({ placeholder: "Type '/' for commands" }),
      // Focus.configure({ className: "has-focus", mode: "shallowest" }),
      Dropcursor.configure({ width: 3, color: "#68cef8" }),
      SlashCommands,
    ],
    onCreate: ({ editor: e }) => {
      e.state.doc.descendants((node, pos, parent) => {
        if (topLevelElements.includes(node.type.name)) {
          e.view.dispatch(
            e.state.tr.setNodeMarkup(pos, null, {
              topLevel: parent === e.state.doc,
              nestedParentType: parent?.type.name,
            })
          );
        }
      });
    },
    // onUpdate: ({ editor: e }) => setValue(e.getJSON()),
    content: "test",
    editorProps: {
      attributes: {
        spellcheck: "false",
        class: rteClass,
      },
    },
  });

  const addImage = () => {
    let url = window.prompt("URL");

    if (!url) {
      url = "";
    }
    // editor
    //   .chain()
    //   .insertContent(`<img src="${url}"/>`)
    //   .lift("image")
    //   .insertContent("<p></p>")
    //   .focus("end")
    //   .run();
    console.log("boom");
  };

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ placement: "top-start" }}
          className="bg-white dark:bg-gray-900 rounded-lg flex items-center space-x-1 p-1 shadow border dark:border-gray-800"
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${
              editor.isActive("bold") ? "bg-gray-100 dark:bg-gray-800" : ""
            } p-1 rounded-lg text-gray-500`}
          >
            <IconBold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${
              editor.isActive("italic") ? "bg-gray-100 dark:bg-gray-800" : ""
            } p-1 rounded-lg text-gray-500`}
          >
            <IconItalic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${
              editor.isActive("underline") ? "bg-gray-100 dark:bg-gray-800" : ""
            } p-1 rounded-lg text-gray-500`}
          >
            <IconUnderline size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${
              editor.isActive("strike") ? "bg-gray-100 dark:bg-gray-800" : ""
            } p-1 rounded-lg text-gray-500`}
          >
            <IconStrikethrough size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`${
              editor.isActive("code") ? "bg-gray-100 dark:bg-gray-800" : ""
            } p-1 rounded-lg text-gray-500`}
          >
            <IconCode size={16} />
          </button>
          {/* <div className="border-r border-gray-200 h-8" /> */}
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`${
              editor.isActive("highlight") ? "bg-gray-100 dark:bg-gray-800" : ""
            } p-1 rounded-lg text-gray-500`}
          >
            <IconHighlight size={16} />
          </button>
          {/* <button className="p-4 bg-yellow-100 border rounded-lg border-yellow-200" />
          <button className="p-4 bg-green-100 border rounded-lg border-green-200" />
          <button className="p-4 bg-blue-100 border rounded-lg border-blue-200" />
          <button className="p-4 bg-red-100 border rounded-lg border-red-200" /> */}
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />{" "}
    </>
  );
};
