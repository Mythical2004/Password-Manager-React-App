import React from 'react'
import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {

    const ref = useRef()
    const [passwordVisibility, SetpasswordVisibility] = useState(false)
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([]);

    const eyeIconSrc = passwordVisibility ? "/eyeCross.png" : "/eye.png";

    const getPasswords = async () => {
        try {
            let req = await fetch("http://localhost:3000/");
            let passwords = await req.json();
            setPasswordArray(passwords);
        } catch (error) {
            console.error("Failed to fetch passwords:", error);
            setPasswordArray([]); // Reset state on error
        }
    };

    useEffect(() => {
        getPasswords();
    }, []);

    const toggleVisibility = () => {
        SetpasswordVisibility(!passwordVisibility)
    }

    const savePassword = async () => {
        if (form.site && form.password && form.username) {
            let newPassword = { ...form, id: uuidv4() };

            setPasswordArray([...passwordArray, newPassword]);

            let res = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPassword),
            });

            if (res.ok) {
                toast('🦄 Password Saved!', { position: "top-right", autoClose: 2500, theme: "dark" });
            } else {
                console.error("Failed to save password.");
            }
        }

        setform({ site: "", username: "", password: "" });
    };

    const deletePassword = async (id) => {
        let c = confirm("Are you sure you want to delete this password?")
        if (c) {

            setPasswordArray(passwordArray.filter((item) => item.id !== id))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))
            toast('🦄 Password Deleted Successfully!', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        };
    }

    const editPassword = async (id) => {
        setform({ ...passwordArray.filter((item) => item.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter((item) => item.id !== id))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('🦄 Copied to Clipboard!', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className="static lg:mx-[250px] bg-slate-200  p-1 flex flex-col items-center">
                <h1 className='text-4xl font-bold mt-6'>
                    <span className='text-green-700'>&lt; </span>
                    <span className=''>Pass</span>
                    <span className='text-green-700'> OP&gt; </span>
                </h1>
                <p className='text-green-800 font-bold'>Your Password Manager</p>
                <div className='  flex flex-col p-4 w-full gap-3 text-[12px] sm:text-lg'>
                    <input value={form.site} onChange={handleChange} className='rounded-full py-1 px-4 w-full border-2 border-green-500 text-black' type="text" name="site" id="" placeholder='Enter Website Name' />
                    <div className="flex mx-auto gap-1 w-full">
                        <input value={form.username} onChange={handleChange} className='border-2 border-green-500 text-black w-full rounded-full py-1 px-4' type="text" placeholder='Enter Username' name="username" />
                        <div className="relative flex items-center w-full">
                            <input value={form.password} onChange={handleChange} className='border-2 border-green-500 text-black w-full rounded-full py-1 px-4' type={passwordVisibility ? "text" : "password"} placeholder='Enter Password' name="password" />
                            <span className='absolute right-2 w-[25px] sm:w-[30px] h-[30px] sm:h-[35px] flex items-center justify-center'>
                                <img onClick={toggleVisibility} className=' cursor-pointer' src={eyeIconSrc} alt="" width={30} />
                            </span>
                        </div>
                    </div>
                </div>
                <button className='justify-center items-center flex bg-green-500 p-2 rounded-full hover:bg-green-600' onClick={savePassword}>
                    <lord-icon
                        src={"https://cdn.lordicon.com/jgnvfzqg.json"}
                        trigger="hover">
                    </lord-icon>
                    Add Password
                </button>
                <div className="passwords w-full xl:min-w-[60vw] mt-5 flex justify-center items-center flex-col">
                    <h1 className='font-bold lg:text-xl'>Your Passwords</h1>
                    {passwordArray.length === 0 && <div className='mt-5'>No passwords to Show </div>}
                    {passwordArray.length !== 0 && <table className="table-auto min-w-[100%] xl:min-w-[60vw] bg-green-50 overflow-hidden rounded-sm">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-1'>Site</th>
                                <th className='py-1'>Username</th>
                                <th className='py-1'>Password</th>
                                <th className='py-1'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((item, index) => {
                                return <tr key={index} >
                                    <td className='  border border-black  text-center py-1justify-center items-center'><a href={item.site} target='_blank'>{item.site} </a>
                                        <div className="lordicon cursor-pointer" onClick={() => { copyText(item.site) }} >
                                            <lord-icon className="cursor-pointer"
                                                style={{ width: "25px", height: "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </td>
                                    <td className='  border border-black  text-center py-1justify-center items-center'>{item.username}
                                        <div className="lordicon cursor-pointer" onClick={() => { copyText(item.username) }} >
                                            <lord-icon className="cursor-pointer"
                                                style={{ width: "25px", height: "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </td>
                                    <td className='  border border-black  text-center py-1 justify-center items-center'>{"*".repeat(item.password.length)}
                                        <div className="lordicon cursor-pointer" onClick={() => { copyText(item.password) }} ></div>
                                        <lord-icon className="cursor-pointer"
                                            style={{ width: "25px", height: "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                            trigger="hover" >
                                        </lord-icon></td>
                                    <td className='  border border-black  text-center py-1 justify-center items-center'>
                                        <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}> <lord-icon
                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon></span>
                                        <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span></td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
