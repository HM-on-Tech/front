
import AdminLayout from "../../components/AdminLayout"
import AppLayout from "../../components/AppLayout"
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
