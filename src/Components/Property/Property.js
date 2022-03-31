import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Auth from '../../Auth/Auth'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Property = () => {
  const [data, setData] = useState([])
  const [loader, setLoader ] = useState(false)
  const history = useNavigate();

  useEffect(() => {
    const isLoggedIn = Auth.isLoggedIn();
    console.log(isLoggedIn)
    if(!isLoggedIn) {
      history('/')
      console.log("")
    }
    else{
      setLoader(true)
      // axios.get('data.json')
      axios.get(`https://carolineolds-strapi-dev.q.starberry.com/properties?_limit=50`)
      .then((res) => {
        console.log(res.data)
        setData(res.data)
        setLoader(false)
      })
      .catch( error => {
        console.log(error)
        setLoader(false)
      })
    }
  }, [])

  const handleDetail = (property) => {
    localStorage.setItem('property', property)
    history(`/property/:${property?.id}`, { state: property })
  }

  return (
    <div className = "container">

      {loader ? <div style={{ marginLeft:"50%"}}>
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
        <CircularProgress color="secondary"  style={{ marginTop:"10%"}} />
      </Stack>
      </div> :
        <div>
          <br/>
          <p  style={{marginTop:"50px"}}>Property For Sales</p>
          <div>
            <hr/>
            <Grid container spacing={4} >
              <Grid item xs={12} sm={6} lg={2} >  
                All bedrooms <ArrowDropDownIcon style={{top:"10px"}}/>
              </Grid>
              <Grid item xs={12} sm={6} lg={2}>  
                Neighbourhood <ArrowDropDownIcon/>
              </Grid>
              <Grid item xs={12} sm={6} lg={2}>  
                Min Price <ArrowDropDownIcon/>
              </Grid>
              <Grid item xs={12} sm={6} lg={2}>  
                Max Price <ArrowDropDownIcon/>
              </Grid>
              <Grid item xs={12} sm={6} lg={2}>  
                Sort By <ArrowDropDownIcon/>
              </Grid>
              <Grid item xs={12} sm={6} lg={2}>  
                {data.length} results
              </Grid>
            </Grid>
            <hr/>
          </div>
          <Grid container spacing={4} // justify="flex-start"
            // alignItems="flex-start" 
            style={{width: '100%', margin : '25px 0px 25px 0px'}}
          >
            {data && data.map(property => {
              
              return <Grid item xs={12} sm={4} lg={3} key={property.id}>
                  <Card key={property.id} sx={{ minWidth: '150px' , maxWidth: '300px'}} onClick={() => handleDetail(property)} >
                    {console.log(property.Reference_Number, property.Images[0]?.url)}
                    <CardMedia
                      component="img"
                      height="140"
                      image= {property?.Images[0]?.url}
                      alt= {property?.Reference_Number}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {property?.Title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {property?.Reference_Number}
                      </Typography>
                      <Typography variant="h6" color="black" fontWeight="bold">
                        {property?.Price} €
                      </Typography>
                    </CardContent>
                  </Card>
              </Grid>
            })}
          </Grid >
        </div>
      }
    </div>
  )
}
export default Property