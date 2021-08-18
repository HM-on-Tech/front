import AdminLayout2 from "../../components/AdminLayout2"
import AppLayout from "../../components/AppLayout"
import TextRichWithNoSSR from "../../components/textRichWithNoSSR"

const C = () => {
  return(
    <>
      <AppLayout>
        <AdminLayout2>
          <TextRichWithNoSSR />
        </AdminLayout2>
      </AppLayout>
    </>
  )  
}

export default C;
