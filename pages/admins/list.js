import AdminLayout from "../../components/AdminLayout"
import AppLayout from "../../components/AppLayout"
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
