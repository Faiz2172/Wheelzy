import React from 'react';
import { Textarea } from "@/components/ui/textarea";

const TextAreaField = ({ item, handleInputChange }) => {
  return (
    <div>
      <Textarea  type={item?.fieldType} name={item?.name} required={item?.required}
      onChange={(e)=>handleInputChange(item.name,e.target.value)}/>
    </div>
  );
};

export default TextAreaField;
