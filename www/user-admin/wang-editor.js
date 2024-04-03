const { createEditor, createToolbar } = window.wangEditor;
// switch i18nChangeLanguage
wangEditor.i18nChangeLanguage('en');
const editorConfig = {
    placeholder: "Please Input",
    onChange(editor) {
        const html = editor.getHtml();
        console.log("editor content", html);
    },
    //******set1
    MENU_CONF: {},
};
//***set2
editorConfig.MENU_CONF["uploadImage"] = {
    server: "http://localhost:3000/api/upload",
    fieldName: "img",
    customInsert(res, insertFn) {
        console.log(res);
        // TS
        //***set3
        insertFn("http://localhost:3000/" + res.data);
    },
};

const editor = createEditor({
    selector: "#editor-container",
    html: "<p><br></p>",
    config: editorConfig,
    mode: "default", // or 'simple'
});

const toolbarConfig = {};

const toolbar = createToolbar({
    editor,
    selector: "#toolbar-container",
    config: toolbarConfig,
    mode: "default", // or 'simple'
});