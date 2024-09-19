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

const ticketsData: Ticket[] = [];
function Dashbord() {

    //   const [events, setEventData] = useState([]);
    const [eventData, setEventData] = useState<any>(null);
    const [data, setEventDetails] = useState<any>(null);
    const [isCategoryCreateOffCanvasOpen, setIsCategoryCreateOffCanvasOpen] = useState(false);
    const handleOpenOffCanvasCatCreate = () => {
        setIsCategoryCreateOffCanvasOpen(true);

    };
    const handleCloseOffCanvasCatCreate = () => {
        setIsCategoryCreateOffCanvasOpen(false);

    };
    const loadDataCreateCat = async (data: any) => {

    };
    const hasTickets = true;
    const getData = () => {
        // setIsLoading(true);

        axios
            .get(`${environment.BASE_URL}/events/event-details/?event_id=NFQJ118E62408C8D78D06`)
            .then((res) => {
                console.log(res, '55555');
                const data = res?.data;
                console.log(data.data);
                if (data?.status === 100) {
                    setEventData(data.data);
                    setEventDetails(data.data.tickets);
                } else {
                    console.error(data.message || 'Getting events failed!');
                    toast.error('Getting events failed!', { id: 'getEvents' });
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error('Oh! Something went wrong', { id: 'getEvents' });
            })
            .finally(() => {
                // setIsLoading(false);
            });
    };
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

    // Call getData inside useEffect
    useEffect(() => {
        getData();
    }, []); // Empty dependency array ensures this runs only once
    if (!eventData) {
        return <p style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh' // Adjust this value if necessary
        }}>Loading...</p>;
    }
    const parseTicketValue = (value: string): number => {
        return parseInt(value, 10) || 0; // Default to 0 if parsing fails
    };
    const totalTicketsSold = data.reduce((acc, ticket) => {
        return acc + (parseInt(ticket.total_tickets, 10) - parseInt(ticket.remaining_tickets, 10));
    }, 0);

    const totalSalesAmount = data.reduce((acc, ticket) => {
        return acc + (parseInt(ticket.total_tickets, 10) - parseInt(ticket.remaining_tickets, 10)) * parseFloat(ticket.ticket_amount);
    }, 0);

    return (
        <div className='main'>
            <div className="container mt-3">
                <h3 className='event_name mb-4 mt-1'>Event ticket dashboard <span className='sub_name'>({eventData.event_name || 'N/A'})</span></h3>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-lg-6'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='menu_itam'  >
                                    <p className='dh-count mt-3'>{totalTicketsSold}</p>
                                    <p className='dh-sub-description mt-3'>Total ticket sale</p>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='menu_itam2'  >
                                    <p className='dh-count2 mt-3'>{totalSalesAmount.toFixed(2)}  <span className='dh-currency'>{eventData.tickets_currency || 'N/A'}</span></p>
                                    <p className='dh-sub-description2 mt-3'>Total ticket sale</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-12 col-md-6 col-lg-6'>
                        <div className='menu_itam3'  >
                            <div className='row'>
                                <div className='col-sm-12 col-md-8 col-lg-8' >
                                    <div className='event_d_grid'>
                                        <h3 className='event_d'>Event details :<span className='event_d_data'>{eventData.event_name || 'N/A'}</span></h3>
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
                                                    <p className="dh_data_head">Expire date and time</p>
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
                                            height: '100%',
                                            objectFit: 'cover'
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
                                {hasTickets ? (
                                    data.map(ticket => (
                                        <React.Fragment key={ticket.id}>
                                            <div className='row'>
                                                <div className='col-20'>
                                                    <div className="section_d">
                                                        <p className="dh_data_head" style={{ color: ticket.ticket_name === 'VIP' ? '#C67300' : (ticket.ticket_name === 'General' ? '#016FD0' : '#D001A0') }}>
                                                            Ticket name
                                                        </p>
                                                        <p className="dh_data">{ticket.ticket_name}</p>
                                                    </div>
                                                </div>
                                                <div className='col-20'>
                                                    <div className="section_d">
                                                        <p className="dh_data_head">Total tickets</p>
                                                        <p className="dh_data">{ticket.total_tickets}</p>
                                                    </div>
                                                </div>
                                                <div className='col-20'>
                                                    <div className="section_d">
                                                        <p className="dh_data_head">Remaining tickets</p>
                                                        <p className="dh_data">{ticket.remaining_tickets}</p>
                                                    </div>
                                                </div>
                                                <div className='col-20'>
                                                    <div className="section_d">
                                                        <p className="dh_data_head">Price</p>
                                                        <p className="dh_data">{ticket.ticket_amount}</p>
                                                    </div>
                                                </div>
                                                <div className='col-20'>
                                                    <div className="section_d">
                                                        <p className="dh_data_head">Visualise price</p>
                                                        <p className="dh_data">{ticket.ticket_visualize_amount}</p>
                                                    </div>
                                                </div>
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
                                <div className='row borderRow_bottom' style={{ flexGrow: 1 }}>
                                    {data.map(ticket => (
                                        <div key={ticket.id} className='col-4 borderCol_right box_grid'>
                                            <p className='box_name'>{ticket.ticket_name}</p>
                                            <h4 className='box_data_1'>{parseTicketValue(ticket.remaining_tickets)}<span className='box_data_2'>/{parseTicketValue(ticket.total_tickets)}</span></h4>
                                        </div>

                                    ))}
                                </div>

                            ) : (
                                <div className='row borderRow_bottom' style={{ flexGrow: 1 }}>
                                    <div className='col-4 borderCol_right box_grid'>
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

                                <div className='col-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* data table */}
                <div className="row mb-4 mt-4">
                    <div className="col d-flex justify-content-between align-items-center">
                        <h3 className="event_name_sub mb-4 mt-4">Participant list</h3>

                        <div className="d-flex justify-content-end align-items-center">
                            <span style={{ color: '#8E00AB', fontSize: 'large' }}><CgSoftwareDownload /><span style={{ fontSize: '14px', color: '#8E00AB', marginLeft: '3px', fontWeight: '500', marginRight: '10px' }}>Download report</span></span>

                            <div className="input-with-icon">
                                <IoSearchOutline className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search"
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className='table_data_grid'>
                    <div className='default-table table-container'>
                        <div className="table_scroll">
                            {/* <div style={{ overflowX: 'auto' }}> */}
                            <table className="table align-middle"
                                style={{ borderTop: "hidden", borderBottom: 'hidden' }}>
                                <thead>
                                    <tr className="table_header_text">
                                        <th className="table_header_text">TICKET REFERENCE</th>
                                        <th className="table_header_text">DATE TIME</th>
                                        <th className="table_header_text">NAME</th>
                                        <th className="table_header_text">EMAIL ADDRESS</th>
                                        <th className="table_header_text">STATUS</th>
                                        <th className="table_header_text">TICKET COUNT</th>
                                        <th className="table_header_text">PAID AMOUNT</th>
                                        <th className="table_header_text">PAYMENT TYPE</th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody className="inventory" style={{ backgroundColor: "#F9FAFB" }}>
                                    <tr style={{ borderTop: 'hidden' }} className='td_tr'>
                                        {/* <td className="inventory_td">D657688</td>
                                        <td className="inventory_td">12 Jan 2025 10.00 Am</td>
                                        <td className="inventory_td">GGHjf</td>
                                        <td className="inventory_td">John@gmail.com</td>
                                        <td className="inventory_td">Refund</td>
                                        <td className="inventory_td">1</td>
                                        <td className="inventory_td">5000 lkr</td>
                                        <td className="inventory_td">Card</td>
                                        <td>
                                            <div className="row">
                                                <div className="col d-flex  align-items-center">
                                                    <div className="check_in">Check in</div>
                                                    <div onClick={() => { handleOpenOffCanvasCatCreate() }} className="check_icon"><IoEyeOutline /></div>

                                                </div>
                                            </div>
                                        </td> */}
                                          <td className="coomin_zoon" colSpan={8} style={{ textAlign: "center" }}>Commin zoon</td>
                                    </tr>
                                   
                                    
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>


            </div>
            {isCategoryCreateOffCanvasOpen && <CreateCategory headline="test" onClose={handleCloseOffCanvasCatCreate} onSubmitForm={loadDataCreateCat} />}
        </div>

    );
};

export default Dashbord;
