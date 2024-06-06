import { Typography } from "@mui/material"
import { useState } from "react"
import { FaStar } from "react-icons/fa"


const StarRating=({handleRating})=>{

    const[rating,setRating]=useState(null)
    const [hover,setHover]=useState(null)

    return(
        <div style={{marginTop:10}}>
            <Typography>Add your rating below:</Typography>
            {[...Array(5)].map((star,index)=>{
                const currentRating=index+1
               return(
                <label key={index*1001}>
                    <input
                        type="radio"
                        name="rating"
                        value={currentRating}
                        onClick={()=>{
                            handleRating(currentRating)
                            setRating(currentRating)
                        }}
                    />
                    <FaStar
                        
                        className="star"
                        size={25}
                        color={currentRating<=(hover||rating)? '#ffc107':'#e4e5e9'}
                        style={{marginRight:3}}
                        onMouseEnter={()=>setHover(currentRating)}
                        onMouseLeave={()=>setHover(null)}
                    />
                </label>
               )} 
            )}
            
        </div>
    )
}
export default StarRating