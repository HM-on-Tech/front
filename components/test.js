import React, { useState, useEffect } from "react";

import MUIRichTextEditor from 'mui-rte'
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js'

import InvertColorsIcon from '@material-ui/icons/InvertColors'
import AppLayout from './AppLayout';
const emojis = [
  {
      keys: ["face", "grin"],
      value: "😀",
      content: "😀",
  },
  {
      keys: ["face", "joy"],
      value: "😂",
      content: "😂",
  },
  {
      keys: ["face", "sweat"],
      value: "😅",
      content: "😅",
  }
]

export const PostEdit = (props) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    const sampleMarkup = '<b>Bold text</b>, <i>Italic text</i><br/ ><br />Other text<br /><br /><a href="http://myurl.com">Some link</a>'

    // 1. Convert the HTML
    const contentHTML = convertFromHTML(sampleMarkup)
    
    // 2. Create the ContentState object
    const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap)
    
    // 3. Stringify `state` object from a Draft.Model.Encoding.RawDraftContentState object
    const content = JSON.stringify(convertToRaw(state))

    setValue(content);
  },[])
  const save = (data) => {
    console.log(data);
  };

  const onRTEChange = event => {
   console.log({...event})
  }

  return(
    <AppLayout>
      <MUIRichTextEditor 
        label="Type something here..."
        onSave={save}
        inlineToolbar={true}
        value={value}
        onChange={onRTEChange}

        autocomplete={{
            strategies: [
                {
                    items: emojis,
                    triggerChar: ":"
                }
            ]
        }}
    />
    </AppLayout>
  )
}

export default  PostEdit
