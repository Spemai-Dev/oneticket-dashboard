import React, { useState, useImperativeHandle, useEffect } from "react";
import './view-transaction.css';
import OffCanvas from "../../../components/OffCanvas/OffCanvas.tsx";
import group1 from "../../assets/Group1.png";

import toast, { Toaster } from 'react-hot-toast';

const ViewTransaction = (props: any) => {
    const { onClose, viewData } = props;

    // const { onClose, heading, onSubmitForm } = props;





    return (
        <div >
            <OffCanvas heading="Expenses details">
                <div className="canvas_body">
                    <div className="row mb-4">
                        <div className="col-12 d-flex justify-content-between mb-2">
                            <div className="tittle2">View Details</div>
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
                                <h4 className="canvas_sub_title mt-2 mb-2">User Details</h4>
                                <div className="row">
                                    <div className="col-6"><span className="lable_name">First Name </span></div>
                                    <div className="col-6"><span className="lable_date">:  {viewData?.customer_first_name || 'Not Available'}</span></div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><span className="lable_name">Last Name</span></div>
                                    <div className="col-6"><span className="lable_date">: {viewData?.customer_last_name || 'Not Available'}</span></div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><span className="lable_name">Email Address</span></div>
                                    <div className="col-6"><span className="lable_date">: {viewData?.customer_email || 'Not Available'}</span></div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><span className="lable_name">Phone Number</span></div>
                                    <div className="col-6"><span className="lable_date">: {viewData?.customer_phone_no || 'Not Available'}</span></div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><span className="lable_name">Date and Time</span></div>
                                    <div className="col-6"><span className="lable_date">: {viewData?.datetime || 'Not Available'}</span></div>
                                </div>

                                <div className="ticket-info">
                                    <h4 className="canvas_sub_title mt-5 mb-2">User Details</h4>
                                    {viewData?.tickets && viewData.tickets.length > 0 ? (
                                        viewData.tickets.map((ticket, index) => (
                                            <div className="row" key={index}>
                                                <div className="col-6">
                                                    <span className="lable_name">{ticket.eventTickets__ticket_name || "Unknown Ticket"}</span>
                                                </div>
                                                <div className="col-6">
                                                    <span className="lable_date">: {ticket.count || 0} ticket(s)</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No tickets available.</p>
                                    )}
                                </div>



                                {/* 
                        <div className="row">
                            <div className="col-6"><span className="lable_name">Verification Method</span></div>
                            <div className="col-6"><span className="lable_date">: Method</span></div>
                        </div>
                        <div className="row">
                            <div className="col-6"><span className="lable_name">NIC/Passport</span></div>
                            <div className="col-6"><span className="lable_date">: John</span></div>
                        </div>
                        <div className="row">
                            <div className="col-6"><span className="lable_name">DOB</span></div>
                            <div className="col-6"><span className="lable_date">: John</span></div>
                        </div>
                        <div className="row">
                            <div className="col-6"><span className="lable_name">Address</span></div>
                            <div className="col-6"><span className="lable_date">: John</span></div>
                        </div>
                        <h4 className="canvas_sub_title mt-2 mb-2">Payment Details</h4>
                      
                        <div className="row">
                            <div className="col-6"><span className="lable_name">Amount</span></div>
                            <div className="col-6"><span className="lable_date">: 123lkr</span></div>
                        </div>
                        <div className="row">
                            <div className="col-6"><span className="lable_name">Payment Method</span></div>
                            <div className="col-6"><span className="lable_date">: Visa</span></div>
                        </div>
                        <div className="row">
                            <div className="col-6"><span className="lable_name">Transaction Status</span></div>
                            <div className="col-6"><span className="lable_date">: Success</span></div>
                        </div>
                        <h4 className="canvas_sub_title mt-2 mb-2">Ticket Details</h4>
                        <div className="row">
                            <div className="col-6"><span className="lable_name">Event Name</span></div>
                            <div className="col-6"><span className="lable_date">: Success</span></div>
                        </div>
                        <div className="row">
                            <div className="col-6"><span className="lable_name">No of Tickets</span></div>
                            <div className="col-6"><span className="lable_date">: 2</span></div>
                        </div>
                        <div className="row">
                            <div className="col-6"><span className="lable_name">Ticket Category</span></div>
                            <div className="col-6"><span className="lable_date">: Success</span></div>
                        </div>
                        <div className="row">
                            <div className="col-6"><span className="lable_name">Seat Number</span></div>
                            <div className="col-6"><span className="lable_date">: Success</span></div>
                        </div>
                        <h4 className="canvas_sub_title mt-2 mb-2">Note</h4>
                        <div className="row">
                            <div className="col-12"><span className="lable_name">Lorem ipsum</span></div>
                           
                        </div>  */}




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
