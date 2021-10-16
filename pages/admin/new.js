
import AdminLayout from "../../components/Layout/AdminLayout"
import AppLayout from "../../components/Layout/AppLayout"
import TextRichWithNoSSR from "../../components/textRichWithNoSSR"


const Editor = () => {

  return(
    <>
      <AppLayout>
        <AdminLayout>
          <TextRichWithNoSSR />
        </AdminLayout>
      </AppLayout>
    </>
  )  
}

export default Editor;
