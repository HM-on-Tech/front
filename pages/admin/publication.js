import AdminLayout from "../../components/Layout/AdminLayout"
import AppLayout from "../../components/Layout/AppLayout"
import PublicationList from "../../components/Publication/PublicationList"
import PublicationTextRich from "../../components/Publication/PublicationTextField"
import Divider from '@material-ui/core/Divider';

const publicationList = ({publicationInfo}) => {

  return(
    <>
      <AppLayout>
        <AdminLayout>
          <PublicationTextRich publicationInfo={publicationInfo}/>
          <Divider variant='middle' />
          <PublicationList />
        </AdminLayout>
      </AppLayout>
    </>
    
  )  
}

export default publicationList;
