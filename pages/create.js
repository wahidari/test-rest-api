import { useState } from "react";
import Router from "next/router";
import Head from 'next/head';
import axios from "axios";
import nookies from 'nookies';
import Input from '@components/Input';
import Button from '@components/Button';
import Select from "@components/Select";
import Navbar from "@components/Navbar";
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

export default function Create() {
  const [input, setInput] = useState({ name: "", address: "", country: "", phone_number: "", job_title: "", status: true });
  const [error, setError] = useState({ name: false, address: false, country: false, phone_number: false, job_title: false, status: false });
  const { updateToast, pushToast } = useToast();

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function handleStatusChange(e) {
    if (e.target.value == "true") {
      setInput({ ...input, status: true })
    } else {
      setInput({ ...input, status: false })
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let inputError = false;

    if (!input.job_title) {
      setError({ ...error, job_title: true });
      inputError = true;
    }
    if (!input.phone_number) {
      setError({ ...error, phone_number: true });
      inputError = true;
    }
    if (!input.country) {
      setError({ ...error, country: true });
      inputError = true;
    }
    if (!input.address) {
      setError({ ...error, address: true });
      inputError = true;
    }
    if (!input.name) {
      setError({ ...error, name: true });
      inputError = true;
    }

    if (!inputError) {
      setError({ name: false, address: false, country: false, phone_number: false, job_title: false, status: false });
      const toastId = pushToast({
        message: "Creating Customer",
        isLoading: true,
      });
      try {
        const res = await axios.post('https://mitramas-test.herokuapp.com/customers', input)
        if (res.status == 200) {
          updateToast({ toastId, message: res.data.message, isError: false });
          setTimeout(() => {
            Router.push("/");
          }, 1000)
        } else {
          updateToast({ toastId, message: "Failed Create Customer", isError: true });
        }
      } catch (error) {
        updateToast({ toastId, message: "Failed Create Customer", isError: true });
        console.error(error)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Add Customer</title>
        <meta name="description" content="Add Customer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-slate-50 dark:bg-neutral-900 min-h-screen min-w-full">
        
        <Navbar />

        <div className="px-8 pb-8">
          <section className="text-gray-700 max-w-sm mx-auto">
            <h1 className="text-center font-medium text-2xl dark:text-whitem dark:text-white my-3">Add Customer</h1>

            <Input onChange={handleChange} label="Name" name="name" placeholder="Name" type="text" />
            {error.name && <p className="text-red-500 text-center mb-2 text-xs font-medium">Name is required</p>}

            <Input onChange={handleChange} label="Address" name="address" placeholder="Address" type="text" />
            {error.address && <p className="text-red-500 text-center mb-2 text-xs font-medium">Address is required</p>}

            <Input onChange={handleChange} label="Country" name="country" placeholder="Country" type="text" />
            {error.country && <p className="text-red-500 text-center mb-2 text-xs font-medium">Country is required</p>}

            <Input onChange={handleChange} label="Phone" name="phone_number" placeholder="Phone" type="text" />
            {error.phone_number && <p className="text-red-500 text-center mb-2 text-xs font-medium">Phone is required</p>}

            <Input onChange={handleChange} label="Job" name="job_title" placeholder="Job" type="text" />
            {error.job_title && <p className="text-red-500 text-center mb-2 text-xs font-medium">Job is required</p>}

            <Select name="status" label="Status" onChange={handleStatusChange} value={input.status}>
              <Select.option value="true">Active</Select.option>
              <Select.option value="false">Inactive</Select.option>
            </Select>

            <Button onClick={handleSubmit} className="w-full">Save Customer</Button>
          </section>
        </div>
      </main>
    </>
  )
}