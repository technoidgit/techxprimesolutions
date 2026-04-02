import React, { useRef, useMemo, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
// @ts-ignore
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

const RichTextEditor = ({ value, onChange, label }: { value: string, onChange: (val: string) => void, label?: string }) => {
    const quillRef = useRef<any>(null);

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                try {
                    const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                    });
                    const data = await res.json();
                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection();
                    quill.insertEmbed(range.index, 'image', data.url);
                } catch (err) {
                    console.error("Image upload failed:", err);
                }
            }
        };
    }, []);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
            ],
            handlers: {
                image: imageHandler,
            },
        },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        }
    }), [imageHandler]);

    const insertFeaturesBlock = () => {
        const featuresHtml = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="p-6 bg-foreground/5 rounded-2xl border border-foreground/10">
          <h4 class="text-xl font-bold mb-2">Feature Title</h4>
          <p class="opacity-60 text-sm">Feature description goes here.</p>
        </div>
        <div class="p-6 bg-foreground/5 rounded-2xl border border-foreground/10">
          <h4 class="text-xl font-bold mb-2">Feature Title</h4>
          <p class="opacity-60 text-sm">Feature description goes here.</p>
        </div>
      </div>
    `;
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        if (range) {
            quill.clipboard.dangerouslyPasteHTML(range.index, featuresHtml);
        } else {
            quill.clipboard.dangerouslyPasteHTML(quill.getLength(), featuresHtml);
        }
    };

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
                {label && <label className="block text-sm font-bold opacity-60">{label}</label>}
                <button
                    type="button"
                    onClick={insertFeaturesBlock}
                    className="text-[10px] font-bold uppercase tracking-widest bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full hover:bg-orange-500/20 transition-colors"
                >
                    + Insert Features Block
                </button>
            </div>
            <div className="bg-background border border-foreground/10 rounded-xl overflow-hidden">
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    className="min-h-[300px]"
                />
            </div>
        </div>
    );
};

export default RichTextEditor;
