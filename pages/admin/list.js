import AdminLayout from "../../components/Layout/AdminLayout"
import AppLayout from "../../components/Layout/AppLayout"
import ArticleList from "../../components/ArticleList"


const articleList = () => {
  return(
    <>
      <AppLayout>
        <AdminLayout>
          <ArticleList></ArticleList>
        </AdminLayout>
      </AppLayout>
    </>
  )  
}

export default articleList;
