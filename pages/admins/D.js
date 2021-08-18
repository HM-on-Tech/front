import AdminLayout2 from "../../components/AdminLayout2"
import AppLayout from "../../components/AppLayout"
import ArticleList from "../../components/ArticleList"

const D = () => {
  return(
    <>
      <AppLayout>
        <AdminLayout2>
          <ArticleList></ArticleList>
        </AdminLayout2>
      </AppLayout>
    </>
  )  
}

export default D;
