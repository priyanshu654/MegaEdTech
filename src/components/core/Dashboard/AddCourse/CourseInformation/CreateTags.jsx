import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux";

export default function CreateTags({
  name,
  setValue,
  getValues,
  register,
  label,
  placeholder,
  errors,
}) {
  
  const [tagArray, setTagArray] = useState([]);
  const{course,editMode}=useSelector((state)=>state.course)

  //jb edit mode ho tb setkar denge 
  useEffect(()=>{
    if(editMode){
        setTagArray(course?.tag);
    }
    register("tag", { required: true ,validate:(value)=>value.length>0})

  },[])

  //to set the value of tags in main form whenever there is change in  tags array
  useEffect(()=>{
    setValue(name,tagArray)
  },[tagArray])




  const handelKeyDown=(e)=>{
    
    if(e.key==="Enter" || e.key===","){
        e.preventDefault();
        const tagValue=e.target.value.trim();
        if(tagValue || !tagArray.includes(tagValue)){
            const newTags=[...tagArray,tagValue]
            setTagArray(newTags);
            e.target.value=""
        }
        
    }
  }

  const handelDeleteTag=(index)=>{
    const newTags= tagArray.filter((el,tagIndex)=>tagIndex!==index)
    setTagArray(newTags);
  }



  return (
    <div className="flex flex-col gap-3">
      <label className="text-pure-greys-25">
        {label}
        <sup className="text-pink-200">*</sup>
      </label>
      {
        tagArray.length>0 &&(
            <div className="flex gap-3 flex-wrap w-full">
                {tagArray.map((el,index)=>(
                    <div key={index} className="bg-yellow-400 w-fit h-fit rounded-md p-1 text-pure-greys-25">{el}
                    <button type="button" className="ml-2 focus:outline-none" onClick={()=>{handelDeleteTag(index)}}>
                    <MdClose className="text-sm"/>
                    </button>
                    </div>
                ))}
            </div>
        )
      }
      <input
        type="text"
        id={name}
        name={name}
        className="form-style"
        
        placeholder={placeholder}
        onKeyDown={handelKeyDown}
      />
      {errors[name]&&(
        <span className="ml-2 text-xs tracking-wide text-pink-200">Tags are required</span>
      )}
    </div>
  );
}
