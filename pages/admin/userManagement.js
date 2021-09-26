import AdminLayout from "../../components/Layout/AdminLayout"
import AppLayout from "../../components/Layout/AppLayout"
import UserList from "../../components/UserList"
import UserManager from "../../components/UserManager"
import Divider from '@material-ui/core/Divider';
import { useState } from "react";

const userManagement = ({publicationInfo}) => {
  const [userList, setUserList] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(1);
  const [mode, setMode] = useState('New')
  const [selectedElement, setSelectedElement] = useState([]);
  return(
    <>
      <AppLayout>
        <AdminLayout>
          <UserManager 
            setUserList = {setUserList}
            mode = {mode}
            setMode = {setMode}
            selectedElement={selectedElement}
            name={name}
            email={email}
            role={role}
            setName={setName}
            setEmail={setEmail}
            setRole={setRole}
          />
          <Divider variant='middle' />
          <UserList 
            userList={userList}
            setUserList={setUserList}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            name={name}
            email={email}
            role={role}
            setName={setName}
            setEmail={setEmail}
            setRole={setRole}
          />
        </AdminLayout>
      </AppLayout>
    </>
    
  )  
}

export default userManagement;
