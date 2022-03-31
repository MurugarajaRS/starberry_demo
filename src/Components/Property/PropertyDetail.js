import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Share from '@mui/icons-material/Share'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Home from '@mui/icons-material/Home';
import './Property.css'
import Carousel from 'react-grid-carousel'

const PropertyDetail = (props) => {
  const location = useLocation();
  const property = location?.state
  
  return (
    <div style={{marginTop:"50px"}}> 
      <Box sx={{ display:"grid", flexGrow: 1, columnGap: 3,
    rowGap: 1, }}>
        <Grid container spacing={4} style={{width: '100%', margin : '25px 0px 25px 0px'}}>
          <Grid item sm={6} lg={6} >
            <img src={property?.Images[0]?.url} alt={property?.Reference_number} style={{maxWidth : "90%" }}/>
            <br/>
            <Carousel cols={3} rows={1} gap={0} loop>
              {property?.Images && property?.Images?.map(image => {
                return <Carousel.Item key={image?.id}>
                  <img style={{maxWidth:"90%", height:"100%"}} src={image?.url} />
                </Carousel.Item>
              })}
            </Carousel>
          </Grid>
          <Grid item sm={6} lg={6}>
            <div style={{marginRight: '25px'}}>
              <div style={{display: "flex", flexDirection: "row", justifyContent:"flex-end"}}>
                <Share/>
                <FavoriteBorder style ={{marginLeft:"10px"}}/>
              </div>
              <hr/>
              <div className="details">
                <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                  <h2 >{property?.Price} € </h2> 
                  <div style={{marginLeft:"10px"}}> {property?.Bedrooms} bed | {property?.Floor_Area} sqm</div>
                </div>
                <div>
                  {property?.Bedrooms} bedroom apartment for rent in {property?.Area?.Name}
                </div>
                <div style={{margin : "30px 0px"}}>
                  <a href="" ><Home/> Please contact us</a>
                </div>
                <Button style={{backgroundColor:"black", color:"white", width:"100%"}}>CONTACT AGENT</Button>
                <div style={{margin : "20px 0px", color: "#111111" }}>FACTS & FEATURES</div>
                
                <table style={{width:"100%" }} >
                  <tr>
                    <th align='left'>
                      Neighbourhood:
                    </th>
                    <td align='left'>
                      {property?.Area?.Name}
                    </td>
                  </tr>
                  <tr>
                    <th align='left'>
                      Price per sqm:
                    </th>
                    <td align='left'>
                      € {property?.Price_Per_Sqm}
                    </td>
                  </tr>
                  <tr>
                    <th align='left'>
                      Brochure:
                    </th>
                    <td align='left'>
                      <a href={property?.Brochure[0]?.url}>Download Brochure</a>
                    </td>
                  </tr>
                  <tr>
                    <th align='left'>
                      Floor Plan:
                    </th>
                    <td align='left'>
                      <a href={property?.floorpath}>View FloorPlan</a>
                    </td>
                  </tr>
                </table>
                <br/>

                <p align="justify">{property.Description}</p>
                <span align="left" style={{display : "flex"}}>
                  <img width="15%" src={property?.Negotiator?.Image?.url}/>
                  <span style={{marginLeft: "50px"}}>
                    <p style={{fontWeight: "bold", fontSize:"14px"}}>{property?.Negotiator?.Name}</p>
                    <p style={{fontSize:"12px"}}>{property?.Negotiator?.Designation}</p>
                    <p style={{fontSize:"12px"}}>+{property?.Negotiator?.Phone} | <a href="">Email</a></p>
                  </span>
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default PropertyDetail