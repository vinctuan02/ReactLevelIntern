import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';


const TableUsers = (props) => {

    const [isShowModal, setIsShowModal] = useState(false)


    const [listUsers, setListUsers] = useState()
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, settotalPages] = useState(0)

    const [titleModal, setTitleModal] = useState()

    useEffect(() => {
        getUsers(1)
    }, [])

    const handleClose = () => {
        setIsShowModal(false)
    }

    const getUsers = async (page) => {
        let res = await fetchAllUser(page)
        if (res && res.data) {
            setListUsers(res.data)
            setTotalUsers(res.total)
            settotalPages(res.total_pages)
        }
    }

    const showModal = (titleModal, item) => {
        setTitleModal(titleModal)
        setIsShowModal(true)
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1)
    }

    return (
        <>
            <div className='my-3 add-new'>
                <span>
                    <b>
                        List Users:
                    </b>
                </span>
                <button
                    className='btn btn-success'
                    onClick={() => showModal('Add new user')}
                >Add new User</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button
                                            className='btn btn-warning mx-3'
                                            onClick={() => showModal('Edit user', item)}
                                        >Edit</button>
                                        <button className='btn btn-danger mx-3'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5} // Adjust to display a reasonable number of page buttons
                pageCount={totalPages}
                previousLabel="< Previous"
                renderOnZeroPageCount={null}

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            < ModalAddNew
                show={isShowModal}
                handleClose={handleClose}
                titleModal={titleModal}
                nameUser
                jobUser
            />
        </>
    )
}

export default TableUsers