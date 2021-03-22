import React from "react";
import "./Footer.css";

import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer style={{border: "none"}}>
        <div class="onef">
            <div class="heading">Let Us Meet</div>
            <p>Allows you to create a virtual Office, rooms, chat with the employees, add memmbers, make taskboards and task cards and assign them to employees.</p>
        </div>
        <div class="twof">
            <div class="heading">News letter</div>
            <p style={{color: "#eee"}}> Subscribe to our weekly Newsletter and stay tuned.</p>
                
                <form action="" method="post">
                    <div class="input-prepend"><span className="add-on"><i className="icon-envelope"></i></span>
                        <input type="text" id="emailid" name="" placeholder="your@email.com" />
                    </div>
                    <br />
                    <input type="submit" value="Subscribe Now!" id="buttonid" />
              </form>
            
        </div>
        <div class="threef">
        <div class="heading">Useful links</div>
        <p> 
                <NavLink
                to="/"
                className="menuitem"
                >Home
                </NavLink>
            </p>
            <p> 
            <NavLink
              to="/about"
              className="menuitem"
              >About Us
            </NavLink>
            </p>
            <p> 
            <NavLink
              to="/contact"
              className="menuitem"
             >Contact Us
            </NavLink>
            </p>

        </div>
        <div class="fourf">
        

        <div class="heading">Support</div>
            <p> 
            <NavLink
              to="/help"
              className="menuitem"
              >Help & Support
            </NavLink>
            </p>

            <p> 
            <NavLink
              to="/terms"
              className="menuitem"
              >Terms of Service
            </NavLink>
            </p>
            <p> 
            <NavLink
              to="/privacy"
              className="menuitem">Privacy Policy
            </NavLink>
            </p>

        </div>
    </footer>
      
    
  );
}

export default Footer;
