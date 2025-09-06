import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";
import IconBtn from "../../common/IconBtn";
import { markLectureAsComplete } from "../../../services/operations/courseApi";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";

export default function VideoDetails() {
  const { token } = useSelector((state) => state.auth);
  const { sectionId, courseId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const location = useLocation();
  const {
    courseSectionData,
    courseEntireData,
    totalNumberOfLecture,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  //console.log("course section", courseSectionData);

  const [previewSource, setPreviewSource] = useState("");
  const [videoData, setVideoData] = useState(false);
  const [videoEnded, setvideoEnded] = useState(false);
  const[loading,setLoading]=useState(false);

  useEffect(() => {
    async function videoPlayer() {
      if (!courseId || !sectionId || !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
        return;
      } else {
        const filteredSection = courseSectionData.find(
          (section) => section._id === sectionId
        );
        //console.log(filteredSection);

        const filteredSubSection = filteredSection.subSection.find(
          (subSec) => subSec._id === subSectionId
        );
        //console.log("subsection",filteredSubSection);

        setPreviewSource(courseEntireData.thumbnail);
        setVideoData(filteredSubSection);
        setvideoEnded(false);
      }
    }
    videoPlayer();
  }, [courseEntireData, courseSectionData, location.pathname]);

  const isFirstVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const subSectionIndex = courseSectionData[
      sectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (sectionIndex === 0 && subSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const subSectionIndex = courseSectionData[
      sectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (
      subSectionIndex ===
      courseSectionData[sectionIndex].subSection.length - 1
    ) {
      //eska mtlb ki yeah us section ka last video tha
      //move to next section
      const nextSectionId = courseSectionData[sectionIndex + 1]._id;
      //subsection me nex section ka first video
      const nextSubSectionId =
        courseSectionData[sectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSubSectionId =
        courseSectionData[sectionIndex].subSection[subSectionIndex + 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };
  const islastVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const subSectionIndex = courseSectionData[
      sectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (
      sectionIndex === courseSectionData.length - 1 &&
      subSectionIndex === courseSectionData[sectionIndex].subSection.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  };
  const goToPrev = () => {
    const sectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const subSectionIndex = courseSectionData[
      sectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (sectionIndex === 0 && subSectionIndex === 0) {
      // Already at the first video, do nothing or show a toast
      return;
    }

    if (subSectionIndex === 0) {
      const newSectionId = courseSectionData[sectionIndex - 1]._id;
      const newSubSection = courseSectionData[sectionIndex - 1].subSection;
      const newSubSectionLength = newSubSection.length;
      const newSubSectionId = newSubSection[newSubSectionLength - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${newSectionId}/sub-section/${newSubSectionId}`
      );
    } else {
      const newSubSectionId =
        courseSectionData[sectionIndex].subSection[subSectionIndex - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${newSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }
  
  return (
    <div className="flex flex-col gap-5 text-white">
      {
        !videoData?(
          <img src={previewSource} alt="preview" className="h-full w-full rounded-md object-cover"/>
        ):(
          <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={()=>setvideoEnded(true)}
          src={videoData?.videoUrl}
          >
            <BigPlayButton position="center" />
            {/* render when video ends */}
            {videoEnded&&(
              <div style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
                {!completedLectures?.includes(subSectionId)&&(
                  <IconBtn
                  disabled={loading}
                  onClick={handleLectureCompletion}
                  text={!loading?"Mark as completed":"Loading..."}
                  customClass={"text-xl max-w-max px-4 mx-auto"}
                  />
                  
                )}
                <IconBtn
                disabled={loading}
                onClick={()=>{
                  if(playerRef?.current){
                    playerRef.current.seek(0)
                    setvideoEnded(false)
                  }
                }}
                text="Rewatch"
                customClass={"text-xl max-w-max px-4 mx-auto mt-2"}
                />
                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrev}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!islastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
              </div>
            )}

          </Player>
        )
      }
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}
