import { useState, useEffect } from "react";
import Router from "next/router";
import Head from 'next/head';
import axios from "axios";
import nookies from 'nookies';
import Logout from '@utils/logout';
import Input from '@components/Input';
import Button from '@components/Button';
import Select from "@components/Select";
import Navbar from "@components/Navbar";
import Skeletons from "@components/Skeletons";

export async function getServerSideProps(context) {
  // Parse
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
      id: context.params.id
    }
  }
}

export default function Edit({ id }) {

  const idCustomer = id
  const [error, setError] = useState({ name: false, address: false, country: false, phone_number: false, job_title: false, status: false });
  const [success, setSuccess] = useState();
  const [customer, setCustomer] = useState()
  const [fetched, setFetched] = useState(false)

  async function getCustomer() {
    try {
      const res = await axios.get('https://mitramas-test.herokuapp.com/customers')
      if (res.status === 200) {
        let allCustomer = res.data.data
        setCustomer(allCustomer.filter(item => item.id == idCustomer)[0])
        setFetched(true)
      }
    } catch (error) {
      if (error.response.status == 401) {
        Logout()
      }
      console.log(error)
    }
  }

  useEffect(() => {
    if (!fetched || !customer) {
      getCustomer()
    }
  }, [fetched])

  function handleChange(e) {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    })
  }

  function handleStatusChange(e) {
    if (e.target.value == "true") {
      setCustomer({ ...customer, status: true })
    } else {
      setCustomer({ ...customer, status: false })
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let inputError = false;

    if (!customer.job_title) {
      setError({ ...error, job_title: true });
      inputError = true;
    }
    if (!customer.phone_number) {
      setError({ ...error, phone_number: true });
      inputError = true;
    }
    if (!customer.country) {
      setError({ ...error, country: true });
      inputError = true;
    }
    if (!customer.address) {
      setError({ ...error, address: true });
      inputError = true;
    }
    if (!customer.name) {
      setError({ ...error, name: true });
      inputError = true;
    }

    if (!inputError) {
      setError({ name: false, address: false, country: false, phone_number: false, job_title: false, status: false });
      try {
        const res = await axios.put('https://mitramas-test.herokuapp.com/customers',
          customer
        )
        if (res.status == 200) {
          setSuccess(res.data.message)
          setTimeout(() => {
            Router.push("/");
          }, 1000)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Edit Customer</title>
        <meta name="description" content="Edit Customer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-slate-50 dark:bg-neutral-900 min-h-screen min-w-full">

        <Navbar />

        <div className="px-8 pb-8">
          <section className="text-gray-700 max-w-sm mx-auto">
            <h1 className="text-center font-medium text-2xl dark:text-whitem dark:text-white my-3">Edit Customer</h1>
            {fetched ?
              <>
                <Input onChange={handleChange} value={customer.name} label="Name" name="name" placeholder="Name" type="text" />
                {error.name && <p className="text-red-500 text-center mb-2 text-xs font-medium">Name is required</p>}

                <Input onChange={handleChange} value={customer.address} label="Address" name="address" placeholder="Address" type="text" />
                {error.address && <p className="text-red-500 text-center mb-2 text-xs font-medium">Address is required</p>}

                <Input onChange={handleChange} value={customer.country} label="Country" name="country" placeholder="Country" type="text" />
                {error.country && <p className="text-red-500 text-center mb-2 text-xs font-medium">Country is required</p>}

                <Input onChange={handleChange} value={customer.phone_number} label="Phone" name="phone_number" placeholder="Phone" type="text" />
                {error.phone_number && <p className="text-red-500 text-center mb-2 text-xs font-medium">Phone is required</p>}

                <Input onChange={handleChange} value={customer.job_title} label="Job" name="job_title" placeholder="Job" type="text" />
                {error.job_title && <p className="text-red-500 text-center mb-2 text-xs font-medium">Job is required</p>}

                <Select name="status" label="Status" onChange={handleStatusChange} value={customer.status == true ? "true" : "false"}>
                  <Select.option value="true">Active</Select.option>
                  <Select.option value="false">Inactive</Select.option>
                </Select>

                {success && <p className="text-green-500 text-center my-4 text-sm font-medium">{success}</p>}
                <Button onClick={handleSubmit} className="w-full">Save Customer</Button>
              </>
              :
              <>
                <Skeletons />
                <Skeletons />
                <Skeletons />
                <Skeletons />
                <Skeletons />
              </>
            }
          </section>
        </div>
      </main>
    </>
  )
}