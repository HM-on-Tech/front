import AdminLayout from "../../../components/Layout/AdminLayout"
import AppLayout from "../../../components/Layout/AppLayout"
import PublicationList from "../../../components/PublicationList"


const publicationList = () => {
  return(
    <>
      <AppLayout>
        <AdminLayout>
          <PublicationList></PublicationList>
        </AdminLayout>
      </AppLayout>
    </>
  )  
}

export default publicationList;
