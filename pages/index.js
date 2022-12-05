import { useState, useEffect } from "react";
import Head from 'next/head'
import Link from 'next/link';
import nookies from "nookies";
import axios from 'axios';
import Logout from '@utils/logout';
import TableSimple from '@components/TableSimple';
import Badge from '@components/Badge';
import Skeletons from '@components/Skeletons';
import Input from '@components/Input';
import Select from '@components/Select';
import DeleteModal from '@components/DeleteModal';
import Text from '@components/Text';
import Navbar from '@components/Navbar';
import useToast from '@utils/useToast';

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login"
      }
    }
  }
  return {
    props: {
    }
  }
}

export default function Home() {
  const [fetched, setFetched] = useState(false)
  const [customer, setCustomer] = useState()
  const [tempCustomer, setTempCustomer] = useState()
  const [search, setSearch] = useState()
  const [sort, setSort] = useState()
  const [filter, setFilter] = useState()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [modalData, setModalData] = useState({ id: "", name: "" });
  const { updateToast, pushToast } = useToast();

  function handleShowModal(id, name) {
    setModalData({ id: id, name: name })
    setOpenDeleteModal(true)
  }

  async function handleDeleteCustomer() {
    const toastId = pushToast({
      message: "Deleting Customer",
      isLoading: true,
    });
    try {
      const res = await axios.delete('https://mitramas-test.herokuapp.com/customers', {
        data: { id: modalData.id }
      })
      if (res.status == 200) {
        setFetched(false)
        updateToast({ toastId, message: res.data.message, isError: false });
      } else {
        updateToast({ toastId, message: "Failed Delete Customer", isError: true });
      }
    } catch (error) {
      console.error(error)
      updateToast({ toastId, message: "Failed Delete Customer", isError: true });
    }
    setOpenDeleteModal(false);
  }

  async function getCustomer() {
    try {
      const res = await axios.get('https://mitramas-test.herokuapp.com/customers')
      if (res.status === 200) {
        setCustomer(res.data.data)
        setTempCustomer(res.data.data)
        setFetched(true)
      }
    } catch (error) {
      if (error.response.status == 401) {
        Logout()
      }
      console.error(error)
    }
  }

  useEffect(() => {
    if (!fetched || !customer) {
      getCustomer()
    }
  }, [fetched])

  function handleSearchChange(e) {
    setSearch(e.target.value)
    let inputLower = e.target.value.toLowerCase()
    setTempCustomer(customer.filter(item => item.name.toLowerCase().includes(inputLower)))
  }

  function handleFilterChange(e) {
    setFilter(e.target.value)
    if (e.target.value == "all") {
      setTempCustomer(customer);
    } else {
      if (e.target.value == "true") {
        setTempCustomer(customer.filter(item => item.status == true));
      } else {
        setTempCustomer(customer.filter(item => item.status == false));
      }
    }
  };

  function handleSortChange(e) {
    setSort(e.target.value)
    if (e.target.value == "descending") {
      let descendingUser = customer.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
      setTempCustomer(descendingUser)
    } else {
      let ascendingUser = customer.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
      setTempCustomer(ascendingUser)
    }
  };

  function handleReset() {
    setSearch("")
    setFilter("")
    setSort("")
    setFetched(false)
  }

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-slate-50 dark:bg-neutral-900 min-h-screen min-w-full">

        <Navbar />

        <div className="p-8">
          <div className="flex flex-wrap-reverse items-center justify-between gap-x-4">
            <div className="flex flex-wrap gap-x-3 mb-4">
              <Input name="search" label="Search Name" onChange={handleSearchChange} value={search} className=" !w-32 !md:w-40 !py-1.5" placeholder="Search Name" />
              <Select name="sort" label="Sort Name" onChange={handleSortChange} value={sort ? sort : "Sort By"} className=" !w-32 !md:w-40 !py-1.5">
                <Select.option value="" hidden>Sort By</Select.option>
                <Select.option value="descending">Descending</Select.option>
                <Select.option value="ascending">Ascending</Select.option>
              </Select>
              <Select name="filter" label="Filter Status" onChange={handleFilterChange} value={filter} className=" !w-32 !md:w-40 !py-1.5">
                <Select.option value="all">All</Select.option>
                <Select.option value="true">Active</Select.option>
                <Select.option value="false">Inactive</Select.option>
              </Select>
              <div>
                <p className="text-sm font-medium dark:text-white mb-2">Clear</p>
                <button onClick={handleReset} className="!px-10 !w-32 text-neutral-800 dark:text-gray-200 text-sm border border-gray-300 dark:border-neutral-700 rounded py-1.5 font-medium transition-all hover:bg-neutral-200 dark:hover:bg-neutral-800">Reset</button>
              </div>
            </div>
            <Link href="/create">
              <a className="bg-emerald-500 hover:bg-emerald-600 rounded transition-all mb-6 md:mb-1 text-sm font-medium text-white px-3 py-1.5 shadow focus:outline-none focus:ring-2 focus:ring-emerald-400">Add Customer</a>
            </Link>
          </div>
          {fetched ?
            <TableSimple
              head={
                <>
                  <TableSimple.td small>Id</TableSimple.td>
                  <TableSimple.td>Name</TableSimple.td>
                  <TableSimple.td>Address</TableSimple.td>
                  <TableSimple.td>Country</TableSimple.td>
                  <TableSimple.td>Phone</TableSimple.td>
                  <TableSimple.td>Position</TableSimple.td>
                  <TableSimple.td>Status</TableSimple.td>
                  <TableSimple.td>Action</TableSimple.td>
                </>
              }
            >
              {tempCustomer.map((item, index) => {
                return (
                  <TableSimple.tr key={index}>
                    <TableSimple.td small>{item.id}</TableSimple.td>
                    <TableSimple.td>{item.name}</TableSimple.td>
                    <TableSimple.td>{item.address}</TableSimple.td>
                    <TableSimple.td>{item.country}</TableSimple.td>
                    <TableSimple.td>{item.phone_number}</TableSimple.td>
                    <TableSimple.td>{item.job_title}</TableSimple.td>
                    <TableSimple.td>
                      {item.status == true ?
                        <Badge.green>Active </Badge.green>
                        :
                        <Badge.red>Inactive </Badge.red>
                      }
                    </TableSimple.td>
                    <TableSimple.td>
                      <div className="flex space-x-2">
                        <Link href={`edit/${item.id}`}>
                          <a className="text-blue-500 hover:text-blue-700 text-sm font-medium">Edit</a>
                        </Link>
                        <button onClick={() => handleShowModal(item.id, item.name)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                      </div>
                    </TableSimple.td>
                  </TableSimple.tr>
                );
              })}
            </TableSimple>
            :
            <Skeletons className="!h-32" />
          }

          <DeleteModal
            modalTitle="Delete Customer"
            isOpenModal={openDeleteModal}
            onCloseModal={() => setOpenDeleteModal(false)}
            onConfirmModal={handleDeleteCustomer}
            danger
          >
            <Text className="pb-2 !text-sm">Sure want to delete <span className="font-semibold">{modalData.name}</span> ?</Text>
          </DeleteModal>

        </div>
      </main>
    </div>
  )
}
