import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertFromRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import "./EditText.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
class EditText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
    this.props.sendContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };
  onContentStateChange = contentState => {
  };
  componentWillReceiveProps(nextProps){
    const html = nextProps.content;
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);
    this.setState({editorState: editorState})
  }
  render() {
    const { editorState } = this.state;
    return (
      <div className="EditText">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onContentStateChange={this.onContentStateChange}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled={true}
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
export default EditText;
