import React from 'react'
import { Link } from 'react-router-dom';

export default function FooterSection({el}) {

    //console.log(el);
    const data=el.links
    //console.log("aa gya",data);
    
    
  return (
    <div className='flex flex-col gap-3 '>
        <h1 className='text-pure-greys-50 font-semibold text-xl'>{el.title}</h1>
        {
            data.map((value,index)=>{
                return(
                    <Link to={value.link} key={index}><p className='hover:text-richblack-25 transition-all duration-200'>{value.title}</p></Link>
                )
            })
        }
    </div>
  )
}
