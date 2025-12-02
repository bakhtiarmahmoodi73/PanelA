import { Container } from "@mui/material"
import TopComponent from "../components/mainpage/TopComponent"

function HomePage() {
  return (
    <Container  
      // sx={{
      //    maxWidth: "1140px", 
      //    marginX: "auto",
      //    marginTop:"99px",
      //    height:"99px",
      //    backgroundColor:"#2A3342",
      //    borderRadius:"30px",
      //    borderColor:"#596B89"   
      // }}
      >
        <TopComponent />
    </Container>
  )
}

export default HomePage