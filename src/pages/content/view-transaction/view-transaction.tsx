import React, { useState, useImperativeHandle, useEffect } from "react";
import './view-transaction.css';
import OffCanvas from "../../../components/OffCanvas/OffCanvas.tsx";
import group1 from "../../assets/Group1.png";
import { LuRefreshCw } from "react-icons/lu";
import { reSend } from "../../../_services/dashboard.js";

import toast, { Toaster } from 'react-hot-toast';
import { IoRefresh } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";


const ViewTransaction = (props: any) => {
    const { onClose, viewData, onRetry } = props;
    const [isSubmittingSms, setIsSubmittingSms] = useState(false); // For SMS retry
    const [isSubmittingEmail, setIsSubmittingEmail] = useState(false); // For Email retry
    function jsonToUrlParams(json: any) {
        const params = new URLSearchParams();
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                params.append(key, json[key]);
            }
        }
        return params.toString();
    }

    // const { onClose, heading, onSubmitForm } = props;
    // const handleRetry = () => {

    //     console.log('Retry button clicked');
    // };
    const handleRetry = async (type) => {
        if (!type) {
            toast.error("Invalid retry type.");
            return;
        }
        if (!viewData.onepay_transaction_id) {
            toast.error("Onepay Transaction is null. Please try again.");
            return;
        }

        // Set the loader based on the retry type
        if (type === "sms") {
            setIsSubmittingSms(true);
        } else if (type === "email") {
            setIsSubmittingEmail(true);
        }

        try {
            // Base parameters
            const params = {
                onepay_transaction_id: viewData.onepay_transaction_id,
                is_send_sms: false,
                is_send_email: false,
            };

            // Update parameters based on type
            if (type === "sms") {
                params.is_send_sms = true;
            } else if (type === "email") {
                params.is_send_email = true;
            }

            // Send the request
            const response = await reSend(jsonToUrlParams(params)); // Adjust `reSend` function as needed

            console.log('API Response:', response); // Log the entire response for debugging

            // Check the response status
            if (response?.data?.status === 200) {
                onRetry(viewData.onepay_transaction_id);
                toast.success(response?.data?.message || "Retry successful!");
            } else {
                toast.error(response?.data?.message || "Retry failed.");
            }
        } catch (error) {
            console.error("Error during retry:", error);
            toast.error("An error occurred during retry.");
        } finally {
            // Hide loader after completion
            if (type === "sms") {
                setIsSubmittingSms(false);
            } else if (type === "email") {
                setIsSubmittingEmail(false);
            }
        }
    };
    const totalTicketCount = viewData?.tickets?.reduce((total, ticket) => total + ticket.count, 0);
    // const totalTicketAmount = viewData?.tickets?.reduce((total, ticket) => total + ticket.ticket_amount, 0);
    const totalTicketAmount = viewData?.tickets?.reduce((total, ticket) => total + (ticket.ticket_amount * ticket.count), 0);



//     const totalTicketCount = viewData?.tickets?.length 
//     ? viewData.tickets.reduce((total, ticket) => total + (ticket.count || 0), 0) 
//     : 0;

// const totalTicketAmount = viewData?.tickets?.length 
//     ? viewData.tickets.reduce((total, ticket) => total + (ticket.ticket_amount || 0), 0) 
//     : 0;


    return (
        <div >
            <OffCanvas heading="Expenses details">
                <Toaster position="top-right" reverseOrder={false} />
                <div className="canvas_body">
                    {/* <div className="row mb-4 d-flex justify-content-between">
                        <div className="col-12 mb-2">
                            <div className="tittle2">View Details</div>
                            <img
                                className="pe-2 close-icon"
                                src={group1}
                                alt="Close"
                                onClick={onClose}
                            />
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-9">
                            <span className="tittle2">View Details</span>
                        </div>
                        <div style={{ textAlign: 'right' }} className="col-3">
                        <img
                                className="pe-2 close-icon"
                                src={group1}
                                alt="Close"
                                onClick={onClose}
                            />
                        </div>
                    </div>


                    <div className="row canvas_body2">
                        <div className="col-12">
                            <div className="d">
                                <h4 className="canvas_sub_title mt-2">User Details</h4>
                                <div className="row new_css">
                                    <div className="col-4"><span className="lable_name">First Name </span></div>
                                    <div className="col-8"><span className="lable_date">:  {viewData?.customer_first_name || 'Not Available'}</span></div>
                                </div>
                                <div className="row new_css">
                                    <div className="col-4"><span className="lable_name">Last Name</span></div>
                                    <div className="col-8"><span className="lable_date">: {viewData?.customer_last_name || 'Not Available'}</span></div>
                                </div>
                                <div className="row new_css">
                                    <div className="col-4"><span className="lable_name">Email Address</span></div>
                                    <div className="col-8"><span className="lable_date">: {viewData?.customer_email || 'Not Available'}</span></div>
                                </div>
                                <div className="row new_css">
                                    <div className="col-4"><span className="lable_name">Phone Number</span></div>
                                    <div className="col-8"><span className="lable_date">: {viewData?.customer_phone_no || 'Not Available'}</span></div>
                                </div>

                                <div className="row new_css">
                                    <div className="col-4"><span className="lable_name">Verification ID</span></div>
                                    <div className="col-8"><span className="lable_date">: {viewData?.verification_id || 'Not Available'} ({viewData?.verification_method || 'Not Available'})</span></div>
                                </div>
                                <div className="row new_css">
                                    <div className="col-4"><span className="lable_name">Date and Time</span></div>
                                    <div className="col-8"><span className="lable_date">: {viewData?.datetime || 'Not Available'}</span></div>
                                </div>
                                <h4 className="canvas_sub_title mt-3 mb-2">Payment Details</h4>
                                <div className="row new_css">
                                    <div className="col-4"><span className="lable_name">Status</span></div>
                                    <div className="col-8"><span className="lable_date">: Success</span></div>
                                </div>
                                <div className="row new_css">
                                    <div className="col-4"><span className="lable_name">Onepay Transaction ID</span></div>
                                    <div className="col-8"><span className="lable_date">: {viewData?.onepay_transaction_id || 'Not Available'}</span></div>
                                </div>
                                <div className="row new_css">
                                    <div className="col-4"><span className="lable_name">Payment Method</span></div>
                                    <div className="col-8"><span className="lable_date">: {viewData?.provider || 'Not Available'}</span></div>
                                </div>
                                <h4 className="canvas_sub_title mt-3 mb-2">Notification details</h4>
                                {/* <div className="row">
                                    <div className="col-4"><span className="lable_name">Email Notification</span></div>
                                    <div className="col-8">
                                        <span className={`lable_date ${viewData?.is_email_send === 1 ? 'suc_c' : 'fail_'}`}>: {viewData?.is_email_send === 1 ? 'Success' : 'Fail'}</span>
                                        <span style={{ float: "right" }}>
                                            <button
                                                className="btn btn-retry ms-2"
                                                onClick={() => handleRetry(is_email)} 
                                                disabled={isSubmitting} 
                                            >
                                                {isSubmitting ? (
                                                    <span
                                                        className="spinner-border spinner-border-sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                ) : (
                                                    "Retry"
                                                )}
                                            </button>
                                        </span>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4"><span className="lable_name">SMS Notification</span></div>
                                    <div className="col-8">
                                        <span className={`lable_date ${viewData?.is_email_send === 1 ? 'suc_c' : 'fail_'}`}>: {viewData?.is_sms_send === 1 ? 'Success' : 'Fail'}</span>
                                        <span style={{ float: "right" }}>
                                            <button
                                                className="btn btn-retry ms-2"
                                                onClick={() => handleRetry(is_sms)} 
                                                disabled={isSubmitting} 
                                            >
                                                {isSubmitting ? (
                                                    <span
                                                        className="spinner-border spinner-border-sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                ) : (
                                                    "Retry"
                                                )}
                                            </button>
                                        </span>
                                        </div>
                                </div> */}
                                <div className="row new_css">
                                    <div className="col-4"><span className="lable_name">Email Notification</span></div>
                                    <div className="col-8">
                                        <span className={`lable_date ${viewData?.is_email_send === true ? 'suc_c' : 'fail_'}`}>: {viewData?.is_email_send === true ? 'Success' : 'Failed'}</span>
                                        <span style={{ float: "right" }}>


                                            <button
                                                className="resend"
                                                onClick={() => handleRetry('email')}
                                                disabled={isSubmittingEmail}
                                            >
                                                {isSubmittingEmail ? (
                                                    ''
                                                ) : (
                                                    <span style={{ marginRight: '5px', marginTop: '-3px' }}> <IoRefresh /></span>

                                                )}
                                                {isSubmittingEmail ? (
                                                    <span
                                                        className="spinner-border spinner-border-sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                ) : (
                                                    "Resend"
                                                )}
                                            </button>
                                        </span>
                                    </div>
                                </div>

                                <div className="row new_css">
                                    <div className="col-4"><span className="lable_name">SMS Notification</span></div>
                                    <div className="col-8">
                                        <span className={`lable_date ${viewData?.is_sms_send === true ? 'suc_c' : 'fail_'}`}>: {viewData?.is_sms_send === true ? 'Success' : 'Failed'}</span>
                                        <span style={{ float: "right" }}>
                                            <button
                                                className="resend"
                                                onClick={() => handleRetry('sms')}
                                                disabled={isSubmittingSms}
                                            >
                                                {isSubmittingSms ? (
                                                    ''
                                                ) : (
                                                    <span style={{ marginRight: '5px', marginTop: '-3px' }}> <IoRefresh /></span>

                                                )}
                                                {isSubmittingSms ? (
                                                    <span
                                                        className="spinner-border spinner-border-sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>

                                                ) : (
                                                    "Resend"
                                                )}
                                            </button>
                                        </span>
                                    </div>
                                </div>


                                <div className="ticket-info">
                                    <h4 className="canvas_sub_title mt-5 mb-2">Tickets Details</h4>
                                    {viewData?.tickets && viewData.tickets.length > 0 ? (
                                        <div className='row'>
                                            <div className='col-12 d-flex justify-content-center align-items-center'>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th className="t_head">Ticket Name</th>
                                                            <th className="t_head">Ticket Price</th>
                                                            <th className="t_head">No of Tickets</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {viewData?.tickets?.map((ticket, index) => {
                                                            // You can assign colors based on the index or any condition you prefer
                                                            const rowColor = index === 0 ? 'row-color-0' : index === 1 ? 'row-color-1' : index === 2 ? 'row-color-2' : index === 3 ? 'row-color-3' : 'row-color-4';
                                                            return (
                                                                <tr key={index} >
                                                                    <td className={`text-right ${rowColor}`}>{ticket.ticket_name}</td>
                                                                    <td className="text-right">{ticket.ticket_amount}</td>
                                                                    <td style={{ color: '#00900A' }} className="text-right">{ticket.count}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>

                                            </div>
                                            <div className="col-12 mt-1 mb-4">
                                                <div className="row">
                                                    <div className="col-5">
                                                        <span className="ticket_count_name">Total Tickets : </span><span className="ticket_count_data">{totalTicketCount}</span>
                                                    </div>
                                                    <div style={{ textAlign: 'right' }} className="col-7">
                                                        <span className="ticket_count_name">Total Amount : </span><span className="ticket_count_data">{viewData?.currency || 'LKR'} {totalTicketAmount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    ) : (
                                        <p>No tickets available.</p>
                                    )}

                                </div>


                            </div>
                        </div>
                    </div>


                    {/* <div className="row footer2" >
                        <div className="col-12">
                            <button className="footer_btn" type="submit" >
                                Refund
                            </button>

                        </div>
                    </div> */}

                </div>


            </OffCanvas>

        </div>
    );
}

export default ViewTransaction;
