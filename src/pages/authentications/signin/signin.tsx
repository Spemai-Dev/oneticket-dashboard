import React from 'react';
import './sign.css';
// import 'react-phone-number-input/style.css';
// import thumbnail from '../../../../assets/thumbnail.png';
// import card from '../../../../assets/Card.png';
// import man from '../../../../assets/man.png';
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Formik, useFormik, Form, Field, ErrorMessage } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useSearchParams, Navigate, useNavigate, useParams } from 'react-router-dom';
// import spemaiLogo from '../../../../assets/spemaiLogo.png';
import { sign } from '../../../_services/dashboard';







interface FormValues {
    email: string;
    password: string;

}
const saveDataToLocalStorage = (data: string) => {
    return new Promise<void>((resolve, reject) => {
        try {
            // Save the data to localStorage
            localStorage.setItem('token', data);
            // localStorage.setItem('user', data);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};


function SigninPage() {
    const [count, setCount] = useState([])
    const navigate = useNavigate();
    // const navigate = useNavigate();
    // const { id } = useParams();
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange = (evnt: any) => {
        setPasswordInput(evnt.target.value);
    }
    const handleKeyUp = (event: any) => {
        const inputValue = event.target.value;
        const numericRegex = /^[0-9+\s]*$/;

        if (!numericRegex.test(inputValue)) {
            event.target.value = inputValue.set(/[^0-9+\s]/g, '');
        }
    };
    const togglePassword = () => {
        console.log('hfthfghfgh')
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',

        },
        onSubmit: (values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
        validate: (values) => {
            const errors: Partial<FormValues> = {}; // Define errors as a partial object of FormValues
            if (!values.email) {
                errors.email = 'Email required';
            } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password required';
            }
            // if(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(values.email) && values.password){
            //     navigate(`/dashbord`)
            // }

            return errors;
        },

    });
    // const handleSubmit = async (data: any, setSubmitting: any) => {
    //     setSubmitting(true);
      
    //     try {
    //       const response = await sign(data); // Call the API
    //       const dataPost = response;
    //       console.log(dataPost,'dataPostdataPostdataPost')
      
    //       if (dataPost.status === 100) {
           
    //         saveDataToLocalStorage(dataPost.data?.access);
    //         localStorage.setItem("token", dataPost.data.access);
    //         toast.success("Login successful! 🎉");
    //         navigate(`/`);
    //       } else {
            
    //         toast.error(dataPost.message || "Login failed. Please check your credentials.");
    //       }
    //     } catch (error: any) {
         
    //       if (error.response) {
    //         const { status, data } = error.response;
      
    //         if (status === 401) {
             
    //           toast.error("Invalid credentials. Please try again.");
    //         } else {
              
    //           toast.error(data?.message || "An unexpected error occurred. Please try again.");
    //         }
    //       } else {
           
    //         console.error("Unexpected error:", error);
    //         toast.error("Something went wrong. Please try again.");
    //       }
    //     } finally {
    //       setSubmitting(false);
    //       toast.error("Something went wrong. Please try again.");
    //     }
    //   };
      
      


    const handleSubmit = async (data: any, setSubmitting: any) => {
        setSubmitting(true);
      

        const params = data.email;
      
        try {
            const response = await sign(data);
            const dataPost = await response;
            console.log("Resp54555555onse:", dataPost);
            localStorage.setItem("token", dataPost['data']['access'])
            setSubmitting(false);
            if (dataPost.status == 100) {
                saveDataToLocalStorage(dataPost.data?.access)
                toast.success("Success");
                navigate(`/`)

            } else {
                setSubmitting(false);
                toast.error(dataPost.message)

            }
        } catch (error) {
            console.error("Error:", error);
            setSubmitting(false);
            toast.success("Fail");
        }


    };
    useEffect(() => {


    }, []);


    return (
        <div className="login-root container-fluid">
            <div className='row'>
                <div className='col-sm-12 col-md-6 col-lg-6 left-side'>
                    {/* <div className='row mb-4'>
                        <div className='col-12'>
                            <span className='trust'>Trusted by..</span>
                            <span><img style={{ width: '72px', height: '72px' }} className='img' src={thumbnail} /></span>
                        </div>
                    </div>
                    <h2 className='left-h2 mb-5'>More than <span>{count}</span> small and medium-sized businesses.</h2>
                    <p className='left-p1 mb-5'>Our wide range of Business Solutions and added services will help you succeed.</p>
                    <div className='row mb-5 mt-5'>
                        <div className='col-12'>
                            <img style={{ width: '441px', height: 'auto' }} className='img' src={card} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-3 col-md-3 col-lg-3'>
                            <img style={{ width: '109px', height: '109px' }} className='img' src={man} />
                        </div>
                        <div className='col-sm-9 col-md-9 col-lg-9'>
                            <h4 className='having-sign'>Having trouble to sign in ?</h4>
                            <p className='having-sign-p'>You won't be lost. we will guide you every step of the way.</p>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <div className='col-12'>
                        <button className="contact-support" type="submit" onClick={() => window.open("https://form.jotform.com/231382697738066", "_blank", "noopener,noreferrer")} >
                                Contact support
                            </button>
                        </div>
                    </div> */}

                </div>
                <div className='col-sm-12 col-md-6 col-lg-6 right-side'>
                    <div className='row mb-5'>
                        <div className='col-12'>
                            {/* <img style={{ width: '160px', height: 'auto' }} className='img' src={spemaiLogo} /> */}
                        </div>
                    </div>
                    <h3 className='title-signin'>OneTicket</h3>
                    <p className='title-sub mb-5'>Sign in to your OneTicket account</p>

                    <form onSubmit={formik.handleSubmit} >

                        <div className="row">
                            <div className="col-12">
                                <label className='lable-name mb-2' style={{ width: '100%' }}>User name  </label>
                                <input className="input-name"
                                    style={{ width: '100%' }}
                                    type="text"
                                    onChange={formik.handleChange}
                                    placeholder="olivia@spemai.com "
                                    name="email"
                                    value={formik.values.email}
                                // className={inputClassName}
                                />
                                <div className='mb-2'>
                                    {formik.errors.email && formik.touched.email && (
                                        <div className="error">{formik.errors.email}</div>
                                    )}

                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label className='lable-name mb-2' style={{ width: '100%' }}>Password  </label>

                                <div className="input-container">
                                    <input className="input-name"
                                        style={{ width: '100%' }}
                                        name="password"
                                        placeholder="**********"
                                        type={passwordType}
                                        onChange={formik.handleChange}
                                        // onChange={handlePasswordChange}
                                        // value={passwordInput}
                                        value={formik.values.password}
                                    />
                                    <span onClick={togglePassword} className="input-icon"> {passwordType === "password" ? <FiEye /> : <FiEyeOff />}</span>

                                </div>
                                <div >
                                    {formik.errors.password && formik.touched.password && (
                                        <div className="error">{formik.errors.password}</div>
                                    )}

                                </div>
                            </div>

                        </div>
                        {/* <button disabled={formik.isSubmitting} className="_button mt-4 mb-5" type="submit">
                        Login
                        </button> */}
                        <button
                            disabled={formik.isSubmitting}
                            className="_button mt-4 mb-5"
                            type="submit"
                        >
                            {formik.isSubmitting ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                                'Login'
                            )}
                        </button>

                    </form>

                    <div className='row mb-4 mt-4'>
                        <div className='col-12'>
                            <p className='terms-condition'>By proceeding, you agree to the <b><a href="https://terms-of-service.spemai.com/" target="_blank">Terms and Conditions </a></b>  and <b><a href="https://privacy.policy.spemai.com/" target="_blank"> Privacy Policy</a></b> </p>
                        </div>
                    </div>
                    {/* <div className='row mt-4'>
                        <div className='col-12'>
                        <p className='terms-condition'>Already have a Spemai account? <b> <Link to="/">Sign in
                        </Link> </b> </p>
                        </div>
                    </div> */}




                </div>
            </div>

        </div>
    );
}

export default SigninPage;
