import React from 'react'
import './Landing.css'
import img from './student2.png'
import {Link} from 'react-router-dom'
import Footer from '../base/Footer'
export default function Landing() {
    return (
        <>
        <div>
             <div className="land_div">
             <div className="land_content">
            <div className="row">
                <div className="col-md-6">
                    <h1 className="p-5 land_head">Welcome to Let Us Meet! Create or join an office for free!</h1>
                    <div className="px-5">
                    <Link to="/signup"><button  className="land_btn">Join Us</button></Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <img className="p-5 img" src={img}/>
                </div>
            </div>
            <div className="container">
            <div className="row">
                <div className="col-md-3 land_cards">
                    <div className="text-center land_card">
                    <i className="fa fa-briefcase land_icons"/>
                    <h3 className="land_sub">Create Office</h3>
                    </div>
                </div>
                <div className="col-md-3 land_cards">
                <div className="text-center land_card">
                <i class="fa fa-commenting-o land_icons"></i>
                <h3 className="land_sub">Chat With Employees</h3>
                        </div>
                </div>
                <div className="col-md-3 land_cards">
                <div className="text-center land_card">
                <i class="fa fa-plus-square land_icons"></i>
                <h3 className="land_sub">Add Employees</h3>
                </div>
                </div>
                <div className="col-md-3 land_cards">
                <div className="text-center land_card">
                <i class="fa fa-user land_icons"></i>
                <h3 className="land_sub">Add Manager</h3>   
                </div>
                </div>
            </div>
            </div>
            </div>
        </div>
        
        </div>
    <Footer/>
    </>
)
}
