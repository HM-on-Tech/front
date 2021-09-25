import AdminLayout from "../../components/Layout/AdminLayout"
import AppLayout from "../../components/Layout/AppLayout"
import ArticleList from "../../components/ArticleList"
import AdminAccess from "../../helper/adminAccess"


const articleList = () => {
  return(
    <>
      <AppLayout>
        <AdminAccess>
          <AdminLayout>
            <ArticleList></ArticleList>
          </AdminLayout>
        </AdminAccess>
      </AppLayout>
    </>
  )  
}

export default articleList;
