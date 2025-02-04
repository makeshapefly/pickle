"use client"

import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import TextError from "@/components/user/TextError"
import './customDatePickerWidth.css';

// Yup schema to validate the form
const schema = (isTab2) =>
    Yup.object().shape({
        name: Yup.string().required(),
        startDate: Yup.string().when([], {
            is: () => isTab2 == 1,
            then: () => Yup.string().required(
                "You must set a start date"
            ),
            otherwise: () => Yup.string()
        }),
        days: Yup.string().when([], {
            is: () => isTab2 == 1,
            then: () => Yup.array().min(1, "You must select at least one day for a recurring session"
            ),
            otherwise: () => Yup.array()
        }),
        sessionDate: Yup.string().when([], {
            is: () => isTab2 == 2,
            then: () => Yup.string().required(
                "You must set a date for the session"
            ),
            otherwise: () => Yup.string()
        }),
        price: Yup.string()
            .required("Price is required")
            .matches(/^[0-9]+\.[0-9]{2}$|[0-9]+\.[0-9]{2}[^0-9]/, "Price format must be XX.XX")
    });



const AddSessionForm = () => {
    const [isTab2, setIsTab2] = useState(1)
    const handleTab2 = (i) => {
        setIsTab2(i)
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            startDate: "",
            endDate: null,
            sessionDate: "",
            days: [],
            price: "",
        },

        // Pass the Yup schema to validate the form
        validationSchema: schema(isTab2),

        // Handle form submission
        onSubmit: async (values) => {
            // Make a request to your backend to store the data
            try {
                console.log('days: ' + JSON.stringify(values))
                console.log(isTab2)
            } catch (error) {
                console.log(error)
            }
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    const showToastMessage = () => {
        toast.success("User created !", {
            position: "top-center"
        });
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div className="wg-box">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap14">
                            <h5 className="mb-4">Name</h5>
                        </div>
                        <div className="body-text mb-2">
                            {/*<img src="/images/bg-menu/serve.png" width="50px" alt="" />*/}
                        </div>
                    </div>
                    <div className="left">
                        <div className="body-text"><p>Give this session a name, e.g. Thursday Night Pickleball.</p></div>
                    </div>
                    <div className="right flex-grow">
                        <fieldset>
                            <input className="flex-grow" type="text" placeholder="Session Name, e.g. Thursday Pickleball" onChange={handleChange} name="name" id="name" value={values.name} tabIndex={0} style={{ fontSize: '2rem', width: '100%' }} />
                        </fieldset>
                        {errors.name && touched.name ? (
                            <div style={{ marginTop: 10 }}>
                                <TextError id="name">{errors.name}</TextError>
                            </div>
                        ) : null}
                    </div>

                </div>


                <div style={{ marginTop: 20 }}></div>

                <div className="col-12 mb-20">
                    <div className="wg-box">
                        <div>
                            <h5 className="mb-16">Dates & Frequency</h5>
                            <div className="widget-tabs">
                                <ul className="widget-menu-tab style-1">
                                    <li className={isTab2 === 1 ? "item-title active" : "item-title"} onClick={() => handleTab2(1)}>
                                        <span className="inner"><span className="h6">Recurring Session</span></span>
                                    </li>
                                    <li className={isTab2 === 2 ? "item-title active" : "item-title"} onClick={() => handleTab2(2)}>
                                        <span className="inner"><span className="h6">One-off Session</span></span>
                                    </li>
                                </ul>
                                <div className="widget-content-tab">
                                    <div className="widget-content-inner active" style={{ display: `${isTab2 === 1 ? "block" : "none"}` }}>
                                        <div className="row">
                                            <div className="col-xl-6 mb-20">
                                                <div>
                                                    <h5 className="mb-4">Start Date</h5>
                                                    <div className="body-text"><p>Select a date on which this session will start.</p><p></p>&#160;<p></p></div>

                                                    <div className="select">
                                                        <input type="date" name="startDate" onClick={(e) => e.currentTarget.showPicker()} onChange={handleChange} value={values.startDate} />
                                                    </div>

                                                </div>
                                                {errors.startDate && touched.startDate ? (
                                                    <div style={{ marginTop: 10 }}>
                                                        <TextError id="startDate">{errors.startDate}</TextError>
                                                    </div>
                                                ) : null}
                                            </div>

                                            <div className="col-xl-6 mb-20">
                                                <div>
                                                    <h5 className="mb-4">End Date</h5>
                                                    <div className="body-text"><p>Select an end date for this session. <b>Leave blank if you want this session to run indefinitely.</b></p><p></p>&#160;<p></p></div>

                                                    <div className="select">
                                                        <input type="date" name="date" onChange={handleChange} onClick={(e) => e.currentTarget.showPicker()} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className="left">
                                                    <h5 className="mb-4">Days</h5>
                                                    <div className="body-text mb-10">Select the day(s) this session will take place.</div>
                                                </div>

                                                <div className="radio-buttons" style={{ display: 'inline', gap: 0 }}>
                                                    <div className="row">
                                                        <div className="col-xl-2 mb-4 col-sm-4 col-4">
                                                            <div className="item days">

                                                                <input className="total-checkbox" type="checkbox" name="days" value="monday" onChange={formik.handleChange} />
                                                                <label htmlFor="STANDARD"><span className="body-title-2">Monday</span></label>
                                                            </div>
                                                        </div>


                                                        <div className="col-xl-2 mb-4 col-sm-4 col-4">
                                                            <div className="item days">
                                                                <input className="total-checkbox" type="checkbox" name="days" value="tuesday" onChange={formik.handleChange} />
                                                                <label htmlFor="ADMIN"><span className="body-title-2">Tuesday</span></label>
                                                            </div>
                                                        </div>



                                                        <div className="col-xl-2 mb-4 col-sm-4 col-4">
                                                            <div className="item days">
                                                                <input className="total-checkbox" type="checkbox" name="days" value="wednesday" onChange={formik.handleChange} />
                                                                <label htmlFor="ADMIN"><span className="body-title-2">Wednesday</span></label>
                                                            </div>
                                                        </div>


                                                        <div className="col-xl-2 mb-4 col-sm-4 col-4">
                                                            <div className="item days">
                                                                <input className="total-checkbox" type="checkbox" name="days" value="thursday" onChange={formik.handleChange} />
                                                                <label htmlFor="ADMIN"><span className="body-title-2">Thursday</span></label>
                                                            </div>
                                                        </div>


                                                        <div className="col-xl-2 mb-4 col-sm-4 col-4">
                                                            <div className="item days">
                                                                <input className="total-checkbox" type="checkbox" name="days" value="friday" onChange={formik.handleChange} />
                                                                <label htmlFor="ADMIN"><span className="body-title-2">Friday</span></label>
                                                            </div>
                                                        </div>


                                                        <div className="col-xl-2 mb-4 col-sm-4 col-4">
                                                            <div className="item days">
                                                                <input className="total-checkbox" type="checkbox" name="days" value="saturday" onChange={formik.handleChange} />
                                                                <label htmlFor="ADMIN"><span className="body-title-2">Saturday</span></label>
                                                            </div>
                                                        </div>


                                                        <div className="col-xl-2 mb-4 col-sm-4 col-4">
                                                            <div className="item days">
                                                                <input className="total-checkbox" type="checkbox" name="days" value="sunday" onChange={formik.handleChange} />
                                                                <label htmlFor="ADMIN"><span className="body-title-2">Sunday</span></label>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                            {errors.days && touched.days ? (
                                                <div style={{ marginTop: 10 }}>
                                                    <TextError id="days">{errors.days}</TextError>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="widget-content-inner" style={{ display: `${isTab2 === 2 ? "block" : "none"}` }}>
                                        <div className="row">
                                            <div className="col-xl-6 mb-20">
                                                <div>
                                                    <h5 className="mb-4">Date of the session</h5>
                                                    <div className="body-text"><p>Select the date on which the session will take place.</p><p></p>&#160;<p></p></div>

                                                    <div className="select">
                                                        <input type="date" name="sessionDate" onClick={(e) => e.currentTarget.showPicker()} onChange={handleChange} value={values.sessionDate} />
                                                    </div>

                                                </div>
                                                {errors.sessionDate && touched.sessionDate ? (
                                                    <TextError id="name">{errors.sessionDate}</TextError>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div style={{ marginTop: 20 }}></div>

                <div className="wg-box">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap14">
                            <h5 className="mb-4">Booking & Visibility</h5>
                        </div>
                        <div className="body-text mb-2">
                        </div>
                    </div>
                    <div className="left">
                        <div className="body-text"><p>.</p></div>
                    </div>
                    <div className="right flex-grow">
                    </div>
                </div>

                <div style={{ marginTop: 20 }}></div>

                <div className="wg-box">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap14">
                            <h5 className="mb-4">Price & Payment</h5>
                        </div>
                        <div className="body-text mb-2">
                        </div>
                    </div>
                    <div className="col-xl-6 mb-20">
                        <fieldset>
                            <div className="body-title mb-10">Price per session (£)</div>
                            <input className="flex-grow" type="text" placeholder="Price" onChange={handleChange} name="price" id="price" value={values.price} tabIndex={0} style={{ fontSize: '2rem', width: '100%' }} />
                        </fieldset>
                        {errors.price && touched.price ? (
                            <div style={{ marginTop: 10 }}>
                                <TextError id="price">{errors.price}</TextError>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div style={{ marginTop: 20 }}></div>

                <div className="bot">
                    <button className="tf-button w180" type="submit">Save</button>
                </div>
            </form>

            <ToastContainer />
        </div>

    );
};

export default AddSessionForm;
