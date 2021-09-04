import AdminLayout from "../../components/AdminLayout"
import AppLayout from "../../components/AppLayout"
import TextRichEditor from "../../components/TextRichEditor"
// import TextRichWithNoSSR2 from "../../components/textRichWithNoSSR2"


const Create = () => {

  return(
    <>
      <AppLayout>
        <AdminLayout>
          <TextRichEditor />
          {/* <TextRichWithNoSSR2 /> */}
        </AdminLayout>
      </AppLayout>
    </>
  )  
}

export default Create;
