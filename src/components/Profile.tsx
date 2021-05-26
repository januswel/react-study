import React, { useState } from "react";

const Profile: React.VFC = () => {
  const name = useControlledComponent("");
  const department = useControlledComponent("CX Department");

  return (
    <div>
      <div data-testid="item">
        <input type="text" {...name} />
        <p>{name.value}</p>
      </div>

      <div data-testid="item">
        <input type="text" {...department} />
        <p>{department.value}</p>
      </div>
    </div>
  );
};

export function useControlledComponent(initiateState: string) {
  const [value, setValue] = useState<string>(initiateState);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return { value, onChange };
}

export default Profile;
