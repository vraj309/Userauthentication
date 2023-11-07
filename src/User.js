import React from 'react'
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button';
import AddUser from './AddUser';
import ViewUser from './ViewUser';
import EditUser from './EditUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function User() {
  const [data, setData] = useState([])
  const [showviewmode, setShowViewMode] = useState(false)
  const [showaddmode, setShowAddMode] = useState(false)
  const [showeditmode, setShowEditMode] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const navigate = useNavigate();

  const [visible, setVisible] = React.useState(false);
  const [deletingUserId, setDeletingUserId] = React.useState(null);

  useEffect(() => {
    getAllUser();
  }, [])

  const getAllUser = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users?page=1');
      if (response.data && response.data.data) {
        setData(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  const actionsTemplate = (rowDate) => {
    return (
      <>
        <div className='user-button'>
          <Button className='btn btn-primary mr-2' style={{margin:'10px' }} onClick={() => {
            setSelectedUserId(rowDate.id)
            setShowViewMode(true)
          }}>
            <i className='pi pi-eye'></i>
          </Button>
          <Button className='btn btn-success mr-2'style={{margin:'10px' }}  severity="success" onClick={() => {
            setSelectedUserId(rowDate.id)
            setShowEditMode(true)
          }}>
            <i className='pi pi-file-edit'></i>
          </Button>
          <Button className='btn btn-Danger' style={{margin:'10px' }} severity="danger" onClick={() => deleteUser()}>
            <i className='pi pi-trash'></i>
          </Button>
      
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

        </div>
      </>
    )
  }


  const deleteUser = async () => {

    try {
      const response = await axios.delete('https://reqres.in/api/users/' + deletingUserId);
      if (response.status === 204) {
        toast.error('User deleted successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setDeletingUserId(response.delete)
        setVisible(false);
      } else {
        toast.warn('Failed to delete user. Status code:', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        //   console.error('Failed to delete user. Status code:', response.status);
        setVisible(false);
      }
    } catch (error) {
      toast.warn('Error deleting user:', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      //  console.error('Error deleting user:', error);
      setVisible(false);
    }
  };
  return (
    <div className="container ">
      <div className="users-page">
        <div className="container">
          <div className='user-list'>
            <h1>Welcome to User</h1>
            <div className='addNewUser'>
              <Button className='btn btn-success' onClick={() => setShowAddMode(true)}>
                Add New User<i className='pi pi-plus'></i>
              </Button>
            </div>

            <DataTable value={data}>
              <Column field="id" header="id"></Column>
              <Column field="email" header="email"></Column>
              <Column field="first_name" header="firstname"></Column>
              <Column field="last_name" header="lastname"></Column>
              <Column field="avatar" header="avatar"></Column>
              <Column header="Actions" body={actionsTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
      <Dialog header="View User Data"
        visible={showviewmode}
        style={{ width: '30vw' }}
        onHide={() => setShowViewMode(false)}>

        <ViewUser userid={selectedUserId} />
      </Dialog>

      <Dialog header="Add New User"
        visible={showaddmode}
        style={{ width: '30vw' }}
        onHide={() => setShowAddMode(false)}>

        <AddUser setUserAdded={() => {
          setShowAddMode(false);
          getAllUser()
        }} />
      </Dialog>


      <Dialog header=" Edit User Data"
        visible={showeditmode}
        style={{ width: '30vw' }}
        onHide={() => setShowEditMode(false)}>

        <EditUser userid={selectedUserId} setShowEditMode={() => {
          setShowEditMode(false);
          getAllUser()
        }} />
      </Dialog>



    </div>
  )
}

export default User;



