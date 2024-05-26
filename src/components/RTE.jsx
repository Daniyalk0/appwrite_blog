import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({
  name,
  control,
  label,
  defaultValue = "",
  ...props
}) {
  return (
    <div className="w-full">
      <>
        {label && <label className="inline-block mb-1 pl-1">{label}</label>}
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey="ub34k04vlgyd2e480norjhzp9gzbwhciqrb1ikm1vvzcmxiq"
              initialValue={defaultValue}
              init={{
                content_security_policy:
                  "default-src 'self' https://appwrite-blog-nine-omega.vercel.app/",
                initialValue: defaultValue,
                height: 400,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | " +
                  "alignleft aligncenter bold italic forecolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              {...props}
              onEditorChange={onChange}
            />
          )}
        />
      </>
    </div>
  );
}
