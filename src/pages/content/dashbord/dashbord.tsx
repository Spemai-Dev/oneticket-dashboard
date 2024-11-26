import React, { useState, useImperativeHandle, useEffect, useRef } from "react";
import './dashbord.css';
import image from '../../../pages/assets/image.png'
import { BsBorderBottom } from 'react-icons/bs';
import { BiColor } from 'react-icons/bi';
import { CgSoftwareDownload } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";
import CreateCategory from '../view-transaction/view-transaction.tsx'
import { IoEyeOutline } from "react-icons/io5";
import axios from 'axios';
import { environment } from '../../../environment/enviroment.js';
import toast from 'react-hot-toast';
import { deleteToken } from "../../../_auth/auth.js";
import { useNavigate } from "react-router-dom";
import { getALLevent, getEventDetails, getPartiDetails, geteventVolume, getDetailsById, getEventS } from "../../../_services/dashboard.js";
import { Formik, Form, Field } from 'formik';
import Pagination from "../../../components/pagination/pagination.tsx";

interface Ticket {
    id: number;
    ticket_name: string;
    total_tickets: string;
    remaining_tickets: string;
    ticket_amount: string;
    ticket_visualize_amount: string;
    ticket_description: string;
    is_free_ticket: number;
}
interface Participant {
    customer_email: string;
    customer_name: string;
    is_refund: boolean;
    [key: string]: any; // Add this if there are other unknown fields
}

const ticketsData: Ticket[] = [];
function Dashbord() {
    var filterParams: any = {}
    const [dataCount, setDataCount] = useState(0);
    var tablePageIndex = 1
    const [currentPage, setCurrentPage] = useState(tablePageIndex);
    const [itemsPerPage, setIemsPerPage] = useState(10);

    const [searchQuery, setSearchQuery] = useState('');
    const [partData, setPartData] = useState<Participant[]>([]);
    const [filteredData, setFilteredData] = useState<Participant[]>([]);
    const navigate = useNavigate();
    const [event, setData] = useState<any>();
    const [tStatus, setTicketStatus] = useState<any>();
    const [defaultEventId, setDefaultEventId] = useState("")
    const [eventData, setEventData] = useState<any>(null);
    const [eventId, setId] = useState(defaultEventId)
    const [volume, setVolume] = useState<any>(null);
    const [data, setEventDetails] = useState<any>(null);
    const [modalData, setModalData] = useState(null);
    const [isCategoryCreateOffCanvasOpen, setIsCategoryCreateOffCanvasOpen] = useState(false);

    const handlePageChange = async (pageNumber: any) => {
        await setCurrentPage(pageNumber);
        tablePageIndex = pageNumber
        getDataParticipants()
    };
    function jsonToUrlParams(json: any) {
        const params = new URLSearchParams();
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                params.append(key, json[key]);
            }
        }
        return params.toString();
    }
    // const handleOpenOffCanvasCatCreate = () => {
    //     setIsCategoryCreateOffCanvasOpen(true);

    // };
    const handleOpenOffCanvasCatCreate = async (id2) => {
        if (!id2) return; // Ensure id is available

        try {
            console.log('Fetching details for ID:', id2);

            let params = {
                event_id: eventId,
                transaction_id: id2
            };
            const response = await getDetailsById(jsonToUrlParams(params));
            if (response?.data?.status === 200) {
                console.log('Data:', response.data.data);
                setModalData(response.data.data);
                setIsCategoryCreateOffCanvasOpen(true);
            } else {
                console.error('Error:', response?.data?.message || 'Failed to fetch details');
                toast.error(response?.data?.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error fetching details:', error);
            toast.error('An unexpected error occurred.');
        }
    };

    const handleCloseOffCanvasCatCreate = () => {
        setIsCategoryCreateOffCanvasOpen(false);

    };
    const loadDataCreateCat = async (data: any) => {

    };

    const getData = async () => {
        const data = await getALLevent();

        console.log("Reimbursement data", data.data.data);
        setData(data.data.data);
        setDefaultEventId(data.data.data[0].event_details);
        fetchData(data.data.data[0].event_details);
        getDataParticipants()
        getVolume(data.data.data[0].event_details)

    };
    const newEvent = async (id) => {
        // const data = await getALLevent();

        setDefaultEventId(id);
        getEventStatus()
        getDataParticipants()
        getVolume(id)


    };

    const hasTickets = true;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(date);

        return formattedDate;
    };
    const fetchData = async (eventId) => {

        if (!eventId) return; // Make sure the eventId is available before fetching
        const data = await getEventDetails(eventId);
        if (data.data?.status === 100) {
            newEvent(eventId)
            setId(eventId)

            setEventData(data.data.data);
            setEventDetails(data.data.data.tickets);
            console.log(data.data.data.tickets, 'rroofcc')

        } else {
            console.error(data.message || 'Getting events failed!');
            toast.error('Getting events failed!', { id: 'getEvents' });
        }
        console.log("detailss", data.data.data);
    };

    const getDataParticipants = async () => {
        if (!eventId) return;

        try {
            let params = {
                page: tablePageIndex || 1,
                limit: itemsPerPage || 10,
                id: eventId,
                search_text: searchQuery.trim(), // Add search query to params
                ...filterParams,
            };

            const data = await getPartiDetails(jsonToUrlParams(params));

            if (data?.data?.status === 200) {
                setPartData(data.data.data);
                setDataCount(data.data["count"] || 0);
                console.log(data.data["count"], 'Participant count');
            } else {
                console.error(data?.data?.message || 'Getting participants failed!');
                toast.error(data?.data?.message || 'Failed to fetch participants!');
            }
        } catch (error) {
            console.error('Error fetching participants:', error);
            toast.error('An error occurred while fetching participants.');
        }
    };
    const getEventStatus = async () => {
        if (!eventId) return;

        try {
            let params = {
                event_id: eventId,
            };
            const data = await getEventS(jsonToUrlParams(params));

            if (data?.data?.status === 100) {
                setTicketStatus(data.data.data);
                console.log(data.data.data, 'status');
            } else {

                toast.error(data?.data?.message || 'Failed to fetch participants!');
            }
        } catch (error) {
            console.error('Error fetching participants:', error);
            toast.error('An error occurred while fetching participants.');
        }
    };

    // Debounce search query
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            getDataParticipants();
        }, 500); // Adjust debounce delay (in ms) as needed

        return () => clearTimeout(delayDebounce);
    }, [searchQuery, tablePageIndex, eventId]);


    // useEffect(() => {
    //     if (searchQuery.trim() === '') {
    //         setFilteredData(partData);
    //     } else {
    //         const filtered = partData.filter((item) =>
    //             item.transaction_reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             item.datetime.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             item.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             item.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             item.total_amount.includes(searchQuery) // No need for `.toLowerCase()` as it's numeric-like
    //         );
    //         setFilteredData(filtered);
    //         console.log(filtered, 'filtered data');
    //     }
    // }, [searchQuery, partData]);
    useEffect(() => {
        const trimmedQuery = searchQuery.trim().toLowerCase(); // Trim and lowercase query once

        if (trimmedQuery === '') {
            setFilteredData(partData); // Reset to full data if query is empty
        } else {
            const filtered = partData.filter((item) => {
                // Safely check each property
                const matchesTransaction = item.transaction_reference?.toLowerCase().includes(trimmedQuery);
                const matchesDatetime = item.datetime?.toLowerCase().includes(trimmedQuery);
                const matchesName = item.customer_name?.toLowerCase().includes(trimmedQuery);
                const matchesEmail = item.customer_email?.toLowerCase().includes(trimmedQuery);
                const matchesAmount = item.total_amount?.toString().includes(trimmedQuery);

                // Return true if any of the conditions match
                return matchesTransaction || matchesDatetime || matchesName || matchesEmail || matchesAmount;
            });

            setFilteredData(filtered); // Update filtered data
            console.log(filtered, 'filtered data');
        }
    }, [searchQuery, partData]);





    const getVolume = async (eventId) => {
        if (!eventId) return; // Make sure the eventId is available before fetching
        const data = await geteventVolume(eventId);
        if (data.data?.status === 100) {
            console.log(data.data.data, 'volume')
            setVolume(data.data.data);
        } else {
            console.error(data.message || 'Getting events failed!');
            toast.error('Getting events failed!', { id: 'getEvents' });
        }
        console.log("detailss", data.data.data);

    };
    useEffect(() => {
        getData()
    }, []);
    if (!eventData) {
        return <p style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
        }}>Loading...</p>;
    }
    const parseTicketValue = (value: string): number => {
        return parseInt(value, 10) || 0;
    };
    const totalTicketsSold = data.reduce((acc, ticket) => {
        return acc + (parseInt(ticket.total_tickets, 10) - parseInt(ticket.remaining_tickets, 10));
    }, 0);

    const totalSalesAmount = data.reduce((acc, ticket) => {
        return acc + (parseInt(ticket.total_tickets, 10) - parseInt(ticket.remaining_tickets, 10)) * parseFloat(ticket.ticket_amount);
    }, 0);

    //    get status




    return (
        <div className='main'>
            <div className="container mt-3">
                <h3 className='event_name mb-4 mt-1'>Event ticket dashboard  <span className='sub_name'>
                    <Formik
                        initialValues={{ selectedEvent: defaultEventId }}
                        onSubmit={(values) => {
                            console.log("Form Submitted with Event ID:", values.selectedEvent);
                        }}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <Field
                                    as="select"
                                    className="select_"
                                    name="selectedEvent"
                                    id="event"
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        setFieldValue("selectedEvent", selectedId);
                                        fetchData(selectedId);
                                    }}
                                >
                                    <option value="" label="Select an event" />
                                    {event.map((item) => (
                                        <option key={item.event_details} value={item.event_details}>
                                            {item.event_name}
                                        </option>
                                    ))}
                                </Field>
                            </Form>
                        )}
                    </Formik>
                </span></h3>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-lg-6'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='menu_itam'  >
                                    {/* <p className='dh-count mt-3'>{totalTicketsSold}</p> */}
                                    <p className='dh-count mt-3'> {(volume && volume.total_tickets && !isNaN(volume.total_tickets) ? volume.total_tickets : '0')}</p>
                                    <p className='dh-sub-description mt-3'>Number of Ticket Sale</p>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='menu_itam2'  >
                                    {/* <p className='dh-count2 mt-3'>{totalSalesAmount.toFixed(2)}  <span className='dh-currency'>{eventData.tickets_currency || 'N/A'}</span></p> */}
                                    <p className='dh-count2 mt-3'>
                                        {(volume && volume.total_amount && !isNaN(volume.total_amount) ? volume.total_amount.toFixed(2) : '0.00')}
                                        <span className='dh-currency'>{eventData && eventData.tickets_currency ? eventData.tickets_currency : 'N/A'}</span>
                                    </p>
                                    {/* <p className='dh-sub-description2 mt-3'>
                                        {(volume && volume.total_tickets && !isNaN(volume.total_tickets) ? volume.total_tickets.toFixed(2) : 'N/A')}
                                        <span className='dh-currency'>{eventData && eventData.tickets_currency ? eventData.tickets_currency : 'N/A'}</span>
                                    </p> */}


                                    <p className='dh-sub-description2 mt-3'>Total Ticket Sale</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-12 col-md-6 col-lg-6'>
                        <div className='menu_itam3'  >
                            <div className='row'>
                                <div className='col-sm-12 col-md-8 col-lg-8' >
                                    <div className='event_d_grid'>
                                        <h3 className='event_d'>Event Name :<span className='event_d_data'>{eventData.event_name || 'N/A'}</span></h3>
                                        <div className='border_line mt-3 mb-3'></div>
                                        <div className='row mb-4'>
                                            <div className='col-6'>
                                                <div className="section_d">
                                                    <p className="dh_data_head">Event date and time</p>
                                                    <p className="dh_data">{formatDate(eventData.event_datetime) || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="section_d">
                                                    <p className="dh_data_head">Event Expire Date</p>
                                                    <p className="dh_data">{formatDate(eventData.event_expire_on) || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className="section_d">
                                                    <p className="dh_data_head">Venue</p>
                                                    <p className="dh_data">{eventData.venue || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="section_d">
                                                    <p className="dh_data_head">Currency</p>
                                                    <p className="dh_data">{eventData.tickets_currency || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className='col-sm-12 col-md-4 col-lg-4 image_hide'>
                                    <img
                                        style={{
                                            width: '100%',
                                             height: 'auto',
                                            // height: '100%',
                                            // objectFit: 'cover'
                                        }}
                                        className='img'
                                        src={`${environment.aws}${eventData.event_banner}`}
                                        alt="banner"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <h3 className='event_name_sub mb-4 mt-4'>Event tickets</h3>
                <div className='dh_summary_section'  >
                    <div className="row" style={{ display: 'flex' }}>
                        <div className='col-sm-12 col-md-5 col-lg-7' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className='event_d_grid2' style={{ flexGrow: 1 }}>
                                <div className='row'>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head event_ticket_name" style={{ color: '#C67300' }}>
                                                Ticket Name
                                            </p>

                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head event_ticket_name">Total Tickets</p>

                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head event_ticket_name">Remaining Tickets</p>

                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head event_ticket_name">Display Price</p>

                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head event_ticket_name">Tickets Avalability</p>

                                        </div>
                                    </div>
                                    {/* <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head event_ticket_name">Price</p>

                                        </div>
                                    </div> */}

                                    {/* <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head event_ticket_name">Status</p>

                                        </div>
                                    </div> */}
                                </div>
                                {hasTickets ? (

                                    data.map(ticket => (
                                        <React.Fragment key={ticket.id}>
                                            <div className='row'>
                                                <div className='col-20'>
                                                    <div className="section_d">

                                                        <p className="dh_data">{ticket.ticket_name}</p>
                                                    </div>
                                                </div>
                                                <div className='col-20'>
                                                    <div className="section_d">

                                                        <p className="dh_data">{ticket.total_tickets}</p>
                                                    </div>
                                                </div>

                                                <div className='col-20'>
                                                    <div className="section_d">

                                                        <p className="dh_data">{ticket.remaining_tickets}</p>
                                                    </div>
                                                </div>

                                                {/* <div className='col-20'>
                                                    <div className="section_d">

                                                        <p className="dh_data">{ticket.ticket_amount}</p>
                                                    </div>
                                                </div> */}
                                                <div className='col-20'>
                                                    <div className="section_d">

                                                        <p className="dh_data">{ticket.ticket_visualize_amount}</p>
                                                    </div>
                                                </div>
                                                <div className='col-20'>
                                                    <div className="section_d">

                                                        <p className='dh_data'>
                                                            {eventData && eventData.is_sold_out ? (
                                                                <span className='sold-out'>Sold Out</span>
                                                            ) : (
                                                                <span className='available'>Available</span>
                                                            )}
                                                        </p>

                                                    </div>
                                                </div>
                                                {/* <div className='col-20'>
                                                    <div className="section_d">

                                                        <p className='dh_data'>
                                                            {eventData && eventData.is_active ? (
                                                                <span className='sold-out'>Active</span>
                                                            ) : (
                                                                <span className='available'>Deactive</span>
                                                            )}
                                                        </p>

                                                    </div>
                                                </div> */}

                                            </div>
                                            <div className='line_summary_table mt-3 mb-3'></div>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <p>No tickets available at the moment.</p>
                                )}

                            </div>
                        </div>
                        <div className='col-sm-12 col-md-8 col-lg-5' style={{ display: 'flex', flexDirection: 'column' }}>
                            {hasTickets ? (
                                <div className="row borderRow_bottom" style={{ flexGrow: 1 }}>
                                    {tStatus && tStatus.length > 0 ? (
                                        tStatus.map((ticket) => (
                                            <div key={ticket.id} className="col-4 borderCol_right box_grid">
                                                <p className="box_name">{ticket.name}</p>
                                                <h4 className="box_data_1">
                                                    {parseTicketValue(ticket.purchased_ticket_count)}
                                                    <span className="box_data_2">
                                                        /{parseTicketValue(ticket.checked_in_ticket_count)}
                                                    </span>
                                                </h4>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No tickets available</p>
                                    )}
                                </div>



                            ) : (
                                <div className='row borderRow_bottom' style={{ flexGrow: 1 }}>
                                    <div className='col-4 borderCol_right box_grid update_grid'>
                                        <p className='box_name'>No Data</p>
                                        <h4 className='box_data_1'>--<span className='box_data_2'>/--</span></h4>
                                    </div>
                                </div>
                            )}
                            <div className='row borderRow_bottom' style={{ flexGrow: 1 }}>
                                <div className='col-4 borderCol_right box_grid' >
                                    <p style={{ color: 'transparent' }} className='box_name'>VIP</p>
                                    <h4 style={{ color: 'transparent' }} className='box_data_1'>75</h4>
                                </div>
                                <div className='col-4 borderCol_right' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                </div>

                                <div className='col-4 borderCol_right update_grid' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mb-4 mt-4">
                    <div className="col d-flex justify-content-between align-items-center">
                        <h3 className="event_name_sub mb-4 mt-4">Participants List</h3>

                        <div className="d-flex justify-content-end align-items-center">
                            <span style={{ color: '#8E00AB', fontSize: 'large' }}><CgSoftwareDownload /><span style={{ fontSize: '14px', color: '#8E00AB', marginLeft: '3px', fontWeight: '500', marginRight: '10px' }}>Download Reports</span></span>

                            {/* <div className="input-with-icon">
                                <IoSearchOutline className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search"
                                />
                            </div> */}
                            <div className="input-with-icon">
                                <IoSearchOutline className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search by Email"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className='table_data_grid'>
                    <div className='default-table table-container'>
                        <div className="table_scroll">

                            <table className="table align-middle" style={{ borderTop: "hidden", borderBottom: 'hidden' }}>
                                <thead>
                                    <tr className="table_header_text">
                                        <th className="table_header_text">TICKET REFERENCE</th>
                                        <th className="table_header_text">DATE TIME</th>
                                        <th className="table_header_text">NAME</th>
                                        <th className="table_header_text">EMAIL ADDRESS</th>
                                        <th className="table_header_text">STATUS</th>
                                        {/* <th className="table_header_text">TICKET COUNT</th> */}
                                        <th className="table_header_text">PAID AMOUNT</th>
                                        {/* <th className="table_header_text">PAYMENT TYPE</th> */}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="inventory" style={{ backgroundColor: "#F9FAFB" }}>
                                    {dataCount > 0 ? (
                                        filteredData.map((item, index) => (
                                            <tr key={index} style={{ borderTop: 'hidden' }} className='td_tr'>
                                                <td className="inventory_td">{item.transaction_reference}</td>
                                                <td className="inventory_td">{new Date(item.datetime).toLocaleString()}</td>
                                                <td className="inventory_td">{item.customer_name}</td>
                                                <td className="inventory_td">{item.customer_email}</td>
                                                <td className="inventory_td">{item.is_refund ? "Refund" : "Paid"}</td>
                                                <td className="inventory_td">{item.total_amount} LKR</td>

                                                <td>
                                                    <div className="row">
                                                        <div className="col d-flex align-items-center">
                                                            <div
                                                                className="check_in"
                                                                style={{ color: item.is_checked_in ? "#28a745" : "#dc3545" }}
                                                            >
                                                                {item.is_checked_in ? "Check in" : "Check in pending"}
                                                            </div>

                                                            <div onClick={() => { handleOpenOffCanvasCatCreate(item.id) }} className="check_icon"><IoEyeOutline /></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={9} style={{ textAlign: "center", padding: "20px" }}>
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>

                    </div>
                    {dataCount > 0 || currentPage > 1 ? (
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            count={dataCount}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    ) : null}

                </div>


            </div>
            {isCategoryCreateOffCanvasOpen &&
                <CreateCategory
                    headline="test"
                    onClose={handleCloseOffCanvasCatCreate}
                    viewData={modalData}

                />}
        </div>

    );
};

export default Dashbord;
