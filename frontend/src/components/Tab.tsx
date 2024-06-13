import React, { useState } from "react";
type TabProps = {
  id: string;
  title: string;
  setSelected: (id: string) => {};
};
const Tab = ({ title, id, setSelected }: TabProps) => {
    const [checked, setChecked] = useState(false);
  return (
    <>
      <input type="radio" name="tabset" id={id} checked={checked} />
      <label htmlFor={id} onClick={()=> setSelected(id)}>{title}</label>
    </>
  );
};

export default Tab;
