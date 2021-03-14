import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer style={{border: "none"}}>
        <div class="onef">
            <div class="heading">ABOUT US</div>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
        </div>
        <div class="twof">
            <div class="heading">RECENT BLOG</div>
            <div class="blog">
                <div class="img">
                    <img src="./image/image_1.jpg" alt=""/>
                </div>
                <div class="contentf">
                    <p>Even the all-powerful Pointing has no control about</p>
                    <div class="po">
                        <a href=""><i class="fa fa-calendar" aria-hidden="true"></i>Sept 15,2018</a>
                        <a href=""><i class="fa fa-user" aria-hidden="true"></i>Admin</a>
                        <a href=""><i class="fa fa-comments" aria-hidden="true"></i>17</a>
                    </div>
                </div>
            </div>
            <div class="blog">
                <div class="img">
                    <img src="./image/image_2.jpg" alt=""/>
                </div>
                <div class="contentf">
                    <p>Even the all-powerful Pointing has no control about</p>
                    <div class="po">
                        <a href=""><i class="fa fa-calendar" aria-hidden="true"></i>Sept 15,2018</a>
                        <a href=""><i class="fa fa-user" aria-hidden="true"></i>Admin</a>
                        <a href=""><i class="fa fa-comments" aria-hidden="true"></i>17</a>
                    </div>
                </div>
            </div>

        </div>
        <div class="threef">
            <div class="heading">SERVICES</div>
            <p>Cooked</p>
            <p>Deliver</p>
            <p>Quality Foods</p>
            <p>Mixed</p>
        </div>
        <div class="fourf">
            <div class="heading">HAVE A QUESTIONS?</div>
            <p><i class="fa fa-location-arrow" aria-hidden="true"></i>	203 Fake St. Mountain View, San Francisco, California, USA</p>
            <p><i class="fa fa-phone" aria-hidden="true"></i>+91 8489778942</p>
            <p><i class="fa fa-envelope" aria-hidden="true"></i>labkalab@gmail.com</p>
        </div>
    </footer>
      
    
  );
}

export default Footer;
