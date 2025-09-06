import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfermationModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseApi";
import { setCourse } from "../../../../../slices/courseSlice";

export default function NestedSection({ toggleEdit }) {
  const { course } = useSelector((state) => state.course);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDeleteSection =async (sectionId) => {
    const payload = {
      sectionId: sectionId,
    };
    const result = await deleteSection(payload,token);
    if(result){
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId) => {
    const payload = {
      subSectionId: subSectionId,
    };
    const result = await deleteSubSection(payload, token);

    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  return (
    <div>
      <div className="rounded-lg bg-richblack-700 p-6 px-8 mt-6">
        {course?.content?.map((section) => {
          //console.log("section hai", section);
          return (
            <details key={section._id} open>
              <summary className="flex items-center justify-between gap-x-3 border-b-2 p-1 text-pure-greys-200">
                <div className="flex items-center gap-x-4">
                  <RxDropdownMenu size={22} className="text-pure-greys-200" />
                  <p className="text-pure-greys-200 font-bold text-lg">
                    {section.name}
                  </p>
                </div>
                <div className=" flex items-center gap-x-3">
                  <button onClick={() => toggleEdit(section._id, section.name)}>
                    <MdEdit size={22} className="text-pure-greys-200" />
                  </button>

                  <button
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Delete this Section",
                        text2:
                          "All the lectures in this section wil be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                  >
                    <RiDeleteBin6Line
                      size={22}
                      className="text-pure-greys-200"
                    />
                  </button>
                  <span className="text-pure-greys-200">|</span>
                  <BiDownArrow
                    className={`text-xl text-richblack-300 cursor-pointer`}
                  />
                </div>
              </summary>
              <div className="flex flex-col justify-center items-center text-pure-greys-200">
                {section?.subSection.map((data) => {
                  //console.log(data);
                  return (
                    <div
                      className="flex items-center justify-between gap-x-3 border-b-2 h-12 w-[90%] cursor-pointer"
                      key={data._id}
                      onClick={(e) => {
                        setViewSubSection(data);
                      }}
                    >
                      <div className="flex items-center gap-x-3">
                        <RxDropdownMenu
                          size={20}
                          className="text-pure-greys-200"
                        />
                        <p>{data.title}</p>
                      </div>

                      <div className="flex gap-3 ">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditSubSection({
                              ...data,
                              sectionId: section._id,
                            });
                          }}
                        >
                          <MdEdit size={20} className="text-pure-greys-200" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmationModal({
                              text1: "Delete this subsection",
                              text2: "Selected lecture will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () =>
                                handleDeleteSubSection(data._id),
                              btn2Handler: () => setConfirmationModal(null),
                            });
                          }}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <button
                  className="mt-4 flex items-center gap-x-2 text-yellow-50 font-semibold"
                  onClick={() => {
                    setAddSubSection(section._id);
                  }}
                >
                  <AiOutlinePlus className="font-semibold" />
                  <p>Add Lecture</p>
                </button>
              </div>
            </details>
          );
        })}
      </div>
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : (
        <div></div>
      )}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
