import React, { useState, useImperativeHandle, useEffect, useRef } from "react";
import './dashbord.css';
import image from '../../../pages/assets/image.png'
import { BsBorderBottom } from 'react-icons/bs';
import { BiColor } from 'react-icons/bi';
import { CgSoftwareDownload } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";
import CreateCategory from '../view-transaction/view-transaction.tsx'
import { IoEyeOutline } from "react-icons/io5";

function Dashbord() {
    const [isCategoryCreateOffCanvasOpen, setIsCategoryCreateOffCanvasOpen] = useState(false);
    const handleOpenOffCanvasCatCreate = () => {
        setIsCategoryCreateOffCanvasOpen(true);

    };
    const handleCloseOffCanvasCatCreate = () => {
        setIsCategoryCreateOffCanvasOpen(false);

    };
    const loadDataCreateCat = async (data: any) => {

    };
    return (
        <div className='main'>
            <div className="container mt-3">
                <h3 className='event_name mb-4 mt-1'>Event ticket dashboard <span className='sub_name'>(Awareka adare)</span></h3>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 col-lg-6'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='menu_itam'  >
                                    <p className='dh-count mt-3'>1000</p>
                                    <p className='dh-sub-description mt-3'>Total ticket sale</p>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='menu_itam2'  >
                                    <p className='dh-count2 mt-3'>1000 <span className='dh-currency'>lkr</span></p>
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
                                        <h3 className='event_d'>Event details :<span className='event_d_data'>Awareka adare</span></h3>
                                        <div className='border_line mt-3 mb-3'></div>
                                        <div className='row mb-4'>
                                            <div className='col-6'>
                                                <div className="section_d">
                                                    <p className="dh_data_head">Event date and time</p>
                                                    <p className="dh_data">12 Jan 2025  10.00 Am
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="section_d">
                                                    <p className="dh_data_head">Expire date and time</p>
                                                    <p className="dh_data">12 Jan 2025  10.00 Am
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className="section_d">
                                                    <p className="dh_data_head">Venue</p>
                                                    <p className="dh_data">Havelock, city
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="section_d">
                                                    <p className="dh_data_head">Currency</p>
                                                    <p className="dh_data">LKR,USD
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
                                        src={image}
                                        alt="Description"
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
                                            <p className="dh_data_head" style={{ color: '#C67300' }}>Ticket name</p>
                                            <p className="dh_data">VIP
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head">Total tickets</p>
                                            <p className="dh_data">50000
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head">Remaining tickets</p>
                                            <p className="dh_data">14
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head">Price</p>
                                            <p className="dh_data">5000.00
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head">Visualise price</p>
                                            <p className="dh_data">5000.00
                                            </p>
                                        </div>
                                    </div>


                                </div>
                                <div className='line_summary_table mt-3 mb-3'></div>
                                <div className='row'>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head" style={{ color: '#016FD0' }}>Ticket name</p>
                                            <p className="dh_data">General
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head">Total tickets</p>
                                            <p className="dh_data">50000
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head">Remaining tickets</p>
                                            <p className="dh_data">14
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head">Price</p>
                                            <p className="dh_data">5000.00
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head">Visualise price</p>
                                            <p className="dh_data">5000.00
                                            </p>
                                        </div>
                                    </div>


                                </div>
                                <div className='line_summary_table mt-3 mb-3'></div>
                                <div className='row'>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head" style={{ color: '#D001A0' }}>Ticket name</p>
                                            <p className="dh_data">Premium
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head">Total tickets</p>
                                            <p className="dh_data">50000
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head">Remaining tickets</p>
                                            <p className="dh_data">14
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head">Price</p>
                                            <p className="dh_data">5000.00
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-20'>
                                        <div className="section_d">
                                            <p className="dh_data_head">Visualise price</p>
                                            <p className="dh_data">5000.00
                                            </p>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                        <div className='col-sm-12 col-md-8 col-lg-5' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className='row borderRow_bottom' style={{ flexGrow: 1 }}>
                                <div className='col-4 borderCol_right box_grid' >
                                    <p className='box_name'>VIP</p>
                                    <h4 className='box_data_1'>75<span className='box_data_2'>/100</span></h4>
                                </div>
                                <div className='col-4 borderCol_right box_grid' >
                                    <p className='box_name'>General</p>
                                    <h4 className='box_data_1'>75<span className='box_data_2'>/100</span></h4>
                                </div>
                                <div className='col-4 box_grid' >
                                    <p className='box_name'>Balcony</p>
                                    <h4 className='box_data_1'>75<span className='box_data_2'>/100</span></h4>
                                </div>

                            </div>
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
                                        <td className="inventory_td">D657688</td>
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
                                        </td>
                                    </tr>
                                    <tr style={{ borderTop: 'hidden' }}>
                                        <td className="inventory_td">D657688</td>
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
                                        </td>
                                    </tr>
                                    <tr style={{ borderTop: 'hidden' }}>
                                        <td className="inventory_td">D657688</td>
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
                                        </td>
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
