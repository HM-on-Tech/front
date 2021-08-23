import AdminLayout from "../../components/AdminLayout"
import AppLayout from "../../components/AppLayout"
import ArticleList from "../../components/ArticleList"
import { ToastContainer, toast } from 'react-toastify';


const articleList = () => {
  return(
    <>
      <AppLayout>
        <AdminLayout>
          <ArticleList></ArticleList>
        </AdminLayout>
      <ToastContainer />
      </AppLayout>
    </>
  )  
}

export default articleList;
