"use client"

import { useFormik } from "formik";
import * as Yup from "yup";
import { addUser } from "@/app/actions/addUser"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextError from "./TextError"

// Yup schema to validate the form
const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
});

const AddUserForm = () => {
    // Formik hook to handle the form state
    const formik = useFormik({
        initialValues: {
            email: "",
            firstName: "",
            lastName: "",
            role: "STANDARD"
        },

        // Pass the Yup schema to validate the form
        validationSchema: schema,

        // Handle form submission
        onSubmit: async ({ email, firstName, lastName, role }) => {
            // Make a request to your backend to store the data
            try {
                const result = await addUser({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    created_at: '2024-12-06',
                    organisation: 1
                },
                    {
                        role: role,
                    })
                console.log(result)
                formik.resetForm()
                showToastMessage()
            } catch (error) {
                console.log(error)
            }
        },
    });

    // Destructure the formik object
    const { errors, touched, values, handleChange, handleSubmit } = formik;

    const showToastMessage = () => {
        toast.success("User created !", {
            position: "top-center"
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-add-new-user form-style-2">
                <div className="wg-box">
                    <div className="left">
                        <h5 className="mb-4">User</h5>
                        <div className="body-text"><p>Complete this form to add a new user to your organisation.</p><p></p>&#160;<p>The account will be activated when the user signs up with this email.</p></div>
                    </div>
                    <div className="right flex-grow">
                        <fieldset className="name mb-24">
                            <div className="body-title mb-10">Name <span className="tf-color-1">*</span></div>
                            <div className="flex gap10">
                                <input className="flex-grow" type="text" placeholder="First Name" name="firstName" id="firstName" tabIndex={1} onChange={handleChange} value={values.firstName} />
                                <input className="flex-grow" type="text" placeholder="Last Name" name="lastName" id="lastName" tabIndex={2} onChange={handleChange} value={values.lastName} />
                            </div>
                        </fieldset>
                        <div>{errors.firstName && touched.firstName && <span>{errors.firstName}</span>}</div>
                        <div>{errors.lastName && touched.lastName && <span>{errors.lastName}</span>}</div>
                        <fieldset className="email mb-24">
                            <div className="body-title mb-10">Email <span className="tf-color-1">*</span></div>
                            <input className="flex-grow" type="email" placeholder="Email" name="email" id="email" tabIndex={0} onChange={handleChange} value={values.email} />
                        </fieldset>
                        {errors.email && touched.email ? (
                            <TextError id="email">{errors.email}</TextError>
                        ) : null}
                    </div>
                </div>
                <div className="wg-box">
                    <div className="left">
                        <h5 className="mb-4">Role</h5>
                        <div className="body-text">Select a role for the new user.</div>
                    </div>
                    <div className="right flex-grow">
                        <fieldset className="mb-24">
                            <div className="body-title mb-10"></div>
                            <div className="radio-buttons">
                                <div className="item">
                                    <input type="radio" name="role" id="role" value="STANDARD" onChange={formik.handleChange} defaultChecked />
                                    <label htmlFor="STANDARD"><span className="body-title-2">Standard User</span></label>
                                </div>
                                <div className="item">
                                    <input type="radio" name="role" id="role" value="ADMIN" onChange={formik.handleChange} />
                                    <label htmlFor="ADMIN"><span className="body-title-2">Admin User</span></label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>



                <div className="bot">
                    <button className="tf-button w180" type="submit">Save</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddUserForm;
