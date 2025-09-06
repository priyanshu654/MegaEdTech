import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { changeProfilePic } from "../../../../services/operations/settingApi";

export default function ChangeProfilePic() {
  const { user } = useSelector((state) => state.profile);
  const {token}=useSelector((state)=>state.auth);
  const [loading, setLoading] = useState(false);
  const [preview,setPreview]=useState(null);
  const [imageFile,setImageFile]=useState(null);
  const inputRef=useRef(null);
  const dispatch=useDispatch();

  const handleClick=()=>{
    inputRef.current.click();
  }

  const handleChange=(e)=>{
    const file=e.target.files[0]
    //console.log(file);
    if(file){
        setImageFile(file);
        handelPreview(file);
    }
    
  }

  const handleupload=(e)=>{
    try {
        setLoading(true);
        const formData=new FormData();
        formData.append("displayPicture",imageFile);
        dispatch(changeProfilePic(token,formData)).then(()=>{setLoading(false)})
    } catch (error) {
        console.log("cannot change profile",error);
        
    }

  }



  //when we select the file from our local computer it is in file format to generate its src value we are doing this
  const handelPreview=(file)=>{
    //this will read the file.. in bult js function
    const reader=new FileReader();
    //read as url
    reader.readAsDataURL(file);
    //as soon as url load setPreview me link set kar do tb wha par hm preview dekh paaenge
    reader.onload=()=>{
        setPreview(reader.result)
    }
  } 



  useEffect(()=>{
    if(imageFile){
        handelPreview(imageFile);
    }
  },[imageFile])


  return (
    <div className="bg-richblack-800 w-80% h-[150px] border border-richblack-500 rounded-md">
      <div className="flex items-center w-full h-full gap-10 px-10 text-pure-greys-25">
        <img
          src={preview||user?.profilePic}
          alt={`profile-${user.fName}`}
          className="aspect-square w-[78px] rounded-full"
        />
        <div className="flex flex-col gap-3">
          <p>Choose profile picture</p>
          <input 
          type="file"
          onChange={handleChange}
          accept="image/png, image/gif, image/jpeg" 
          className="hidden" ref={inputRef}/>
          <div className="flex gap-3">
            <button
            onClick={handleClick}
            disabled={loading}
            className="cursor-pointer rounded-md bg-richblack-700 w-24 p-1.5 text-pure-greys-25 font-semibold">
              Select
            </button>
            <IconBtn
              text={loading ? "Uploading" : "Upload"}
              customClass={`w-24 h-9 w-fit`}
              onclick={handleupload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
