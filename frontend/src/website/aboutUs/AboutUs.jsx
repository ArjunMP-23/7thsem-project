import React from "react";
import Hero from "../../components/website/hero/Hero";
import logo1 from "../../assets/photo1.jpg";
import logo2 from "../../assets/photo2.jpg";
import logo3 from "../../assets/photo3.jpg";
import logo4 from "../../assets/photo4.jpg";
import "./AboutUS.scss";
const AboutUs = () => {
  return (
    <>
    <div className="bg text__color">
      <Hero
        title="Introduction"
        text={
          
          
          "Welcome to the About Us page of our Library Management System project! We are a team of passionate and dedicated students from M S Ramaiah University of Applied Science working together to build an innovative and user-friendly platform for managing library resources efficiently. Each of us brings unique skills and expertise to the table, ensuring that this project reflects our commitment to excellence. "
      
        }
        reverse={true}
      />
      <footer className="bg__hover text__color">
      <div className="top" >
              <div className="card ">
                <img className="card1 "src={logo2} alt="Avatar" style={{ width: "100%" }} />
                <div className="">
                  <h4>
                    <b>Adarsh B Patil</b>
                  </h4>
                  <h4> <b>21ETEC004003</b></h4>
                  
                </div>
              </div>
            
            
              <div className="card">
                <img className="card1 " src={logo3} alt="Avatar" style={{ width: "100%" }} />
                <div className="">
                  <h4>
                    <b>Arjun M P</b>
                    
                  </h4>
                  <h4> <b>21ETEC004013</b></h4>
                </div>
              </div>
          
            
              <div className="card">
                <img className="card1 " src={logo4} alt="Avatar" style={{ width: "100%" }} />
                <div className="">
                  <h4>
                    <b>Mohammod Ibrahim Chickle</b>
                   
                  </h4>
                  <h4> <b>21ETEC004003</b></h4>
                </div>
              </div>
          
           
              <div className="card">
                <img className="card1 " src={logo1} alt="Avatar" style={{ width: "100%" }} />
                <div className="">
                  <h4>
                    <b>Vinod Kumar</b>
                  </h4>
                  <h4> <b>21ETEC004003</b></h4>
                </div>
              </div>
              
          
      </div>
      </footer>
     
    </div>

    </>
  );
};

export default AboutUs;