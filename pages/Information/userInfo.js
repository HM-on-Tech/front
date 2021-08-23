import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState, } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import Head from 'next/head';
import AppLayout from "../../components/AppLayout";
import AdminLayout from "../../components/AdminLayout2";

const UserInfo = () => {
  const [name, setName] = useState('--------------');
  const [password, setPassword] = useState('')
  const router = useRouter()



  const clicked = () => {
    router.push('/admin');
  }
  return(
    <>
    <AppLayout>
      <AdminLayout>
        <Link href="/">
          <a>Home</a>
        </Link>
        user Name : {name}
      </AdminLayout>
    </AppLayout>
    
    </>
  )
}

export default UserInfo;
